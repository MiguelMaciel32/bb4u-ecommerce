"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useCart } from "@/context/cart-context"
import Image from "next/image"
import Link from "next/link"
import { useMobile } from "@/hooks/use-mobile"
import { Button } from "@/components/ui/button"

const products = [
  {
    id: "1",
    slug: "kit-capilar-completo",
    name: "KIT CAPILAR COMPLETO",
    price: 499.0,
    originalPrice: 665.0,
    discount: "25% OFF",
    image: "/produto.jpeg",
    rating: 4.5,
  },
  {
    id: "2",
    slug: "kit-nutricao-intensa-cera-antifrizz",
    name: "KIT NUTRIÇÃO INTENSA + CERA ANTIFRIZZ",
    price: 299.0,
    originalPrice: 369.9,
    discount: "19% OFF",
    image: "/produto.jpeg",
    rating: 4.5,
  },
  {
    id: "3",
    slug: "kit-hidratacao-intensa-cera",
    name: "KIT HIDRATAÇÃO INTENSA + CERA",
    price: 199.0,
    originalPrice: 269.9,
    discount: "26% OFF",
    image: "/produto.jpeg",
    rating: 4.5,
  },
  {
    id: "4",
    slug: "kit-shampoo-e-condicionador",
    name: "KIT SHAMPOO E CONDICIONADOR",
    price: 79.9,
    originalPrice: 139.9,
    discount: "43% OFF",
    image: "/produto.jpeg",
    rating: 4.5,
  },
  {
    id: "5",
    slug: "kit-reconstrucao-capilar",
    name: "KIT RECONSTRUÇÃO CAPILAR",
    price: 249.9,
    originalPrice: 329.9,
    discount: "24% OFF",
    image: "/produto.jpeg",
    rating: 4.5,
  },
  {
    id: "6",
    slug: "kit-crescimento-acelerado",
    name: "KIT CRESCIMENTO ACELERADO",
    price: 279.9,
    originalPrice: 349.9,
    discount: "20% OFF",
    image: "/produto.jpeg",
    rating: 4.5,
  },
  {
    id: "7",
    slug: "kit-antiqueda-completo",
    name: "KIT ANTIQUEDA COMPLETO",
    price: 319.9,
    originalPrice: 399.9,
    discount: "20% OFF",
    image: "/produto.jpeg",
    rating: 4.5,
  },
  {
    id: "8",
    slug: "kit-brilho-intenso",
    name: "KIT BRILHO INTENSO",
    price: 189.9,
    originalPrice: 249.9,
    discount: "24% OFF",
    image: "/produto.jpeg",
    rating: 4.5,
  },
]

