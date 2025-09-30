import React, { useState, useEffect, useMemo } from 'react';

interface DatePickerProps {
  value: string; // YYYY-MM-DD
  onChange: (value: string) => void;
  startYear: number;
  endYear: number;
}

const DatePicker: React.FC<DatePickerProps> = ({ value, onChange, startYear, endYear }) => {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  // Effect để đồng bộ hóa trạng thái nội bộ với prop `value` từ bên ngoài.
  // Chạy khi component được tải, khi chỉnh sửa khách hàng, hoặc khi form được reset.
  useEffect(() => {
    if (value && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
      const [y, m, d] = value.split('-');
      setYear(y);
      setMonth(String(parseInt(m, 10)));
      setDay(String(parseInt(d, 10)));
    } else {
      setDay('');
      setMonth('');
      setYear('');
    }
  }, [value]);

  // Effect để gửi thông báo cho component cha mỗi khi người dùng thay đổi một phần của ngày.
  // Logic được tập trung ở đây để tránh race condition.
  useEffect(() => {
    // Chỉ xử lý khi người dùng đã chọn cả ba phần
    if (year && month && day) {
      const numYear = parseInt(year, 10);
      const numMonth = parseInt(month, 10);
      const numDay = parseInt(day, 10);

      // Xác thực ngày hợp lệ cho tháng và năm đã chọn
      const daysInMonth = new Date(numYear, numMonth, 0).getDate();
      if (numDay > daysInMonth) {
        // Nếu ngày không hợp lệ (ví dụ: 31/04), tự động sửa lại ngày trong trạng thái nội bộ.
        // Thao tác này sẽ kích hoạt lại effect này với ngày đã được sửa.
        setDay(String(daysInMonth));
      } else {
        // Nếu ngày hợp lệ, tạo chuỗi định dạng YYYY-MM-DD
        const formattedMonth = String(numMonth).padStart(2, '0');
        const formattedDay = String(numDay).padStart(2, '0');
        const finalDate = `${numYear}-${formattedMonth}-${formattedDay}`;

        // Chỉ gọi onChange nếu ngày tháng cuối cùng khác với prop `value` để tránh vòng lặp vô tận.
        if (finalDate !== value) {
          onChange(finalDate);
        }
      }
    } else {
      // Nếu một trong các phần bị thiếu, ngày tháng chưa hoàn chỉnh.
      // Gửi chuỗi rỗng cho cha, nhưng chỉ khi giá trị hiện tại chưa phải là rỗng.
      if (value !== '') {
        onChange('');
      }
    }
  // Chú ý: Cố ý không thêm `value` và `onChange` vào mảng phụ thuộc.
  // Effect này CHỈ NÊN chạy khi trạng thái nội bộ (do người dùng thay đổi) được cập nhật.
  }, [day, month, year]);

  const years = useMemo(() => Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i), [startYear, endYear]);
  const months = useMemo(() => Array.from({ length: 12 }, (_, i) => i + 1), []);
  const days = useMemo(() => {
    const numDays = (year && month) ? new Date(parseInt(year, 10), parseInt(month, 10), 0).getDate() : 31;
    return Array.from({ length: numDays }, (_, i) => i + 1);
  }, [year, month]);

  return (
    <div className="flex space-x-2">
      <select
        value={day}
        onChange={(e) => setDay(e.target.value)}
        className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        aria-label="Day"
      >
        <option value="">Ngày</option>
        {days.map(d => <option key={d} value={d}>{d}</option>)}
      </select>
      <select
        value={month}
        onChange={(e) => setMonth(e.target.value)}
        className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        aria-label="Month"
      >
        <option value="">Tháng</option>
        {months.map(m => <option key={m} value={m}>{`Tháng ${m}`}</option>)}
      </select>
      <select
        value={year}
        onChange={(e) => setYear(e.target.value)}
        className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        aria-label="Year"
      >
        <option value="">Năm</option>
        {years.map(y => <option key={y} value={y}>{y}</option>)}
      </select>
    </div>
  );
};

export default DatePicker;
