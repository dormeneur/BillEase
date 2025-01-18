import React, { useState } from 'react';
import { Customer, Order } from './App';

interface InvoiceGeneratorProps {
  customers: Customer[];
  orders: Order[];
}

const InvoiceGenerator: React.FC<InvoiceGeneratorProps> = ({ customers, orders }) => {
  const [selectedCustomerId, setSelectedCustomerId] = useState('');

  const generateInvoice = () => {
    const customer = customers.find((c) => c.id === parseInt(selectedCustomerId));
    const customerOrders = orders.filter((o) => o.customerId === parseInt(selectedCustomerId));

    if (!customer || customerOrders.length === 0) {
      alert('No orders found for this customer');
      return;
    }

    const total = customerOrders.reduce((sum, order) => sum + order.quantity * order.price, 0);

    const invoiceContent = `
Invoice for ${customer.name}

${customerOrders.map((order) => `
Product: ${order.product}
Quantity: ${order.quantity}
Price: $${order.price.toFixed(2)}
Subtotal: $${(order.quantity * order.price).toFixed(2)}
`).join('\n')}

Total: $${total.toFixed(2)}
    `;

    const blob = new Blob([invoiceContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `invoice_${customer.name}_${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <select
        value={selectedCustomerId}
        onChange={(e) => setSelectedCustomerId(e.target.value)}
        className="mr-2 p-2 border rounded"
      >
        <option value="">Select Customer</option>
        {customers.map((customer) => (
          <option key={customer.id} value={customer.id}>
            {customer.name}
          </option>
        ))}
      </select>
      <button
        onClick={generateInvoice}
        disabled={!selectedCustomerId}
        className="p-2 bg-green-500 text-white rounded disabled:bg-gray-400"
      >
        Generate Invoice
      </button>
    </div>
  );
};

export default InvoiceGenerator;

