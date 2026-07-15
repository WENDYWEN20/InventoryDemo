//Dependencies:
//express: Web framework.
//cors: Enables cross-origin requests from frontend.
//jest & supertest: For testing.
const express=require('express')
const cors = require ('cors')
const itemRoutes=require('./routes/itemRoutes.js')
const app=express()

app.use(cors())
app.use(express.json())
//Routes
app.use("/api/items", itemRoutes)
//Start Server
const PORT=process.env.PORT ||5005
app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`)
})
app.get("/", (req, res) => {
    res.send("Welcome to Lab Inventory & Management System Backend!");
  });