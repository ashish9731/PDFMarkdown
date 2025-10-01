"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Upload, File, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"

// Import the DocumentLoader dynamically to avoid SSR issues
import dynamic from "next/dynamic"

// This component will only be loaded in the browser
const DocumentLoader = dynamic(() => import("@/components/document-loader"), { ssr: false })

interface FileUploaderProps {
  onConversionComplete: (result: { markdown: string; json?: any }, file: File) => void
  isConverting: boolean
  setIsConverting: (isConverting: boolean) => void
}

export function FileUploader({ onConversionComplete, isConverting, setIsConverting }: FileUploaderProps) {
  const [dragActive, setDragActive] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [documentLoaderLoaded, setDocumentLoaderLoaded] = useState(false)
  const [progress, setProgress] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  // Reset progress when starting a new conversion
  useEffect(() => {
    if (isConverting) {
      setProgress(0)
      const interval = setInterval(() => {
        setProgress((prev) => {
          // Simulate progress up to 90% (the last 10% will be set when conversion completes)
          if (prev < 90) {
            return prev + 1
          }
          return prev
        })
      }, 100)

      return () => clearInterval(interval)
    }
  }, [isConverting])

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    setError(null)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      const supportedTypes = [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
        'application/msword', // .doc
        'text/plain', // .txt
        'application/rtf', // .rtf
        'text/rtf', // .rtf alternative
        'text/x-python' // .py
      ]
      
      if (supportedTypes.includes(file.type) || file.name.toLowerCase().endsWith('.pdf') || 
          file.name.toLowerCase().endsWith('.docx') || file.name.toLowerCase().endsWith('.doc') ||
          file.name.toLowerCase().endsWith('.txt') || file.name.toLowerCase().endsWith('.rtf') ||
          file.name.toLowerCase().endsWith('.py')) {
        handleFile(file)
      } else {
        setError("Please upload a supported document format: PDF, DOCX, DOC, TXT, RTF, or Python files")
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setError(null)

    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const supportedTypes = [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
        'application/msword', // .doc
        'text/plain', // .txt
        'application/rtf', // .rtf
        'text/rtf', // .rtf alternative
        'text/x-python' // .py
      ]
      
      if (supportedTypes.includes(file.type) || file.name.toLowerCase().endsWith('.pdf') || 
          file.name.toLowerCase().endsWith('.docx') || file.name.toLowerCase().endsWith('.doc') ||
          file.name.toLowerCase().endsWith('.txt') || file.name.toLowerCase().endsWith('.rtf') ||
          file.name.toLowerCase().endsWith('.py')) {
        handleFile(file)
      } else {
        setError("Please upload a supported document format: PDF, DOCX, DOC, TXT, RTF, or Python files")
      }
    }
  }

  const handleFile = (file: File) => {
    if (file.size > 50 * 1024 * 1024) {
      // 50MB limit for better support
      setError("File size exceeds 50MB limit")
      return
    }

    setSelectedFile(file)
  }

  const handleConvert = async () => {
    if (!selectedFile || !documentLoaderLoaded) return

    setIsConverting(true)
    setError(null)
  }

  return (
    <>
      {/* Hidden Document loader component that handles the actual conversion */}
      <DocumentLoader
        file={selectedFile}
        isConverting={isConverting}
        onLoad={() => setDocumentLoaderLoaded(true)}
        onConversionComplete={(result: { markdown: string; json?: any }) => {
          if (selectedFile) {
            setProgress(100)
            onConversionComplete(result, selectedFile)
            setIsConverting(false)
          }
        }}
        onError={(errorMsg: string) => {
          setError(errorMsg)
          setIsConverting(false)
        }}
      />

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card
        className={`border-2 ${
          dragActive ? "border-primary border-dashed bg-primary/5" : "border-dashed"
        } p-8 text-center`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="bg-muted rounded-full p-3">
            <Upload className="h-6 w-6" />
          </div>

          <div>
            <h3 className="text-lg font-medium mb-1">Upload your Document</h3>
            <p className="text-sm text-muted-foreground mb-2">Supports PDF, DOCX, DOC, TXT, RTF, Python - Drag and drop or click to browse</p>
            <p className="text-xs text-muted-foreground mb-4">Maximum file size: 50MB</p>

            {selectedFile && (
              <div className="flex items-center justify-center gap-2 text-sm font-medium text-primary">
                <File className="h-4 w-4" />
                {selectedFile.name}
              </div>
            )}
          </div>

          {isConverting ? (
            <div className="w-full max-w-xs">
              <Progress value={progress} className="h-2 mb-2" />
              <p className="text-xs text-muted-foreground">Converting... {progress}%</p>
            </div>
          ) : (
            <div className="flex gap-4">
              <Button onClick={() => inputRef.current?.click()} disabled={isConverting}>
                Select Document
              </Button>

              {selectedFile && documentLoaderLoaded && (
                <Button onClick={handleConvert} disabled={isConverting}>
                  Convert to Markdown
                </Button>
              )}
            </div>
          )}

          <input ref={inputRef} type="file" accept=".pdf,.docx,.doc,.txt,.rtf,.py" className="hidden" onChange={handleChange} />
        </div>
      </Card>
    </>
  )
}