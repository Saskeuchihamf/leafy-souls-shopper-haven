import { Button } from "@/components/ui/button";
import { X, Plus, Minus } from "lucide-react";
import { Link } from "react-router-dom";

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
  const handleIncreaseQuantity = () => {
    onUpdateQuantity(id, quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      onUpdateQuantity(id, quantity - 1);
    }
  };

  return (
    <div className="grid grid-cols-[80px_1fr] gap-4 border-b py-6 sm:grid-cols-[120px_1fr]">
      <div className="aspect-square overflow-hidden rounded-md bg-muted">
        <Link to={`/products/${id}`}>
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition-opacity hover:opacity-80"
          />
        </Link>
      </div>
      <div className="flex flex-col">
        <div className="flex items-start justify-between">
          <div>
            <Link to={`/products/${id}`} className="hover:underline">
              <h3 className="font-medium">{name}</h3>
            </Link>
            <div className="mt-1 flex flex-wrap gap-x-4 text-sm text-muted-foreground">
              <span>Size: {size}</span>
              <span>Color: {color}</span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => onRemove(id)}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Remove</span>
          </Button>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center rounded-md border">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-none border-r p-0"
              onClick={handleDecreaseQuantity}
              disabled={quantity <= 1}
            >
              <Minus className="h-3 w-3" />
              <span className="sr-only">Decrease quantity</span>
            </Button>
            <span className="flex h-8 w-8 items-center justify-center text-sm">
              {quantity}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-none border-l p-0"
              onClick={handleIncreaseQuantity}
            >
              <Plus className="h-3 w-3" />
              <span className="sr-only">Increase quantity</span>
            </Button>
          </div>
          <div className="font-medium">{INR_SYMBOL}{(price * quantity).toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
