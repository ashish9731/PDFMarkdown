"use client"

import { useState } from "react"
import { FileUploader } from "@/components/file-uploader"
import { MarkdownPreview } from "@/components/markdown-preview"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Code, ArrowRight, FileIcon, Lock, Zap } from "lucide-react"
import { FaqSection } from "@/components/faq-section"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  const [conversionResult, setConversionResult] = useState<{ markdown: string; json?: any } | null>(null)
  const [isConverting, setIsConverting] = useState(false)
  const [fileName, setFileName] = useState<string | null>(null)

  // Function to format JSON for display with truncation of long strings
  const formatJsonForDisplay = (json: any): string => {
    try {
      // Custom replacer to truncate long strings for display purposes only
      const replacer = (key: string, value: any) => {
        if (typeof value === 'string' && value.length > 1000) {
          return value.substring(0, 1000) + '... (truncated)';
        }
        return value;
      };
      return JSON.stringify(json, replacer, 2);
    } catch (error) {
      return typeof json === 'string' ? json : JSON.stringify(json, null, 2);
    }
  }

  // Function to format JSON for download (full data without truncation)
  const formatJsonForDownload = (json: any): string => {
    try {
      return JSON.stringify(json, null, 2);
    } catch (error) {
      return typeof json === 'string' ? json : JSON.stringify(json, null, 2);
    }
  }

  // Function to download content as a file
  const downloadFile = (content: string, filename: string, mimeType: string) => {
    try {
      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const element = document.createElement("a");
      element.href = url;
      element.download = filename;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
      // Fallback: copy to clipboard and show alert
      navigator.clipboard.writeText(content);
      alert(`Download failed. Content copied to clipboard instead. Check console for details.`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center py-16 md:py-24">
          <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-6">
            <Zap className="mr-2 h-4 w-4" />
            Professional Document Conversion
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-6">
            Convert Documents to Markdown & JSON
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Transform your PDFs, Word documents, text files, and Python code into clean Markdown and structured JSON data.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              className="w-full sm:w-auto"
              onClick={() => {
                document.getElementById('converter')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Start Converting
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Lock className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>100% Secure</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Your documents never leave your device. All processing happens locally in your browser.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <FileIcon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Multiple Formats</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Support for PDF, DOCX, DOC, TXT, RTF, and Python files with accurate conversion.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Markdown & JSON</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Get both clean Markdown and structured JSON data from your documents.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Converter Section */}
        <section id="converter" className="py-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Document Converter</CardTitle>
              <CardDescription>
                Upload your document and convert it to clean Markdown format and structured JSON data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FileUploader
                onConversionComplete={(result, file) => {
                  setConversionResult(result)
                  setFileName(file.name)
                }}
                isConverting={isConverting}
                setIsConverting={setIsConverting}
              />
              
              {conversionResult && (
                <div className="mt-8 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-semibold">Conversion Result</h2>
                      <p className="text-sm text-muted-foreground">
                        {fileName?.replace(/\.[^/.]+$/, "")}
                      </p>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      <Button
                        variant="outline"
                        onClick={() => {
                          navigator.clipboard.writeText(conversionResult.markdown)
                        }}
                      >
                        Copy Markdown
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          if (conversionResult.json) {
                            navigator.clipboard.writeText(formatJsonForDisplay(conversionResult.json))
                          }
                        }}
                      >
                        Copy JSON
                      </Button>
                      <Button
                        onClick={() => {
                          if (!conversionResult.markdown || !fileName) return
                          downloadFile(
                            conversionResult.markdown,
                            fileName.replace(/\.[^/.]+$/, "") + ".md",
                            "text/markdown"
                          );
                        }}
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        Download Markdown
                      </Button>
                      {conversionResult.json && (
                        <Button
                          variant="secondary"
                          onClick={() => {
                            if (!conversionResult.json || !fileName) return
                            downloadFile(
                              formatJsonForDownload(conversionResult.json),
                              fileName.replace(/\.[^/.]+$/, "") + ".json",
                              "application/json"
                            );
                          }}
                        >
                          <Code className="mr-2 h-4 w-4" />
                          Download JSON
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                    <Tabs defaultValue="preview">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="preview">Preview</TabsTrigger>
                        <TabsTrigger value="markdown">Markdown</TabsTrigger>
                        {conversionResult.json && <TabsTrigger value="json">JSON Data</TabsTrigger>}
                      </TabsList>
                      <TabsContent value="preview" className="p-4">
                        <MarkdownPreview markdown={conversionResult.markdown} />
                      </TabsContent>
                      <TabsContent value="markdown" className="p-0">
                        <ScrollArea className="h-[400px] w-full rounded-md border">
                          <div className="p-4">
                            <pre className="text-sm">
                              <code className="whitespace-pre-wrap">{conversionResult.markdown}</code>
                            </pre>
                          </div>
                        </ScrollArea>
                      </TabsContent>
                      {conversionResult.json && (
                        <TabsContent value="json" className="p-0">
                          <ScrollArea className="h-[400px] w-full rounded-md border">
                            <div className="p-4">
                              <pre className="text-sm bg-muted p-4 rounded-md overflow-auto max-w-full">
                                <code className="whitespace-pre-wrap break-words">
                                  {formatJsonForDisplay(conversionResult.json)}
                                </code>
                              </pre>
                              <p className="text-xs text-muted-foreground mt-2">
                                Note: Long content strings have been truncated for better readability. 
                                Use "Copy JSON" or "Download JSON" to get the full data.
                              </p>
                            </div>
                          </ScrollArea>
                        </TabsContent>
                      )}
                    </Tabs>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <FaqSection />
        </section>
      </main>
      
      <footer className="border-t py-12">
        <div className="container px-4">
          <div className="text-center">
            <h3 className="text-2xl font-bold">Document to Markdown & JSON Converter</h3>
            <p className="text-muted-foreground mt-2">
              Professional document conversion tool for developers and content creators
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              &copy; {new Date().getFullYear()} Document Converter. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}