import React, { useContext } from "react";
import ItemContext from "../store/ItemContext";
const TrackExpense = () => {
  const { items, removeItem, takeEditItem } = useContext(ItemContext);

  const handleRemoveItem = (itemId) => {
    removeItem(itemId);
  };
  const handleEditItem = (item) => {
    takeEditItem(item);
  };


  const totalAmount = items.reduce((total, item) => total + item.amount, 0);

  console.log(items)

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
            <button onClick={() => handleEditItem(item)}>Edit</button>
          </div>
        ))}
      </div>
      <p>Total Amount: {totalAmount}</p>
    </div>
  );
};

export default TrackExpense;