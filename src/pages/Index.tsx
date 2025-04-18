
import { useState } from "react";
import { Layout } from "@/components/layout/layout";
import { HeroSection } from "@/components/ui/hero-section";
import { FeaturedCollection } from "@/components/ui/featured-collection";
import { Button } from "@/components/ui/button";
import { Leaf, Recycle, Globe } from "lucide-react";
import { products } from "@/data/products";

const featuredProducts = products.filter((product) => product.isFeatured).map(product => ({
  id: product.id,
  name: product.name,
  price: product.price,
  image: product.images[0],
  category: product.category,
  isNew: product.isNew,
  isEco: product.isEco,
}));

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <HeroSection
        title="Step Lightly on Earth."
        subtitle="Discover our collection of eco-conscious footwear designed to reduce your carbon footprint while elevating your style."
        image="https://images.unsplash.com/photo-1513836279014-a89f7a76ae86"
        ctaText="Shop Collection"
        ctaLink="/products"
        secondaryCta={{
          text: "Our Materials",
          link: "/sustainability",
        }}
      />

      {/* Featured Products */}
      <section className="container py-16 md:py-24">
        <FeaturedCollection
          title="Featured Collection"
          description="Our most popular eco-friendly styles"
          products={featuredProducts}
        />
      </section>

      {/* Sustainability Section */}
      <section className="bg-muted/50 py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight">Our Commitment to Sustainability</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We believe that style and sustainability can coexist. Every pair of Leafy Souls
              shoes is crafted with the planet in mind.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-leafy-100">
                <Recycle className="h-8 w-8 text-leafy-700" />
              </div>
              <h3 className="mt-6 text-xl font-medium">Recycled Materials</h3>
              <p className="mt-2 text-muted-foreground">
                We transform plastic bottles, industrial waste, and excess
                fabrics into high-quality footwear.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-leafy-100">
                <Leaf className="h-8 w-8 text-leafy-700" />
              </div>
              <h3 className="mt-6 text-xl font-medium">Plant-Based Components</h3>
              <p className="mt-2 text-muted-foreground">
                From natural rubber outsoles to organic cotton laces, we use
                renewable resources whenever possible.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-leafy-100">
                <Globe className="h-8 w-8 text-leafy-700" />
              </div>
              <h3 className="mt-6 text-xl font-medium">Carbon Neutral</h3>
              <p className="mt-2 text-muted-foreground">
                We offset 100% of our carbon emissions from production and
                shipping through verified environmental projects.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <div 
          className="absolute inset-0 z-0" 
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1518495973542-4542c06a5843')", 
            backgroundSize: "cover", 
            backgroundPosition: "center",
            opacity: 0.2 
          }}
        ></div>
        <div className="container relative z-10">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              Join the Movement
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Every purchase makes a difference. Together, we can create a more
              sustainable future, one step at a time.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" className="rounded-full bg-leafy-500 hover:bg-leafy-600">
                <a href="/products">Shop Now</a>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full">
                <a href="/about">Learn More</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-accent py-16">
        <div className="container">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="text-2xl font-bold">Stay Connected</h2>
            <p className="mt-4 text-muted-foreground">
              Subscribe to our newsletter for sustainable style tips, new product releases, and exclusive offers.
            </p>
            <form className="mt-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center sm:space-x-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="mb-4 h-12 w-full rounded-full bg-background px-6 sm:mb-0 sm:w-auto"
                  required
                />
                <Button type="submit" className="h-12 rounded-full bg-leafy-500 hover:bg-leafy-600">
                  Subscribe
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
