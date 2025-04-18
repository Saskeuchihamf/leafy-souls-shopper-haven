
import { ProductCard } from "@/components/ui/product-card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  isNew?: boolean;
  isEco?: boolean;
}

interface FeaturedCollectionProps {
  title: string;
  description?: string;
  products: Product[];
  viewAllLink?: string;
  className?: string;
}

export const FeaturedCollection = ({
  title,
  description,
  products,
  viewAllLink = "/products",
  className,
}: FeaturedCollectionProps) => {
  return (
    <div className={className}>
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">{title}</h2>
        {description && (
          <p className="mt-3 max-w-2xl mx-auto text-muted-foreground">{description}</p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>

      <div className="mt-12 text-center">
        <Button asChild variant="outline" className="rounded-full">
          <Link to={viewAllLink}>View All Products</Link>
        </Button>
      </div>
    </div>
  );
};

export default FeaturedCollection;
