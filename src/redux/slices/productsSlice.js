// src/redux/slices/productsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [
    {
      id: 1,
      name: 'Multivitamin Tablets',
      price: 599,
      discount: 699,
      image: '/api/placeholder/200/200',
      rating: 4.8,
      reviews: 142,
      description: 'Complete daily multivitamin formula for overall health and wellbeing.',
      category: 'Vitamins',
    },
    {
      id: 2,
      name: 'Diabetes Care Kit',
      price: 1299,
      discount: 1499,
      image: '/api/placeholder/200/200',
      rating: 4.7,
      reviews: 89,
      description: 'Comprehensive kit for daily diabetes management and monitoring.',
      category: 'Healthcare',
    },
    {
      id: 3,
      name: 'Immunity Booster',
      price: 449, 
      discount: 599,
      image: '/api/placeholder/200/200',
      rating: 4.5,
      reviews: 215,
      description: 'Natural formula to enhance your immune system and protect against illness.',
      category: 'Ayurveda',
    },
    {
      id: 4,
      name: 'Protein Supplement',
      price: 1099,
      discount: 1299,
      image: '/api/placeholder/200/200',
      rating: 4.6,
      reviews: 176,
      description: 'High-quality protein supplement for muscle growth and recovery.',
      category: 'Vitamins',
    },
  ],
  status: 'idle',
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // You can add more reducers for filtering, sorting, etc.
    filterByCategory: (state, action) => {
      const category = action.payload;
      if (category !== 'All') {
        state.filteredItems = state.items.filter(item => item.category === category);
      } else {
        state.filteredItems = state.items;
      }
    },
  },
});

export const { filterByCategory } = productsSlice.actions;
export const selectAllProducts = (state) => state.products.items;
export const selectFilteredProducts = (state) => 
  state.products.filteredItems || state.products.items;

export default productsSlice.reducer;