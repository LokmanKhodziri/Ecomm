import Link from "next/link"

export const Navbar = () => {
    return (
        <nav className="sticky top-0 z-50 bg-white shadow">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link href="/" className="hover:text-blue-500">
                My Ecommerce
                </Link>
            </div>
            <div className="hidden md:flex space-x-6">
                <Link href="/">Home</Link>
                <Link href="/products" className="hover:text-blue-500">
                Products
                </Link>
                <Link href="/checkout" className="hover:text-blue-500">
                Checkout
                </Link>
            </div>
            <div className="flex item-center space-x-4"></div>
        </nav>
    )
}