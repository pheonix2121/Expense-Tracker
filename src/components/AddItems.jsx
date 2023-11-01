import React, { useContext, useState, useEffect } from "react";
import ItemContext from "../store/ItemContext";
const AddItem = () => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const itemCtx = useContext(ItemContext);

  useEffect(() => {
    if (itemCtx.editItem.id) {
      setAmount(itemCtx.editItem.amount);
      setCategory(itemCtx.editItem.category);
      setDescription(itemCtx.editItem.description);
    }
  }, [itemCtx.editItem]);


  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (amount.trim() === "" || description.trim() === "" || category === "") {
      alert("Please fill in all fields.");
      return;
    }

    const newItem = {
      
      amount: +amount,
      description,
      category,
    };

    if (itemCtx.editItem.id) {
      itemCtx.editItemHandler(itemCtx.editItem.id, newItem);
    } else {
      itemCtx.addItem(newItem);
    }
    setAmount("");
    setDescription("");
    setCategory("");
  };

  return (
    <div>
      <h2>Add Item</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="amount">Spent Amount</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={handleAmountChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            value={category}
            onChange={handleCategoryChange}
          >
            <option value="">Select category</option>
            <option value="Food">Food</option>
            <option value="Petrol">Petrol</option>
            <option value="Clothing">Clothing</option>
          </select>
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddItem;