"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronDown, Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"
import { useRouter } from "next/navigation"

// Product database (would normally come from a real database/API)
const productDatabase = [
  {
    id: "1",
    slug: "finalizador-anti-termico",
    name: "FINALIZADOR ANTI TÉRMICO",
    price: 44.9,
    originalPrice: 79.9,
    discount: "44% OFF",
    rating: 4.5,
    description:
      "Nosso finalizador é o aliado perfeito para manter seus cachos lindos e bem cuidados. Com uma fórmula leve e nutritiva, este leave-in foi especialmente desenvolvido para cabelos cacheados, ondulados e crespos, proporcionando hidratação profunda e controle do frizz.",
    benefits: [
      "Hidratação profunda;",
      "Controle do frizz;",
      "Proteção térmica;",
      "Definição dos cachos;",
      "Brilho intenso;",
      "Sem parabenos;",
      "Sem sulfatos;",
    ],
    howToUse:
      "Aplique uma pequena quantidade do produto nos cabelos úmidos ou secos, distribuindo uniformemente do meio às pontas. Não enxágue. Estilize como desejar.",
    ingredients:
      "Aqua, Cetearyl Alcohol, Cetrimonium Chloride, Behentrimonium Chloride, Glycerin, Panthenol, Hydrolyzed Keratin, Argania Spinosa Kernel Oil, Butyrospermum Parkii Butter, Cocos Nucifera Oil, Parfum, Citric Acid, Benzyl Alcohol, Potassium Sorbate, Sodium Benzoate.",
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
  },
  {
    id: "2",
    slug: "stick-antifrizz-cera-capilar",
    name: "STICK ANTIFRIZZ (CERA CAPILAR)",
    price: 99.9,
    originalPrice: 129.9,
    discount: "23% OFF",
    rating: 4.5,
    description:
      "Nossa cera capilar em stick é perfeita para domar os fios rebeldes e controlar o frizz instantaneamente. Formato prático para levar na bolsa e usar a qualquer momento.",
    benefits: [
      "Controle imediato do frizz;",
      "Formato prático de stick;",
      "Não pesa nos fios;",
      "Efeito natural;",
      "Pode ser usado em qualquer tipo de cabelo;",
    ],
    howToUse:
      "Passe o stick diretamente nos fios rebeldes ou nas áreas com frizz. Para um efeito mais suave, aplique primeiro nas mãos e depois distribua nos fios.",
    ingredients:
      "Cera de Abelha, Óleo de Coco, Óleo de Argan, Manteiga de Karité, Vitamina E, Cera de Carnaúba, Óleo de Jojoba, Extrato de Aloe Vera.",
    images: ["/placeholder.svg?height=600&width=600", "/placeholder.svg?height=600&width=600"],
  },
  {
    id: "3",
    slug: "vitamina-capilar-antiqueda",
    name: "VITAMINA CAPILAR ANTIQUEDA",
    price: 189.9,
    originalPrice: 229.9,
    discount: "17% OFF",
    rating: 4.5,
    description:
      "A poderosa Vitamina Capilar , uma fórmula exclusiva que contém a última tecnologia do Silício Orgânico Nutricolin® e componentes altamente selecionados para tratar você de dentro para fora!",
    benefits: [
      "Crescimento acelerado dos fios;",
      "Redução da queda capilar;",
      "Fortalecimento das unhas;",
      "Cabelos mais sedosos e brilhantes;",
      "Vitaminas e minerais essenciais;",
    ],
    howToUse:
      "Tome 1 cápsula ao dia, preferencialmente após uma das principais refeições. Para melhores resultados, utilize por pelo menos 3 meses consecutivos.",
    ingredients:
      "Silício Orgânico Nutricolin®, Biotina, Zinco, Selênio, Vitaminas A, C, E, D, complexo B, Colágeno Hidrolisado, L-Cisteína.",
    images: ["/placeholder.svg?height=600&width=600", "/placeholder.svg?height=600&width=600"],
  },
  // Preencher com os outros produtos conforme necessário
]

// Adicione todos os produtos do carousel
const allProducts = [
  ...productDatabase,
  {
    id: "4",
    slug: "kit-shampoo-e-condicionador",
    name: "KIT SHAMPOO E CONDICIONADOR",
    price: 79.9,
    originalPrice: 139.9,
    discount: "43% OFF",
    rating: 4.5,
    description: "Kit com shampoo e condicionador para todos os tipos de cabelo.",
    benefits: ["Limpeza suave;", "Hidratação profunda;", "Não contém sulfatos;", "Cabelos mais macios e brilhantes;"],
    howToUse:
      "Aplique o shampoo nos cabelos molhados, massageie e enxágue. Em seguida, aplique o condicionador do meio para as pontas, deixe agir por 3 minutos e enxágue bem.",
    ingredients:
      "Aqua, Sodium Laureth Sulfate, Cocamidopropyl Betaine, Glycerin, Parfum, Panthenol, Hydrolyzed Wheat Protein.",
    images: ["/placeholder.svg?height=600&width=600", "/placeholder.svg?height=600&width=600"],
  },
  {
    id: "5",
    slug: "kit-capilar-completo",
    name: "KIT CAPILAR COMPLETO",
    price: 499.0,
    originalPrice: 665.0,
    discount: "25% OFF",
    rating: 4.5,
    description:
      "Kit completo com todos os produtos essenciais para o tratamento capilar. Ideal para recuperação total dos fios.",
    benefits: [
      "Tratamento completo;",
      "Recuperação de fios danificados;",
      "Hidratação intensiva;",
      "Nutrição profunda;",
      "Controle de frizz;",
      "Brilho e maciez;",
    ],
    howToUse: "Siga as instruções de cada produto na sequência recomendada para melhores resultados.",
    ingredients: "Veja a composição de cada produto individualmente nas respectivas embalagens.",
    images: ["/placeholder.svg?height=600&width=600", "/placeholder.svg?height=600&width=600"],
  },
]

