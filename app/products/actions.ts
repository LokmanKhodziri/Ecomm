'use server'

import { stripe } from "@/lib/stripe";

export async function getProducts() {
  const products = await stripe.products.list({
    expand: ["data.default_price"],
  });

  

  const categories = [
    ...new Set(
      products.data
        .map((product) => product.metadata.category)
        .filter((category): category is string => typeof category === 'string')
    ),
  ];

  const brands = [
    ...new Set(
      products.data
        .map((product) => product.metadata.Brand)
        .filter((brand): brand is string => typeof brand === 'string')
    ),
  ];

  return { products: products.data, categories, brands };
}

export async function searchProducts(query: string) {
  if (!query) {
    return [];
  }

  const products = await stripe.products.search({
    query: `name~"${query}"`,
    expand: ["data.default_price"],
  });

  return products.data;
}