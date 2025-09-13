import { ProductFilter } from "@/components/product-filter";

export default function ProductsPage() {
    return (
        <div className="pb-8">
            <h1 className="text-3xl font-bold leading-none tracking-tight text-foreground text-center mb-8">
                All Products
            </h1>
            <ProductFilter />
        </div>
    )
}