"use server"

import { stripe } from "@/lib/stripe";
import { CartItem } from "@/store/cart-store";
import { redirect } from "next/navigation";

export const checkoutAction = async (formData: FormData): Promise<void> => {
        const items = JSON.parse(formData.get("items") as string);
        const line_items = items.map((item: CartItem) => ({
            price_data: {
                currency: "myr",
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price,
            },
            quantity: item.quantity,
        }))

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items,
            mode: "payment",
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cancel`,
        })

        redirect(session.url!)
}