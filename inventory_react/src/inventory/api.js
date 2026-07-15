const BASE_URL='http://localhost:5005/api'
export async function getAllItems(){
    const response=await fetch(`${BASE_URL}/items`)
    if (!response.ok){
        throw new Error('Failed to fetch items')}
    return response.json()
    }

export async function createItem(item){
    const response=await fetch(`${BASE_URL}/items`, {
        method:'POST',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify(item),
    })
    if (!response.ok){
        throw new Error('Failed to create item')
    }
    return response.json()
}

export async function updateItem(id, updateData){
    const response=await fetch(`${BASE_URL}/items/${id}`,{
        method:'PUT',
        headers:{'Content-Type': 'application/json'},
        body:JSON.stringify(updateData)
    })
    if(!response.ok){
        throw new Error('Failed to update Item')
    }
    return response.json()
}

export async function deleteItem(id){
    const response=await fetch(`${BASE_URL}/items/${id}`, {
        method:'DELETE'
    })
    if (!response.ok && response.status !==204){
        throw new Error('Failed to delete item')
    }
    return response
}