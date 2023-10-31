import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import AuthContext from "./AuthContext";

const ItemContext = React.createContext({
  items: [],
  addItem: (newItem) => {},
  removeItem: (itemId) => {},
});

export const ItemProvider = (props) => {
  const [items, setItems] = useState([]);
  const authCtx = useContext(AuthContext);
  const userEmail = authCtx.userEmail;

  useEffect(() => {
    if (userEmail) {
      const fetchItems = async () => {
        try {
          const response = await axios.get(
            `https://expensetrackerappm-a-r-default-rtdb.asia-southeast1.firebasedatabase.app/items/${userEmail}.json`
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

  const addItem = async (newItem) => {
    try {
      const response = await axios.post(
        `https://expensetrackerappm-a-r-default-rtdb.asia-southeast1.firebasedatabase.app/items/${userEmail}.json`,
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
        `https://expensetrackerappm-a-r-default-rtdb.asia-southeast1.firebasedatabase.app/items/${userEmail}/${itemId}.json`
      );
      setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    } catch (error) {
      console.log(error);
    }
  };

  const contextValue = {
    items: items,
    addItem: addItem,
    removeItem: removeItem,
  };

  return (
    <ItemContext.Provider value={contextValue}>
      {props.children}
    </ItemContext.Provider>
  );
};

export default ItemContext;