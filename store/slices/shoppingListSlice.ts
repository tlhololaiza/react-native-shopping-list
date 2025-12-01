import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ShoppingItem, ShoppingListState } from '../types';

const initialState: ShoppingListState = {
  items: [],
  loading: false,
  error: null,
};

const shoppingListSlice = createSlice({
  name: 'shoppingList',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Omit<ShoppingItem, 'id' | 'createdAt' | 'updatedAt'>>) => {
      const newItem: ShoppingItem = {
        ...action.payload,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      state.items.push(newItem);
      state.error = null;
    },
    editItem: (state, action: PayloadAction<{ id: string; updates: Partial<ShoppingItem> }>) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = {
          ...state.items[index],
          ...action.payload.updates,
          updatedAt: new Date().toISOString(),
        };
        state.error = null;
      }
    },
    deleteItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.error = null;
    },
    togglePurchased: (state, action: PayloadAction<string>) => {
      const index = state.items.findIndex(item => item.id === action.payload);
      if (index !== -1) {
        state.items[index].purchased = !state.items[index].purchased;
        state.items[index].updatedAt = new Date().toISOString();
      }
    },
    loadItems: (state, action: PayloadAction<ShoppingItem[]>) => {
      state.items = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  addItem,
  editItem,
  deleteItem,
  togglePurchased,
  loadItems,
  setLoading,
  setError,
} = shoppingListSlice.actions;

export default shoppingListSlice.reducer;