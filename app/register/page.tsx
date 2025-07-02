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
      // สำหรับ idCard ให้รับเฉพาะตัวเลขและตัวอักษรภาษาอังกฤษพิมพ์ใหญ่
      if (name === 'idCard') {
        const filteredValue = value.toUpperCase().replace(/[^A-Z0-9]/g, '');
        setFormData((prev) => ({ ...prev, [name]: filteredValue }));
      } else {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
      
      if (name === 'birthDate') {
        setFormData((prev) => ({ ...prev, age: calculateAge(value).toString() }));
      }
    }
  };

  // ตรวจสอบฟิลด์ Step 1
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

  // Step indicators
  const steps = [
    { number: 1, title: 'ข้อมูลส่วนตัว', icon: '👤' },
    { number: 2, title: 'ข้อมูลการเยี่ยมชม', icon: '📋' },
    { number: 3, title: 'ยืนยันตัวตน', icon: '🔐' }
  ];

  return (
    <div className="min-h-screen bg-[#E0F4FF] py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            ลงทะเบียนผู้เยี่ยมชม
          </h1>
          <p className="text-gray-600 text-lg">
            กรุณากรอกข้อมูลให้ครบถ้วนเพื่อเข้าใช้งานระบบ
          </p>
        </div>

        {/* Step Indicators */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-4">
            {steps.map((s, index) => (
              <div key={s.number} className="flex items-center">
                <div className={`
                  flex items-center justify-center w-12 h-12 rounded-full font-semibold text-lg
                  ${step >= s.number 
                    ? 'bg-[#39A7FF] text-gray-800 ' 
                    : 'bg-[#87C4FF] text-gray-400 '
                  }
                  transition-all duration-300
                `}>
                  {s.icon}
                </div>
                <div className="hidden sm:block ml-3">
                  <p className={`text-sm font-medium ${step >= s.number ? 'text-gray-700' : 'text-gray-500'}`}>
                    ขั้นตอนที่ {s.number}
                  </p>
                  <p className={`text-xs ${step >= s.number ? 'text-gray-700' : 'text-gray-500'}`}>
                    {s.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`
                    hidden sm:block w-24 h-0.5 ml-4
                    ${step > s.number ? 'bg-[#39A7FF]' : 'bg-[#87C4FF]'}
                    transition-all duration-300
                  `} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-white overflow-hidden">
          <div className="bg-[#39A7FF] px-8 py-6">
            <h2 className="text-2xl font-semibold text-white flex items-center gap-3">
              {step === 1 && (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  บันทึกข้อมูลส่วนตัว
                </>
              )}
              {step === 2 && (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 11H3v10h10V11h-4zm0 0V3h10v10H9z"></path>
                  </svg>
                  ข้อมูลเกี่ยวกับการเยี่ยมชม
                </>
              )}
              {step === 3 && (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                    <line x1="12" y1="19" x2="12" y2="23"></line>
                    <line x1="8" y1="23" x2="16" y2="23"></line>
                  </svg>
                  การยืนยันตัวตนและความปลอดภัย
                </>
              )}
            </h2>
            <p className="text-white/80 mt-2">
              {step === 1 && 'ข้อมูลทั้งหมดจะถูกเก็บรักษาอย่างปลอดภัย'}
              {step === 2 && 'กรุณาระบุรายละเอียดการเข้าเยี่ยมชมของคุณ'}
              {step === 3 && 'อัปโหลดเอกสารเพื่อยืนยันตัวตนของคุณ'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            {step === 1 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-800 mb-2">
                      คำนำหน้าชื่อ <span className="text-red-400">*</span>
                    </label>
                    <select
                      name="prefix"
                      value={formData.prefix}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white border border-[#39A7FF] rounded-lg text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#39A7FF] focus:border-transparent transition-all appearance-none cursor-pointer"
                    >
                      <option value="">เลือก</option>
                      <option value="นาย">นาย</option>
                      <option value="นาง">นาง</option>
                      <option value="นางสาว">นางสาว</option>
                      <option value="เด็กชาย">เด็กชาย</option>
                      <option value="เด็กหญิง">เด็กหญิง</option>
                      <option value="Mr.">Mr.</option>
                      <option value="Mrs.">Mrs.</option>
                      <option value="Miss">Miss</option>
                      <option value="Ms.">Ms.</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      ชื่อ <span className="text-red-400">*</span>
                    </label>
                    <input
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      type="text"
                      placeholder="ชื่อ"
                      required
                      className="w-full px-4 py-3 bg-white border border-[#39A7FF] rounded-lg text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-[#39A7FF] focus:border-transparent transition-all"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      นามสกุล <span className="text-red-400">*</span>
                    </label>
                    <input
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      type="text"
                      placeholder="นามสกุล"
                      required
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6C63FF] focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    เลขบัตรประชาชน / หนังสือเดินทาง <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      name="idCard"
                      value={formData.idCard}
                      onChange={handleChange}
                      type="text"
                      placeholder="X1234567890 หรือ AA1234567"
                      required
                      maxLength={13}
                      pattern="[A-Z0-9]+"
                      title="กรุณากรอกเฉพาะตัวเลขและตัวอักษรภาษาอังกฤษพิมพ์ใหญ่"
                      className="w-full px-4 py-3 pl-12 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6C63FF] focus:border-transparent transition-all uppercase"
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      <path d="M22 10v6M2 10l10-2v12L2 18V10zM12 10l10-2v12l-10-2"></path>
                      <path d="M6 12v2M10 11v4"></path>
                    </svg>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      วันเดือนปีเกิด <span className="text-red-400">*</span>
                    </label>
                    <input
                      name="birthDate"
                      value={formData.birthDate}
                      onChange={handleChange}
                      type="date"
                      required
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6C63FF] focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      อายุ <span className="text-red-400">*</span>
                    </label>
                    <input
                      name="age"
                      value={formData.age}
                      readOnly
                      type="number"
                      placeholder="คำนวณอัตโนมัติ"
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6C63FF] focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      เบอร์โทรศัพท์ <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <input
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        type="tel"
                        placeholder="0xx-xxx-xxxx"
                        required
                        className="w-full px-4 py-3 pl-12 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6C63FF] focus:border-transparent transition-all"
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
                          value="ชาย"
                          checked={formData.gender === 'ชาย'}
                          onChange={handleChange}
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
                          value="หญิง"
                          checked={formData.gender === 'หญิง'}
                          onChange={handleChange}
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
                          value="อื่นๆ"
                          checked={formData.gender === 'อื่นๆ'}
                          onChange={handleChange}
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
              </>
            )}

            {step === 2 && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    วันที่และเวลาที่ต้องการเข้า <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      name="visitDateTime"
                      value={formData.visitDateTime}
                      onChange={handleChange}
                      type="datetime-local"
                      required
                      className="w-full px-4 py-3 pl-12 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6C63FF] focus:border-transparent transition-all"
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    ระยะเวลาที่จะอยู่ในสถานที่
                  </label>
                  <div className="relative">
                    <input
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      type="text"
                      placeholder="เช่น 2 ชั่วโมง, ครึ่งวัน (ไม่บังคับ)"
                      className="w-full px-4 py-3 pl-12 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6C63FF] focus:border-transparent transition-all"
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    วัตถุประสงค์ในการเข้าสถานที่ <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      name="purpose"
                      value={formData.purpose}
                      onChange={handleChange}
                      type="text"
                      placeholder="เช่น เข้าประชุม, ติดต่อธุรกิจ, เยี่ยมชม"
                      required
                      className="w-full px-4 py-3 pl-12 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6C63FF] focus:border-transparent transition-all"
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                      <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    ชื่อผู้ที่ต้องการเข้าพบ
                  </label>
                  <div className="relative">
                    <input
                      name="meetPerson"
                      value={formData.meetPerson}
                      onChange={handleChange}
                      type="text"
                      placeholder="ชื่อ-นามสกุล (ไม่บังคับ)"
                      className="w-full px-4 py-3 pl-12 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6C63FF] focus:border-transparent transition-all"
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="8.5" cy="7" r="4"></circle>
                      <line x1="20" y1="8" x2="20" y2="14"></line>
                      <line x1="23" y1="11" x2="17" y2="11"></line>
                    </svg>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    รายละเอียดอุปกรณ์หรือสิ่งของที่นำเข้า
                  </label>
                  <div className="relative">
                    <textarea
                      name="equipment"
                      value={formData.equipment}
                      onChange={handleChange}
                      placeholder="เช่น คอมพิวเตอร์ 1 เครื่อง, กล้องถ่ายรูป (ไม่บังคับ)"
                      rows={3}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6C63FF] focus:border-transparent transition-all resize-none"
                    />
                  </div>
                </div>
              </>
            )}

{step === 3 && (
              <>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      อัปโหลดภาพบัตรประชาชน/หนังสือเดินทาง <span className="text-red-400">*</span>
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-lg hover:border-gray-500 transition-colors">
                      <div className="space-y-1 text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-400">
                          <label
                            htmlFor="idCardFile"
                            className="relative cursor-pointer bg-gray-800 rounded-md font-medium text-[#6C63FF] hover:text-[#5A52E6] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#6C63FF] px-3 py-2"
                          >
                            <span>อัปโหลดไฟล์</span>
                            <input
                              id="idCardFile"
                              name="idCardFile"
                              type="file"
                              accept="image/*"
                              onChange={handleChange}
                              required
                              className="sr-only"
                            />
                          </label>
                          <p className="pl-3 py-2">หรือลากไฟล์มาวาง</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF สูงสุด 10MB</p>
                        {formData.idCardFile && (
                          <p className="text-sm text-green-400 mt-2">
                            ✓ {formData.idCardFile.name}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      แนบเอกสารเพิ่มเติม
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-lg hover:border-gray-500 transition-colors">
                      <div className="space-y-1 text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-400">
                          <label
                            htmlFor="additionalFile"
                            className="relative cursor-pointer bg-gray-800 rounded-md font-medium text-[#6C63FF] hover:text-[#5A52E6] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#6C63FF] px-3 py-2"
                          >
                            <span>อัปโหลดไฟล์</span>
                            <input
                              id="additionalFile"
                              name="additionalFile"
                              type="file"
                              accept="image/*"
                              onChange={handleChange}
                              className="sr-only"
                            />
                          </label>
                          <p className="pl-3 py-2">หรือลากไฟล์มาวาง</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF สูงสุด 10MB (ไม่บังคับ)</p>
                        {formData.additionalFile && (
                          <p className="text-sm text-green-400 mt-2">
                            ✓ {formData.additionalFile.name}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      อัปโหลดรูปถ่ายหน้าผู้เยี่ยมชม (กล้องรปภ.) <span className="text-red-400">*</span>
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-lg hover:border-gray-500 transition-colors">
                      <div className="space-y-1 text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                          <circle cx="12" cy="13" r="4"></circle>
                        </svg>
                        <div className="flex text-sm text-gray-400">
                          <label
                            htmlFor="visitorPhoto"
                            className="relative cursor-pointer bg-gray-800 rounded-md font-medium text-[#6C63FF] hover:text-[#5A52E6] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#6C63FF] px-3 py-2"
                          >
                            <span>อัปโหลดรูปถ่าย</span>
                            <input
                              id="visitorPhoto"
                              name="visitorPhoto"
                              type="file"
                              accept="image/*"
                              onChange={handleChange}
                              required
                              className="sr-only"
                            />
                          </label>
                          <p className="pl-3 py-2">หรือลากไฟล์มาวาง</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG สูงสุด 10MB</p>
                        {formData.visitorPhoto && (
                          <p className="text-sm text-green-400 mt-2">
                            ✓ {formData.visitorPhoto.name}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        name="acceptTerms"
                        type="checkbox"
                        checked={formData.acceptTerms}
                        onChange={handleChange}
                        required
                        className="mt-1 w-5 h-5 text-[#6C63FF] bg-gray-700 border-gray-600 rounded focus:ring-[#6C63FF] focus:ring-2"
                      />
                      <div>
                        <span className="text-white font-medium">
                          ผู้เยี่ยมชมยอมรับเงื่อนไขการเข้า-ออกสถานที่
                        </span>
                        <p className="text-sm text-gray-400 mt-1">
                          ข้าพเจ้าได้อ่านและยอมรับเงื่อนไขการเข้า-ออกสถานที่ รวมถึงนโยบายความเป็นส่วนตัวและข้อกำหนดการใช้งานทั้งหมด
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
              </>
            )}

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              {step > 1 && (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-4 px-6 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                  <span>ก่อนหน้า</span>
                </button>
              )}
              {step < 3 && (
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex-1 bg-gradient-to-r from-[#6C63FF] to-blue-600 hover:from-[#5A52E6] hover:to-blue-700 text-white py-4 px-6 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <span>ถัดไป</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              )}
              {step === 3 && (
                <button
                  type="submit"
                  className={`flex-1 py-4 px-6 rounded-xl font-medium transition-all duration-300 transform flex items-center justify-center gap-2 ${
                    formData.acceptTerms 
                      ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white hover:scale-105' 
                      : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  }`}
                  disabled={!formData.acceptTerms}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 11l3 3L22 4"></path>
                    <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"></path>
                  </svg>
                  <span>บันทึกข้อมูล</span>
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}