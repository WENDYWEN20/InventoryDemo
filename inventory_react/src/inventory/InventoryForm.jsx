import React, { useState } from "react";
import { createItem } from "./api";

export default function InventoryForm({ onAddItem }) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('submit')
    if (!name || !quantity || !unit) return;
    await createItem({ name, quantity: Number(quantity), unit });
    setName("");
    setQuantity("");
    setUnit("");
    onAddItem();
  };

  return ( <div>
      <form onSubmit={handleSubmit}>
      <div>
        <label>Name: </label>
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label> Quantity: </label>
        <input value={quantity} onChange={(e) => setQuantity(e.target.value)} />
      </div>
      <div>
        <label>Unit: </label>
        <input value={unit} onChange={(e) => setUnit(e.target.value)} />
      </div>
      <button type="submit">Add Item </button>
      </form>
    </div>
  );
}
