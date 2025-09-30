import React, { useState, useEffect } from 'react';
import { Customer } from '../types';
import { UserPlusIcon, ArrowPathIcon } from './Icons';
import DatePicker from './DatePicker';

interface CustomerFormProps {
  onSave: (customer: Omit<Customer, 'id'>) => void;
  editingCustomer: Customer | null;
  onCancelEdit: () => void;
}

const initialFormState = {
  fullName: '',
  dob: '',
  phone: '',
  hometown: '',
  lastVisit: '',
  notes: '',
};

// Define InputField outside the main component to prevent re-creation on render
const InputField = ({ label, name, value, onChange, error, placeholder, type = 'text' }: { label: string, name: keyof typeof initialFormState, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, error?: string, placeholder?: string, type?: string }) => (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-slate-700">{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`mt-1 block w-full px-3 py-2 bg-white border ${error ? 'border-red-500' : 'border-slate-300'} rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
);

const provinces = [
  "Thành phố Hà Nội",
  "Thành phố Huế",
  "Tỉnh Lai Châu",
  "Tỉnh Điện Biên",
  "Tỉnh Sơn La",
  "Tỉnh Lạng Sơn",
  "Tỉnh Quảng Ninh",
  "Tỉnh Thanh Hóa",
  "Tỉnh Nghệ An",
  "Tỉnh Hà Tĩnh",
  "Tỉnh Cao Bằng",
  "Tỉnh Tuyên Quang",
  "Tỉnh Lào Cai",
  "Tỉnh Thái Nguyên",
  "Tỉnh Bắc Ninh",
  "Tỉnh Bắc Giang",
  "Tỉnh Hải Dương",
  "Tỉnh Hưng Yên",
  "Tỉnh Nam Định",
  "Tỉnh Ninh Bình",
  "Tỉnh Thái Bình",
  "Tỉnh Hải Phòng",
  "Tỉnh Quảng Bình",
  "Tỉnh Quảng Trị",
  "Tỉnh Thừa Thiên Huế",
  "Tỉnh Đà Nẵng",
  "Tỉnh Bình Định",
  "Tỉnh Khánh Hòa",
  "Tỉnh Ninh Thuận",
  "Tỉnh Bình Thuận",
  "Tỉnh Lâm Đồng",
  "Tỉnh Đồng Nai",
  "Tỉnh Bà Rịa - Vũng Tàu",
  "Tỉnh Hậu Giang"
];

const CustomerForm: React.FC<CustomerFormProps> = ({ onSave, editingCustomer, onCancelEdit }) => {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({ fullName: '', phone: '' });

  const isEditing = !!editingCustomer;

  useEffect(() => {
    if (editingCustomer) {
      setFormData({
        fullName: editingCustomer.fullName,
        dob: editingCustomer.dob || '',
        phone: editingCustomer.phone,
        hometown: editingCustomer.hometown || '',
        lastVisit: editingCustomer.lastVisit || '',
        notes: editingCustomer.notes || '',
      });
    } else {
      setFormData(initialFormState);
    }
    setErrors({ fullName: '', phone: '' });
  }, [editingCustomer]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (name: 'dob' | 'lastVisit', value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const validate = (): boolean => {
    let isValid = true;
    const newErrors = { fullName: '', phone: '' };

    if (!formData.fullName.trim()) {
        newErrors.fullName = 'Họ và tên là bắt buộc.';
        isValid = false;
    }

    if (!formData.phone.trim()) {
        newErrors.phone = 'Số điện thoại là bắt buộc.';
        isValid = false;
    } else if (!/^\d{10,11}$/.test(formData.phone.trim())) {
        newErrors.phone = 'Số điện thoại không hợp lệ.';
        isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
        return;
    }
    onSave(formData);
    setFormData(initialFormState);
  };

  const handleCancel = () => {
    onCancelEdit();
    setFormData(initialFormState);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg sticky top-8">
      <h2 className="text-xl font-bold mb-4 text-slate-800">
        {isEditing ? 'Chỉnh sửa thông tin' : 'Thêm khách hàng mới'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField label="Họ và Tên (*)" name="fullName" value={formData.fullName} onChange={handleInputChange} error={errors.fullName} placeholder="Nguyễn Văn A" />
        <InputField label="Số điện thoại (*)" name="phone" value={formData.phone} onChange={handleInputChange} error={errors.phone} placeholder="09xxxxxxxx" />
        
        <div>
          <label className="block text-sm font-medium text-slate-700">Ngày sinh</label>
          <DatePicker 
            value={formData.dob}
            onChange={(value) => handleDateChange('dob', value)}
            startYear={1940}
            endYear={2100}
          />
        </div>
        
        <div>
          <label htmlFor="hometown" className="block text-sm font-medium text-slate-700">Quê quán</label>
          <select
            id="hometown"
            name="hometown"
            value={formData.hometown}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">-- Chọn Tỉnh/Thành --</option>
            {provinces.map(province => (
              <option key={province} value={province}>
                {province}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Ngày mua/đến cuối</label>
          <DatePicker 
            value={formData.lastVisit}
            onChange={(value) => handleDateChange('lastVisit', value)}
            startYear={1940}
            endYear={2100}
          />
        </div>

        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-slate-700">Ghi chú</label>
          <textarea
            id="notes"
            name="notes"
            rows={3}
            value={formData.notes}
            onChange={handleInputChange}
            placeholder="Khách hàng tiềm năng, sở thích..."
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          ></textarea>
        </div>
        <div className="flex items-center space-x-2 pt-2">
            <button
                type="submit"
                className={`w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${isEditing ? 'bg-green-600 hover:bg-green-700' : 'bg-indigo-600 hover:bg-indigo-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors`}
            >
                {isEditing ? <ArrowPathIcon className="h-5 w-5 mr-2" /> : <UserPlusIcon className="h-5 w-5 mr-2" />}
                {isEditing ? 'Cập nhật' : 'Lưu thông tin'}
            </button>
            {isEditing && (
                <button
                    type="button"
                    onClick={handleCancel}
                    className="w-full inline-flex justify-center px-4 py-2 border border-slate-300 text-sm font-medium rounded-md shadow-sm text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Hủy
                </button>
            )}
        </div>
      </form>
    </div>
  );
};

export default CustomerForm;