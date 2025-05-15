import Stripe from "stripe"
import Image from "next/image"


interface Props {
    product: Stripe.Product
}

export const ProductDetail = ({product}: Props) => {

    const price = product.default_price as Stripe.Price;
    
    return<div>
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

                <div>
                    <h1>{product.name}</h1>
                    {product.description && <p>{product.description}</p>}
                    
                    {price && price.unit_amount && 
                            (<p className="text-xl font-bold">
                                RM{(price.unit_amount / 100).toFixed(2)}
                            </p>
                        )}
                </div>
    </div>
}