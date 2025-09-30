
import React, { useState, useMemo } from 'react';
import { Customer } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import CustomerForm from './components/CustomerForm';
import CustomerList from './components/CustomerList';
import { SearchIcon, UsersIcon } from './components/Icons';

const App: React.FC = () => {
  const [customers, setCustomers] = useLocalStorage<Customer[]>('customers', []);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSaveCustomer = (customer: Omit<Customer, 'id'>) => {
    if (editingCustomer) {
      // Update existing customer
      setCustomers(prev =>
        prev.map(c => (c.id === editingCustomer.id ? { ...c, ...customer } : c))
      );
      setEditingCustomer(null);
    } else {
      // Add new customer
      const newCustomer: Customer = {
        id: new Date().getTime().toString(),
        ...customer,
      };
      setCustomers(prev => [...prev, newCustomer]);
    }
  };

  const handleDeleteCustomer = (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa khách hàng này không?')) {
      setCustomers(prev => prev.filter(c => c.id !== id));
      if (editingCustomer?.id === id) {
        setEditingCustomer(null);
      }
    }
  };

  const handleEditCustomer = (customer: Customer) => {
    setEditingCustomer(customer);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingCustomer(null);
  };

  const filteredCustomers = useMemo(() => {
    if (!searchTerm) {
      return customers;
    }
    const lowercasedTerm = searchTerm.toLowerCase();
    return customers.filter(
      customer =>
        customer.fullName.toLowerCase().includes(lowercasedTerm) ||
        customer.phone.includes(lowercasedTerm)
    );
  }, [customers, searchTerm]);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <UsersIcon className="h-8 w-8 text-indigo-600" />
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Hệ Thống Quản Lý Khách Hàng
            </h1>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <CustomerForm
              onSave={handleSaveCustomer}
              editingCustomer={editingCustomer}
              onCancelEdit={handleCancelEdit}
            />
          </div>
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4 text-slate-800">Danh sách khách hàng</h2>
              <div className="relative mb-6">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  placeholder="Tìm kiếm theo Tên hoặc Số điện thoại..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                />
              </div>
              <CustomerList
                customers={filteredCustomers}
                onEdit={handleEditCustomer}
                onDelete={handleDeleteCustomer}
              />
            </div>
          </div>
        </div>
      </main>
      <footer className="text-center py-4 text-slate-500 text-sm">
        <p>Phát triển bởi AI cho Chủ cửa hàng.</p>
      </footer>
    </div>
  );
};

export default App;
