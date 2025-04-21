
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { Button } from "./button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  isNew?: boolean;
  isEco?: boolean;
  className?: string;
}

const INR_SYMBOL = "₹";

export const ProductCard = ({
  id,
  name,
  price,
  image,
  category,
  isNew = false,
  isEco = false,
  className,
}: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast({
      title: "Added to cart",
      description: `${name} has been added to your cart.`,
    });
  };

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? "Removed from wishlist" : "Added to wishlist",
      description: `${name} has been ${isFavorite ? "removed from" : "added to"} your wishlist.`,
    });
  };

  return (
    <div 
      className={cn("group relative overflow-hidden rounded-xl", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/products/${id}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-muted transition-all duration-300 ease-in-out">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {isNew && (
            <span className="absolute left-4 top-4 rounded-full bg-leafy-500 px-3 py-1 text-xs font-medium text-white">
              New
            </span>
          )}
          {isEco && (
            <span className="absolute right-4 top-4 rounded-full bg-soil-500/80 px-3 py-1 text-xs font-medium text-white">
              Eco
            </span>
          )}
          
          <button
            className={cn(
              "absolute right-4 top-16 rounded-full bg-white/90 p-2 transition-all",
              isFavorite ? "text-red-500" : "text-gray-600"
            )}
            onClick={handleFavoriteToggle}
          >
            <Heart className={cn("h-4 w-4", isFavorite ? "fill-current" : "")} />
          </button>
          
          <div 
            className={cn(
              "absolute bottom-0 left-0 right-0 bg-white/90 p-3 transform transition-transform duration-300",
              isHovered ? "translate-y-0" : "translate-y-full"
            )}
          >
            <Button 
              onClick={handleAddToCart}
              variant="default" 
              size="sm" 
              className="w-full rounded-full bg-leafy-500 hover:bg-leafy-600"
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </Link>
      <div className="mt-4 space-y-1 text-left">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-foreground line-clamp-1">{name}</h3>
          <p className="font-medium text-primary">{INR_SYMBOL}{price.toFixed(2)}</p>
        </div>
        <p className="text-sm text-muted-foreground capitalize">{category}</p>
      </div>
    </div>
  );
};

export default ProductCard;
