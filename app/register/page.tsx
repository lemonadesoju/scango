// app/register/page.tsx
'use client';

import Link from 'next/link';

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-[#0A0B1A] py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            ลงทะเบียนผู้เยี่ยมชม
          </h1>
          <p className="text-gray-400 text-lg">
            กรอกข้อมูลเพื่อเริ่มต้นการลงทะเบียน
          </p>
        </div>

        {/* Form */}
        <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-gray-800">
          <form className="space-y-6">
            {/* ชื่อ-นามสกุล */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  ชื่อ
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#6C63FF] transition-colors"
                  placeholder="ชื่อจริง"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  นามสกุล
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#6C63FF] transition-colors"
                  placeholder="นามสกุล"
                />
              </div>
            </div>

            {/* เลขบัตรประชาชน */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                เลขบัตรประจำตัวประชาชน
              </label>
              <input
                type="text"
                maxLength={13}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#6C63FF] transition-colors"
                placeholder="x-xxxx-xxxxx-xx-x"
              />
            </div>

            {/* เบอร์โทรศัพท์ */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                เบอร์โทรศัพท์
              </label>
              <input
                type="tel"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#6C63FF] transition-colors"
                placeholder="0xx-xxx-xxxx"
              />
            </div>

            {/* วัตถุประสงค์ */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                วัตถุประสงค์ในการเข้าพบ
              </label>
              <select className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#6C63FF] transition-colors">
                <option value="">เลือกวัตถุประสงค์</option>
                <option value="business">ติดต่อธุรกิจ</option>
                <option value="delivery">ส่งของ/เอกสาร</option>
                <option value="meeting">ประชุม/สัมมนา</option>
                <option value="visit">เยี่ยมชม</option>
                <option value="other">อื่นๆ</option>
              </select>
            </div>

            {/* ผู้ที่ต้องการพบ */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                บุคคล/แผนกที่ต้องการติดต่อ
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#6C63FF] transition-colors"
                placeholder="ชื่อบุคคลหรือแผนก"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-[#6C63FF] to-blue-600 hover:from-[#5A52E6] hover:to-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
              >
                บันทึกข้อมูล
              </button>
              <Link
                href="/"
                className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 text-center"
              >
                ยกเลิก
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}