"use client";

import Link from "next/link";
import {
  ShoppingCartIcon,
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useCartStore } from "@/store/cart-store";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { searchProducts } from "@/app/products/actions";
import Stripe from "stripe";
import Image from "next/image";

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const { item } = useCartStore();
  const cartCount = item.reduce((acc, item) => acc + item.quantity, 0);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Stripe.Product[]>([]);
  const [isSearchLoading, setIsSearchLoading] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const performSearch = async () => {
      if (searchQuery.length > 1) {
        setIsSearchLoading(true);
        const products = await searchProducts(searchQuery);
        setSearchResults(products);
        setIsSearchLoading(false);
      } else {
        setSearchResults([]);
      }
    };

    const debounceTimeout = setTimeout(performSearch, 300);

    return () => clearTimeout(debounceTimeout);
  }, [searchQuery]);

  return (
    <nav className='sticky top-0 z-50 bg-white shadow'>
      <div className='container mx-auto flex items-center justify-between px-4 py-4'>
        <Link href='/' className='hover:text-blue-600'>
          My Ecommerce
        </Link>
        <div className='hidden md:flex space-x-6 ml-6'>
          <Link href='/products' className='hover:text-blue-600'>
            Products
          </Link>
          <Link href='/checkout' className='hover:text-blue-600'>
            Checkout
          </Link>
        </div>
        <div className='hidden md:flex flex-1 justify-center px-4'>
          <div className='relative w-full max-w-md'>
            <input
              type='text'
              placeholder='Search for products...'
              className='w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className='absolute inset-y-0 right-0 flex items-center pr-3'>
              {isSearchLoading ? (
                <svg
                  className='animate-spin h-5 w-5 text-gray-400'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                >
                  <circle
                    className='opacity-25'
                    cx='12'
                    cy='12'
                    r='10'
                    stroke='currentColor'
                    strokeWidth='4'
                  ></circle>
                  <path
                    className='opacity-75'
                    fill='currentColor'
                    d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                  ></path>
                </svg>
              ) : (
                <MagnifyingGlassIcon className='h-5 w-5 text-gray-400' />
              )}
            </div>
            {searchResults.length > 0 && (
              <div className='absolute top-full mt-2 w-full bg-white border rounded-lg shadow-lg z-10'>
                {searchResults.map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.id}`}
                    className='flex items-center p-2 hover:bg-gray-100'
                    onClick={() => setSearchQuery("")}
                  >
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      width={40}
                      height={40}
                      className='mr-4 w-auto h-auto'
                    />
                    <div>
                      <p className='font-semibold'>{product.name}</p>
                      {product.default_price && (
                        <p className='text-sm text-gray-600'>
                          RM
                          {(
                            (product.default_price as Stripe.Price)
                              .unit_amount! / 100
                          ).toFixed(2)}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className='flex items-center space-x-4'>
          <Link href='/checkout' className='relative'>
            <ShoppingCartIcon className='h-6 w-6' />
            {cartCount > 0 && (
              <span className='absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white'>
                {cartCount}
              </span>
            )}
          </Link>
          <Button
            variant='ghost'
            className='md:hidden'
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? (
              <XMarkIcon className='h-6 w-6' />
            ) : (
              <Bars3Icon className='h-6 w-6' />
            )}
          </Button>
        </div>
      </div>
      {mobileOpen && (
        <nav className='md:hidden bg-white shadow-md'>
          <ul className='flex flex-col p-4 space-y-2'>
            <li>
              <Link href='/' className='block hover:text-blue-600'>
                Home
              </Link>
            </li>
            <li>
              <Link href='/products' className='block hover:text-blue-600'>
                Products
              </Link>
            </li>
            <li>
              <Link href='/checkout' className='block hover:text-blue-600'>
                Checkout
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </nav>
  );
};
