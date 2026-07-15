import React, { useState, useEffect } from "react";
// import Exercise from "./component/Exercise";
import "./App.css";
import { getAllItems } from "./inventory/api";
import InventoryForm from './inventory/InventoryForm'
import InventoryList from './inventory/InventoryList'

function App() {
  // <Exercise />;
  const [items, setItems] = useState([]);
  const fetchItems = async () => {
    try {
      const data = await getAllItems();
      setItems(data);
      console.log(data)
    } catch (error) {
      console.error("Error fetching items", error);
    }
  };

  useEffect(()=>{fetchItems()},[])

  return ( <div>
    <h1>Lab Inventory & Management</h1>
    <InventoryForm onAddItem={fetchItems}/>
    <InventoryList items={items} onUpdate={fetchItems}/>
  </div>
)}
export default App;
