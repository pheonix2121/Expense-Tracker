import axios from "axios";


export const fetchItems = async (userEmail) => {
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
      return loadedItems;
    } catch (error) {
      return error;
    }
  };

  export const addItemHandler = async ({userEmail, newItem}) => {

    try {
      const response = await axios.post(
        `https://expensetrackerappm-a-r-default-rtdb.asia-southeast1.firebasedatabase.app/items/${userEmail}.json`,
        newItem
      );
      return { id: response.data.name, ...newItem };

    } catch (error) {
      console.log(error);
    }
  };

  export const removeItemHandler = async ({userEmail, itemId}) => {
    try {
      await axios.delete(
        `https://expensetrackerappm-a-r-default-rtdb.asia-southeast1.firebasedatabase.app/items/${userEmail}/${itemId}.json`
      );
      return itemId;
    } catch (error) {
      console.log(error);
    }
  };

  export const editItemHandler = async ({userEmail, itemId, updatedItem}) => {
    try {
      await axios.put(
        `https://expensetrackerappm-a-r-default-rtdb.asia-southeast1.firebasedatabase.app/items/${userEmail}/${itemId}.json`,
        updatedItem
      );
      return {
        id: itemId, ...updatedItem
      }
    } catch (error) { 
      return error;
    }
  };