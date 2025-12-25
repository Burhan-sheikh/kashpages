import DOMPurify from 'dompurify'
import { useEffect } from 'react'

export default function HtmlRenderer({ htmlContent }) {
  useEffect(() => {
    // Sanitize and render HTML
    const container = document.getElementById('html-renderer')
    if (container && htmlContent) {
      const sanitized = DOMPurify.sanitize(htmlContent)
      container.innerHTML = sanitized
    }
  }, [htmlContent])

  return <div id="html-renderer" className="w-full min-h-screen" />
}
