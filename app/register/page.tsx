'use client';

import React, { useState } from 'react';
import Image from 'next/image';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    idNumber: '',
    dob: '',
    phone: '',
    gender: '',
    age: '',
    visitDateTime: '',
    duration: '',
    purpose: '',
    contactPerson: '',
    items: '',
    acceptTerms: false,
  });

  const [citizenImage, setCitizenImage] = useState<File | null>(null);
  const [additionalDocs, setAdditionalDocs] = useState<File | null>(null);
  const [visitorPhoto, setVisitorPhoto] = useState<File | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age.toString();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    let updatedFormData = {
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    };

    // Auto-calculate age when date of birth changes
    if (name === 'dob' && value) {
      updatedFormData.age = calculateAge(value);
    }

    setFormData(updatedFormData);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setter: Function) => {
    if (e.target.files && e.target.files[0]) {
      setter(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Send data to Supabase and get QR
    setQrCodeUrl('/fake-qr.png'); // Replace with actual QR code logic
  };

  const glassContainerStyle = {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  };

  const glassCardStyle = {
    background: 'rgba(255, 255, 255, 0.08)',
    backdropFilter: 'blur(15px)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
  };

  const glassInputStyle = {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(8px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    color: 'white',
  };

  const glassHeaderStyle = {
    background: 'rgba(28, 70, 136, 0.8)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#031028' }}>
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-4" style={{
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            }}>
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 3h8v8H3V3zm2 2v4h4V5H5zM3 13h8v8H3v-8zm2 2v4h4v-4H5zM13 3h8v8h-8V3zm2 2v4h4V5h-4zM15 13h2v2h-2v-2zM13 15h2v2h-2v-2zM15 17h2v2h-2v-2zM17 15h2v2h-2v-2zM19 13h2v2h-2v-2zM21 15h2v2h-2v-2zM19 17h2v2h-2v-2zM21 19h2v2h-2v-2zM17 19h2v2h-2v-2zM13 17h2v2h-2v-2zM15 19h2v2h-2v-2zM13 19h2v2h-2v-2zM13 21h2v2h-2v-2z"/>
              </svg>
            </div>
            <span className="text-white text-xl font-bold">ScanGo</span>
          </div>
          
          {/* Menu Button */}
          <button className="w-10 h-10 flex items-center justify-center text-white hover:bg-white hover:bg-opacity-10 rounded-lg transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>
      
      {/* Main Content */}
      <div className="pt-24 pb-8 px-4">
        <div className="max-w-4xl mx-auto">

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ข้อมูลส่วนตัว */}
          <div className="rounded-lg shadow-md overflow-hidden" style={glassContainerStyle}>
            <div className="px-6 py-4" style={glassHeaderStyle}>
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                ข้อมูลส่วนตัว
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-1">
                    ชื่อ-นามสกุล *
                  </label>
                  <input
                    name="fullName"
                    placeholder="กรอกชื่อ-นามสกุล"
                    className="w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none placeholder-gray-300"
                    style={glassInputStyle}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white mb-1">
                    เลขบัตรประชาชน/หนังสือเดินทาง *
                  </label>
                  <input
                    name="idNumber"
                    placeholder="กรอกเลขบัตรประชาชน"
                    className="w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none placeholder-gray-300"
                    style={glassInputStyle}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-1">
                    วันเกิด *
                  </label>
                  <input
                    name="dob"
                    type="date"
                    max={new Date().toISOString().split('T')[0]}
                    className="w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    style={glassInputStyle}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-1">
                    เบอร์โทรศัพท์ *
                  </label>
                  <input
                    name="phone"
                    placeholder="กรอกเบอร์โทรศัพท์"
                    className="w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none placeholder-gray-300"
                    style={glassInputStyle}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-1">
                    เพศ *
                  </label>
                  <select
                    name="gender"
                    className="w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    style={glassInputStyle}
                    onChange={handleChange}
                    required
                  >
                    <option value="" style={{ backgroundColor: '#031028' }}>เลือกเพศ</option>
                    <option value="ชาย" style={{ backgroundColor: '#031028' }}>ชาย</option>
                    <option value="หญิง" style={{ backgroundColor: '#031028' }}>หญิง</option>
                    <option value="อื่น ๆ" style={{ backgroundColor: '#031028' }}>อื่น ๆ</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-1">
                    อายุ *
                  </label>
                  <input
                    name="age"
                    type="number"
                    placeholder="อายุจะคำนวณอัตโนมัติ"
                    value={formData.age}
                    className="w-full p-3 rounded-lg focus:outline-none placeholder-gray-300"
                    style={{
                      ...glassInputStyle,
                      background: 'rgba(255, 255, 255, 0.05)',
                    }}
                    onChange={handleChange}
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ข้อมูลการเยี่ยมชม */}
          <div className="rounded-lg shadow-md overflow-hidden" style={glassContainerStyle}>
            <div className="px-6 py-4" style={glassHeaderStyle}>
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                ข้อมูลการเยี่ยมชม
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-1">
                    วันที่และเวลาที่จะเยี่ยมชม *
                  </label>
                  <input
                    name="visitDateTime"
                    type="datetime-local"
                    className="w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    style={glassInputStyle}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-1">
                    ระยะเวลาที่จะอยู่ *
                  </label>
                  <input
                    name="duration"
                    placeholder="เช่น 2 ชั่วโมง"
                    className="w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none placeholder-gray-300"
                    style={glassInputStyle}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-white mb-1">
                    วัตถุประสงค์ในการเข้า *
                  </label>
                  <textarea
                    name="purpose"
                    placeholder="อธิบายวัตถุประสงค์ในการเข้าพบ"
                    rows={3}
                    className="w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none placeholder-gray-300 resize-none"
                    style={glassInputStyle}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-1">
                    ชื่อผู้ที่ต้องการเข้าพบ *
                  </label>
                  <input
                    name="contactPerson"
                    placeholder="กรอกชื่อผู้ที่ต้องการพบ"
                    className="w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none placeholder-gray-300"
                    style={glassInputStyle}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-1">
                    รายละเอียดอุปกรณ์หรือสิ่งของ
                  </label>
                  <textarea
                    name="items"
                    placeholder="ระบุอุปกรณ์หรือสิ่งของที่นำเข้า (ถ้ามี)"
                    rows={2}
                    className="w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none placeholder-gray-300 resize-none"
                    style={glassInputStyle}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* การอัปโหลดไฟล์ */}
          <div className="rounded-lg shadow-md overflow-hidden" style={glassContainerStyle}>
            <div className="px-6 py-4" style={glassHeaderStyle}>
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                การอัปโหลดเอกสาร
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="p-4 rounded-lg" style={glassCardStyle}>
                  <label className="block text-sm font-medium text-white mb-2">
                    อัปโหลดภาพบัตรประชาชน/หนังสือเดินทาง *
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={(e) => handleFileChange(e, setCitizenImage)}
                    className="w-full p-2 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                    }}
                    required
                  />
                  <p className="text-xs text-gray-300 mt-1">
                    รองรับไฟล์รูปภาพ (JPG, PNG) ขนาดไม่เกิน 5MB
                  </p>
                </div>

                <div className="p-4 rounded-lg" style={glassCardStyle}>
                  <label className="block text-sm font-medium text-white mb-2">
                    แนบรูปเอกสารเพิ่มเติม (ถ้ามี)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={(e) => handleFileChange(e, setAdditionalDocs)}
                    className="w-full p-2 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                    }}
                  />
                  <p className="text-xs text-gray-300 mt-1">
                    เอกสารสำคัญอื่นๆ ที่เกี่ยวข้อง
                  </p>
                </div>

                <div className="p-4 rounded-lg" style={glassCardStyle}>
                  <label className="block text-sm font-medium text-white mb-2">
                    ถ่ายภาพหน้าผู้เยี่ยมชม *
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    capture="user"
                    onChange={(e) => handleFileChange(e, setVisitorPhoto)}
                    className="w-full p-2 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                    }}
                    required
                  />
                  <p className="text-xs text-gray-300 mt-1">
                    กล้องหน้าจะเปิดขึ้นเพื่อถ่ายภาพ
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* เงื่อนไขและการส่ง */}
          <div className="p-6">
            <div className="text-white flex items-start space-x-3 mb-8">
              <input
                type="checkbox"
                name="acceptTerms"
                onChange={handleChange}
                className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                required
              />
              <label className="text-sm text-white">
                ข้าพเจ้ายอมรับเงื่อนไขการเข้า-ออกสถานที่ และให้ความยินยอมในการเก็บรวบรวม ใช้ และเปิดเผยข้อมูลส่วนบุคคลตามวัตถุประสงค์ที่ระบุไว้ *
              </label>
            </div>

            <button
              type="submit"
              className="w-full text-white font-semibold py-3 px-6 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
              style={{ backgroundColor: '#2D68C4' }}
            >
              ลงทะเบียนผู้เยี่ยมชม
            </button>
          </div>
        </form>

        {/* QR Code Display */}
        {qrCodeUrl && (
          <div className="rounded-lg shadow-md p-6 mt-6 text-center" style={glassContainerStyle}>
            <h2 className="text-2xl font-semibold text-white mb-4">
              ลงทะเบียนสำเร็จ!
            </h2>
            <div className="p-6 rounded-lg mb-4" style={glassCardStyle}>
              <Image src={qrCodeUrl} alt="QR Code" width={200} height={200} className="mx-auto" />
            </div>
            <p className="text-gray-300 mb-4">
              กรุณาแสดง QR Code นี้ที่จุดตรวจ เพื่อเข้าสู่พื้นที่
            </p>
            <div className="flex gap-4 justify-center">
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition duration-200">
                พิมพ์ QR Code
              </button>
              <button className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition duration-200">
                บันทึก QR Code
              </button>
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}