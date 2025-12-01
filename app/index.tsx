import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { AddItemForm } from '../components/ShoppingList/AddItemForm';
import { EditItemModal } from '../components/ShoppingList/EditItemModal';
import { EmptyState } from '../components/ShoppingList/EmptyState';
import { ShoppingItem } from '../components/ShoppingList/ShoppingItem';
import { Toast } from '../components/UI/Toast';
import { useToast } from '../hooks/useToast';
import { deleteItem, loadItems, togglePurchased } from '../store/slices/shoppingListSlice';
import { store as appStore, useAppDispatch, useAppSelector } from '../store/store';
import { ShoppingItem as ShoppingItemType } from '../store/types';
import { StorageService } from '../utils/storage';

function ShoppingListScreenContent() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(state => state.shoppingList.items);
  const { toast, showToast } = useToast();
  const [editingItem, setEditingItem] = useState<ShoppingItemType | null>(null);

  useEffect(() => {
    const loadStoredItems = async () => {
      try {
        const storedItems = await StorageService.loadItems();
        dispatch(loadItems(storedItems));
      } catch {
        showToast('Failed to load items', 'error');
      }
    };
    void loadStoredItems();
  }, [dispatch, showToast]);

  useEffect(() => {
    StorageService.saveItems(items);
  }, [items]);

  const handleToggle = (id: string) => {
    dispatch(togglePurchased(id));
  };

  const handleEdit = (item: ShoppingItemType) => {
    setEditingItem(item);
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      'Delete Item',
      'Are you sure you want to delete this item?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            dispatch(deleteItem(id));
            showToast('Item deleted successfully', 'success');
          },
        },
      ]
    );
  };

  const purchasedCount = items.filter(item => item.purchased).length;
  const totalCount = items.length;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Shopping List</Text>
        <Text style={styles.headerSubtitle}>
          {purchasedCount} of {totalCount} items purchased
        </Text>
      </View>

      <AddItemForm onSuccess={showToast} onError={(msg) => showToast(msg, 'error')} />

      <ScrollView style={styles.listContainer}>
        {items.length === 0 ? (
          <EmptyState />
        ) : (
          items.map((item) => (
            <ShoppingItem
              key={item.id}
              item={item}
              onToggle={handleToggle}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        )}
      </ScrollView>

      <EditItemModal
        visible={!!editingItem}
        item={editingItem}
        onClose={() => setEditingItem(null)}
        onSuccess={showToast}
        onError={(msg) => showToast(msg, 'error')}
      />

      {toast && <Toast message={toast.message} type={toast.type} />}
    </View>
  );
}

export default function ShoppingListScreen() {
  return (
    <Provider store={appStore}>
      <ShoppingListScreenContent />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#007AFF',
    padding: 20,
    paddingTop: 60,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#fff',
    marginTop: 4,
    opacity: 0.9,
  },
  listContainer: {
    flex: 1,
    padding: 16,
  },
});