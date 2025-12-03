import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ShoppingItem as ShoppingItemType } from '../../store/types';

interface ShoppingItemProps {
  item: ShoppingItemType;
  onToggle: (id: string) => void;
  onEdit?: (item: ShoppingItemType) => void;
  onDelete: (id: string) => void;
}

export const ShoppingItem: React.FC<ShoppingItemProps> = ({
  item,
  onToggle,
  onEdit,
  onDelete,
}) => {
  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.checkbox}
        onPress={() => onToggle(item.id)}
        accessibilityLabel={`Mark ${item.name} as ${item.purchased ? 'not purchased' : 'purchased'}`}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: item.purchased }}
      >
        {item.purchased ? (
          <Image
            source={require('../../assets/icons/shopping-bag.png')}
            style={styles.checkboxImage}
            accessibilityLabel="Purchased"
          />
        ) : null}
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={[styles.name, item.purchased && styles.purchasedText]}>
          {item.name}
        </Text>
        <Text style={styles.quantity}>Quantity: {item.quantity}</Text>
      </View>

      <View style={styles.actions}>
        {onEdit && (
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => onEdit(item)}
            accessibilityLabel={`Edit ${item.name}`}
            accessibilityRole="button"
          >
            <Image
              source={require('../../assets/icons/pen.png')}
              style={styles.actionIconImage}
              accessibilityLabel={`Edit ${item.name}`}
            />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => onDelete(item.id)}
          accessibilityLabel={`Delete ${item.name}`}
          accessibilityRole="button"
        >
          <Image
            source={require('../../assets/icons/bin.png')}
            style={styles.actionIconImage}
            accessibilityLabel={`Delete ${item.name}`}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#007AFF',
    borderRadius: 6,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxInner: {
    width: 14,
    height: 14,
    backgroundColor: '#007AFF',
    borderRadius: 3,
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  purchasedText: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  quantity: {
    fontSize: 14,
    color: '#666',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  deleteButton: {
    backgroundColor: '#ffebee',
  },
  actionIcon: {
    fontSize: 18,
  },
  actionIconImage: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
  checkboxImage: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
});