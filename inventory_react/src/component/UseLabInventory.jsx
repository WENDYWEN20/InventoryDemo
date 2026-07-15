import React from "react";
import { useState, useEffect } from "react";
export default function useLabInventory(apiUrl = "/api/items") {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //Fetch items on Mount
  useEffect(() => {
    let isCancelled = false;
    async function fetchItems() {
      try {
        setLoading(true);
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Failed to Fetch inventory items");
        }
        const data = await response.json();
        if (!isCancelled) {
          setItems(data);
          setError(null);
        }
      } catch (error) {
        if (!isCancelled) {
          setError(error.message);
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    }
    fetchItems();
    return () => {
      isCancelled = true;
    };
  }, [apiUrl]);
  async function addItem(newItem) {
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      });
      const createdItem = await response.json();
      setItems((prev) => [...prev, createdItem]);
    } catch (error) {
      setError(error.message);
    }
  }
  async function updateItem() {
    try {
      const response = await fetch(`${apiUrl}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      const updatedData = await response.json();
      setItems((prev) =>
        prev.map((item) => (item.id === id ? updatedData : item))
      );
    } catch (error) {
      setError(error.message);
    }
  }
  //delete item
  async function deleteItem(id) {
    try {
      await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      setError(error.message);
    }
  }

  return {
    items,
    loading,
    error,
    addItem,
    updateItem,
    deleteItem,
  };
}
