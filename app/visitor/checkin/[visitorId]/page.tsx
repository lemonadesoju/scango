// app/visitor/checkin/[visitorId]/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '@/utils/db'

export default function VisitorCheckinPage() {
  const { visitorId } = useParams<{ visitorId: string }>()
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const checkin = async () => {
      const { error } = await supabase
        .from('visitors')
        .update({ checked_in_at: new Date().toISOString() })
        .eq('id', visitorId)

      if (error) {
        setError('ไม่สามารถเช็คอินได้')
      } else {
        setSuccess(true)
      }
    }

    if (visitorId) checkin()
  }, [visitorId])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      {success ? (
        <div className="text-green-600 text-xl font-semibold">✅ เช็คอินสำเร็จแล้ว</div>
      ) : error ? (
        <div className="text-red-600 text-xl font-semibold">❌ {error}</div>
      ) : (
        <div className="text-blue-600 text-xl">กำลังดำเนินการเช็คอิน...</div>
      )}
    </div>
  )
}
