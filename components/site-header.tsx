"use client"

import Link from "next/link"
import { ShoppingBag } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { useCart } from "@/context/cart-context"
import { useRouter } from "next/navigation"

export function SiteHeader() {
  const { itemCount } = useCart()
  const router = useRouter()

  return (
    <header className="bg-white shadow-sm py-4 px-4">
      <div className="container mx-auto flex items-center justify-between">
        <MainNav />
        <Link href={"/"} className="absolute left-1/2 transform -translate-x-1/2 bg-white rounded-full p-2 shadow-sm">
          <Image src="/logo.png" alt="Logo" width={10} height={40} className="h-24 w-auto" priority />
        </Link>

        <Button
          variant="ghost"
          size="icon"
          className="p-2 relative"
          aria-label="Cart"
          onClick={() => router.push("/carrinho")}
        >
          <ShoppingBag className="h-6 w-6" />
          {itemCount > 0 && (
            <span className="absolute top-0 right-0 bg-rose-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </Button>
      </div>
    </header>
  )
}
