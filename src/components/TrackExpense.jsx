import React from "react";
import Items from "./Items";

const TrackExpense = (props) => {
  const totalAmount = props.items.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div>
      <h1>All Expenses</h1>
      <div>
        {props.items.map((item) => {
          return <Items key={item.id} item={item} />;
        })}
      </div>
      <p>Total Amount: {totalAmount}</p>
    </div>
  );
};

export default TrackExpense;