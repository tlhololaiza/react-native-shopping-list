export const validateItemName = (name: string): { valid: boolean; error?: string } => {
  if (!name || name.trim().length === 0) {
    return { valid: false, error: 'Item name is required' };
  }
  if (name.trim().length < 2) {
    return { valid: false, error: 'Item name must be at least 2 characters' };
  }
  if (name.length > 50) {
    return { valid: false, error: 'Item name must be less than 50 characters' };
  }
  return { valid: true };
};

export const validateQuantity = (quantity: number): { valid: boolean; error?: string } => {
  if (quantity < 1) {
    return { valid: false, error: 'Quantity must be at least 1' };
  }
  if (quantity > 999) {
    return { valid: false, error: 'Quantity must be less than 1000' };
  }
  if (!Number.isInteger(quantity)) {
    return { valid: false, error: 'Quantity must be a whole number' };
  }
  return { valid: true };
};