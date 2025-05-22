"use client"

import { CheckCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/store/cart-store"
import { useEffect } from "react"

export default function SuccessPage() {
    const { clearCart } = useCartStore()

    useEffect(() => {
        // Clear the cart after successful payment
        clearCart()
    }, [clearCart])

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
                <div className="text-center">
                    <div className="flex justify-center">
                        <CheckCircle className="h-16 w-16 text-green-500" />
                    </div>
                    <h2 className="mt-6 text-3xl font-bold text-gray-900">
                        Payment Successful!
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Thank you for your purchase. Your order has been confirmed.
                    </p>
                </div>
                <div className="mt-8 space-y-4">
                    <p className="text-sm text-gray-600 text-center">
                        We will send you an email with your order details shortly.
                    </p>
                    <div className="flex justify-center">
                        <Link href="/">
                            <Button 
                                className="bg-green-600 hover:bg-green-700"
                            >
                                Return to Home
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
