import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

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
  return (
    <div className={cn("group relative overflow-hidden rounded-xl", className)}>
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
        </div>
      </Link>
      <div className="mt-4 space-y-1 text-left">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-foreground">{name}</h3>
          <p className="font-medium text-primary">{INR_SYMBOL}{price.toFixed(2)}</p>
        </div>
        <p className="text-sm text-muted-foreground">{category}</p>
      </div>
    </div>
  );
};

export default ProductCard;
