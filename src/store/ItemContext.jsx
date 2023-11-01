import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import AuthContext from "./AuthContext";

const ItemContext = React.createContext({
  items: [],
  addItem: (newItem) => {},
  editItem: {},
  takeEditItem: (item) => {},
  removeItem: (itemId) => {},
  editItemHandler: (itemId, updatedItem) => {},
});

export const ItemProvider = (props) => {
  const [items, setItems] = useState([]);
  const [editItem, setEditItem] = useState({})
  const authCtx = useContext(AuthContext);
  const userEmail = authCtx.userEmail;

  useEffect(() => {
    if (userEmail) {
      const fetchItems = async () => {
        try {
          const response = await axios.get(
            `https://expensetracker-aa1a1-default-rtdb.asia-southeast1.firebasedatabase.app/items/${userEmail}.json`
          );
          const loadedItems = [];
          for (const itemKey in response.data) {
            loadedItems.push({
              id: itemKey,
              ...response.data[itemKey],
            });
          }
          setItems(loadedItems);
        } catch (error) {
          console.log(error);
        }
      };

      fetchItems();
    }
  }, [userEmail]);

  const addItem = async (newItem, id) => {
    try {
      const response = await axios.post(
        `https://expensetracker-aa1a1-default-rtdb.asia-southeast1.firebasedatabase.app/items/${userEmail}.json`,
        newItem
      );
      const createdItem = { id: response.data.name, ...newItem };
      setItems((prevItems) => [...prevItems, createdItem]);
      console.log(createdItem);
    } catch (error) {
      console.log(error);
    }
  };

  const removeItem = async (itemId) => {
    try {
      await axios.delete(
        `https://expensetracker-aa1a1-default-rtdb.asia-southeast1.firebasedatabase.app/items/${userEmail}/${itemId}.json`
      );
      setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    } catch (error) {
      console.log(error);
    }
  };

  const editItemHandler = async (itemId, updatedItem) => {
    try {
      await axios.put(
        `https://expensetracker-aa1a1-default-rtdb.asia-southeast1.firebasedatabase.app/items/${userEmail}/${itemId}.json`,
        updatedItem
      );
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === itemId ? { ...item, ...updatedItem } : item
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const takeEditItemHandler = item => {
    setEditItem(item)
  }

  const contextValue = {
    items: items,
    addItem: addItem,
    editItem: editItem,
    takeEditItem: takeEditItemHandler,
    removeItem: removeItem,
    editItemHandler: editItemHandler,
  };


  return (
    <ItemContext.Provider value={contextValue}>
      {props.children}
    </ItemContext.Provider>
  );
};

export default ItemContext;