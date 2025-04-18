
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { products } from "@/data/products";
import { ChevronLeft, Truck, Leaf, ShieldCheck, Star, Heart, Share2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === id);

  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!product) {
    return (
      <Layout>
        <div className="container py-12 text-center">
          <h2 className="text-2xl font-bold">Product Not Found</h2>
          <p className="mt-4">Sorry, we couldn't find the product you're looking for.</p>
          <Button className="mt-6" onClick={() => navigate("/products")}>
            Return to Shop
          </Button>
        </div>
      </Layout>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }
    
    // In a real app, would dispatch to cart state/context
    console.log("Added to cart:", {
      ...product,
      selectedSize,
      quantity
    });
    
    // Show success message or redirect to cart
    alert(`Added ${product.name} to your cart!`);
  };

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  return (
    <Layout>
      <div className="container py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center gap-1 px-0 text-muted-foreground"
            onClick={() => navigate("/products")}
          >
            <ChevronLeft className="h-4 w-4" /> Back to Products
          </Button>
        </div>
        
        {/* Product Details */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square overflow-hidden rounded-xl bg-muted">
              <img
                src={product.images[selectedImageIndex]}
                alt={product.name}
                className="h-full w-full object-cover object-center"
              />
            </div>
            
            {/* Thumbnail Images */}
            <div className="flex gap-4 overflow-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`aspect-square h-20 w-20 overflow-hidden rounded-md border-2 ${
                    index === selectedImageIndex
                      ? "border-primary"
                      : "border-transparent"
                  }`}
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <img
                    src={image}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* Product Info */}
          <div>
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <h1 className="text-3xl font-bold">{product.name}</h1>
                <p className="mt-1 text-xl font-medium text-primary">
                  ${product.price.toFixed(2)}
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon">
                  <Heart className="h-4 w-4" />
                  <span className="sr-only">Add to wishlist</span>
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="h-4 w-4" />
                  <span className="sr-only">Share</span>
                </Button>
              </div>
            </div>
            
            <div className="mt-6 flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-4 w-4 ${
                    star <= 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
              <span className="ml-2 text-sm text-muted-foreground">
                4.0 (24 reviews)
              </span>
            </div>
            
            <Separator className="my-6" />
            
            <p className="text-muted-foreground">{product.description}</p>
            
            {product.isEco && (
              <div className="mt-4 flex items-center gap-2 rounded-lg bg-leafy-50 p-3 text-sm text-leafy-900">
                <Leaf className="h-4 w-4 text-leafy-600" />
                <span>Made with sustainable materials. This product reduces environmental impact.</span>
              </div>
            )}
            
            <Separator className="my-6" />
            
            {/* Size Selection */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <h3 className="font-medium">Select Size</h3>
                <Button variant="link" className="h-auto p-0 text-muted-foreground">
                  Size Guide
                </Button>
              </div>
              <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
                {product.size.map((size) => (
                  <Button
                    key={size}
                    type="button"
                    variant={selectedSize === size ? "default" : "outline"}
                    className={`h-10 ${
                      selectedSize === size ? "bg-primary text-primary-foreground" : ""
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </Button>
                ))}
              </div>
              {selectedSize === "" && (
                <p className="mt-2 text-sm text-muted-foreground">Please select a size</p>
              )}
            </div>
            
            <div className="mt-6 space-y-6">
              {/* Quantity Selector */}
              <div>
                <h3 className="mb-2 font-medium">Quantity</h3>
                <div className="flex w-fit items-center rounded-md border">
                  <Button
                    type="button"
                    variant="ghost"
                    className="h-10 w-10 rounded-l-md"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    -
                  </Button>
                  <span className="flex h-10 w-10 items-center justify-center">
                    {quantity}
                  </span>
                  <Button
                    type="button"
                    variant="ghost"
                    className="h-10 w-10 rounded-r-md"
                    onClick={() => handleQuantityChange(1)}
                  >
                    +
                  </Button>
                </div>
              </div>
              
              {/* Add to Cart Button */}
              <Button 
                onClick={handleAddToCart} 
                className="w-full bg-leafy-600 hover:bg-leafy-700"
                size="lg"
              >
                Add to Cart
              </Button>
            </div>
            
            {/* Shipping & Returns */}
            <div className="mt-8 grid gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                  <Truck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">Free Shipping</h4>
                  <p className="text-xs text-muted-foreground">On all orders over $50</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">Returns & Exchanges</h4>
                  <p className="text-xs text-muted-foreground">Free within 30 days</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Product Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="details">
            <TabsList className="w-full justify-start border-b">
              <TabsTrigger value="details">Product Details</TabsTrigger>
              <TabsTrigger value="sustainability">Sustainability</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="pt-6">
              <div className="space-y-6">
                <div>
                  <h3 className="mb-2 text-lg font-medium">Features</h3>
                  <ul className="list-disc space-y-1 pl-5">
                    {product.features.map((feature, index) => (
                      <li key={index} className="text-muted-foreground">
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="mb-2 text-lg font-medium">Care Instructions</h3>
                  <p className="text-muted-foreground">
                    To extend the life of your shoes, we recommend spot cleaning with a damp cloth. 
                    For deeper cleaning, use mild soap and warm water. Allow to air dry away from direct 
                    heat sources. Do not machine wash or tumble dry.
                  </p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="sustainability" className="pt-6">
              <div className="space-y-6">
                <p className="text-muted-foreground">
                  At Leafy Souls, we're committed to creating shoes with a minimal environmental footprint. 
                  Every pair is designed with sustainability in mind, using eco-friendly materials and 
                  responsible manufacturing processes.
                </p>
                
                <div>
                  <h3 className="mb-2 text-lg font-medium">Materials</h3>
                  <p className="text-muted-foreground">
                    This product is made with recycled and sustainable materials, including:
                  </p>
                  <ul className="mt-2 list-disc space-y-1 pl-5">
                    <li className="text-muted-foreground">Upper made from recycled plastic bottles</li>
                    <li className="text-muted-foreground">Natural rubber outsoles</li>
                    <li className="text-muted-foreground">Organic cotton lining and laces</li>
                    <li className="text-muted-foreground">Water-based adhesives</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="mb-2 text-lg font-medium">Impact</h3>
                  <p className="text-muted-foreground">
                    Each pair of these shoes diverts approximately 6 plastic bottles from landfills 
                    and reduces carbon emissions by 30% compared to conventional footwear manufacturing.
                  </p>
                </div>
                
                <div>
                  <h3 className="mb-2 text-lg font-medium">End of Life</h3>
                  <p className="text-muted-foreground">
                    When your shoes reach the end of their life, return them to us for recycling through 
                    our Soles4Souls program, and receive 15% off your next purchase.
                  </p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="pt-6">
              <div className="space-y-6">
                <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                  <div>
                    <h3 className="text-lg font-medium">Customer Reviews</h3>
                    <div className="mt-1 flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-sm text-muted-foreground">
                        Based on 24 reviews
                      </span>
                    </div>
                  </div>
                  <Button>Write a Review</Button>
                </div>
                
                <Separator />
                
                <div className="space-y-6">
                  {/* Sample reviews */}
                  {[
                    {
                      name: "Alex P.",
                      rating: 5,
                      date: "2 months ago",
                      content:
                        "Love these shoes! They're comfortable right out of the box and I appreciate the eco-friendly materials. I've gotten multiple compliments on them already.",
                    },
                    {
                      name: "Jamie S.",
                      rating: 4,
                      date: "3 months ago",
                      content:
                        "Great shoes that look and feel good. The only reason I'm giving 4 stars instead of 5 is that they run slightly large. I'd recommend sizing down half a size.",
                    },
                    {
                      name: "Taylor M.",
                      rating: 5,
                      date: "6 months ago",
                      content:
                        "These shoes are exactly what I was looking for - stylish, comfortable, and environmentally conscious. I like that I can feel good about my purchase knowing it's not harming the planet.",
                    },
                  ].map((review, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{review.name}</h4>
                          <div className="flex items-center gap-2">
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`h-3 w-3 ${
                                    star <= review.rating
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {review.date}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{review.content}</p>
                      {index !== 2 && <Separator className="mt-4" />}
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Related Products */}
        <div className="mt-24">
          <h2 className="text-center text-2xl font-bold">You May Also Like</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products
              .filter(p => p.id !== product.id && p.category === product.category)
              .slice(0, 4)
              .map(p => (
                <div 
                  key={p.id}
                  className="group cursor-pointer"
                  onClick={() => navigate(`/products/${p.id}`)}
                >
                  <div className="relative mb-4 aspect-square overflow-hidden rounded-xl bg-muted">
                    <img 
                      src={p.images[0]} 
                      alt={p.name} 
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <h3 className="font-medium">{p.name}</h3>
                  <p className="text-primary">${p.price.toFixed(2)}</p>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
