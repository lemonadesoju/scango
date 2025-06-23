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
      <body className="bg-[#0A0B1A] text-white font-sans antialiased" style={{ margin: 0, padding: 0 }}>
        <nav className="container mx-auto px-4 sm:px-6 py-4 relative z-50">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <path d="M3 3h8v8H3V3zm2 2v4h4V5H5zM3 13h8v8H3v-8zm2 2v4h4v-4H5zM13 3h8v8h-8V3zm2 2v4h4V5h-4zM15 13h2v2h-2v-2zM13 15h2v2h-2v-2zM15 17h2v2h-2v-2zM17 15h2v2h-2v-2zM19 13h2v2h-2v-2zM21 15h2v2h-2v-2zM19 17h2v2h-2v-2zM21 19h2v2h-2v-2zM17 19h2v2h-2v-2zM13 17h2v2h-2v-2zM15 19h2v2h-2v-2zM13 19h2v2h-2v-2zM13 21h2v2h-2v-2z"/>
                </svg>
              </div>
              <span className="text-white text-xl sm:text-2xl font-bold">ScanGo</span>
            </Link>

            <div className="md:hidden">
              <button className="text-white p-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="relative px-4 py-2 rounded-lg transition-colors text-[#6C63FF]">
                <div className="absolute inset-0 bg-white/10 rounded-lg -z-10"></div>
                หน้าแรก
              </Link>
              <Link href="/register" className="relative px-4 py-2 rounded-lg transition-colors text-gray-300 hover:text-white">
                ลงทะเบียน
              </Link>
              <Link href="/history/today" className="relative px-4 py-2 rounded-lg transition-colors text-gray-300 hover:text-white">
                ประวัติการลงทะเบียน
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-6">
              <div className="hidden md:flex items-center space-x-4">
                <button className="text-gray-300 hover:text-white transition-colors">เข้าสู่ระบบ</button>
                <Link href="/register" className="bg-[#6C63FF] text-white px-6 py-2 rounded-lg hover:bg-[#5A52E6] transition-colors">
                  ลงทะเบียน
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <main>
          {children}
        </main>
      </body>
    </html>
  );
}