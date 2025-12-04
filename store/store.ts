import AsyncStorage from '@react-native-async-storage/async-storage';
import { ShoppingItem } from '../store/types';

const STORAGE_KEY = '@shopping_list_items';

export const StorageService = {
  async saveItems(items: ShoppingItem[]): Promise<void> {
    try {
      const jsonValue = JSON.stringify(items);
      await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
    } catch (e) {
      console.error('Error saving items:', e);
      throw new Error('Failed to save items');
    }
  },

  async loadItems(): Promise<ShoppingItem[]> {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
      console.error('Error loading items:', e);
      return [];
    }
  },

  async clearItems(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error('Error clearing items:', e);
      throw new Error('Failed to clear items');
    }
  },
};