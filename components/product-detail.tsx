import Stripe from "stripe"
import Image from "next/image"
import { Button } from "./ui/button";


interface Props {
    product: Stripe.Product
}

export const ProductDetail = ({product}: Props) => {

    const price = product.default_price as Stripe.Price;
    
    return(
        <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8 items-center">
                {product.images && product.images[0] && (
                        <div className="relative h-[300px] w-full overflow-hidden">
                            <Image 
                                src={product.images[0]} 
                                alt={product.name}
                                fill
                                className="object-contain transition-opacity duration-500 ease-in-out"
                            />
                        </div>
                    )}

                    <div className="md:w-1/2">
                        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                        {product.description && <p className="text-gray-700 mb-4">{product.description}</p>}
                        
                        {price && price.unit_amount && 
                                (<p className="text-lg font-semibold text-gray-900">
                                    RM{(price.unit_amount / 100).toFixed(2)}
                                </p>
                            )}

                            <div className="flex items-center space-x-4">
                                <Button variant={"outline"}> -</Button>
                                    <span className="text-lg font-semibold"> 0</span>
                                <Button variant={"outline"}> +</Button>
                            </div>
                    </div>
        </div>
    )}