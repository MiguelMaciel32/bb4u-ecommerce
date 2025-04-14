"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useMobile } from "@/hooks/use-mobile"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

const badges = [
  {
    id: 1,
    name: "CRUELTY FREE",
    icon: "/icons/cruelty-free.svg",
  },
  {
    id: 2,
    name: "SEM PARABENOS",
    icon: "/icons/sem-parabenos.svg",
  },
  {
    id: 3,
    name: "APROVADO ANVISA",
    icon: "/icons/aprovado-anvisa.svg",
  },
  {
    id: 4,
    name: "PRODUTO VEGANO",
    icon: "/icons/produto-vegano.svg",
  },
  {
    id: 5,
    name: "DERMATOLOGICAMENTE TESTADO",
    icon: "/icons/dermatologicamente-testado.svg",
  },
]

export function QualityBadgesSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)
  const isMobile = useMobile()

  // Determinar quantos badges mostrar por vez
  const getVisibleCount = () => {
    if (typeof window === "undefined") return 5 // SSR fallback
    if (window.innerWidth < 380) return 2
    if (window.innerWidth < 768) return 3
    return 5
  }

  const [visibleCount, setVisibleCount] = useState(5)

  // Atualizar o número de badges visíveis quando a janela for redimensionada
  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(getVisibleCount())
    }

    // Definir o valor inicial
    handleResize()

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Calcular o número total de páginas
  const totalPages = Math.ceil(badges.length / visibleCount)

  // Função para mudar o slide com animação
  const changeSlide = (newIndex: number) => {
    if (isAnimating) return

    setIsAnimating(true)
    setTimeout(() => {
      setCurrentIndex(newIndex)
      setTimeout(() => {
        setIsAnimating(false)
      }, 300)
    }, 100)
  }

  // Auto-rotate badges every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % totalPages
      changeSlide(nextIndex)
    }, 2000)

    return () => clearInterval(interval)
  }, [currentIndex, totalPages])

  // Funções para navegação manual
  const goToPrev = () => {
    const prevIndex = currentIndex === 0 ? totalPages - 1 : currentIndex - 1
    changeSlide(prevIndex)
  }

  const goToNext = () => {
    const nextIndex = (currentIndex + 1) % totalPages
    changeSlide(nextIndex)
  }

  // Funções para suporte a gestos de toque
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Deslizou para a esquerda
      goToNext()
    }

    if (touchStart - touchEnd < -50) {
      // Deslizou para a direita
      goToPrev()
    }
  }

  return (
    <section className="py-6 md:py-12 flex justify-center items-center">
      <div className="relative w-full max-w-5xl mx-auto rounded-xl overflow-hidden shadow-xl">
        {/* Background Image Section */}
        <div className="relative w-full">
          <div className="relative w-full h-[200px] sm:h-[250px] md:h-[500px] overflow-hidden">
            <Image src="/produto.jpeg" alt="Mulher com produtos" fill className="object-cover" priority />
            <div className="absolute inset-0 bg-black bg-opacity-10"></div>
          </div>
        </div>

        {/* Badges Bar */}
        <div className="relative bg-rose-200 py-4 md:py-6">
          <div className="container mx-auto px-4">
            <div className="relative">
              {/* Carrossel simplificado */}
              <div
                ref={carouselRef}
                className="relative overflow-hidden"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {/* Grupo de badges visíveis */}
                <div className="flex justify-center">
                  {visibleCount < 5
                    ? // Versão móvel - mostra apenas os badges da página atual
                      badges
                        .slice(currentIndex * visibleCount, Math.min((currentIndex + 1) * visibleCount, badges.length))
                        .map((badge) => (
                          <div
                            key={badge.id}
                            className={`flex flex-col items-center justify-center px-2 transition-all duration-300 ${
                              isAnimating ? "opacity-50" : "opacity-100"
                            }`}
                            style={{
                              width: `${100 / visibleCount}%`,
                            }}
                          >
                            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 flex items-center justify-center">
                              <img
                                src={badge.icon || "/placeholder.svg"}
                                alt={badge.name}
                                className="w-full h-full object-contain"
                              />
                            </div>
                            <p className="text-center text-[9px] sm:text-[10px] md:text-xs font-medium text-white mt-1 line-clamp-2">
                              {badge.name}
                            </p>
                          </div>
                        ))
                    : // Versão desktop - mostra todos os badges
                      badges.map((badge) => (
                        <div
                          key={badge.id}
                          className="flex flex-col items-center justify-center px-2 transition-all duration-300"
                          style={{
                            width: `${100 / badges.length}%`,
                          }}
                        >
                          <div className="w-16 h-16 flex items-center justify-center">
                            <img
                              src={badge.icon || "/placeholder.svg"}
                              alt={badge.name}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <p className="text-center text-xs font-medium text-white mt-1 whitespace-nowrap">
                            {badge.name}
                          </p>
                        </div>
                      ))}
                </div>

                {/* Indicadores de paginação - apenas para mobile */}
                {visibleCount < 5 && totalPages > 1 && (
                  <div className="flex justify-center mt-3 gap-1">
                    {Array.from({ length: totalPages }).map((_, index) => (
                      <button
                        key={index}
                        onClick={() => changeSlide(index)}
                        className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all ${
                          index === currentIndex ? "bg-white w-3 md:w-4" : "bg-white/50"
                        }`}
                        aria-label={`Ir para página ${index + 1}`}
                      />
                    ))}
                  </div>
                )}

                {/* Botões de navegação - apenas para mobile */}
                {visibleCount < 5 && totalPages > 1 && (
                  <>
                    <button
                      onClick={goToPrev}
                      className="absolute left-0 top-1/3 -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-1 touch-manipulation"
                      aria-label="Anterior"
                    >
                      <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                    </button>
                    <button
                      onClick={goToNext}
                      className="absolute right-0 top-1/3 -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-1 touch-manipulation"
                      aria-label="Próximo"
                    >
                      <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
