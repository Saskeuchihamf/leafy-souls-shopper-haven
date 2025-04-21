
import { Button } from "@/components/ui/button";
import { X, Plus, Minus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface CartItemProps {
  id: string;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
}

const INR_SYMBOL = "₹";

export function CartItem({
  id,
  name,
  price,
  image,
  size,
  color,
  quantity,
  onRemove,
  onUpdateQuantity,
}: CartItemProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const { toast } = useToast();

  const handleIncreaseQuantity = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
    onUpdateQuantity(id, quantity + 1);
    toast({
      description: `Increased quantity of ${name} to ${quantity + 1}`,
    });
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 300);
      onUpdateQuantity(id, quantity - 1);
      toast({
        description: `Decreased quantity of ${name} to ${quantity - 1}`,
      });
    }
  };

  const handleRemove = () => {
    onRemove(id);
    toast({
      title: "Item removed",
      description: `${name} has been removed from your cart.`,
      variant: "destructive",
    });
  };

  return (
    <div 
      className={`grid grid-cols-[120px_1fr] gap-4 border-b py-6 rounded-lg transition-all duration-300 ${
        isHovering ? "bg-gray-50" : ""
      }`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="aspect-square overflow-hidden rounded-md bg-muted relative group">
        <Link to={`/products/${id}`}>
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
          />
        </Link>
        
        {/* Quick remove button that appears on hover */}
        <Button
          variant="destructive"
          size="icon"
          className="absolute top-0 right-0 h-6 w-6 rounded-full opacity-0 transform translate-x-1 -translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0"
          onClick={handleRemove}
        >
          <X className="h-3 w-3" />
          <span className="sr-only">Quick Remove</span>
        </Button>
      </div>
      
      <div className="flex flex-col">
        <div className="flex items-start justify-between">
          <div>
            <Link to={`/products/${id}`} className="hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary rounded-sm">
              <h3 className="font-medium line-clamp-1">{name}</h3>
            </Link>
            <div className="mt-1 flex flex-wrap gap-x-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center">Size: <span className="ml-1 font-medium">{size}</span></span>
              <span className="inline-flex items-center">
                Color: 
                <span 
                  className="ml-1 inline-block h-3 w-3 rounded-full border shadow-sm" 
                  style={{backgroundColor: color.toLowerCase()}}
                ></span>
                <span className="ml-1 font-medium">{color}</span>
              </span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full text-muted-foreground hover:bg-destructive hover:text-white transition-colors group"
            onClick={handleRemove}
          >
            {isHovering ? (
              <Trash2 className="h-4 w-4 transition-all duration-200 group-hover:scale-110" />
            ) : (
              <X className="h-4 w-4" />
            )}
            <span className="sr-only">Remove</span>
          </Button>
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <div className={`flex items-center rounded-full border bg-background shadow-sm transition-transform duration-300 ${isAnimating ? "scale-105" : ""}`}>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-l-full border-r p-0"
              onClick={handleDecreaseQuantity}
              disabled={quantity <= 1}
            >
              <Minus className="h-3 w-3" />
              <span className="sr-only">Decrease quantity</span>
            </Button>
            <span className="flex h-8 w-10 items-center justify-center text-sm font-medium">
              {quantity}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-r-full border-l p-0"
              onClick={handleIncreaseQuantity}
            >
              <Plus className="h-3 w-3" />
              <span className="sr-only">Increase quantity</span>
            </Button>
          </div>
          <div className={`font-medium text-lg transition-all duration-300 ${isAnimating ? "text-primary scale-105" : ""}`}>
            {INR_SYMBOL}{(price * quantity).toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
