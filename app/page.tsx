import { HeroCarousel } from "@/components/hero-carousel"
import { ProductCarousel } from "@/components/product-carousel"
import { ProductHighlight } from "@/components/product-highlight"
import { FaqSection } from "@/components/faq-section"
import { NewsletterPopup } from "@/components/newsletter-popup"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { QualityBadgesSection } from "@/components/quality-badges-carousel"
import { ProductCarousel2 } from "@/components/product-carousel2"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Announcement Bar */}
      <div className="relative overflow-hidden bg-black text-white py-2 whitespace-nowrap">
        <div className="animate-marquee flex">
          <span className="mx-4">SUL / SUDESTE FRETE GRÁTIS ACIMA DE R$ 199,90</span>
          <span className="mx-4">•</span>
          <span className="mx-4">SUL / SUDESTE FRETE GRÁTIS ACIMA DE R$ 199,90</span>
          <span className="mx-4">•</span>
          <span className="mx-4">SUL / SUDESTE FRETE GRÁTIS ACIMA DE R$ 199,90</span>
          <span className="mx-4">•</span>
        </div>
      </div>
      <main className="flex-1">

      <HeroCarousel />

{/* Product Carousel */}
<ProductCarousel />

{/* Product Highlight */}
<ProductHighlight />

{/* Quality Badges Carousel */}
<QualityBadgesSection />

<ProductCarousel2/>

{/* FAQ Section */}
<FaqSection />
      </main>

      {/* Newsletter Popup */}
      <NewsletterPopup />

      {/* WhatsApp Button */}
      <WhatsAppButton />
    </div>
  )
}
