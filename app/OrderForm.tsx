import React, { useState, useEffect } from 'react';
import { Order, Customer } from './App';

interface OrderFormProps {
  onSubmit: (order: Omit<Order, 'id'> | Order) => void;
  initialData?: Order | null;
  customers: Customer[];
}

const OrderForm: React.FC<OrderFormProps> = ({ onSubmit, initialData, customers }) => {
  const [customerId, setCustomerId] = useState('');
  const [product, setProduct] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    if (initialData) {
      setCustomerId(initialData.customerId.toString());
      setProduct(initialData.product);
      setQuantity(initialData.quantity.toString());
      setPrice(initialData.price.toString());
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const orderData = {
      customerId: parseInt(customerId),
      product,
      quantity: parseInt(quantity),
      price: parseFloat(price),
    };
    onSubmit(initialData ? { ...initialData, ...orderData } : orderData);
    setCustomerId('');
    setProduct('');
    setQuantity('');
    setPrice('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <select
        value={customerId}
        onChange={(e) => setCustomerId(e.target.value)}
        required
        className="mr-2 p-2 border rounded"
      >
        <option value="">Select Customer</option>
        {customers.map((customer) => (
          <option key={customer.id} value={customer.id}>
            {customer.name}
          </option>
        ))}
      </select>
      <input
        type="text"
        value={product}
        onChange={(e) => setProduct(e.target.value)}
        placeholder="Product"
        required
        className="mr-2 p-2 border rounded"
      />
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        placeholder="Quantity"
        required
        className="mr-2 p-2 border rounded"
      />
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price"
        required
        className="mr-2 p-2 border rounded"
      />
      <button type="submit" className="p-2 bg-blue-500 text-white rounded">
        {initialData ? 'Update Order' : 'Add Order'}
      </button>
    </form>
  );
};

export default OrderForm;

