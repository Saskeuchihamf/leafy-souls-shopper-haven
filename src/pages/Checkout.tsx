
import { useState } from "react";
import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";
import { ChevronLeft, ShieldCheck, CreditCard, Check } from "lucide-react";
import { products } from "@/data/products";

// Sample checkout data - in a real app, these would come from state management
const cartItems = [
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

const subtotal = cartItems.reduce(
  (sum, item) => sum + item.price * item.quantity,
  0
);
const shipping = 0; // Free shipping
const tax = subtotal * 0.07; // 7% tax rate
const total = subtotal + shipping + tax;

const Checkout = () => {
  const [activeStep, setActiveStep] = useState<"details" | "shipping" | "payment" | "review">("details");
  const [formState, setFormState] = useState({
    // Customer details
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    // Shipping info
    address: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    country: "USA",
    // Payment details
    cardholderName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    // Preferences
    createAccount: false,
    saveInfo: true,
    shippingMethod: "standard"
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormState(prev => ({ ...prev, [name]: checked }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleContinue = (nextStep: "details" | "shipping" | "payment" | "review") => {
    setActiveStep(nextStep);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePlaceOrder = () => {
    // In a real app, would submit order to backend
    alert("Thank you for your order! Your eco-friendly shoes are on the way.");
    // Navigate to confirmation page
  };

  return (
    <Layout hideFooter>
      <div className="container py-8">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center gap-1 px-0 text-muted-foreground" 
            asChild
          >
            <Link to="/cart">
              <ChevronLeft className="h-4 w-4" /> Back to Cart
            </Link>
          </Button>
        </div>
        
        <h1 className="text-3xl font-bold">Checkout</h1>
        
        <div className="mt-8 grid gap-12 lg:grid-cols-3 xl:grid-cols-4">
          <div className="lg:col-span-2 xl:col-span-3">
            <Tabs value={activeStep} className="w-full">
              <div className="mb-8 hidden justify-between sm:flex">
                <TabsList className="w-full grid-cols-4">
                  <TabsTrigger 
                    value="details"
                    onClick={() => setActiveStep("details")}
                    disabled={activeStep === "shipping" || activeStep === "payment" || activeStep === "review"}
                    className="data-[state=active]:bg-leafy-600 data-[state=active]:text-primary-foreground"
                  >
                    <span className="mr-2 flex h-5 w-5 items-center justify-center rounded-full bg-muted text-xs font-medium">1</span>
                    <span className="hidden sm:inline">Your Details</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="shipping"
                    onClick={() => setActiveStep("shipping")}
                    disabled={activeStep === "payment" || activeStep === "review"}
                    className="data-[state=active]:bg-leafy-600 data-[state=active]:text-primary-foreground"
                  >
                    <span className="mr-2 flex h-5 w-5 items-center justify-center rounded-full bg-muted text-xs font-medium">2</span>
                    <span className="hidden sm:inline">Shipping</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="payment"
                    onClick={() => setActiveStep("payment")}
                    disabled={activeStep === "review"}
                    className="data-[state=active]:bg-leafy-600 data-[state=active]:text-primary-foreground"
                  >
                    <span className="mr-2 flex h-5 w-5 items-center justify-center rounded-full bg-muted text-xs font-medium">3</span>
                    <span className="hidden sm:inline">Payment</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="review"
                    onClick={() => setActiveStep("review")}
                    className="data-[state=active]:bg-leafy-600 data-[state=active]:text-primary-foreground"
                  >
                    <span className="mr-2 flex h-5 w-5 items-center justify-center rounded-full bg-muted text-xs font-medium">4</span>
                    <span className="hidden sm:inline">Review</span>
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <div className="sm:hidden">
                <h2 className="mb-4 text-xl font-medium">
                  {activeStep === "details" && "Your Details"}
                  {activeStep === "shipping" && "Shipping Information"}
                  {activeStep === "payment" && "Payment Details"}
                  {activeStep === "review" && "Review Your Order"}
                </h2>
              </div>
              
              <TabsContent value="details">
                <div className="space-y-8">
                  <div>
                    <h3 className="mb-4 text-lg font-medium">Contact Information</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email address</Label>
                        <Input 
                          id="email" 
                          name="email"
                          type="email" 
                          placeholder="your@email.com" 
                          value={formState.email}
                          onChange={handleFormChange}
                          required
                        />
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="createAccount" 
                          checked={formState.createAccount}
                          onCheckedChange={(checked) => 
                            handleCheckboxChange("createAccount", checked === true)
                          }
                        />
                        <label 
                          htmlFor="createAccount" 
                          className="text-sm text-muted-foreground"
                        >
                          Create an account for faster checkout next time
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="mb-4 text-lg font-medium">Personal Information</h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First name</Label>
                        <Input 
                          id="firstName" 
                          name="firstName"
                          value={formState.firstName}
                          onChange={handleFormChange}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last name</Label>
                        <Input 
                          id="lastName" 
                          name="lastName"
                          value={formState.lastName}
                          onChange={handleFormChange}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2 sm:col-span-2">
                        <Label htmlFor="phone">Phone number</Label>
                        <Input 
                          id="phone" 
                          name="phone"
                          type="tel" 
                          placeholder="(123) 456-7890"
                          value={formState.phone}
                          onChange={handleFormChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button 
                      className="rounded-full bg-leafy-600 hover:bg-leafy-700"
                      onClick={() => handleContinue("shipping")}
                    >
                      Continue to Shipping
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="shipping">
                <div className="space-y-8">
                  <div>
                    <h3 className="mb-4 text-lg font-medium">Shipping Address</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="address">Street address</Label>
                        <Input 
                          id="address" 
                          name="address"
                          placeholder="123 Main St." 
                          value={formState.address}
                          onChange={handleFormChange}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="apartment">Apartment, suite, etc. (optional)</Label>
                        <Input 
                          id="apartment" 
                          name="apartment"
                          value={formState.apartment}
                          onChange={handleFormChange}
                        />
                      </div>
                      
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="city">City</Label>
                          <Input 
                            id="city" 
                            name="city"
                            value={formState.city}
                            onChange={handleFormChange}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="state">State</Label>
                          <Input 
                            id="state" 
                            name="state"
                            value={formState.state}
                            onChange={handleFormChange}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="zipCode">ZIP / Postal code</Label>
                          <Input 
                            id="zipCode" 
                            name="zipCode"
                            value={formState.zipCode}
                            onChange={handleFormChange}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="country">Country</Label>
                          <Select defaultValue="USA" onValueChange={(value) => handleSelectChange("country", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select country" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="USA">United States</SelectItem>
                              <SelectItem value="CAN">Canada</SelectItem>
                              <SelectItem value="MEX">Mexico</SelectItem>
                              <SelectItem value="GBR">United Kingdom</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="saveInfo" 
                          checked={formState.saveInfo}
                          onCheckedChange={(checked) => 
                            handleCheckboxChange("saveInfo", checked === true)
                          } 
                        />
                        <label 
                          htmlFor="saveInfo" 
                          className="text-sm text-muted-foreground"
                        >
                          Save this information for next time
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="mb-4 text-lg font-medium">Shipping Method</h3>
                    <RadioGroup 
                      defaultValue="standard" 
                      className="space-y-3"
                      onValueChange={(value) => handleSelectChange("shippingMethod", value)}
                    >
                      <div className="flex items-center space-x-3 rounded-md border p-4">
                        <RadioGroupItem value="standard" id="standard" />
                        <Label htmlFor="standard" className="flex-1">
                          <div className="font-medium">Standard Shipping</div>
                          <div className="text-sm text-muted-foreground">3-5 business days</div>
                        </Label>
                        <div className="font-medium">Free</div>
                      </div>
                      
                      <div className="flex items-center space-x-3 rounded-md border p-4">
                        <RadioGroupItem value="express" id="express" />
                        <Label htmlFor="express" className="flex-1">
                          <div className="font-medium">Express Shipping</div>
                          <div className="text-sm text-muted-foreground">2-3 business days</div>
                        </Label>
                        <div className="font-medium">$12.99</div>
                      </div>
                      
                      <div className="flex items-center space-x-3 rounded-md border p-4">
                        <RadioGroupItem value="overnight" id="overnight" />
                        <Label htmlFor="overnight" className="flex-1">
                          <div className="font-medium">Overnight Shipping</div>
                          <div className="text-sm text-muted-foreground">1 business day</div>
                        </Label>
                        <div className="font-medium">$24.99</div>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="flex justify-between">
                    <Button 
                      variant="outline" 
                      onClick={() => handleContinue("details")}
                    >
                      Back
                    </Button>
                    
                    <Button 
                      className="rounded-full bg-leafy-600 hover:bg-leafy-700"
                      onClick={() => handleContinue("payment")}
                    >
                      Continue to Payment
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="payment">
                <div className="space-y-8">
                  <div>
                    <h3 className="mb-4 flex items-center text-lg font-medium">
                      <div className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-leafy-600 text-xs text-white">
                        <ShieldCheck className="h-4 w-4" />
                      </div>
                      Secure Payment
                    </h3>
                    
                    <div className="mb-6 flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        All transactions are secure and encrypted
                      </span>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardholderName">Cardholder name</Label>
                        <Input 
                          id="cardholderName" 
                          name="cardholderName"
                          placeholder="Name on card"
                          value={formState.cardholderName}
                          onChange={handleFormChange}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card number</Label>
                        <Input 
                          id="cardNumber" 
                          name="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={formState.cardNumber}
                          onChange={handleFormChange}
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiryDate">Expiry date</Label>
                          <Input 
                            id="expiryDate" 
                            name="expiryDate"
                            placeholder="MM/YY"
                            value={formState.expiryDate}
                            onChange={handleFormChange}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV</Label>
                          <Input 
                            id="cvv" 
                            name="cvv"
                            placeholder="123"
                            value={formState.cvv}
                            onChange={handleFormChange}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="mt-2 text-center">
                        <p className="text-xs text-muted-foreground">
                          By placing your order, you agree to our{" "}
                          <Link to="/terms" className="text-leafy-600 hover:underline">Terms and Conditions</Link> and{" "}
                          <Link to="/privacy" className="text-leafy-600 hover:underline">Privacy Policy</Link>
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <Button 
                      variant="outline" 
                      onClick={() => handleContinue("shipping")}
                    >
                      Back
                    </Button>
                    
                    <Button 
                      className="rounded-full bg-leafy-600 hover:bg-leafy-700"
                      onClick={() => handleContinue("review")}
                    >
                      Review Order
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="review">
                <div className="space-y-8">
                  <div>
                    <h3 className="mb-4 text-lg font-medium">Review Your Order</h3>
                    
                    <div className="space-y-6">
                      <div className="rounded-md bg-muted p-4">
                        <h4 className="mb-2 font-medium">Contact & Shipping</h4>
                        <div className="grid gap-2 text-sm">
                          <p>
                            <span className="font-medium">Contact:</span>{" "}
                            {formState.email} | {formState.phone}
                          </p>
                          <p>
                            <span className="font-medium">Ship to:</span>{" "}
                            {formState.firstName} {formState.lastName}, {formState.address}
                            {formState.apartment && `, ${formState.apartment}`}, {formState.city}, {formState.state} {formState.zipCode}, {formState.country}
                          </p>
                          <p>
                            <span className="font-medium">Shipping method:</span>{" "}
                            {formState.shippingMethod === "standard" 
                              ? "Standard (3-5 business days)"
                              : formState.shippingMethod === "express"
                                ? "Express (2-3 business days)"
                                : "Overnight (1 business day)"
                            }
                          </p>
                        </div>
                        <Button 
                          variant="link" 
                          className="mt-2 h-auto p-0 text-leafy-600"
                          onClick={() => handleContinue("shipping")}
                        >
                          Edit
                        </Button>
                      </div>
                      
                      <div className="rounded-md bg-muted p-4">
                        <h4 className="mb-2 font-medium">Payment</h4>
                        <div className="text-sm">
                          <p>
                            <span className="font-medium">Payment method:</span>{" "}
                            Credit Card ending in {formState.cardNumber.slice(-4)}
                          </p>
                        </div>
                        <Button 
                          variant="link" 
                          className="mt-2 h-auto p-0 text-leafy-600"
                          onClick={() => handleContinue("payment")}
                        >
                          Edit
                        </Button>
                      </div>
                      
                      <div className="space-y-4">
                        <h4 className="font-medium">Order Summary</h4>
                        
                        <div className="space-y-4">
                          {cartItems.map((item) => (
                            <div key={item.id} className="flex gap-4">
                              <div className="h-20 w-20 overflow-hidden rounded-md bg-muted">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div className="flex flex-1 flex-col">
                                <div className="flex justify-between">
                                  <div>
                                    <h5 className="font-medium">{item.name}</h5>
                                    <div className="mt-1 flex gap-4 text-xs text-muted-foreground">
                                      <span>Size: {item.size}</span>
                                      <span>Color: {item.color}</span>
                                      <span>Qty: {item.quantity}</span>
                                    </div>
                                  </div>
                                  <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Shipping</span>
                            {shipping === 0 ? (
                              <span className="text-leafy-600">Free</span>
                            ) : (
                              <span>${shipping.toFixed(2)}</span>
                            )}
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Tax</span>
                            <span>${tax.toFixed(2)}</span>
                          </div>
                          <Separator className="my-2" />
                          <div className="flex justify-between font-medium">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <Button 
                      variant="outline" 
                      onClick={() => handleContinue("payment")}
                    >
                      Back
                    </Button>
                    
                    <Button 
                      onClick={handlePlaceOrder}
                      className="rounded-full bg-leafy-600 hover:bg-leafy-700"
                    >
                      Place Order
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-xl border bg-card p-6 shadow-sm">
              <h3 className="text-lg font-medium">Order Summary</h3>
              <div className="mt-4 space-y-4 divide-y">
                <div className="max-h-72 space-y-4 overflow-y-auto pr-2">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-3 pt-4 first:pt-0">
                      <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-muted">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <div className="flex justify-between">
                          <p className="text-sm font-medium">{item.name}</p>
                          <p className="text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                        <div className="mt-1 flex gap-2 text-xs text-muted-foreground">
                          <span>Size: {item.size}</span>
                          <span className="text-muted-foreground">×</span>
                          <span>{item.quantity}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-2 pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    {shipping === 0 ? (
                      <span className="text-leafy-600">Free</span>
                    ) : (
                      <span>${shipping.toFixed(2)}</span>
                    )}
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="flex justify-between pt-4 font-medium">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="mt-6">
                <div className="rounded-md bg-leafy-50 p-3">
                  <div className="flex items-center gap-2 text-sm text-leafy-900">
                    <Check className="h-4 w-4 text-leafy-600" />
                    <span>Carbon-neutral shipping</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;

import { Leaf } from "lucide-react";
