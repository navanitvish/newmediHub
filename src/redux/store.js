// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import cartReducer from './slices/cartSlice';
import cartsReducer from './slices/MediSlice';
import productReducer from './slices/productsSlice';
const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    mcart: cartsReducer,
    products:productReducer,
    
    // Add more reducers here
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;