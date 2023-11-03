import { createSlice } from "@reduxjs/toolkit";

const itemSlice = createSlice({
  name: "item",
  initialState: {
    items: [],
    editItem: {},
    isPremium: false,
  },
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
    setEditItem(state, action) {
      state.editItem = action.payload;
    },
    addItem(state, action) {
        state.items.push(action.payload);
    },

    removeItem(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateItem(state, action) {
      const index = state.items.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload };
      }
    },
    premiumHandler(state, action){
      state.isPremium= action.payload;
    }
  },
});
export const { setItems, setEditItem, addItem, removeItem, updateItem , premiumHandler} =
  itemSlice.actions;
export default itemSlice.reducer;