export function ProductCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [direction, setDirection] = useState("next")
  const isMobile = useMobile()
  const { addItem } = useCart()
  const carouselRef = useRef<HTMLDivElement>(null)
  const [startX, setStartX] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [dragDistance, setDragDistance] = useState(0)

  // Calculate how many products to show based on screen size
  const productsPerPage = isMobile ? 1 : 4
  const totalPages = Math.ceil(products.length / productsPerPage)

  // Get visible products based on current index and products per page
  const visibleProducts = isMobile
    ? products.slice(currentIndex, currentIndex + 1)
    : products.slice(currentIndex * productsPerPage, (currentIndex + 1) * productsPerPage)

  // Handle touch/mouse start
  const handleDragStart = (clientX: number) => {
    if (isMobile) {
      setIsDragging(true)
      setStartX(clientX)
      setDragDistance(0)
    }
  }

  // Handle touch/mouse move
  const handleDragMove = (clientX: number) => {
    if (!isDragging || !isMobile) return

    const distance = startX - clientX
    setDragDistance(distance)
  }

  // Handle touch/mouse end
  const handleDragEnd = () => {
    if (!isDragging || !isMobile) return

    setIsDragging(false)

    // If dragged far enough, change the slide
    const threshold = 50 // Minimum drag distance to trigger slide change

    if (dragDistance > threshold) {
      // Dragged left - go to next slide
      handleNext()
    } else if (dragDistance < -threshold) {
      // Dragged right - go to previous slide
      handlePrev()
    }

    setDragDistance(0)
  }

  // Go to next slide with animation
  const handleNext = () => {
    if (isAnimating) return

    setDirection("next")
    setIsAnimating(true)

    setTimeout(() => {
      if (isMobile) {
        setCurrentIndex((prev) => (prev === products.length - 1 ? 0 : prev + 1))
      } else {
        setCurrentIndex((prev) => (prev === totalPages - 1 ? 0 : prev + 1))
      }

      setTimeout(() => {
        setIsAnimating(false)
      }, 300)
    }, 300)
  }

  // Go to previous slide with animation
  const handlePrev = () => {
    if (isAnimating) return

    setDirection("prev")
    setIsAnimating(true)

    setTimeout(() => {
      if (isMobile) {
        setCurrentIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1))
      } else {
        setCurrentIndex((prev) => (prev === 0 ? totalPages - 1 : prev - 1))
      }

      setTimeout(() => {
        setIsAnimating(false)
      }, 300)
    }, 300)
  }

  // Auto-rotate on mobile
  useEffect(() => {
    if (isMobile && !isDragging && !isAnimating) {
      const interval = setInterval(() => {
        handleNext()
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [isMobile, currentIndex, isDragging, isAnimating])

  const handleAddToCart = (product: any, e: React.MouseEvent) => {
    e.preventDefault() // Prevent navigation
    addItem(product)
  }

  const renderProductCard = (product: any) => (
    <div key={product.id} className="relative group w-full max-w-xs mx-auto">
      <Link href={`/produto/${product.slug}`} className="block">
        <div className="bg-gray-50 rounded-lg overflow-hidden h-[450px]">
          <div className="relative h-[250px] w-full">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <Button
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  addItem(product)
                }}
                className="bg-rose-300 hover:bg-rose-400 text-white"
              >
                Adicionar ao carrinho
              </Button>
            </div>
          </div>
          <div className="p-4 h-[200px] flex flex-col">
            <div className="flex mb-2">
              {[1, 2, 3, 4].map((star) => (
                <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-.181h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <svg className="w-5 h-5 text-yellow-400 text-opacity-50" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-.181h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <h3 className="font-bold text-sm mb-2 line-clamp-2 h-10">{product.name}</h3>
            <div className="flex items-center gap-2 mt-auto">
              <span className="text-xl font-bold text-rose-500">R$ {product.price.toFixed(2).replace(".", ",")}</span>
              <span className="text-sm text-gray-500 line-through">
                R$ {product.originalPrice.toFixed(2).replace(".", ",")}
              </span>
              <span className="bg-rose-100 text-rose-600 text-xs px-2 py-1 rounded">{product.discount}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )

  // CSS classes for animation
  const getAnimationClasses = () => {
    if (!isAnimating) return "transition-transform duration-500 ease-out"

    if (direction === "next") {
      return "transition-transform duration-600 ease-out animate-slide-left"
    } else {
      return "transition-transform duration-600 ease-out animate-slide-right"
    }
  }

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-medium text-rose-400">Kits de tratamento completo</h2>
          <p className="text-lg mt-2">Confira todas as novidades do EXCELÊNCIA</p>
        </div>

        <div className="relative">
          <div
            className="relative overflow-hidden touch-pan-y"
            ref={carouselRef}
            onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
            onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
            onTouchEnd={handleDragEnd}
            onMouseDown={(e) => handleDragStart(e.clientX)}
            onMouseMove={(e) => handleDragMove(e.clientX)}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
          >
            <style jsx global>{`
              @keyframes slideInRight {
                from {
                  transform: translateX(100%);
                  opacity: 0;
                }
                to {
                  transform: translateX(0);
                  opacity: 1;
                }
              }
              
              @keyframes slideInLeft {
                from {
                  transform: translateX(-100%);
                  opacity: 0;
                }
                to {
                  transform: translateX(0);
                  opacity: 1;
                }
              }
              
              @keyframes slideOutRight {
                from {
                  transform: translateX(0);
                  opacity: 1;
                }
                to {
                  transform: translateX(100%);
                  opacity: 0;
                }
              }
              
              @keyframes slideOutLeft {
                from {
                  transform: translateX(0);
                  opacity: 1;
                }
                to {
                  transform: translateX(-100%);
                  opacity: 0;
                }
              }
              
              .animate-slide-left {
                animation: slideOutLeft 0.3s forwards;
              }
              
              .animate-slide-right {
                animation: slideOutRight 0.3s forwards;
              }
              
              .carousel-item {
                transition: transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 0.5s ease;
              }
              
              .carousel-item.entering {
                animation-duration: 0.5s;
                animation-fill-mode: forwards;
              }
              
              .carousel-item.entering.from-right {
                animation-name: slideInRight;
              }
              
              .carousel-item.entering.from-left {
                animation-name: slideInLeft;
              }
              
              .carousel-item.exiting {
                position: absolute;
                top: 0;
                width: 100%;
                animation-duration: 0.5s;
                animation-fill-mode: forwards;
              }
              
              .carousel-item.exiting.to-right {
                animation-name: slideOutRight;
              }
              
              .carousel-item.exiting.to-left {
                animation-name: slideOutLeft;
              }
            `}</style>

            <div
              className={`flex ${getAnimationClasses()} ${isDragging ? "transition-none" : ""}`}
              style={{
                transform: isDragging
                  ? `translateX(${-currentIndex * (100 / productsPerPage)}% - ${dragDistance}px)`
                  : `translateX(${-currentIndex * (100 / productsPerPage)}%)`,
              }}
            >
              {products.map((product, index) => (
                <div
                  key={product.id}
                  className={`flex-shrink-0 carousel-item ${isMobile ? "w-full" : "w-1/4"} px-3`}
                  style={{
                    width: `${100 / productsPerPage}%`,
                    transition: "transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 0.5s ease",
                    opacity: isAnimating ? 0.8 : 1,
                    transform: isAnimating
                      ? `scale(${
                          direction === "next"
                            ? index === currentIndex
                              ? 0.9
                              : 1.05
                            : index === currentIndex
                              ? 1.05
                              : 0.9
                        })`
                      : "scale(1)",
                  }}
                >
                  {renderProductCard(product)}
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows - Only show on desktop */}
          {!isMobile && (
            <>
              <button
                onClick={handlePrev}
                className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 rounded-full p-3 shadow-md z-10 transition-transform duration-300 hover:scale-110"
                aria-label="Produto anterior"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={handleNext}
                className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 rounded-full p-3 shadow-md z-10 transition-transform duration-300 hover:scale-110"
                aria-label="Próximo produto"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {isMobile
            ? // Mobile pagination - one dot per product
              products.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? "next" : "prev")
                    setIsAnimating(true)
                    setTimeout(() => {
                      setCurrentIndex(index)
                      setTimeout(() => {
                        setIsAnimating(false)
                      }, 300)
                    }, 300)
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex ? "bg-black w-5" : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Ir para produto ${index + 1}`}
                />
              ))
            : // Desktop pagination - one dot per page
              Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? "next" : "prev")
                    setIsAnimating(true)
                    setTimeout(() => {
                      setCurrentIndex(index)
                      setTimeout(() => {
                        setIsAnimating(false)
                      }, 300)
                    }, 300)
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex ? "bg-black w-5" : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Ir para página ${index + 1}`}
                />
              ))}
        </div>
      </div>
    </section>
  )
}
