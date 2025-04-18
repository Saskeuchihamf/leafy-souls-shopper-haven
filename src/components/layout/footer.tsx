
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Instagram, Twitter, Facebook, Leaf } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-muted/50 pb-8 pt-16">
      <div className="container grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link to="/" className="flex items-center space-x-2">
            <Leaf className="h-6 w-6 text-leafy-600" />
            <span className="text-xl font-bold">Leafy Souls</span>
          </Link>
          <p className="mt-4 text-sm text-muted-foreground">
            Eco-conscious footwear for the modern explorer. We combine style with 
            sustainability to create shoes that look good and feel good.
          </p>
          <div className="mt-6 flex space-x-4">
            <Button variant="ghost" size="icon" aria-label="Instagram">
              <Instagram className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Twitter">
              <Twitter className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Facebook">
              <Facebook className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-medium">Shop</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/products?category=men" className="hover:text-foreground">
                Men's Collection
              </Link>
            </li>
            <li>
              <Link to="/products?category=women" className="hover:text-foreground">
                Women's Collection
              </Link>
            </li>
            <li>
              <Link to="/products?tag=new" className="hover:text-foreground">
                New Arrivals
              </Link>
            </li>
            <li>
              <Link to="/products?tag=eco" className="hover:text-foreground">
                Eco Collection
              </Link>
            </li>
            <li>
              <Link to="/products?tag=sale" className="hover:text-foreground">
                Sale
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-medium">Company</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/about" className="hover:text-foreground">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/sustainability" className="hover:text-foreground">
                Sustainability
              </Link>
            </li>
            <li>
              <Link to="/blog" className="hover:text-foreground">
                Blog
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-foreground">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/careers" className="hover:text-foreground">
                Careers
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-medium">Stay Updated</h3>
          <p className="mb-4 text-sm text-muted-foreground">
            Subscribe to get special offers, free giveaways, and eco-tips.
          </p>
          <form className="space-y-2">
            <Input placeholder="Enter your email" type="email" />
            <Button className="w-full bg-leafy-600 hover:bg-leafy-700">
              Subscribe
            </Button>
          </form>
        </div>
      </div>

      <Separator className="my-8 opacity-50" />

      <div className="container flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Leafy Souls. All rights reserved.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
          <Link to="/privacy" className="hover:text-foreground">
            Privacy Policy
          </Link>
          <Link to="/terms" className="hover:text-foreground">
            Terms of Service
          </Link>
          <Link to="/shipping" className="hover:text-foreground">
            Shipping Info
          </Link>
          <Link to="/returns" className="hover:text-foreground">
            Returns & Exchanges
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
