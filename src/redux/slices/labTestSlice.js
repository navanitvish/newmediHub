// File: src/redux/slices/labTestSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Helper functions for localStorage
const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify({
      items: state.items,
      totalAmount: state.totalAmount,
      totalItems: state.totalItems
    });
    localStorage.setItem('labTestCart', serializedState);
  } catch (error) {
    console.error('Error saving lab test cart to localStorage:', error);
  }
};

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('labTestCart');
    if (serializedState === null) {
      return {
        items: [],
        totalAmount: 0,
        totalItems: 0
      };
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error('Error loading lab test cart from localStorage:', error);
    return {
      items: [],
      totalAmount: 0,
      totalItems: 0
    };
  }
};

// Load initial state from localStorage
const initialState = loadFromLocalStorage();

const labTestSlice = createSlice({
  name: 'labTests',
  initialState,
  reducers: {
    addLabTest: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1, type: 'labtest' });
      }
      state.totalItems += 1;
      state.totalAmount += action.payload.price;
      
      // Save to localStorage after state update
      saveToLocalStorage(state);
    },
    removeLabTest: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        state.totalItems -= existingItem.quantity;
        state.totalAmount -= existingItem.price * existingItem.quantity;
        state.items = state.items.filter(item => item.id !== action.payload.id);
      }
      
      // Save to localStorage after state update
      saveToLocalStorage(state);
    },
    updateLabTestQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      if (existingItem && quantity > 0) {
        const oldQuantity = existingItem.quantity;
        existingItem.quantity = quantity;
        state.totalItems += (quantity - oldQuantity);
        state.totalAmount += existingItem.price * (quantity - oldQuantity);
      }
      
      // Save to localStorage after state update
      saveToLocalStorage(state);
    },
    decreaseLabTestQuantity: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        if (existingItem.quantity === 1) {
          state.totalItems -= 1;
          state.totalAmount -= existingItem.price;
          state.items = state.items.filter(item => item.id !== action.payload.id);
        } else {
          existingItem.quantity -= 1;
          state.totalItems -= 1;
          state.totalAmount -= existingItem.price;
        }
      }
      
      // Save to localStorage after state update
      saveToLocalStorage(state);
    },
    increaseLabTestQuantity: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
        state.totalItems += 1;
        state.totalAmount += existingItem.price;
      }
      
      // Save to localStorage after state update
      saveToLocalStorage(state);
    },
    clearLabTests: (state) => {
      state.items = [];
      state.totalAmount = 0;
      state.totalItems = 0;
      
      // Clear localStorage as well
      try {
        localStorage.removeItem('labTestCart');
      } catch (error) {
        console.error('Error clearing lab test cart from localStorage:', error);
      }
    },
    // New action to manually sync with localStorage (optional)
    syncWithLocalStorage: (state) => {
      const savedState = loadFromLocalStorage();
      state.items = savedState.items;
      state.totalAmount = savedState.totalAmount;
      state.totalItems = savedState.totalItems;
    }
  }
});

export const {
  addLabTest,
  removeLabTest,
  updateLabTestQuantity,
  decreaseLabTestQuantity,
  increaseLabTestQuantity,
  clearLabTests,
  syncWithLocalStorage
} = labTestSlice.actions;

// Selectors
export const selectLabTestItems = (state) => state.labTests.items;
export const selectLabTestTotalQuantity = (state) => state.labTests.totalItems;
export const selectLabTestTotalAmount = (state) => state.labTests.totalAmount;

export default labTestSlice.reducer;