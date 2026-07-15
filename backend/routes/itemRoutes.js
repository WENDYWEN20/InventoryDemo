const express =require('express');
const router=express.Router();
const {getItems, createItem, updateItem, deleteItem}=require('../controllers/itemController')
//get all items
router.get('/', getItems)
//post create a new Item
router.post('/', createItem)
//put update an existing item
router.put('/:id', updateItem)
//DELETE an item
router.delete('/:id', deleteItem)
module.exports=router