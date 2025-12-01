import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import { editItem } from '../../store/slices/shoppingListSlice';
import { useAppDispatch } from '../../store/store';
import { ShoppingItem } from '../../store/types';
import { validateItemName, validateQuantity } from '../../utils/validation';
import { Button } from '../UI/Button';
import { Input } from '../UI/Input';

interface EditItemModalProps {
  visible: boolean;
  item: ShoppingItem | null;
  onClose: () => void;
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
}

export const EditItemModal: React.FC<EditItemModalProps> = ({
  visible,
  item,
  onClose,
  onSuccess,
  onError,
}) => {
  const dispatch = useAppDispatch();
  const [editName, setEditName] = useState('');
  const [editQuantity, setEditQuantity] = useState('1');

  useEffect(() => {
    if (item) {
      setEditName(item.name);
      setEditQuantity(item.quantity.toString());
    }
  }, [item]);

  const handleSave = () => {
    if (!item) return;

    const nameValidation = validateItemName(editName);
    if (!nameValidation.valid) {
      onError(nameValidation.error!);
      return;
    }

    const quantity = parseInt(editQuantity, 10);
    const quantityValidation = validateQuantity(quantity);
    if (!quantityValidation.valid) {
      onError(quantityValidation.error!);
      return;
    }

    dispatch(editItem({
      id: item.id,
      updates: {
        name: editName.trim(),
        quantity,
      },
    }));

    onClose();
    onSuccess('Item updated successfully');
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Text style={styles.title}>Edit Item</Text>
          
          <Text style={styles.label}>Item Name</Text>
          <Input
            value={editName}
            onChangeText={setEditName}
            accessibilityLabel="Edit item name"
          />

          <Text style={styles.label}>Quantity</Text>
          <Input
            value={editQuantity}
            onChangeText={setEditQuantity}
            keyboardType="number-pad"
            accessibilityLabel="Edit item quantity"
          />

          <View style={styles.actions}>
            <View style={{ flex: 1 }}>
              <Button
                title="Cancel"
                onPress={onClose}
                variant="secondary"
                accessibilityLabel="Cancel edit"
              />
            </View>
            <View style={{ flex: 1 }}>
              <Button
                title="Save"
                onPress={handleSave}
                variant="primary"
                accessibilityLabel="Save changes"
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: '85%',
    maxWidth: 400,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
    color: '#333',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
    marginTop: 12,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
});