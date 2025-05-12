import Image from "next/image";
import styles from "./page.module.css";
import { stripe } from "@/lib/stripe";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Carousel } from "@/components/carousel";

export default async function Home() {

const products = await stripe.products.list({
  expand: ["data.default_price"],
  limit: 5,
});
  
  return (
    <div>
      <section className="rounded bg-neutral-100 py-8 sm:py-12">
        <div className="mx-auto grid grid-clos-1 items-center justify-items-cnter gap-8 px-8 sm:px-16 md:grid-cols-2">
          <div className="mx-w-md space-y-4">
            <h2 className="text=3xl font-bold tracking-tight md-text-4xl">Welcome to our store</h2>
            <p className="text-natural-600">Discover new upgrade for your phone.</p>
            <Button 
              asChild 
              variant="default"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 bg-black text-white hover:bg-black/80"
            >
              <Link 
              href="/products"
              className="inline-flex items-center justify-center rounded-full px-6 py-3"
              >Browse The Smartphone</Link>
            </Button>
          </div>
          <Image 
            alt="Banner Image" 
            src={products.data[0].images[0]} 
            className="rounded"
            width={450} 
            height={450}/>
        </div>
      </section>
      <section className="py-8">
        <Carousel products={products.data} />
      </section>
    </div>
  );
}
