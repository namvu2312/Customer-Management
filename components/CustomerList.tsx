
import React from 'react';
import { Customer } from '../types';
import CustomerCard from './CustomerCard';
import { InboxIcon } from './Icons';

interface CustomerListProps {
  customers: Customer[];
  onEdit: (customer: Customer) => void;
  onDelete: (id: string) => void;
}

const CustomerList: React.FC<CustomerListProps> = ({ customers, onEdit, onDelete }) => {
  if (customers.length === 0) {
    return (
      <div className="text-center py-10 px-4">
        <InboxIcon className="mx-auto h-12 w-12 text-slate-400" />
        <h3 className="mt-2 text-sm font-medium text-slate-900">Không tìm thấy khách hàng</h3>
        <p className="mt-1 text-sm text-slate-500">Hãy thử tìm kiếm với từ khóa khác hoặc thêm khách hàng mới.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {customers.map(customer => (
        <CustomerCard
          key={customer.id}
          customer={customer}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default CustomerList;
