import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { addItem } from '../../store/slices/shoppingListSlice';
import { useAppDispatch } from '../../store/store';
import { validateItemName, validateQuantity } from '../../utils/validation';
import { Button } from '../UI/Button';
import { Input } from '../UI/Input';

interface AddItemFormProps {
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
}

export const AddItemForm: React.FC<AddItemFormProps> = ({ onSuccess, onError }) => {
  const dispatch = useAppDispatch();
  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState('1');

  const handleAddItem = () => {
    const nameValidation = validateItemName(itemName);
    if (!nameValidation.valid) {
      onError(nameValidation.error!);
      return;
    }

    const quantity = parseInt(itemQuantity, 10);
    const quantityValidation = validateQuantity(quantity);
    if (!quantityValidation.valid) {
      onError(quantityValidation.error!);
      return;
    }

    dispatch(addItem({
      name: itemName.trim(),
      quantity,
      purchased: false,
    }));

    setItemName('');
    setItemQuantity('1');
    onSuccess('Item added successfully');
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <Input
          style={styles.nameInput}
          placeholder="Item name"
          value={itemName}
          onChangeText={setItemName}
          accessibilityLabel="Item name input"
        />
        <Input
          style={styles.quantityInput}
          placeholder="Qty"
          value={itemQuantity}
          onChangeText={setItemQuantity}
          keyboardType="number-pad"
          accessibilityLabel="Item quantity input"
        />
      </View>
      <Button
        title="Add Item"
        onPress={handleAddItem}
        variant="primary"
        accessibilityLabel="Add item button"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  inputRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12,
  },
  nameInput: {
    flex: 1,
  },
  quantityInput: {
    width: 80,
  },
});