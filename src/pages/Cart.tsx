import { useState } from "react";
import { Layout } from "@/components/layout/layout";
import { CartItem } from "@/components/ui/cart-item";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { products } from "@/data/products";

const INR_SYMBOL = "₹";

const initialCartItems = [
  {
    id: products[0].id,
    name: products[0].name,
    price: products[0].price,
    image: products[0].images[0],
    size: "9",
    color: "Green",
    quantity: 1
  },
  {
    id: products[1].id,
    name: products[1].name,
    price: products[1].price,
    image: products[1].images[0],
    size: "7",
    color: "Beige",
    quantity: 2
  }
];

const Cart = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);

  const handleRemoveItem = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  // Calculate cart totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = cartItems.length > 0 ? (subtotal >= 100 * 83 ? 0 : 9.99 * 83) : 0;
  const tax = subtotal * 0.07; // 7% tax rate
  const total = subtotal + shipping + tax;

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold">Your Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="mt-16 flex flex-col items-center text-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-muted">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
            <h2 className="mt-6 text-2xl font-medium">Your cart is empty</h2>
            <p className="mt-2 max-w-sm text-muted-foreground">
              Looks like you haven't added any items to your cart yet. Start shopping to fill it up!
            </p>
            <Button asChild className="mt-8 rounded-full bg-leafy-600 hover:bg-leafy-700">
              <Link to="/products">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="mt-8 grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    price={item.price}
                    image={item.image}
                    size={item.size}
                    color={item.color}
                    quantity={item.quantity}
                    onRemove={handleRemoveItem}
                    onUpdateQuantity={handleUpdateQuantity}
                  />
                ))}
              </div>

              <div className="mt-8">
                <Button
                  asChild
                  variant="ghost"
                  className="flex items-center gap-2 text-muted-foreground"
                >
                  <Link to="/products">
                    <ChevronLeft className="h-4 w-4" /> Continue Shopping
                  </Link>
                </Button>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="rounded-xl border bg-card p-6 shadow-sm">
                <h2 className="text-xl font-medium">Order Summary</h2>
                
                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{INR_SYMBOL}{subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    {shipping === 0 ? (
                      <span className="text-leafy-600">Free</span>
                    ) : (
                      <span>{INR_SYMBOL}{shipping.toFixed(2)}</span>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Estimated Tax</span>
                    <span>{INR_SYMBOL}{tax.toFixed(2)}</span>
                  </div>

                  <Separator />
                  
                  <div className="flex items-center justify-between font-medium">
                    <span>Total</span>
                    <span>{INR_SYMBOL}{total.toFixed(2)}</span>
                  </div>
                  
                  {shipping > 0 && (
                    <p className="text-xs text-muted-foreground">
                      Add {INR_SYMBOL}{(8300 - subtotal).toFixed(2)} more to get free shipping!
                    </p>
                  )}
                </div>

                <div className="mt-6 space-y-4">
                  <Button asChild className="w-full bg-leafy-600 hover:bg-leafy-700">
                    <Link to="/checkout">
                      Checkout <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                
                <div className="mt-6">
                  <p className="text-center text-xs text-muted-foreground">
                    We accept all major credit cards, PayPal, Apple Pay and Google Pay
                  </p>
                </div>
              </div>
              
              <div className="mt-6 rounded-xl border bg-card p-6 shadow-sm">
                <h3 className="text-sm font-medium">Have a promo code?</h3>
                <div className="mt-2 flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code"
                    className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                  <Button variant="outline">Apply</Button>
                </div>
              </div>
              
              <div className="mt-6 space-y-4 rounded-xl border bg-card p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-leafy-100 p-2">
                    <Leaf className="h-4 w-4 text-leafy-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Eco-packaging</h3>
                    <p className="text-xs text-muted-foreground">
                      All orders are shipped in 100% recyclable packaging
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-leafy-100 p-2">
                    <Truck className="h-4 w-4 text-leafy-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Free shipping</h3>
                    <p className="text-xs text-muted-foreground">
                      On all orders over $100
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-leafy-100 p-2">
                    <CircleHelp className="h-4 w-4 text-leafy-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Need help?</h3>
                    <p className="text-xs text-muted-foreground">
                      <a href="/contact" className="text-leafy-600 hover:underline">
                        Contact our support team
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cart;

import { Leaf, Truck, CircleHelp } from "lucide-react";
