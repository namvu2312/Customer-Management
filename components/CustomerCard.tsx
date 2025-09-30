import React from 'react';
import { Customer } from '../types';
import { PencilIcon, TrashIcon, CalendarDaysIcon, PhoneIcon, MapPinIcon, ShoppingBagIcon, ChatBubbleLeftIcon } from './Icons';

interface CustomerCardProps {
  customer: Customer;
  onEdit: (customer: Customer) => void;
  onDelete: (id: string) => void;
}

const CustomerCard: React.FC<CustomerCardProps> = ({ customer, onEdit, onDelete }) => {
  const InfoItem = ({ icon, label, value }: { icon: React.ReactNode, label: string, value?: string }) => {
    if (!value) return null;
    return (
      <div className="flex items-start text-sm text-slate-600">
        <div className="flex-shrink-0 w-5 h-5 text-slate-400 mr-2 mt-0.5">{icon}</div>
        <div className="flex-grow"><span className="font-semibold">{label}:</span> {value}</div>
      </div>
    );
  };
  
  const formatDate = (dateString?: string) => {
    // Kiểm tra chuỗi có đúng định dạng YYYY-MM-DD không
    if (!dateString || !/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
        return ''; // Trả về chuỗi rỗng nếu ngày không hợp lệ hoặc không có
    }
    try {
      // Tách chuỗi để tránh các vấn đề về múi giờ với new Date()
      const [year, month, day] = dateString.split('-');
      // Định dạng lại thành DD/MM/YYYY
      return `${day}/${month}/${year}`;
    } catch(e) {
      // Fallback trong trường hợp có lỗi không mong muốn
      return dateString;
    }
  }

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-bold text-indigo-700">{customer.fullName}</h3>
        </div>
        <div className="flex-shrink-0 flex items-center space-x-2">
          <button
            onClick={() => onEdit(customer)}
            className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-100 rounded-full transition-colors"
            aria-label="Sửa"
          >
            <PencilIcon className="h-5 w-5" />
          </button>
          <button
            onClick={() => onDelete(customer.id)}
            className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-100 rounded-full transition-colors"
            aria-label="Xóa"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
        <InfoItem icon={<PhoneIcon />} label="SĐT" value={customer.phone} />
        <InfoItem icon={<CalendarDaysIcon />} label="Ngày sinh" value={formatDate(customer.dob)} />
        <InfoItem icon={<MapPinIcon />} label="Quê quán" value={customer.hometown} />
        <InfoItem icon={<ShoppingBagIcon />} label="Lần cuối đến" value={formatDate(customer.lastVisit)} />
      </div>
      {customer.notes && (
         <div className="mt-4 pt-3 border-t border-slate-200">
            <InfoItem icon={<ChatBubbleLeftIcon />} label="Ghi chú" value={customer.notes} />
         </div>
      )}
    </div>
  );
};

export default CustomerCard;