// File: src/redux/slices/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const calculateTotals = (items) => {
  let totalQuantity = 0;
  let totalAmount = 0;
  
  items.forEach((item) => {
    totalQuantity += item.quantity;
    totalAmount += item.price * item.quantity;
  });
  
  return { totalQuantity, totalAmount };
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(
        (item) => item.id === newItem.id && item.type === newItem.type
      );
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...newItem, quantity: 1 });
      }
      
      const totals = calculateTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalAmount = totals.totalAmount;
    },
    
    removeFromCart: (state, action) => {
      const { id, type } = action.payload;
      state.items = state.items.filter(
        (item) => !(item.id === id && item.type === type)
      );
      
      const totals = calculateTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalAmount = totals.totalAmount;
    },
    
    increaseQuantity: (state, action) => {
      const { id, type } = action.payload;
      const item = state.items.find(
        (item) => item.id === id && item.type === type
      );
      
      if (item) {
        item.quantity += 1;
      }
      
      const totals = calculateTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalAmount = totals.totalAmount;
    },
    
    decreaseQuantity: (state, action) => {
      const { id, type } = action.payload;
      const item = state.items.find(
        (item) => item.id === id && item.type === type
      );
      
      if (item) {
        if (item.quantity === 1) {
          state.items = state.items.filter(
            (item) => !(item.id === id && item.type === type)
          );
        } else {
          item.quantity -= 1;
        }
      }
      
      const totals = calculateTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalAmount = totals.totalAmount;
    },
    
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },
  },
});

export const { 
  addToCart, 
  removeFromCart, 
  increaseQuantity, 
  decreaseQuantity, 
  clearCart 
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectCartTotalQuantity = (state) => state.cart.totalQuantity;
export const selectCartTotalAmount = (state) => state.cart.totalAmount;

export default cartSlice.reducer;