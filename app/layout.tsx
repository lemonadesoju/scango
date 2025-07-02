// app/layout.tsx
import './globals.css';
import Navbar from './components/Navbar';

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
        <Navbar />
        <main className="pt-16">
          {children}
        </main>
      </body>
    </html>
  );
}
