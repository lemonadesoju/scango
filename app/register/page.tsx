//app/register/page.tsx
'use client'

import { useState } from 'react'
import { supabase } from '@/utils/db'
import { generateQrUrl } from '@/utils/generateQr'
import Image from 'next/image'

export default function RegisterPage() {
  const [form, setForm] = useState({
    full_name: '',
    id_number: '',
    phone: '',
    birth_date: '',
    gender: '',
    purpose: '',
    contact_person: '',
    duration: '',
    items: '',
  })

  const [qrImage, setQrImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { data, error } = await supabase
      .from('visitors')
      .insert([{ ...form }])
      .select()
      .single()

    if (error) {
      alert('บันทึกข้อมูลล้มเหลว: ' + error.message)
      setLoading(false)
      return
    }

    const qr = await generateQrUrl(data.id)
    setQrImage(qr)
    setLoading(false)
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">ลงทะเบียนผู้เยี่ยมชม</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="full_name" placeholder="ชื่อ-นามสกุล" className="input" onChange={handleChange} required />
        <input name="id_number" placeholder="เลขบัตรประชาชน / หนังสือเดินทาง" className="input" onChange={handleChange} required />
        <input name="phone" placeholder="เบอร์โทร" className="input" onChange={handleChange} required />
        <input name="birth_date" type="date" className="input" name="birth_date" onChange={handleChange} required />
        <select name="gender" className="input" onChange={handleChange} required>
          <option value="">เพศ</option>
          <option value="ชาย">ชาย</option>
          <option value="หญิง">หญิง</option>
        </select>
        <input name="purpose" placeholder="วัตถุประสงค์ในการเข้า" className="input" onChange={handleChange} required />
        <input name="contact_person" placeholder="ชื่อผู้ที่ต้องการเข้าพบ" className="input" onChange={handleChange} required />
        <input name="duration" placeholder="ระยะเวลาที่อยู่ในสถานที่" className="input" onChange={handleChange} required />
        <input name="items" placeholder="อุปกรณ์ที่นำเข้า (ถ้ามี)" className="input" onChange={handleChange} />

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>
          {loading ? 'กำลังสร้าง QR...' : 'ลงทะเบียน'}
        </button>
      </form>

      {qrImage && (
        <div className="mt-6 text-center">
          <p className="mb-2">QR Code สำหรับเช็คอิน:</p>
          <Image src={qrImage} alt="QR Code" width={200} height={200} />
        </div>
      )}

      <style jsx>{`
        .input {
          width: 100%;
          padding: 0.5rem;
          border: 1px solid #ccc;
          border-radius: 0.5rem;
        }
      `}</style>
    </div>
  )
}
