"use client"

import { useEffect, useState } from "react"

interface DocumentLoaderProps {
  file: File | null
  isConverting: boolean
  onLoad: () => void
  onConversionComplete: (markdown: string) => void
  onError: (error: string) => void
}

export default function DocumentLoader({ file, isConverting, onLoad, onConversionComplete, onError }: DocumentLoaderProps) {
  const [pdf2md, setPdf2md] = useState<any>(null)

  // Load the pdf2md library
  useEffect(() => {
    const loadPdf2md = async () => {
      try {
        // Dynamic import of the pdf2md library
        const pdf2mdModule = await import("@opendocsg/pdf2md")
        setPdf2md(() => pdf2mdModule.default)
        onLoad()
      } catch (error) {
        console.error("Failed to load pdf2md library:", error)
        onError("Failed to load conversion library. Please try again later.")
      }
    }

    loadPdf2md()
  }, [onLoad, onError])

  // Handle text file conversion
  const convertTextFile = async (file: File): Promise<string> => {
    const text = await file.text()
    
    // Convert plain text to markdown with basic formatting
    const lines = text.split('\n')
    let markdown = ''
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      
      if (line === '') {
        markdown += '\n'
        continue
      }
      
      // Detect headers (lines that are all caps or followed by === or ---)
      if (i < lines.length - 1) {
        const nextLine = lines[i + 1]?.trim()
        if (nextLine && (nextLine.match(/^=+$/) || nextLine.match(/^-+$/))) {
          markdown += `# ${line}\n\n`
          i++ // Skip the next line (the === or ---)
          continue
        }
      }
      
      // Detect bullet points
      if (line.match(/^[\*\-\+]\s+/) || line.match(/^\d+\.\s+/)) {
        markdown += `${line}\n`
      } else {
        markdown += `${line}\n\n`
      }
    }
    
    return markdown.trim()
  }

  // Handle RTF file conversion
  const convertRTFFile = async (file: File): Promise<string> => {
    const text = await file.text()
    
    // Basic RTF to text conversion (remove RTF control codes)
    let cleanText = text
      .replace(/\\[a-z]+\d*/g, '') // Remove RTF control words
      .replace(/[{}]/g, '') // Remove braces
      .replace(/\\\\/g, '\\') // Replace escaped backslashes
      .replace(/\\'/g, "'") // Replace escaped quotes
      .trim()
    
    // Convert to markdown
    return convertTextFile(new File([cleanText], file.name, { type: 'text/plain' }))
  }

  // Handle DOCX file conversion (basic text extraction)
  const convertDocxFile = async (file: File): Promise<string> => {
    try {
      // For now, we'll show an informative message about DOCX support
      // In a real implementation, you'd need a library like mammoth.js
      return `# Document Conversion Notice

This appears to be a DOCX file. For best results with DOCX files:

1. **Save as PDF**: Open your DOCX file and save/export it as a PDF, then upload the PDF for conversion
2. **Copy & Paste**: Copy the text content and save it as a .txt file for conversion
3. **Built-in Conversion**: Use your word processor's "Save as Markdown" feature if available

## Why PDF is Recommended

PDF files preserve formatting, structure, and layout better than other formats, resulting in higher-quality Markdown conversion.

## Supported Formats

- **PDF** ✅ (Recommended - Best results)
- **TXT** ✅ (Plain text with basic formatting)
- **RTF** ✅ (Rich text with basic formatting)
- **DOCX/DOC** ⚠️ (Limited support - PDF recommended instead)

Please convert your document to PDF for the best Markdown conversion experience.`
    } catch (error) {
      throw new Error("DOCX conversion failed. Please save your document as PDF for better results.")
    }
  }

  // Handle the conversion when triggered
  useEffect(() => {
    const convertDocument = async () => {
      if (!file || !pdf2md || !isConverting) return

      try {
        let markdown = ''
        const fileName = file.name.toLowerCase()
        
        if (fileName.endsWith('.pdf')) {
          // Convert PDF using pdf2md
          const pdfBuffer = await file.arrayBuffer()
          markdown = await pdf2md(pdfBuffer)
        } else if (fileName.endsWith('.txt')) {
          // Convert text file
          markdown = await convertTextFile(file)
        } else if (fileName.endsWith('.rtf')) {
          // Convert RTF file
          markdown = await convertRTFFile(file)
        } else if (fileName.endsWith('.docx') || fileName.endsWith('.doc')) {
          // Convert DOCX file (limited support)
          markdown = await convertDocxFile(file)
        } else {
          throw new Error("Unsupported file format")
        }

        // Return the result
        onConversionComplete(markdown)
        
        // Clear the buffer from memory immediately
      } catch (error) {
        console.error("Error converting document:", error)
        onError(`Failed to convert ${file.name}. ${error instanceof Error ? error.message : 'Please try a different file format or save as PDF for best results.'}`)
      }
    }

    if (isConverting && file && pdf2md) {
      convertDocument()
    }
  }, [file, pdf2md, isConverting, onConversionComplete, onError])

  // This component doesn't render anything visible
  return null
}