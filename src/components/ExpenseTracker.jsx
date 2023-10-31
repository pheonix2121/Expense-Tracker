import React, { useState } from "react";
import AddItem from "./AddItems";
import TrackExpense from "./TrackExpense";

const ExpenseTracker = () => {
  const [items, setItems] = useState([]);

  const addItemHandler = (newItem) => {
    setItems((prevItems) => [...prevItems, newItem]);
  };

  return (
    <div>
      <h1>Expense Tracker</h1>
      <AddItem onAddItem={addItemHandler} />
      <TrackExpense items={items} />
    </div>
  );
};

export default ExpenseTracker;