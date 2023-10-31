import React, { useContext } from "react";
import ItemContext from "../store/ItemContext";
const TrackExpense = () => {
  const { items, removeItem } = useContext(ItemContext);

  const handleRemoveItem = (itemId) => {
    removeItem(itemId);
  };

  const totalAmount = items.reduce((total, item) => total + item.amount, 0);

  return (
    <div>
      <h2>All Expenses</h2>
      <div>
        {items.map((item) => (
          <div key={item.id}>
            <h5>Rs. {item.amount}</h5>
            <p>{item.description}</p>
            <h5>{item.category}</h5>
            <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
          </div>
        ))}
      </div>
      <p>Total Amount: {totalAmount}</p>
    </div>
  );
};

export default TrackExpense;