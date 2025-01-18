import React, { useState } from 'react';
import CustomerForm from './CustomerForm';
import OrderForm from './OrderForm';
import InvoiceGenerator from './InvoiceGenerator';
import DataTable from './DataTable';

export interface Customer {
  id: number;
  name: string;
  email: string;
}

export interface Order {
  id: number;
  customerId: number;
  product: string;
  quantity: number;
  price: number;
}

const App: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);

  const addCustomer = (customer: Omit<Customer, 'id'>) => {
    const newCustomer = { ...customer, id: Date.now() };
    setCustomers([...customers, newCustomer]);
  };

  const updateCustomer = (updatedCustomer: Customer) => {
    setCustomers(customers.map(c => c.id === updatedCustomer.id ? updatedCustomer : c));
    setEditingCustomer(null);
  };

  const deleteCustomer = (id: number) => {
    setCustomers(customers.filter(c => c.id !== id));
  };

  const addOrder = (order: Omit<Order, 'id'>) => {
    const newOrder = { ...order, id: Date.now() };
    setOrders([...orders, newOrder]);
  };

  const updateOrder = (updatedOrder: Order) => {
    setOrders(orders.map(o => o.id === updatedOrder.id ? updatedOrder : o));
    setEditingOrder(null);
  };

  const deleteOrder = (id: number) => {
    setOrders(orders.filter(o => o.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">BillEase</h1>
      
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Customers</h2>
        <CustomerForm 
          onSubmit={(customer) => editingCustomer ? updateCustomer(customer as Customer) : addCustomer(customer as Omit<Customer, 'id'>)} 
          initialData={editingCustomer}
        />
        <DataTable
          data={customers}
          columns={['name', 'email']}
          onEdit={setEditingCustomer}
          onDelete={deleteCustomer}
        />
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Orders</h2>
        <OrderForm 
          onSubmit={editingOrder ? updateOrder : addOrder} 
          initialData={editingOrder}
          customers={customers}
        />
        <DataTable
          data={orders}
          columns={['customerId', 'product', 'quantity', 'price']}
          onEdit={setEditingOrder}
          onDelete={deleteOrder}
        />
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-2">Generate Invoice</h2>
        <InvoiceGenerator customers={customers} orders={orders} />
      </div>
    </div>
  );
};

export default App;

