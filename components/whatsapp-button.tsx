"use client"

import { useState } from "react"

export function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false)
  const phoneNumber = "5511957777785" // Replace with your actual WhatsApp number
  const whatsappUrl = `https://wa.me/${phoneNumber}`

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {isHovered && (
        <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-lg p-3 mb-2 whitespace-nowrap animate-fade-in">
          <p className="text-sm font-medium">Fale conosco pelo WhatsApp</p>
        </div>
      )}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-14 h-14 bg-green-500 rounded-full shadow-lg hover:bg-green-600 transition-colors"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="Chat on WhatsApp"
      >
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22.5c-1.721 0-3.343-.404-4.792-1.12l-5.458 1.447 1.479-5.4A10.45 10.45 0 012.25 12C2.25 6.9 6.9 2.25 12 2.25S21.75 6.9 21.75 12 17.1 21.75 12 21.75z" />
        </svg>
      </a>
    </div>
  )
}
