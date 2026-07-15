import React from "react";
import { updateItem, deleteItem } from "./api";

export default function InventoryList({ items, onUpdate }) {
  const handleUpdateQuantity = async (id, newQuantity) => {
    await updateItem(id, { quantity: newQuantity });
    onUpdate(); //Refresh List
  };
  const handleDelete = async (id) => {
    await deleteItem(id);
    onUpdate();
  };
  console.log(items)
    return (   <div>
      <h2>Current Inventory</h2>
      {items.length === 0 ? (
        <p>No items in Inventory</p> ) : (
          <ul>
          {items.map((item) => (
            <li key={item.id}>
              <strong>{item.name}</strong> - {item.quantity} {item.unit}
              <button
                onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
              >
                -
              </button>
              <button
                onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
              >
                +
              </button>
              <button onClick={() => handleDelete(item.id)}>Delete</button>{" "}
            </li>
          ))}
        </ul>
        )}
    </div>
  );
}
