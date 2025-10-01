import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Document Converter | Convert PDF to Markdown',
  description: 'Convert PDF, DOCX, and other document formats to clean Markdown instantly. 100% secure and free to use.',
  keywords: ['document converter', 'pdf to markdown', 'docx to markdown', 'file conversion', 'secure converter'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}