import Link from "next/link"

export const Navbar = () => {
    return (
        <nav className="sticky top-0 z-50 bg-white shadow">
            <div className="container mx-auto px-4 py-4">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <Link href="/" className="text-xl font-bold hover:text-blue-500 mb-4 md:mb-0">
                        My Ecommerce
                    </Link>
                    <div className="flex space-x-6">
                        <Link href="/" className="hover:text-blue-500">
                            Home
                        </Link>
                        <Link href="/products" className="hover:text-blue-500">
                            Products
                        </Link>
                        <Link href="/checkout" className="hover:text-blue-500">
                            Checkout
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}