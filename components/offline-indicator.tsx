"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Wifi, WifiOff } from "lucide-react"

export function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(true)
  const [showOfflineMessage, setShowOfflineMessage] = useState(false)

  useEffect(() => {
    // Set initial online status
    setIsOnline(navigator.onLine)

    const handleOnline = () => {
      setIsOnline(true)
      setShowOfflineMessage(false)
    }

    const handleOffline = () => {
      setIsOnline(false)
      setShowOfflineMessage(true)
      
      // Hide offline message after 5 seconds
      setTimeout(() => setShowOfflineMessage(false), 5000)
    }

    // Add event listeners for online/offline detection
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // Register service worker for true offline support
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js', { scope: '/' })
        .then((registration) => {
          console.log('PDFMarkdown: Service Worker registered successfully:', registration.scope)
        })
        .catch((error) => {
          console.log('PDFMarkdown: Service Worker registration failed:', error)
        })
    }

    // Cleanup function
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
      
      // Send cleanup message to service worker
      if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({ type: 'CLEANUP' })
      }
    }
  }, [])

  // Clear any browser storage on unmount
  useEffect(() => {
    return () => {
      // Clear any potential storage (though we don't use it)
      try {
        localStorage.clear()
        sessionStorage.clear()
        if ('caches' in window) {
          // Only clear data caches, keep static assets
          caches.keys().then(names => {
            names.forEach(name => {
              if (name.includes('user-data') || name.includes('temp')) {
                caches.delete(name)
              }
            })
          })
        }
      } catch (error) {
        // Ignore errors - some browsers may restrict access
      }
    }
  }, [])

  if (!showOfflineMessage && isOnline) return null

  return (
    <div className="fixed top-4 right-4 z-50">
      <Badge 
        variant={isOnline ? "secondary" : "destructive"}
        className={`flex items-center gap-2 px-3 py-2 ${
          isOnline 
            ? "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800" 
            : "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800"
        }`}
      >
        {isOnline ? (
          <>
            <Wifi className="w-4 h-4" />
            Online - Full functionality available
          </>
        ) : (
          <>
            <WifiOff className="w-4 h-4" />
            Offline - PDFMarkdown still works perfectly!
          </>
        )}
      </Badge>
    </div>
  )
}