import React from "react";
import AddItem from "./AddItems";
import TrackExpense from "./TrackExpense";

const ExpenseTracker = () => {
  

  return (
    <div>
      <h1>Expense Tracker</h1>
      <AddItem />
      <TrackExpense />
    </div>
  );
};

export default ExpenseTracker;