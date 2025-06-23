// app/layout.tsx
import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'ScanGo - ระบบเช็คอิน',
  description: 'ยกระดับการบริหารจัดการผู้เยี่ยมชมด้วยระบบ QR Code อัตโนมัติ',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body className="bg-[#0A0B1A] text-white font-sans antialiased">
        {/* Navigation Bar */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0B1A]/80 backdrop-blur-xl border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                    <path d="M3 3h8v8H3V3zm2 2v4h4V5H5zM3 13h8v8H3v-8zm2 2v4h4v-4H5zM13 3h8v8h-8V3zm2 2v4h4V5h-4zM15 13h2v2h-2v-2zM13 15h2v2h-2v-2zM15 17h2v2h-2v-2zM17 15h2v2h-2v-2zM19 13h2v2h-2v-2zM21 15h2v2h-2v-2zM19 17h2v2h-2v-2zM21 19h2v2h-2v-2zM17 19h2v2h-2v-2zM13 17h2v2h-2v-2zM15 19h2v2h-2v-2zM13 19h2v2h-2v-2zM13 21h2v2h-2v-2z"/>
                  </svg>
                </div>
                <span className="text-white text-xl sm:text-2xl font-bold">ScanGo</span>
              </Link>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button className="text-white p-2 hover:bg-white/10 rounded-lg transition-all duration-200">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                  </svg>
                </button>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                <Link href="/" className="text-white font-medium hover:text-blue-400 transition-colors">
                  หน้าแรก
                </Link>
                <Link href="/register" className="text-white/70 hover:text-white transition-colors">
                  ลงทะเบียน
                </Link>
                <Link href="/history/today" className="text-white/70 hover:text-white transition-colors">
                  ประวัติการลงทะเบียน
                </Link>
              </div>

              {/* Action buttons */}
              <div className="hidden md:flex items-center space-x-4">
                <button className="text-white/70 hover:text-white transition-all duration-200">
                  เข้าสู่ระบบ
                </button>
                <Link href="/register" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl font-medium">
                  ลงทะเบียน
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content - ปรับ padding-top ให้เหมาะสม */}
        <main className="pt-16">
          {children}
        </main>
      </body>
    </html>
  );
}