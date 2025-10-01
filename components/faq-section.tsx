import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { HelpCircle, Shield, Zap, Globe, Download, FileText, Cpu, Lock } from "lucide-react"

export function FaqSection() {
  return (
    <div className="relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50 dark:from-blue-900/10 dark:via-purple-900/5 dark:to-pink-900/10 rounded-3xl" />
      
      <Card className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-blue-200 dark:border-gray-700 shadow-xl">
        <CardHeader className="text-center pb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <HelpCircle className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Frequently Asked Questions
          </CardTitle>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
            Everything you need to know about PDFMarkdown
          </p>
        </CardHeader>
        <CardContent className="px-8 pb-8">
          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem value="item-1" className="border border-blue-100 dark:border-gray-700 rounded-lg px-6 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-900/10 dark:to-purple-900/10">
              <AccordionTrigger className="text-left font-semibold hover:no-underline">
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-blue-600" />
                  How does the PDF to Markdown conversion work?
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 dark:text-gray-300">
                <div className="space-y-3 pt-2">
                  <p>
                    PDFMarkdown uses advanced browser-based processing powered by the <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">@opendocsg/pdf2md</code> library.
                    Here's how it works:
                  </p>
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>Your PDF file is processed entirely within your browser</li>
                    <li>Advanced algorithms extract text, formatting, and document structure</li>
                    <li>Content is intelligently converted to clean Markdown syntax</li>
                    <li>Results are displayed instantly with preview and download options</li>
                  </ol>
                  <div className="flex items-center gap-2 mt-4">
                    <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      <Shield className="w-3 h-3 mr-1" />
                      100% Private
                    </Badge>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      <Zap className="w-3 h-3 mr-1" />
                      Lightning Fast
                    </Badge>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border border-purple-100 dark:border-gray-700 rounded-lg px-6 bg-gradient-to-r from-purple-50/50 to-pink-50/50 dark:from-purple-900/10 dark:to-pink-900/10">
              <AccordionTrigger className="text-left font-semibold hover:no-underline">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-purple-600" />
                  What formatting and features are supported?
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 dark:text-gray-300">
                <div className="space-y-3 pt-2">
                  <p className="font-medium text-green-700 dark:text-green-400">✅ Fully Supported:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Headings and subheadings (H1-H6)</li>
                    <li>Paragraphs and text blocks</li>
                    <li>Bulleted and numbered lists</li>
                    <li>Tables with proper formatting</li>
                    <li>Bold and italic text styling</li>
                    <li>Links and references</li>
                    <li>Code blocks and inline code</li>
                  </ul>
                  <p className="font-medium text-amber-700 dark:text-amber-400 mt-4">⚠️ Limited Support:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Complex multi-column layouts</li>
                    <li>Images (extracted as placeholders)</li>
                    <li>Advanced table formatting</li>
                    <li>Custom fonts and colors</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border border-green-100 dark:border-gray-700 rounded-lg px-6 bg-gradient-to-r from-green-50/50 to-blue-50/50 dark:from-green-900/10 dark:to-blue-900/10">
              <AccordionTrigger className="text-left font-semibold hover:no-underline">
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-green-600" />
                  How secure is my data?
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 dark:text-gray-300">
                <div className="space-y-3 pt-2">
                  <p className="font-semibold text-green-700 dark:text-green-400">Your privacy is our top priority:</p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-green-600" />
                        <span className="font-medium">100% Browser-Based</span>
                      </div>
                      <p className="text-sm pl-6">Files never leave your device</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Lock className="w-4 h-4 text-green-600" />
                        <span className="font-medium">Zero Storage</span>
                      </div>
                      <p className="text-sm pl-6">No data retention anywhere</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-green-600" />
                        <span className="font-medium">Offline Capable</span>
                      </div>
                      <p className="text-sm pl-6">Works without internet</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Cpu className="w-4 h-4 text-green-600" />
                        <span className="font-medium">Local Processing</span>
                      </div>
                      <p className="text-sm pl-6">All on your machine</p>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border border-blue-100 dark:border-gray-700 rounded-lg px-6 bg-gradient-to-r from-blue-50/50 to-cyan-50/50 dark:from-blue-900/10 dark:to-cyan-900/10">
              <AccordionTrigger className="text-left font-semibold hover:no-underline">
                <div className="flex items-center gap-3">
                  <Download className="w-5 h-5 text-blue-600" />
                  Are there any file size or usage limits?
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 dark:text-gray-300">
                <div className="space-y-3 pt-2">
                  <div className="bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                    <p className="font-semibold text-green-800 dark:text-green-200 mb-2">✨ Unlimited & Free Forever</p>
                    <ul className="space-y-1 text-sm">
                      <li>• No file count limits</li>
                      <li>• No daily/monthly restrictions</li>
                      <li>• No registration required</li>
                      <li>• Completely free to use</li>
                    </ul>
                  </div>
                  <p className="text-sm">
                    <strong>Recommended:</strong> Files under 25MB for optimal performance. Larger files may take longer to process depending on your device capabilities.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border border-purple-100 dark:border-gray-700 rounded-lg px-6 bg-gradient-to-r from-purple-50/50 to-pink-50/50 dark:from-purple-900/10 dark:to-pink-900/10">
              <AccordionTrigger className="text-left font-semibold hover:no-underline">
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-purple-600" />
                  Which browsers and devices are supported?
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 dark:text-gray-300">
                <div className="space-y-3 pt-2">
                  <p className="font-medium">PDFMarkdown works on all modern browsers:</p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium text-blue-700 dark:text-blue-400 mb-2">Desktop Browsers:</p>
                      <ul className="list-disc pl-6 space-y-1 text-sm">
                        <li>Google Chrome (Recommended)</li>
                        <li>Mozilla Firefox</li>
                        <li>Microsoft Edge</li>
                        <li>Safari</li>
                        <li>Opera</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-purple-700 dark:text-purple-400 mb-2">Mobile Devices:</p>
                      <ul className="list-disc pl-6 space-y-1 text-sm">
                        <li>iOS Safari</li>
                        <li>Chrome Mobile</li>
                        <li>Firefox Mobile</li>
                        <li>Samsung Internet</li>
                      </ul>
                    </div>
                  </div>
                  <p className="text-sm bg-blue-50 dark:bg-blue-900/20 p-3 rounded border border-blue-200 dark:border-blue-800">
                    💡 <strong>Tip:</strong> For the best experience, use the latest version of your browser with JavaScript enabled.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="border border-green-100 dark:border-gray-700 rounded-lg px-6 bg-gradient-to-r from-green-50/50 to-emerald-50/50 dark:from-green-900/10 dark:to-emerald-900/10">
              <AccordionTrigger className="text-left font-semibold hover:no-underline">
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-green-600" />
                  How can I get the best conversion results?
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 dark:text-gray-300">
                <div className="space-y-3 pt-2">
                  <p className="font-medium">Follow these tips for optimal results:</p>
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium text-green-700 dark:text-green-400 mb-2">📄 Best PDF Types:</p>
                      <ul className="list-disc pl-6 space-y-1 text-sm">
                        <li>Text-based PDFs (not scanned images)</li>
                        <li>Documents with clear structure</li>
                        <li>Simple, clean layouts</li>
                        <li>Standard fonts and encoding</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-blue-700 dark:text-blue-400 mb-2">⚡ Performance Tips:</p>
                      <ul className="list-disc pl-6 space-y-1 text-sm">
                        <li>Close unnecessary browser tabs</li>
                        <li>Use files under 25MB when possible</li>
                        <li>Ensure sufficient device memory</li>
                        <li>Update your browser to the latest version</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}
