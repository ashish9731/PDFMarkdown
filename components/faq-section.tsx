import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function FaqSection() {
  const faqs = [
    {
      question: "How does the document conversion work?",
      answer: "Our tool processes your documents entirely in your browser using advanced algorithms. No data is sent to any server, ensuring complete privacy and security."
    },
    {
      question: "What file formats are supported?",
      answer: "We support PDF, DOCX, DOC, TXT, and RTF files. For best results, we recommend using PDF files as they preserve formatting most accurately."
    },
    {
      question: "Is my data secure?",
      answer: "Absolutely. All processing happens locally in your browser. Your files never leave your device and are not stored anywhere."
    },
    {
      question: "Do I need an internet connection?",
      answer: "An internet connection is required to load the application, but once loaded, you can use it offline. No documents are sent over the internet during conversion."
    },
    {
      question: "Are there any file size limits?",
      answer: "We recommend files under 50MB for optimal performance. Larger files may take longer to process depending on your device's capabilities."
    },
    {
      question: "Is this tool really free?",
      answer: "Yes, our document converter is completely free to use with no limitations on the number of conversions or file sizes."
    }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Frequently Asked Questions</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible>
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  )
}
