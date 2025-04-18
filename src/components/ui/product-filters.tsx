
import * as React from "react";
import { ChevronDown, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { useIsMobile } from "@/hooks/use-mobile";

interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

interface ProductFiltersProps {
  categories: FilterOption[];
  sizes: FilterOption[];
  colors: FilterOption[];
  priceRange: [number, number];
  maxPrice: number;
  selectedCategories: string[];
  selectedSizes: string[];
  selectedColors: string[];
  selectedPriceRange: [number, number];
  onCategoryChange: (category: string) => void;
  onSizeChange: (size: string) => void;
  onColorChange: (color: string) => void;
  onPriceChange: (range: [number, number]) => void;
  onClearAllFilters: () => void;
  className?: string;
}

export function ProductFilters({
  categories,
  sizes,
  colors,
  priceRange,
  maxPrice,
  selectedCategories,
  selectedSizes,
  selectedColors,
  selectedPriceRange,
  onCategoryChange,
  onSizeChange,
  onColorChange,
  onPriceChange,
  onClearAllFilters,
  className,
}: ProductFiltersProps) {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = React.useState(!isMobile);

  return (
    <div className={className}>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-medium">Filters</h2>
        {(selectedCategories.length > 0 ||
          selectedSizes.length > 0 ||
          selectedColors.length > 0 ||
          selectedPriceRange[0] !== priceRange[0] ||
          selectedPriceRange[1] !== priceRange[1]) && (
          <Button variant="ghost" size="sm" onClick={onClearAllFilters}>
            Clear all
          </Button>
        )}
      </div>

      {isMobile ? (
        <Collapsible
          open={isOpen}
          onOpenChange={setIsOpen}
          className="w-full space-y-4"
        >
          <CollapsibleTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="flex w-full items-center justify-between"
            >
              <span>Filter Options</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  isOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-6">
            <FilterContent
              categories={categories}
              sizes={sizes}
              colors={colors}
              priceRange={priceRange}
              maxPrice={maxPrice}
              selectedCategories={selectedCategories}
              selectedSizes={selectedSizes}
              selectedColors={selectedColors}
              selectedPriceRange={selectedPriceRange}
              onCategoryChange={onCategoryChange}
              onSizeChange={onSizeChange}
              onColorChange={onColorChange}
              onPriceChange={onPriceChange}
            />
          </CollapsibleContent>
        </Collapsible>
      ) : (
        <div className="space-y-6">
          <FilterContent
            categories={categories}
            sizes={sizes}
            colors={colors}
            priceRange={priceRange}
            maxPrice={maxPrice}
            selectedCategories={selectedCategories}
            selectedSizes={selectedSizes}
            selectedColors={selectedColors}
            selectedPriceRange={selectedPriceRange}
            onCategoryChange={onCategoryChange}
            onSizeChange={onSizeChange}
            onColorChange={onColorChange}
            onPriceChange={onPriceChange}
          />
        </div>
      )}
    </div>
  );
}

interface FilterContentProps {
  categories: FilterOption[];
  sizes: FilterOption[];
  colors: FilterOption[];
  priceRange: [number, number];
  maxPrice: number;
  selectedCategories: string[];
  selectedSizes: string[];
  selectedColors: string[];
  selectedPriceRange: [number, number];
  onCategoryChange: (category: string) => void;
  onSizeChange: (size: string) => void;
  onColorChange: (color: string) => void;
  onPriceChange: (range: [number, number]) => void;
}

function FilterContent({
  categories,
  sizes,
  colors,
  priceRange,
  maxPrice,
  selectedCategories,
  selectedSizes,
  selectedColors,
  selectedPriceRange,
  onCategoryChange,
  onSizeChange,
  onColorChange,
  onPriceChange,
}: FilterContentProps) {
  return (
    <>
      <div className="space-y-4">
        <h3 className="text-sm font-medium">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category.id}`}
                checked={selectedCategories.includes(category.id)}
                onCheckedChange={() => onCategoryChange(category.id)}
              />
              <Label
                htmlFor={`category-${category.id}`}
                className="flex flex-1 items-center justify-between text-sm"
              >
                {category.label}
                {category.count !== undefined && (
                  <span className="text-xs text-muted-foreground">
                    ({category.count})
                  </span>
                )}
              </Label>
            </div>
          ))}
        </div>
      </div>
      <Separator />
      <div className="space-y-4">
        <h3 className="text-sm font-medium">Sizes</h3>
        <div className="grid grid-cols-3 gap-2">
          {sizes.map((size) => {
            const isSelected = selectedSizes.includes(size.id);
            return (
              <Button
                key={size.id}
                variant={isSelected ? "default" : "outline"}
                size="sm"
                className={`h-9 w-full ${
                  isSelected ? "bg-primary text-primary-foreground" : ""
                }`}
                onClick={() => onSizeChange(size.id)}
              >
                {size.label}
              </Button>
            );
          })}
        </div>
      </div>
      <Separator />
      <div className="space-y-4">
        <h3 className="text-sm font-medium">Colors</h3>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => {
            const isSelected = selectedColors.includes(color.id);
            return (
              <button
                key={color.id}
                className={`relative h-8 w-8 rounded-full border ${
                  isSelected ? "ring-2 ring-primary ring-offset-2" : ""
                }`}
                style={{ backgroundColor: color.id }}
                onClick={() => onColorChange(color.id)}
                title={color.label}
              >
                {isSelected && (
                  <div className="absolute inset-0 flex items-center justify-center text-white">
                    <Check className="h-4 w-4" />
                  </div>
                )}
                <span className="sr-only">{color.label}</span>
              </button>
            );
          })}
        </div>
      </div>
      <Separator />
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">Price Range</h3>
          <span className="text-xs text-muted-foreground">
            ${selectedPriceRange[0]} - ${selectedPriceRange[1]}
          </span>
        </div>
        <Slider
          defaultValue={selectedPriceRange}
          min={priceRange[0]}
          max={priceRange[1]}
          step={5}
          onValueChange={(value) => onPriceChange(value as [number, number])}
          className="py-4"
        />
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
    </>
  );
}

export default ProductFilters;
