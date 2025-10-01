import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'PDFMarkdown – Professional PDF to Markdown Converter | Enterprise Solution',
  description:
    'Transform PDF documents into clean, structured Markdown with enterprise-grade security and performance. Trusted by professionals worldwide for document conversion.',
  keywords: [
    'PDFMarkdown',
    'professional PDF converter',
    'enterprise document conversion',
    'PDF to Markdown enterprise',
    'secure document processing',
    'professional markdown converter',
    'enterprise PDF tools',
    'document workflow automation',
    'business document conversion',
    'professional document tools',
    'secure PDF processing',
    'offline document converter',
    'enterprise markdown tools',
    'professional PDF processing',
    'business productivity tools',
  ],
  authors: [{ name: 'PDFMarkdown Professional' }],
  creator: 'PDFMarkdown',
  publisher: 'PDFMarkdown',
  applicationName: 'PDFMarkdown - Professional PDF to Markdown Converter',
  category: 'Business Productivity',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'PDFMarkdown – Professional PDF to Markdown Converter',
    description:
      'Enterprise-grade PDF to Markdown conversion with military-grade security. Transform documents instantly with professional-quality output.',
    url: 'https://pdfmarkdown.vercel.app/',
    siteName: 'PDFMarkdown Professional',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'PDFMarkdown - Professional PDF to Markdown Converter',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PDFMarkdown – Professional PDF to Markdown Converter',
    description:
      'Enterprise-grade PDF to Markdown conversion. Military-grade security, lightning-fast performance, professional output.',
    images: ['/og.png'],
  },
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📄</text></svg>',
    shortcut: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📄</text></svg>',
    apple: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📄</text></svg>',
  },
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
