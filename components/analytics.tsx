"use client"

import { useEffect } from "react"

export function Analytics() {
  useEffect(() => {
    // Google Analytics 4
    const GA_MEASUREMENT_ID = "G-XXXXXXXXXX" // Replace with your actual GA4 measurement ID

    // Load analytics after page is idle to avoid blocking render
    const loadAnalytics = () => {
      // Load Google Analytics script
      const script1 = document.createElement("script")
      script1.async = true
      script1.defer = true
      script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
      script1.onload = () => {
        // Initialize Google Analytics after script loads
        const script2 = document.createElement("script")
        script2.innerHTML = `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_title: document.title,
            page_location: window.location.href
          });
        `
        document.head.appendChild(script2)
      }
      document.head.appendChild(script1)

      // Make gtag available globally
      ;(window as any).gtag = () => {
        ;(window as any).dataLayer.push(arguments)
      }
    }

    // Use requestIdleCallback if available, otherwise setTimeout
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(loadAnalytics, { timeout: 2000 })
    } else {
      setTimeout(loadAnalytics, 1000)
    }

    return () => {
      // Cleanup is handled by browser when scripts are removed
    }
  }, [])

  return null
}
