import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemHandler, editItemHandler } from "../store/ItemApi";
import { addItem, updateItem } from "../store/ItemRedux";
import classes from "./AddItem.module.css"
const AddItem = () => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const dispatch = useDispatch();
  const editItem = useSelector((state) => state.item.editItem);
  const authData = useSelector( state => state.auth);
  const modifiedEmail = authData.userEmail.replace(/[@.]/g, "-");

  useEffect(() => {
    if (editItem.id) {
      setAmount(editItem.amount);
      setCategory(editItem.category);
      setDescription(editItem.description);
    }
  }, [editItem]);



  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (amount.trim() === "" || description.trim() === "" || category === "") {
      alert("Please fill in all fields.");
      return;
    }

    const newItem = {
      
      amount: amount,
      description,
      category,
    };

    if (editItem.id) {
      const res = await editItemHandler({
        userEmail: modifiedEmail, itemId: editItem.id, updatedItem:newItem
      })
      dispatch(updateItem(res));  

    } else {
     const res = await addItemHandler({
      userEmail: modifiedEmail, 
      newItem: newItem
    })
      dispatch(addItem(res));
    }
    setAmount("");
    setDescription("");
    setCategory("");
  };

  return (
    <div className={classes.item}>
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