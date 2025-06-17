// utils/generateQr.ts
import QRCode from 'qrcode'

export async function generateQrUrl(visitorId: string) {
  const checkinUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/visitor/checkin/${visitorId}`
  return QRCode.toDataURL(checkinUrl)
}
