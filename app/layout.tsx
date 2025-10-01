import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'PDFMarkdown – Lightning-Fast PDF to Markdown Converter | Free & Secure',
  description:
    'Convert PDF files to Markdown instantly with PDFMarkdown. 100% browser-based, completely secure, and blazing fast. No uploads required - your files never leave your device. Free forever.',
  keywords: [
    'PDFMarkdown',
    'PDF to Markdown converter',
    'PDF converter free',
    'Markdown converter',
    'browser-based PDF tool',
    'secure PDF conversion',
    'privacy PDF tool',
    'open source PDF converter',
    'PDF to MD',
    'convert PDF to markdown',
    'markdown export',
    'no upload PDF converter',
    'offline PDF tool',
    'extract PDF text',
    'PDF to text converter',
    'PDF to markdown online free',
    'PDF to markdown secure',
    'PDF to markdown browser',
    'lightning fast PDF converter',
  ],
  authors: [{ name: 'PDFMarkdown Team' }],
  creator: 'PDFMarkdown',
  publisher: 'PDFMarkdown',
  applicationName: 'PDFMarkdown - PDF to Markdown Converter',
  category: 'Utilities',
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://pdfmarkdown.com/',
  },
  openGraph: {
    title: 'PDFMarkdown – Lightning-Fast PDF to Markdown Converter',
    description:
      'Convert PDF files to Markdown instantly with PDFMarkdown. 100% browser-based, completely secure, and blazing fast. No uploads required - your files never leave your device.',
    url: 'https://pdfmarkdown.com/',
    siteName: 'PDFMarkdown',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'PDFMarkdown - PDF to Markdown Converter',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PDFMarkdown – Lightning-Fast PDF to Markdown Converter',
    description:
      'Convert PDF files to Markdown instantly with PDFMarkdown. 100% browser-based, completely secure, and blazing fast. No uploads required.',
    images: ['/og.png'],
    creator: '@pdfmarkdown',
    site: '@pdfmarkdown',
  },
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📄</text></svg>',
    shortcut: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📄</text></svg>',
    apple: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📄</text></svg>',
  },
  metadataBase: new URL('https://pdfmarkdown.com'),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
