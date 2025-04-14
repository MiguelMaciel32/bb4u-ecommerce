"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"

const slides = [
  {
    id: 1,
    title: "CRONOGRAMA CAPILAR",
    subtitle: "POR APENAS R$99,90",
    description: "PROMOÇÃO",
    cta: "GARANTA JÁ O SEU",
    image: "/produto.jpeg",
    bgColor: "from-rose-500/70",
  },
  {
    id: 2,
    title: "KITS COMPLETOS",
    subtitle: "A PARTIR DE R$149,90",
    description: "NOVIDADE",
    cta: "CONHEÇA AGORA",
    image: "/produto.jpeg",
    bgColor: "from-pink-500/70",
  },
  {
    id: 3,
    title: "MÁSCARA HIDRATANTE",
    subtitle: "POR APENAS R$39,90",
    description: "DESTAQUE",
    cta: "COMPRAR",
    image: "/produto.jpeg",
    bgColor: "from-purple-500/70",
  },
]

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const autoplayRef = useRef<NodeJS.Timeout | null>(null)
  const isMobile = useMobile()

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  // Reset autoplay timer
  const resetAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current)
    }

    autoplayRef.current = setInterval(() => {
      nextSlide()
    }, 3000)
  }

  // Initialize autoplay
  useEffect(() => {
    resetAutoplay()

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current)
      }
    }
  }, [])

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX
    handleSwipe()
  }

  // Mouse event handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    touchStartX.current = e.clientX
    if (carouselRef.current) {
      carouselRef.current.style.cursor = "grabbing"
    }
  }

  const handleMouseUp = (e: React.MouseEvent) => {
    touchEndX.current = e.clientX
    if (carouselRef.current) {
      carouselRef.current.style.cursor = "grab"
    }
    handleSwipe()
  }

  const handleMouseLeave = (e: React.MouseEvent) => {
    if (touchStartX.current !== 0) {
      touchEndX.current = e.clientX
      if (carouselRef.current) {
        carouselRef.current.style.cursor = "grab"
      }
      handleSwipe()
    }
  }

  // Handle swipe logic
  const handleSwipe = () => {
    const swipeDistance = touchEndX.current - touchStartX.current
    const minSwipeDistance = 50 // Minimum distance to register as a swipe

    if (swipeDistance > minSwipeDistance) {
      // Swiped right, go to previous slide
      prevSlide()
    } else if (swipeDistance < -minSwipeDistance) {
      // Swiped left, go to next slide
      nextSlide()
    }

    // Reset touch positions
    touchStartX.current = 0
    touchEndX.current = 0

    // Reset autoplay timer after user interaction
    resetAutoplay()
  }

  return (
    <div
      className="relative overflow-hidden rounded-xl"
      ref={carouselRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      style={{ cursor: "grab" }}
    >
      {/* Main Carousel */}
      <div className="relative">
        {/* Slides */}
        <div className="relative h-[400px] md:h-[600px]">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`${
                index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
              } absolute inset-0 transition-opacity duration-500 ease-in-out`}
            >
              {/* Image with overlay - For both mobile and desktop */}
              <div className="relative w-full h-full">
                <Image
                  src={slide.image || "/placeholder.svg"}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority
                />
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgColor} to-transparent opacity-90`}></div>
              </div>

              {/* Content overlay - Different for mobile and desktop */}
              <div className="absolute inset-0 flex items-center">
                <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
                  <div className="max-w-lg">
                    <div className="space-y-4 text-white">
                      {!isMobile && (
                        <div className="inline-block px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full">
                          <p className="uppercase tracking-wider font-medium text-sm">{slide.description}</p>
                        </div>
                      )}
                      <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold drop-shadow-md">{slide.title}</h2>
                      <p className="text-2xl md:text-4xl lg:text-5xl font-light drop-shadow-md">{slide.subtitle}</p>
                      {!isMobile && (
                        <div className="pt-6">
                          <Button className="rounded-full bg-white text-rose-500 hover:bg-white/90 hover:text-rose-600 px-8 py-6 text-lg font-semibold">
                            {slide.cta}
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Limited Time Banner - Only on desktop */}
              {!isMobile && (
                <div className="absolute top-0 right-0 w-40 h-40 overflow-hidden z-10">
                  <div className="bg-rose-500 text-white font-medium text-xs py-1 px-4 absolute w-56 text-center transform rotate-45 translate-x-2 translate-y-12">
                    TEMPO LIMITADO
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentSlide(index)
              resetAutoplay()
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-white w-6" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
