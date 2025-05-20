'use client'

import Link from "next/link"
import { ShoppingCartIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"
import { useCartStore } from "@/store/cart-store"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

export const Navbar = () => {

    const [mobileOpen, setMobileOpen] = useState<boolean>(false)
    const {item} = useCartStore()
    const cartCount = item.reduce((acc, item) => acc + item.quantity, 0)

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setMobileOpen(false)
            }
        }

        window.addEventListener("resize", handleResize)

        return () => window.removeEventListener("resize", handleResize)
    }, [])

    return (
        <nav className="sticky top-0 z-50 bg-white shadow">
            <div className="container mx-auto px-4 py-4">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <Link href="/" className="text-xl font-bold hover:text-blue-500 mb-4 md:mb-0">
                        My Ecommerce
                    </Link>
                    <div className="flex space-x-6">
                        <Link href="/" className="hover:text-blue-500">
                            Home
                        </Link>
                        <Link href="/products" className="hover:text-blue-500">
                            Products
                        </Link>
                        <Link href="/checkout" className="hover:text-blue-500">
                            Checkout
                        </Link>
                    </div>
                    <div className="flex item-center space-x-4">
                            <Link href="/checkout" className="relative">
                                <ShoppingCartIcon className="h-6 w-6"/>
                                    {cartCount > 0 && (
                                        <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">{cartCount}</span>
                                    )}
                                Checkout
                            </Link>
                            <Button variant="ghost" className="md:hidden" onClick={() => setMobileOpen((prev) => !prev)}>
                                {mobileOpen ? <XMarkIcon /> : <Bars3Icon />}
                            </Button>
                        </div>
                </div>
            </div>
            {mobileOpen && (
                <nav className="md:hidden bg-white shadow-md">
                    <ul className="flex flex-col p-4 space-y-2">
                        <li><Link href={"/"} className="block hover:text-blue-600">Home</Link></li>
                    </ul>
                    <ul>
                        <li><Link href={"/products"} className="block hover:text-blue-600">Products</Link></li>
                    </ul>
                    <ul>
                        <li><Link href={"/checkout"} className="block hover:text-blue-600">Checkout</Link></li>
                    </ul>
                </nav>
            )}
        </nav>
    )
}