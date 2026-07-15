let inventoryData=[
    {id:1, name: "Acetone", quantity: 3, unit: 'Bottles'},
    {id:2, name: "Alcohol", quantity: 4, unit: 'Bottles'}
]

let nextId=3
exports.getItems=(req,res)=>{
    return res.status(200).json(inventoryData)
}
exports.createItem=(req, res)=>{
    const {name, quantity, unit}=req.body
    if(!name||!quantity||!unit){
        return res.status(400).json({error:'Missing requires fields'})
    }
    const newItem={id:nextId++, name, quantity, unit}
    inventoryData.push(newItem)
    return res.status(201).json(newItem)

}

exports.updateItem=(req,res)=>{
    const {id}=req.params
    const {name, quantity, unit}=req.body
    const index=inventoryData.findIndex((item)=>item.id===parseInt(id))
    if (index===-1){
        return res.status(404).json({error: 'Item not found'})
    }
    const updatedItem={...inventoryData[index],
    name: name|| inventoryData[index].name,
    quantity: quantity || inventoryData[index].quantity,
    unit: unit ||inventoryData[index].unit}

    inventoryData[index]=updatedItem
    return res.status(200).json(updatedItem)
}

exports.deleteItem=(req, res)=>{
    const {id}=req.params
    const index=inventoryData.findIndex(item=>item.id===parseInt(id))
    if (index===-1){
        return res.status(404).json({error:'Item not found'})
    }
    inventoryData.splice(index,1)
    return res.status(204).send()
}