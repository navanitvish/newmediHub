// File: src/features/cart/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  total: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, type } = action.payload;
      const existingItemIndex = state.items.findIndex(
        item => item.id === id && item.type === type
      );

      if (existingItemIndex >= 0) {
        state.items[existingItemIndex].quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      
      // Recalculate total
      state.total = state.items.reduce(
        (total, item) => total + (item.price * item.quantity), 
        0
      );
    },
    removeFromCart: (state, action) => {
      const { id, type } = action.payload;
      state.items = state.items.filter(
        item => !(item.id === id && item.type === type)
      );
      
      // Recalculate total
      state.total = state.items.reduce(
        (total, item) => total + (item.price * item.quantity), 
        0
      );
    },
    updateQuantity: (state, action) => {
      const { id, type, quantity } = action.payload;
      const itemIndex = state.items.findIndex(
        item => item.id === id && item.type === type
      );
      
      if (itemIndex >= 0) {
        state.items[itemIndex].quantity = quantity;
      }
      
      // Recalculate total
      state.total = state.items.reduce(
        (total, item) => total + (item.price * item.quantity), 
        0
      );
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    }
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectCartTotal = (state) => state.cart.total;
export const selectCartItemsCount = (state) => state.cart.items.length;

export default cartSlice.reducer;