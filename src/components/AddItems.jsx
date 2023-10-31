import React, { useState } from "react";

const AddItem = (props) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

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
      id: Math.random().toString(),
      amount: +amount,
      description,
      category,
    };

    props.onAddItem(newItem);

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
          <select id="category" value={category} onChange={handleCategoryChange}>
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