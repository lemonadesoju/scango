// app/visitor/checkout/[visitorId]/page.tsx
'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

export default function VisitorCheckoutPage() {
  const { visitorId } = useParams()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')

  useEffect(() => {
    async function checkout() {
      try {
        const res = await fetch('/api/visitor/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ visitorId }),
        })

        if (res.ok) {
          setStatus('success')
        } else {
          setStatus('error')
        }
      } catch (err) {
        setStatus('error')
      }
    }

    if (visitorId) checkout()
  }, [visitorId])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold text-gray-800">เช็คเอาท์ผู้เยี่ยมชม</h1>
        {status === 'loading' && <p>กำลังบันทึกข้อมูล...</p>}
        {status === 'success' && <p className="text-green-600">✅ เช็คเอาท์สำเร็จ</p>}
        {status === 'error' && <p className="text-red-600">❌ เกิดข้อผิดพลาด กรุณาลองใหม่</p>}
      </div>
    </div>
  )
}
