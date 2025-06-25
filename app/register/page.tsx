'use client';

import { useState } from 'react';

export default function RegisterPage() {
  const [step, setStep] = useState(1);

  // เก็บข้อมูลทั้งหมดใน object เดียว
  const [formData, setFormData] = useState({
    prefix: '',
    firstName: '',
    lastName: '',
    idCard: '',
    birthDate: '',
    age: '',
    phone: '',
    gender: '',
    visitDateTime: '',
    duration: '',
    purpose: '',
    meetPerson: '',
    equipment: '',
    idCardFile: null as File | null,
    additionalFile: null as File | null,
    visitorPhoto: null as File | null,
    acceptTerms: false,
  });

  // คำนวณอายุเมื่อเลือกวันเกิด
  const calculateAge = (dateString: string) => {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked, files } = e.target as any;
    if (type === 'checkbox') {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === 'file') {
      setFormData((prev) => ({ ...prev, [name]: files[0] || null }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (name === 'birthDate') {
        setFormData((prev) => ({ ...prev, age: calculateAge(value).toString() }));
      }
    }
  };

  // ตรวจสอบฟิลด์ Step 1 (ตัวอย่าง)
  const validateStep1 = () => {
    return (
      formData.prefix.trim() !== '' &&
      formData.firstName.trim() !== '' &&
      formData.lastName.trim() !== '' &&
      formData.idCard.trim() !== '' &&
      formData.birthDate.trim() !== '' &&
      formData.age.trim() !== '' &&
      formData.phone.trim() !== '' &&
      formData.gender.trim() !== ''
    );
  };

  // ตรวจสอบฟิลด์ Step 2
  const validateStep2 = () => {
    return formData.visitDateTime.trim() !== '' && formData.purpose.trim() !== '';
  };

  // ตรวจสอบฟิลด์ Step 3
  const validateStep3 = () => {
    return formData.idCardFile !== null && formData.visitorPhoto !== null && formData.acceptTerms === true;
  };

  const handleNext = () => {
    if (step === 1 && !validateStep1()) {
      alert('กรุณากรอกข้อมูลใน Step 1 ให้ครบถ้วน');
      return;
    }
    if (step === 2 && !validateStep2()) {
      alert('กรุณากรอกข้อมูลใน Step 2 ให้ครบถ้วน');
      return;
    }
    setStep((s) => s + 1);
  };

  const handlePrev = () => {
    setStep((s) => s - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep3()) {
      alert('กรุณากรอกข้อมูลใน Step 3 ให้ครบถ้วน');
      return;
    }
    // ส่งข้อมูล
    console.log('ส่งข้อมูลทั้งหมด:', formData);
    alert('ส่งข้อมูลเรียบร้อยแล้ว');
  };

  return (
    <div className="min-h-screen bg-[#0A0B1A] py-12 text-white px-4 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center">ลงทะเบียนผู้เยี่ยมชม</h1>

      <form onSubmit={handleSubmit} className="bg-gray-900/70 rounded-xl p-8 space-y-8">
        {step === 1 && (
          <>
            <h2 className="text-2xl font-semibold mb-4">ข้อมูลส่วนตัว</h2>
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
              <select
                name="prefix"
                value={formData.prefix}
                onChange={handleChange}
                required
                className="md:col-span-2 p-3 bg-gray-800 rounded"
              >
                <option value="">คำนำหน้าชื่อ *</option>
                <option value="นาย">นาย</option>
                <option value="นาง">นาง</option>
                <option value="นางสาว">นางสาว</option>
                <option value="เด็กชาย">เด็กชาย</option>
                <option value="เด็กหญิง">เด็กหญิง</option>
              </select>
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                type="text"
                placeholder="ชื่อ *"
                required
                className="md:col-span-2 p-3 bg-gray-800 rounded"
              />
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                type="text"
                placeholder="นามสกุล *"
                required
                className="md:col-span-2 p-3 bg-gray-800 rounded"
              />
            </div>

            <input
              name="idCard"
              value={formData.idCard}
              onChange={handleChange}
              type="text"
              placeholder="เลขบัตรประชาชน / หนังสือเดินทาง *"
              required
              className="w-full p-3 bg-gray-800 rounded"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                type="date"
                required
                className="p-3 bg-gray-800 rounded"
              />
              <input
                name="age"
                value={formData.age}
                readOnly
                placeholder="อายุ"
                className="p-3 bg-gray-700 rounded"
              />
            </div>

            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              type="tel"
              placeholder="เบอร์โทรศัพท์ *"
              required
              className="w-full p-3 bg-gray-800 rounded"
            />

            <div className="grid grid-cols-3 gap-4">
              {['ชาย', 'หญิง', 'อื่นๆ'].map((g) => (
                <label key={g} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="gender"
                    value={g.toLowerCase()}
                    checked={formData.gender === g.toLowerCase()}
                    onChange={handleChange}
                    required
                  />
                  {g}
                </label>
              ))}
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-2xl font-semibold mb-4">ข้อมูลเกี่ยวกับการเยี่ยมชม</h2>
            <input
              name="visitDateTime"
              value={formData.visitDateTime}
              onChange={handleChange}
              type="datetime-local"
              required
              className="w-full p-3 bg-gray-800 rounded mb-4"
              placeholder="วันที่และเวลาที่ต้องการเข้า *"
            />
            <input
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              type="text"
              placeholder="ระยะเวลาที่จะอยู่ในสถานที่ (ไม่บังคับ)"
              className="w-full p-3 bg-gray-800 rounded mb-4"
            />
            <input
              name="purpose"
              value={formData.purpose}
              onChange={handleChange}
              type="text"
              placeholder="วัตถุประสงค์ในการเข้าสถานที่ *"
              required
              className="w-full p-3 bg-gray-800 rounded mb-4"
            />
            <input
              name="meetPerson"
              value={formData.meetPerson}
              onChange={handleChange}
              type="text"
              placeholder="ชื่อผู้ที่ต้องการเข้าพบ (ไม่บังคับ)"
              className="w-full p-3 bg-gray-800 rounded mb-4"
            />
            <textarea
              name="equipment"
              value={formData.equipment}
              onChange={handleChange}
              placeholder="รายละเอียดอุปกรณ์หรือสิ่งของที่นำเข้า (ไม่บังคับ)"
              className="w-full p-3 bg-gray-800 rounded"
            />
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="text-2xl font-semibold mb-4">การยืนยันตัวตนและความปลอดภัย</h2>

            <label className="block mb-2">
              อัปโหลดภาพบัตรประชาชน/หนังสือเดินทาง (บังคับ) *
              <input
                name="idCardFile"
                type="file"
                accept="image/*"
                onChange={handleChange}
                required
                className="block mt-1 w-full text-white"
              />
            </label>

            <label className="block mb-2">
              แนบเอกสารเพิ่มเติม (ไม่บังคับ)
              <input
                name="additionalFile"
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="block mt-1 w-full text-white"
              />
            </label>

            <label className="block mb-2">
              อัปโหลดรูปถ่ายหน้าผู้เยี่ยมชม (กล้องรปภ) (บังคับ) *
              <input
                name="visitorPhoto"
                type="file"
                accept="image/*"
                onChange={handleChange}
                required
                className="block mt-1 w-full text-white"
              />
            </label>

            <label className="flex items-center gap-2 mt-4">
              <input
                name="acceptTerms"
                type="checkbox"
                checked={formData.acceptTerms}
                onChange={handleChange}
                required
              />
              <span>ผู้เยี่ยมชมยอมรับเงื่อนไขการเข้า-ออกสถานที่ที่เจ้าหน้าที่แจ้ง</span>
            </label>
          </>
        )}

        <div className="flex justify-between mt-8">
          {step > 1 && (
            <button
              type="button"
              onClick={handlePrev}
              className="bg-gray-700 px-6 py-3 rounded hover:bg-gray-600"
            >
              ก่อนหน้า
            </button>
          )}
          {step < 3 && (
            <button
              type="button"
              onClick={handleNext}
              className="bg-blue-600 px-6 py-3 rounded hover:bg-blue-700"
            >
              ถัดไป
            </button>
          )}
          {step === 3 && (
            <button
              type="submit"
              className="bg-green-600 px-6 py-3 rounded hover:bg-green-700"
              disabled={!formData.acceptTerms}
            >
              บันทึกข้อมูล
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
