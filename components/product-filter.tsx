'use client'

import { useState, useEffect } from 'react';
import { ProductList } from "@/components/product-list";
import { getProducts } from "@/app/products/actions";
import Stripe from 'stripe';

export const ProductFilter = () => {
    const [products, setProducts] = useState<Stripe.Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Stripe.Product[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [brands, setBrands] = useState<string[]>([]);
    const [sortOption, setSortOption] = useState('price_asc');
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const { products, categories, brands } = await getProducts();
            console.log("Fetched products:", products);
            console.log("Fetched categories:", categories);
            console.log("Fetched brands:", brands);
            setProducts(products);
            setFilteredProducts(products);
            setCategories(categories);
            setBrands(brands);
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        let tempProducts = [...products];

        if (selectedCategories.length > 0) {
            tempProducts = tempProducts.filter(product => 
                product.metadata.category && selectedCategories.includes(product.metadata.category)
            );
        }

        if (selectedBrands.length > 0) {
            tempProducts = tempProducts.filter(product => 
                product.metadata.Brand && selectedBrands.includes(product.metadata.Brand)
            );
        }

        if (sortOption === 'price_asc') {
            tempProducts.sort((a, b) => {
                const priceA = a.default_price as Stripe.Price;
                const priceB = b.default_price as Stripe.Price;
                return (priceA.unit_amount || 0) - (priceB.unit_amount || 0);
            });
        } else if (sortOption === 'price_desc') {
            tempProducts.sort((a, b) => {
                const priceA = a.default_price as Stripe.Price;
                const priceB = b.default_price as Stripe.Price;
                return (priceB.unit_amount || 0) - (priceA.unit_amount || 0);
            });
        }

        
        setFilteredProducts(tempProducts);
    }, [sortOption, selectedCategories, selectedBrands, products]);

    const handleCategoryChange = (category: string) => {
        setSelectedCategories(prev => 
            prev.includes(category) 
                ? prev.filter(c => c !== category) 
                : [...prev, category]
        );
    };

    const handleBrandChange = (brand: string) => {
        setSelectedBrands(prev => 
            prev.includes(brand) 
                ? prev.filter(b => b !== brand) 
                : [...prev, brand]
        );
    };

    return (
        <div className="flex gap-8">
            <aside className="w-1/4">
                <h2 className="text-xl font-bold mb-4">Filters</h2>
                <div>
                    <h3 className="text-lg font-semibold mb-2">Sort by</h3>
                    <select 
                        value={sortOption} 
                        onChange={(e) => setSortOption(e.target.value)}
                        className="w-full p-2 border rounded"
                    >
                        <option value="price_asc">Price: Low to High</option>
                        <option value="price_desc">Price: High to Low</option>
                    </select>
                </div>
                <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2">Category</h3>
                    {categories.map(category => (
                        <div key={category} className="flex items-center">
                            <input 
                                type="checkbox" 
                                id={category} 
                                value={category}
                                checked={selectedCategories.includes(category)}
                                onChange={() => handleCategoryChange(category)}
                                className="mr-2"
                            />
                            <label htmlFor={category}>{category}</label>
                        </div>
                    ))}
                </div>
                <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2">Brand</h3>
                    {brands.map(brand => (
                        <div key={brand} className="flex items-center">
                            <input 
                                type="checkbox" 
                                id={brand} 
                                value={brand}
                                checked={selectedBrands.includes(brand)}
                                onChange={() => handleBrandChange(brand)}
                                className="mr-2"
                            />
                            <label htmlFor={brand}>{brand}</label>
                        </div>
                    ))}
                </div>
            </aside>
            <main className="w-3/4">
                <ProductList products={filteredProducts} />
            </main>
        </div>
    );
};