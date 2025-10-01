"use client"

import { useState } from "react"
import { FileUploader } from "@/components/file-uploader"
import { MarkdownPreview } from "@/components/markdown-preview"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Code, ArrowRight, Zap, Shield, Download} from "lucide-react"
import { FaqSection } from "@/components/faq-section"
import { ScrollArea } from "@/components/ui/scroll-area"
import { GitHubStarButton } from "@/components/github-star-button"
import { Card, CardContent } from "@/components/ui/card"

export default function Home() {
  const [markdown, setMarkdown] = useState<string | null>(null)
  const [isConverting, setIsConverting] = useState(false)
  const [fileName, setFileName] = useState<string | null>(null)

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto py-12 px-4 max-w-6xl">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-pink-600/10 rounded-3xl" />
          
          {/* Hero content */}
          <div className="relative space-y-12 py-16">
            <div className="flex flex-col items-center text-center">
              <div className="inline-flex items-center px-6 py-2 mb-8 rounded-full text-sm font-semibold bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-800 dark:text-blue-200 border border-blue-200 dark:border-blue-700 shadow-sm">
                <span className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-blue-600" />
                  Lightning-fast PDF to Markdown conversion
                </span>
              </div>
              
              <h1 className="text-6xl md:text-7xl font-black tracking-tight text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mb-6 max-w-4xl leading-tight">
                PDFMarkdown
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-2xl mb-10 leading-relaxed">
                The most powerful PDF to Markdown converter. Blazing fast, completely secure, and 100% browser-based. Transform your documents in seconds.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Button 
                  size="lg"
                  className="h-14 px-8 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  onClick={() => {
                    document.querySelector('#converter')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  Start Converting
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <GitHubStarButton className="h-14 text-lg" />
              </div>
            </div>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-3 gap-6 mt-16">
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-blue-200 dark:border-blue-800 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">Lightning Fast</h3>
                  <p className="text-gray-600 dark:text-gray-400">Convert PDFs to Markdown in seconds with our optimized processing engine.</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-purple-200 dark:border-purple-800 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">100% Secure</h3>
                  <p className="text-gray-600 dark:text-gray-400">Your files never leave your browser. Complete privacy and security guaranteed.</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-pink-200 dark:border-pink-800 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-pink-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Download className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">Instant Download</h3>
                  <p className="text-gray-600 dark:text-gray-400">Get your converted Markdown files immediately with one-click download.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <div className="grid gap-12 mt-20" id="converter">
          <div className="transition-all duration-200 hover:scale-[1.01]">
            <FileUploader
              onConversionComplete={(result, file) => {
                setMarkdown(result)
                setFileName(file.name)
              }}
              isConverting={isConverting}
              setIsConverting={setIsConverting}
            />
          </div>

          {markdown && (
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-8">
                <div className="space-y-1">
                  <h2 className="text-2xl font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
                    Conversion Result
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {fileName?.replace(/\.pdf$/i, '')}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => {
                      navigator.clipboard.writeText(markdown || "")
                      alert("Markdown copied to clipboard!")
                    }}
                    className="h-9 font-medium bg-white hover:bg-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400"
                  >
                    Copy
                  </Button>
                  <Button
                    onClick={() => {
                      if (!markdown || !fileName) return

                      const element = document.createElement("a")
                      const file = new Blob([markdown], { type: "text/markdown" })
                      element.href = URL.createObjectURL(file)
                      element.download = fileName.replace(/\.pdf$/i, "") + ".md"
                      document.body.appendChild(element)
                      element.click()
                      document.body.removeChild(element)
                    }}
                    className="h-9 font-medium bg-black text-white hover:bg-gray-900 dark:bg-white dark:text-black dark:hover:bg-gray-100"
                  >
                    <FileText className="mr-1.5 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </div>

              <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden shadow-sm">
                <Tabs defaultValue="preview" className="w-full">
                  <TabsList className="flex h-12 items-center gap-4 px-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
                    <TabsTrigger 
                      value="preview" 
                      className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-sm transition-all"
                    >
                      <FileText className="h-4 w-4" />
                      Preview
                    </TabsTrigger>
                    <TabsTrigger 
                      value="markdown"
                      className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-sm transition-all"
                    >
                      <Code className="h-4 w-4" />
                      Markdown
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="preview" className="p-6">
                    <div className="overflow-x-auto">
                      <div className="max-w-full">
                        <MarkdownPreview markdown={markdown} />
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="markdown">
                    <div className="relative">
                      <ScrollArea className="h-[600px] w-full">
                        <div className="p-6">
                          <pre className="text-sm font-mono text-gray-800 dark:text-gray-200 overflow-x-auto">
                            <code className="whitespace-pre-wrap [overflow-wrap:anywhere]">{markdown}</code>
                          </pre>
                        </div>
                      </ScrollArea>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-20">
          <FaqSection />
        </div>

        <footer className="mt-20 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 text-center border border-blue-200 dark:border-gray-700">
          <div className="flex justify-center mb-6">
            <GitHubStarButton />
          </div>
          <div className="space-y-2">
            <p className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              PDFMarkdown - Powerful PDF to Markdown Conversion
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Built with ❤️ for developers and content creators. Open source and free forever.
            </p>
          </div>
        </footer>
      </div>
    </main>
  )
}

