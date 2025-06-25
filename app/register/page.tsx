// app/register/page.tsx
'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function RegisterPage() {
  const [birthDate, setBirthDate] = useState('');
  const [age, setAge] = useState('');

  // คำนวณอายุอัตโนมัติ
  const calculateAge = (dateString: string) => {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  const handleBirthDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    setBirthDate(date);
    if (date) {
      const calculatedAge = calculateAge(date);
      setAge(calculatedAge.toString());
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0B1A] py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            ลงทะเบียนผู้เยี่ยมชม
          </h1>
          <p className="text-gray-400 text-lg">
            กรุณากรอกข้อมูลให้ครบถ้วนเพื่อเข้าใช้งานระบบ
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-gray-900/50 backdrop-blur-lg rounded-3xl shadow-2xl border border-gray-800 overflow-hidden">
          {/* Section Header */}
          <div className="bg-gradient-to-r from-[#6C63FF] to-blue-600 px-8 py-6">
            <h2 className="text-2xl font-semibold text-white flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              บันทึกข้อมูลส่วนตัว
            </h2>
            <p className="text-white/80 mt-2">ข้อมูลทั้งหมดจะถูกเก็บรักษาอย่างปลอดภัย</p>
          </div>

          {/* Form Content */}
          <form className="p-8 space-y-8">
            {/* ชื่อ-นามสกุล */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  ชื่อ <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6C63FF] focus:border-transparent transition-all"
                  placeholder="ชื่อจริง"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  นามสกุล <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6C63FF] focus:border-transparent transition-all"
                  placeholder="นามสกุล"
                />
              </div>
            </div>

            {/* เลขบัตรประชาชน/หนังสือเดินทาง */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                เลขบัตรประชาชน / หนังสือเดินทาง <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 pl-12 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6C63FF] focus:border-transparent transition-all"
                  placeholder="x-xxxx-xxxxx-xx-x หรือเลขหนังสือเดินทาง"
                />
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <path d="M22 10v6M2 10l10-2v12L2 18V10zM12 10l10-2v12l-10-2"></path>
                  <path d="M6 12v2M10 11v4"></path>
                </svg>
              </div>
            </div>

            {/* วันเดือนปีเกิด และ อายุ */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  วันเดือนปีเกิด <span className="text-red-400">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={birthDate}
                  onChange={handleBirthDateChange}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6C63FF] focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  อายุ <span className="text-red-400">*</span>
                </label>
                <input
                  type="number"
                  required
                  value={age}
                  readOnly
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6C63FF] focus:border-transparent transition-all"
                  placeholder="อายุจะคำนวณอัตโนมัติ"
                />
              </div>
            </div>

            {/* เบอร์โทร และ เพศ */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  เบอร์โทรศัพท์ <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    className="w-full px-4 py-3 pl-12 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6C63FF] focus:border-transparent transition-all"
                    placeholder="0xx-xxx-xxxx"
                  />
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  เพศ <span className="text-red-400">*</span>
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <label className="relative">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      required
                      className="peer sr-only"
                    />
                    <div className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-center cursor-pointer transition-all peer-checked:bg-[#6C63FF] peer-checked:border-[#6C63FF] hover:border-gray-600">
                      <span className="text-white">ชาย</span>
                    </div>
                  </label>
                  <label className="relative">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      required
                      className="peer sr-only"
                    />
                    <div className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-center cursor-pointer transition-all peer-checked:bg-[#6C63FF] peer-checked:border-[#6C63FF] hover:border-gray-600">
                      <span className="text-white">หญิง</span>
                    </div>
                  </label>
                  <label className="relative">
                    <input
                      type="radio"
                      name="gender"
                      value="other"
                      required
                      className="peer sr-only"
                    />
                    <div className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-center cursor-pointer transition-all peer-checked:bg-[#6C63FF] peer-checked:border-[#6C63FF] hover:border-gray-600">
                      <span className="text-white">อื่นๆ</span>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* หมายเหตุ */}
            <div className="bg-blue-900/20 border border-blue-800/50 rounded-lg p-4">
              <p className="text-sm text-blue-300 flex items-start gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-shrink-0">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
                ข้อมูลที่มีเครื่องหมาย <span className="text-red-400">*</span> เป็นข้อมูลที่จำเป็นต้องกรอก
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-[#6C63FF] to-blue-600 hover:from-[#5A52E6] hover:to-blue-700 text-white py-4 px-6 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                  <polyline points="17 21 17 13 7 13 7 21"></polyline>
                  <polyline points="7 3 7 8 15 8"></polyline>
                </svg>
                บันทึกข้อมูล
              </button>
              <Link
                href="/"
                className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-4 px-6 rounded-xl font-medium transition-all duration-300 text-center flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
                ยกเลิก
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}