"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useCartStore } from "@/store/cart-store"

export default function CheckoutPage() {

    const { item, removeItem, addItem, clearCart } = useCartStore()

    const total = item.reduce((acc, item) => acc + item.price * item.quantity, 0) / 100

    if (total === 0|| item.length === 0) {
        return (
            <div className="flex justify-center items-center h-screen">
                <h1>No items in cart</h1>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <h1 className="text-3xl font-bold mb-8">Checkout</h1>
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle className="text-2xl">Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-4">
                        {item.map((item, key) => (
                            <li key={key} className="border-b pb-4 last:border-0">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-medium">{item.name}</span>
                                    <span className="font-semibold">RM{(item.price * item.quantity / 100).toFixed(2)}</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Button variant={"outline"} size="sm" onClick={() => removeItem(item.id)}> -</Button>
                                    <span className="text-lg font-semibold w-8 text-center">{item.quantity}</span>
                                    <Button size="sm" onClick={() => addItem({...item, quantity: 1})}> +</Button>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-6 pt-4 border-t">
                        <div className="flex justify-between items-center text-xl font-bold">
                            <span>Total:</span>
                            <span>RM{total.toFixed(2)}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <form className="flex flex-col sm:flex-row gap-4 justify-end mt-6">
            <Button 
                    onClick={() => clearCart()} 
                    variant="destructive"
                    size="lg" 
                    className="w-full sm:w-auto"
                >
                    Clear Cart
                </Button>
                
                <Button 
                    variant={"default"} 
                    size="lg" 
                    className="w-full sm:w-auto bg-green-600 hover:bg-green-700"
                >
                    Proceed to Payment
                </Button>
            </form>
        </div>
    )
}