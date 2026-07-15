const request =require('supertest')
const express=require('express')
const itemRoutes=require('../routes/itemRoutes.js')
const app=express()
app.use(express.json())
app.use('/api/items', itemRoutes)

describe('Item Controller Tests', ()=>{
    test('Get /api/items - should return array of items', async()=>{
        const response=await request(app).get('/api/items');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true)
    })
    test("POST /api/items - should create a new item", async()=>{
        const newItem={name:'Methanol', quantity: 10, unit:'bottle'}
        const response=await request(app)
        .post('/api/items')
        .send(newItem)
        expect(response.statusCode).toBe(201)
        expect(response.body.name).toBe('Methanol')
        expect(response.body.quantity).toBe(10)
    })
    test('PUT /api/items/:id - should update an item', async()=>{
        const response= await request(app)
        .put('./api/items/1')
        .send({quantity:20})
        expect(response.statusCode).toBe(200)
        expect(response.body.quantity).toBe(20)
    })
    test('DELETE /api/items/:id - should delete an item', async()=>{
        const response=await request(app).delete('/api/items/1')
        expect(response.statusCode).toBe(204)
    })
})