'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: 'ระบบเช็คอินอัจฉริยะ',
      subtitle: 'ปลอดภัย รวดเร็ว และทันสมัย',
      description: 'เทคโนโลยี QR Code ที่ใช้งานง่าย เพื่อการจัดการผู้เยี่ยมชมที่มีประสิทธิภาพ'
    },
    {
      title: 'จัดการข้อมูลผู้เยี่ยมชม',
      subtitle: 'ครบถ้วน ปลอดภัย และเป็นระบบ',
      description: 'บันทึกข้อมูลอัตโนมัติ พร้อมระบบรักษาความปลอดภัยระดับสูง'
    },
    {
      title: 'รายงานและสถิติ',
      subtitle: 'วิเคราะห์ข้อมูลแบบเรียลไทม์',
      description: 'ติดตามสถิติการเข้าออก วิเคราะห์แนวโน้ม และจัดทำรายงานอัตโนมัติ'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0B1A]">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-transparent pointer-events-none"></div>
      
      {/* Hero Section - ลบ pt-20 ออกเพราะมี pt-16 จาก layout แล้ว */}
      <section className="min-h-screen pb-32">
        <div className="flex flex-col items-center justify-center px-4 sm:px-6 min-h-screen">
          <div className="text-center max-w-4xl z-10 w-full relative">
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-semibold text-white mb-4 sm:mb-6 leading-tight tracking-tight">
              ระบบจัดการคุณภาพ
              <div className="overflow-hidden h-12 sm:h-16 lg:h-24">
                <span className="block mt-2 text-[#6C63FF] text-4xl sm:text-5xl lg:text-7xl font-semibold">
                  ระบบเช็คอิน/เช็คเอาต์
                </span>
              </div>
              ผู้เยี่ยมชม
            </h1>
            
            <p className="text-gray-400 text-sm sm:text-base lg:text-xl mb-8">
              ยกระดับการบริหารจัดการผู้เยี่ยมชมด้วยระบบ QR Code อัตโนมัติ
            </p>
            
            {/* Search Box */}
            <div className="bg-gray-900/95 backdrop-blur-lg rounded-2xl p-6 sm:p-8 max-w-3xl mx-auto shadow-xl mb-8">
              <div className="relative">
                <div className="relative bg-gray-800 rounded-xl border border-gray-700 transition-all hover:border-[#6C63FF]/50">
                  <div className="flex items-center px-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-gray-400">
                      <circle cx="11" cy="11" r="8"></circle>
                      <path d="m21 21-4.3-4.3"></path>
                    </svg>
                    <input 
                      type="text" 
                      placeholder="ค้นหาด้วยชื่อผู้เยี่ยมชม, เลขบัตรประชาชน..." 
                      className="w-full px-3 py-4 bg-transparent text-white placeholder-gray-400 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <Link 
                href="/register"
                className="group bg-gradient-to-r from-[#6C63FF] to-blue-600 hover:from-[#5A52E6] hover:to-blue-700 text-white p-6 rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="m19 8 2 2-2 2"></path>
                      <path d="m17 10 2 2-2 2"></path>
                    </svg>
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold">ลงทะเบียนผู้เยี่ยมชม</h3>
                    <p className="text-white/80 text-sm">เริ่มต้นการลงทะเบียนใหม่</p>
                  </div>
                </div>
              </Link>

              <Link 
                href="/history/today"
                className="group bg-gray-800/50 hover:bg-gray-800/70 border border-gray-700 hover:border-[#6C63FF]/50 text-white p-6 rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#6C63FF]/20 rounded-lg flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-[#6C63FF]">
                      <path d="M3 3v5h5"></path>
                      <path d="M3 8c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10-10-4.477-10-10"></path>
                      <path d="M13 9l-2 2-2-2"></path>
                    </svg>
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold">ประวัติการเยี่ยมชม</h3>
                    <p className="text-gray-400 text-sm">ดูรายการผู้เยี่ยมชมทั้งหมด</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Image Carousel Section */}
      <section className="py-16 -mt-32">
        <div className="w-full mx-auto px-2 sm:px-4 lg:px-6">
          <div className="relative h-48 xs:h-64 sm:h-80 md:h-96 lg:h-[28rem] max-w-[90rem] mx-auto overflow-hidden rounded-xl sm:rounded-2xl bg-gray-900/80 backdrop-blur-sm border border-gray-800 shadow-xl">
            <div className="relative h-full">
              <div className="absolute flex w-[300%]" style={{ transform: `translateX(-${currentSlide * 33.333}%)`, transition: 'transform 0.5s ease-in-out' }}>
                {slides.map((slide, index) => (
                  <div key={index} className="relative w-full h-48 xs:h-64 sm:h-80 md:h-96 lg:h-[28rem]">
                    <div className="w-full h-full bg-gradient-to-br from-blue-900 via-purple-800 to-blue-900 flex items-center justify-center">
                      <div className="text-center text-white p-8">
                        <h3 className="text-2xl md:text-4xl font-bold mb-4">{slide.title}</h3>
                        <p className="text-lg md:text-xl mb-2 text-blue-200">{slide.subtitle}</p>
                        <p className="text-gray-300 max-w-2xl">{slide.description}</p>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20"></div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Navigation Buttons */}
            <div className="absolute inset-0 flex items-center justify-between p-2 sm:p-4 z-10">
              <button 
                onClick={() => setCurrentSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1)}
                className="group p-2 sm:p-3 rounded-full bg-gray-900/50 backdrop-blur-sm border border-gray-700 text-white hover:bg-gray-800/70 transition-all hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#6C63FF]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 sm:w-6 sm:h-6 group-hover:text-[#6C63FF]">
                  <path d="m15 18-6-6 6-6"></path>
                </svg>
              </button>
              <button 
                onClick={() => setCurrentSlide((currentSlide + 1) % slides.length)}
                className="group p-2 sm:p-3 rounded-full bg-gray-900/50 backdrop-blur-sm border border-gray-700 text-white hover:bg-gray-800/70 transition-all hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#6C63FF]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 sm:w-6 sm:h-6 group-hover:text-[#6C63FF]">
                  <path d="m9 18 6-6-6-6"></path>
                </svg>
              </button>
            </div>
            
            {/* Slide Indicators */}
            <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1.5 sm:gap-2 z-10">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-500 ${
                    index === currentSlide 
                      ? 'bg-[#6C63FF] w-6 sm:w-8' 
                      : 'bg-gray-400/50 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              เหตุผลที่ควรเลือก ScanGo
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              ระบบจัดการผู้เยี่ยมชมที่ทันสมัย ปลอดภัย และใช้งานง่าย
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-[#6C63FF]">
                    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
                    <path d="m9 12 2 2 4-4"></path>
                  </svg>
                ),
                title: 'ความปลอดภัยสูง',
                description: 'ระบบรักษาความปลอดภัยข้อมูลระดับธนาคาร พร้อมการเข้ารหัสแบบ End-to-End'
              },
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-[#6C63FF]">
                    <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path>
                  </svg>
                ),
                title: 'รวดเร็วทันใจ',
                description: 'สแกน QR Code ได้ในพริบตา บันทึกข้อมูลอัตโนมัติไม่เกิน 3 วินาที'
              },
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-[#6C63FF]">
                    <path d="M12 2v4"></path>
                    <path d="M12 18v4"></path>
                    <path d="M4.93 4.93l2.83 2.83"></path>
                    <path d="M16.24 16.24l2.83 2.83"></path>
                    <path d="M2 12h4"></path>
                    <path d="M18 12h4"></path>
                    <path d="M4.93 19.07l2.83-2.83"></path>
                    <path d="M16.24 7.76l2.83-2.83"></path>
                  </svg>
                ),
                title: 'ใช้งานง่าย',
                description: 'ออกแบบ UI/UX ที่เข้าใจง่าย ใช้งานได้ทุกอุปกรณ์ ไม่ต้องฝึกอบรม'
              },
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-[#6C63FF]">
                    <path d="M3 3v5h5"></path>
                    <path d="M3 8c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10-10-4.477-10-10"></path>
                    <path d="M13 9l-2 2-2-2"></path>
                  </svg>
                ),
                title: 'รายงานเรียลไทม์',
                description: 'ดูข้อมูลสถิติและรายงานได้ทันที พร้อมการส่งออกข้อมูลหลากหลายรูปแบบ'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-gray-900/90 backdrop-blur-xl p-6 rounded-xl border border-gray-800 hover:border-[#6C63FF]/50 hover:bg-gray-900/95 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-[#6C63FF]/10 group-hover:bg-[#6C63FF]/20 transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2 text-white group-hover:text-[#6C63FF] transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}