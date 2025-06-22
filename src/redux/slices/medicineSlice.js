// File: src/redux/slices/medicineSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Helper functions for localStorage
const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify({
      items: state.items,
      totalAmount: state.totalAmount,
      totalItems: state.totalItems
    });
    localStorage.setItem('medicineCart', serializedState);
  } catch (error) {
    console.error('Error saving medicine cart to localStorage:', error);
  }
};

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('medicineCart');
    if (serializedState === null) {
      return {
        items: [],
        totalAmount: 0,
        totalItems: 0
      };
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error('Error loading medicine cart from localStorage:', error);
    return {
      items: [],
      totalAmount: 0,
      totalItems: 0
    };
  }
};

// Load initial state from localStorage
const initialState = loadFromLocalStorage();

const medicineSlice = createSlice({
  name: 'medicines',
  initialState,
  reducers: {
    addMedicine: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1, type: 'medicine' });
      }
      state.totalItems += 1;
      state.totalAmount += action.payload.price;
      
      // Save to localStorage after state update
      saveToLocalStorage(state);
    },
    removeMedicine: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        state.totalItems -= existingItem.quantity;
        state.totalAmount -= existingItem.price * existingItem.quantity;
        state.items = state.items.filter(item => item.id !== action.payload.id);
      }
      
      // Save to localStorage after state update
      saveToLocalStorage(state);
    },
    updateMedicineQuantity: (state, action) => {
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
    decreaseMedicineQuantity: (state, action) => {
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
    increaseMedicineQuantity: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
        state.totalItems += 1;
        state.totalAmount += existingItem.price;
      }
      
      // Save to localStorage after state update
      saveToLocalStorage(state);
    },
    clearMedicines: (state) => {
      state.items = [];
      state.totalAmount = 0;
      state.totalItems = 0;
      
      // Clear localStorage as well
      try {
        localStorage.removeItem('medicineCart');
      } catch (error) {
        console.error('Error clearing medicine cart from localStorage:', error);
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
  addMedicine,
  removeMedicine,
  updateMedicineQuantity,
  decreaseMedicineQuantity,
  increaseMedicineQuantity,
  clearMedicines,
  syncWithLocalStorage
} = medicineSlice.actions;

// Selectors
export const selectMedicineItems = (state) => state.medicines.items;
export const selectMedicineTotalQuantity = (state) => state.medicines.totalItems;
export const selectMedicineTotalAmount = (state) => state.medicines.totalAmount;

export default medicineSlice.reducer;