
import * as React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ShoppingCart, User, Menu, Search, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { useIsMobile } from "@/hooks/use-mobile";

export function Navbar() {
  const isMobile = useIsMobile();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/products" },
    { name: "About", path: "/about" },
    { name: "Blog", path: "/blog" },
  ];

  const shopCategories = [
    { name: "Men", path: "/products?category=men" },
    { name: "Women", path: "/products?category=women" },
    { name: "New Arrivals", path: "/products?tag=new" },
    { name: "Eco Collection", path: "/products?tag=eco" },
    { name: "Sale", path: "/products?tag=sale" },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-200",
        isScrolled
          ? "bg-background/90 backdrop-blur-lg shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
              <Link to="/" className="flex items-center">
                <span className="text-xl font-bold">Leafy Souls</span>
              </Link>
              <Separator className="my-4" />
              <div className="flex flex-col gap-3 pr-4 pt-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="flex py-2 text-lg font-medium"
                  >
                    {item.name}
                  </Link>
                ))}
                <Separator className="my-2" />
                <p className="mb-1 text-sm font-medium">Shop Categories</p>
                {shopCategories.map((category) => (
                  <Link
                    key={category.path}
                    to={category.path}
                    className="flex py-1.5 text-sm font-medium text-muted-foreground"
                  >
                    {category.name}
                  </Link>
                ))}
                <Separator className="my-2" />
                <div className="flex flex-col gap-2">
                  <Button asChild className="w-full">
                    <Link to="/account">
                      <User className="mr-2 h-4 w-4" />
                      Account
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/cart">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Cart
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold">Leafy Souls</span>
        </Link>

        {!isMobile && (
          <NavigationMenu className="mx-6 hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Shop</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          to="/products"
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-leafy-100 to-leafy-200 p-6 no-underline outline-none focus:shadow-md"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium">
                            New Eco Collection
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Sustainable shoes made from recycled materials
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    {shopCategories.map((category) => (
                      <li key={category.path}>
                        <NavigationMenuLink asChild>
                          <Link
                            to={category.path}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">
                              {category.name}
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/about">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    About
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/blog">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Blog
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        )}

        <div className="flex flex-1 items-center justify-end space-x-4">
          {isSearchOpen ? (
            <div className="relative flex items-center">
              <input
                type="search"
                placeholder="Search products..."
                className="w-full rounded-full border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 h-full"
                onClick={() => setIsSearchOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              aria-label="Search"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="h-5 w-5" />
            </Button>
          )}

          <Button
            variant="ghost"
            size="icon"
            aria-label="Account"
            asChild
            className="hidden md:flex"
          >
            <Link to="/account">
              <User className="h-5 w-5" />
            </Link>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            aria-label="Shopping cart"
            asChild
          >
            <Link to="/cart">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute right-0 top-0 flex h-3 w-3 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                3
              </span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
