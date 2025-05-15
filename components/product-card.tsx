import Link from "next/link";
import Stripe from "stripe";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";

interface Props {
    product: Stripe.Product;
}

export const ProductCard = ({ product }: Props) => {

    const price = product.default_price as Stripe.Price;

    const truncateDescription = (text: string, maxLength: number = 100) => {
        if (text.length <= maxLength) return text;
        return text.slice(0, maxLength) + '...';
    };

    return (
        <Link href={`/products/${product.id}`}>
            <Card className="group hover:shadow-2xl transition duration-300 py-0 h-full flex flex-col border-gray-300 gap-0 text-center">
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

                <CardHeader className="p-4">
                    <CardTitle className="text-xl font-bold text-gray-800">
                            {product.name}
                        </CardTitle>
                    <CardContent className="p-4 flex-grow flex flex-col justify-between">
                        {product.description && (
                            <p className="text-gray-600 text-sm mb-2">{truncateDescription(product.description)}</p>
                        )}
                        {price && price.unit_amount && 
                            (<p className="text-xl font-bold">
                                RM{(price.unit_amount / 100).toFixed(2)}
                            </p>
                        )}
                        <Button className="mt-4 bg-black text-white hover:bg-gray-800 transition duration-300">View Details</Button>
                    </CardContent>
                </CardHeader>
            </Card>
        </Link>
    );         
}