export default function ProductPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const router = useRouter()
  const product = allProducts.find((p) => p.slug === slug) || allProducts[0]

  const [quantity, setQuantity] = useState(1)
  const [mainImage, setMainImage] = useState(0)
  const [showFullDescription, setShowFullDescription] = useState(true)

  const { addItem } = useCart()

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  const handleAddToCart = () => {
    addItem({ ...product, image: product.images[0] }, quantity)
    router.push("/carrinho")
  }

  const relatedProducts = allProducts.filter((p) => p.id !== product.id).slice(0, 4)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg overflow-hidden">
            <div className="relative aspect-square">
              <Image
                src={product.images[mainImage] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {product.images.map((image, index) => (
              <div
                key={index}
                className={`bg-gray-50 rounded-lg overflow-hidden border cursor-pointer ${
                  mainImage === index ? "border-rose-300" : "hover:border-rose-300"
                }`}
                onClick={() => setMainImage(index)}
              >
                <div className="relative aspect-square">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} - Imagem ${index + 1}`}
                    fill
                    className="object-contain p-2"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          {/* Rating */}
          <div className="flex mb-2">
            {[1, 2, 3, 4].map((star) => (
              <svg key={star} className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <svg className="w-6 h-6 text-yellow-400 text-opacity-50" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>

          {/* Product Name */}
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

          {/* Price */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl font-bold text-rose-400">R$ {product.price.toFixed(2).replace(".", ",")}</span>
            <span className="text-lg text-gray-500 line-through">
              R$ {product.originalPrice.toFixed(2).replace(".", ",")}
            </span>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center">
              <Button
                variant="outline"
                size="icon"
                onClick={decrementQuantity}
                className="rounded-l-md rounded-r-none h-12 w-12 border-gray-300"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <div className="h-12 w-12 flex items-center justify-center border-y border-gray-300">{quantity}</div>
              <Button
                variant="outline"
                size="icon"
                onClick={incrementQuantity}
                className="rounded-r-md rounded-l-none h-12 w-12 border-gray-300"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <Button className="bg-rose-400 hover:bg-rose-500 text-white h-12 px-8 flex-1" onClick={handleAddToCart}>
              ADICIONAR AO CARRINHO
            </Button>
          </div>

          {/* Description */}
          <div className="border-t border-gray-200 pt-6">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => setShowFullDescription(!showFullDescription)}
            >
              <h3 className="text-lg font-bold">Descrição</h3>
              <ChevronDown
                className={`h-5 w-5 transition-transform ${showFullDescription ? "transform rotate-180" : ""}`}
              />
            </div>
            {showFullDescription && (
              <div className="mt-4 text-gray-700">
                <p className="mb-4">{product.description}</p>

                <h4 className="font-bold mt-4 mb-2">Principais Benefícios</h4>
                <ul className="space-y-2">
                  {product.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <div className="mr-2 mt-1 text-rose-400">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      {benefit}
                    </li>
                  ))}
                </ul>

                <h4 className="font-bold mt-6 mb-2">Modo de Uso</h4>
                <p>{product.howToUse}</p>

                <h4 className="font-bold mt-6 mb-2">Ingredientes</h4>
                <p className="text-sm">{product.ingredients}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-center mb-8">Você também pode gostar de:</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {relatedProducts.map((product) => (
            <Link href={`/produto/${product.slug}`} key={product.id} className="group">
              <div className="bg-gray-50 rounded-lg overflow-hidden">
                <div className="relative aspect-square">
                  <Image src={product.images[0] || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                  <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        addItem({ ...product, image: product.images[0] })
                      }}
                      className="bg-rose-300 hover:bg-rose-400 text-white"
                    >
                      Adicionar ao carrinho
                    </Button>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex mb-2">
                    {[1, 2, 3, 4].map((star) => (
                      <svg key={star} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <svg className="w-4 h-4 text-yellow-400 text-opacity-50" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-sm mb-2">{product.name}</h3>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-lg font-bold text-rose-500">
                      R$ {product.price.toFixed(2).replace(".", ",")}
                    </span>
                    <span className="text-xs text-gray-500 line-through">
                      R$ {product.originalPrice.toFixed(2).replace(".", ",")}
                    </span>
                    <span className="bg-rose-100 text-rose-600 text-xs px-2 py-1 rounded">{product.discount}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
