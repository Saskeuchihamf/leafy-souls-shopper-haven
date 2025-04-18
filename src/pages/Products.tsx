
import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/layout";
import ProductCard from "@/components/ui/product-card";
import { ProductFilters } from "@/components/ui/product-filters";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronDown, SlidersHorizontal, X } from "lucide-react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { products, categories, sizes, colors, priceRange } from "@/data/products";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

const Products = () => {
  const isMobile = useIsMobile();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Get filters from URL
  const categoryParam = searchParams.get("category") || "";
  const sizeParam = searchParams.get("size") || "";
  const colorParam = searchParams.get("color") || "";
  const tagParam = searchParams.get("tag") || "";
  const minPriceParam = searchParams.get("minPrice") || "";
  const maxPriceParam = searchParams.get("maxPrice") || "";
  
  // State for filters
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categoryParam ? categoryParam.split(",") : []
  );
  const [selectedSizes, setSelectedSizes] = useState<string[]>(
    sizeParam ? sizeParam.split(",") : []
  );
  const [selectedColors, setSelectedColors] = useState<string[]>(
    colorParam ? colorParam.split(",") : []
  );
  const [selectedPriceRange, setSelectedPriceRange] = useState<[number, number]>([
    minPriceParam ? parseInt(minPriceParam) : priceRange[0],
    maxPriceParam ? parseInt(maxPriceParam) : priceRange[1],
  ]);
  const [selectedTags, setSelectedTags] = useState<string[]>(
    tagParam ? tagParam.split(",") : []
  );
  
  // State for sorting
  const [sortOption, setSortOption] = useState<string>(
    searchParams.get("sort") || "featured"
  );
  
  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (selectedCategories.length > 0) {
      params.set("category", selectedCategories.join(","));
    }
    
    if (selectedSizes.length > 0) {
      params.set("size", selectedSizes.join(","));
    }
    
    if (selectedColors.length > 0) {
      params.set("color", selectedColors.join(","));
    }
    
    if (selectedPriceRange[0] !== priceRange[0]) {
      params.set("minPrice", selectedPriceRange[0].toString());
    }
    
    if (selectedPriceRange[1] !== priceRange[1]) {
      params.set("maxPrice", selectedPriceRange[1].toString());
    }
    
    if (selectedTags.length > 0) {
      params.set("tag", selectedTags.join(","));
    }
    
    if (sortOption && sortOption !== "featured") {
      params.set("sort", sortOption);
    }
    
    setSearchParams(params);
  }, [
    selectedCategories,
    selectedSizes,
    selectedColors,
    selectedPriceRange,
    selectedTags,
    sortOption,
    setSearchParams,
  ]);
  
  // Filter products based on selected filters
  const filteredProducts = products.filter((product) => {
    // Filter by category
    if (
      selectedCategories.length > 0 &&
      !selectedCategories.includes(product.category)
    ) {
      return false;
    }
    
    // Filter by size
    if (
      selectedSizes.length > 0 &&
      !selectedSizes.some((size) => product.size.includes(size))
    ) {
      return false;
    }
    
    // Filter by color
    if (
      selectedColors.length > 0 &&
      !selectedColors.includes(product.color)
    ) {
      return false;
    }
    
    // Filter by price
    if (
      product.price < selectedPriceRange[0] ||
      product.price > selectedPriceRange[1]
    ) {
      return false;
    }
    
    // Filter by tags
    if (selectedTags.length > 0) {
      const hasTag = selectedTags.some((tag) => {
        if (tag === "new") return product.isNew;
        if (tag === "eco") return product.isEco;
        return false;
      });
      
      if (!hasTag) {
        return false;
      }
    }
    
    return true;
  });
  
  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      default:
        // Featured sorting (default)
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    }
  });
  
  // Handle filter changes
  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };
  
  const handleSizeChange = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size)
        ? prev.filter((s) => s !== size)
        : [...prev, size]
    );
  };
  
  const handleColorChange = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color)
        ? prev.filter((c) => c !== color)
        : [...prev, color]
    );
  };
  
  const handlePriceChange = (range: [number, number]) => {
    setSelectedPriceRange(range);
  };
  
  const handleClearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setSelectedPriceRange([priceRange[0], priceRange[1]]);
    setSelectedTags([]);
  };
  
  const handleSortChange = (option: string) => {
    setSortOption(option);
  };
  
  return (
    <Layout>
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Shop All Products</h1>
          <p className="mt-2 text-muted-foreground">
            Discover our collection of eco-friendly footwear
          </p>
        </div>
        
        {/* Mobile filters */}
        {isMobile && (
          <div className="sticky top-16 z-30 flex items-center justify-between gap-4 bg-background py-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm">
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  Filters
                  {(selectedCategories.length > 0 ||
                    selectedSizes.length > 0 ||
                    selectedColors.length > 0 ||
                    selectedPriceRange[0] !== priceRange[0] ||
                    selectedPriceRange[1] !== priceRange[1] ||
                    selectedTags.length > 0) && (
                    <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                      {selectedCategories.length +
                        selectedSizes.length +
                        selectedColors.length +
                        (selectedPriceRange[0] !== priceRange[0] ||
                        selectedPriceRange[1] !== priceRange[1]
                          ? 1
                          : 0) +
                        selectedTags.length}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full sm:w-80">
                <h3 className="mb-4 text-lg font-medium">Filters</h3>
                <ProductFilters
                  categories={categories}
                  sizes={sizes}
                  colors={colors}
                  priceRange={priceRange}
                  maxPrice={priceRange[1]}
                  selectedCategories={selectedCategories}
                  selectedSizes={selectedSizes}
                  selectedColors={selectedColors}
                  selectedPriceRange={selectedPriceRange}
                  onCategoryChange={handleCategoryChange}
                  onSizeChange={handleSizeChange}
                  onColorChange={handleColorChange}
                  onPriceChange={handlePriceChange}
                  onClearAllFilters={handleClearAllFilters}
                />
              </SheetContent>
            </Sheet>
            
            <div className="relative flex items-center">
              <Button
                variant="outline"
                size="sm"
                className="flex w-full items-center justify-between gap-2"
                onClick={(e) => {
                  const menu = document.getElementById("sort-menu");
                  if (menu) {
                    menu.classList.toggle("hidden");
                  }
                }}
              >
                <span>
                  Sort by:{" "}
                  {sortOption === "featured"
                    ? "Featured"
                    : sortOption === "price-asc"
                    ? "Price: Low to High"
                    : sortOption === "price-desc"
                    ? "Price: High to Low"
                    : sortOption === "name-asc"
                    ? "Name: A-Z"
                    : "Name: Z-A"}
                </span>
                <ChevronDown className="h-4 w-4" />
              </Button>
              <div
                id="sort-menu"
                className="absolute right-0 top-full z-50 mt-2 hidden w-56 origin-top-right rounded-md bg-background shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
              >
                <div className="py-1" role="none">
                  {[
                    { value: "featured", label: "Featured" },
                    { value: "price-asc", label: "Price: Low to High" },
                    { value: "price-desc", label: "Price: High to Low" },
                    { value: "name-asc", label: "Name: A-Z" },
                    { value: "name-desc", label: "Name: Z-A" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      className={`block w-full px-4 py-2 text-left text-sm ${
                        sortOption === option.value
                          ? "bg-accent text-accent-foreground"
                          : "text-foreground"
                      }`}
                      role="menuitem"
                      onClick={() => {
                        handleSortChange(option.value);
                        const menu = document.getElementById("sort-menu");
                        if (menu) {
                          menu.classList.add("hidden");
                        }
                      }}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="flex flex-col lg:flex-row lg:gap-8">
          {/* Desktop sidebar filters */}
          {!isMobile && (
            <div className="sticky top-24 hidden h-fit w-64 shrink-0 lg:block">
              <ProductFilters
                categories={categories}
                sizes={sizes}
                colors={colors}
                priceRange={priceRange}
                maxPrice={priceRange[1]}
                selectedCategories={selectedCategories}
                selectedSizes={selectedSizes}
                selectedColors={selectedColors}
                selectedPriceRange={selectedPriceRange}
                onCategoryChange={handleCategoryChange}
                onSizeChange={handleSizeChange}
                onColorChange={handleColorChange}
                onPriceChange={handlePriceChange}
                onClearAllFilters={handleClearAllFilters}
              />
            </div>
          )}
          
          {/* Product grid */}
          <div className="flex-1">
            {/* Desktop sort options */}
            {!isMobile && (
              <div className="mb-6 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Showing {sortedProducts.length} products
                </p>
                
                <div className="relative flex items-center">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                    onClick={(e) => {
                      const menu = document.getElementById("desktop-sort-menu");
                      if (menu) {
                        menu.classList.toggle("hidden");
                      }
                    }}
                  >
                    Sort by:{" "}
                    {sortOption === "featured"
                      ? "Featured"
                      : sortOption === "price-asc"
                      ? "Price: Low to High"
                      : sortOption === "price-desc"
                      ? "Price: High to Low"
                      : sortOption === "name-asc"
                      ? "Name: A-Z"
                      : "Name: Z-A"}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                  <div
                    id="desktop-sort-menu"
                    className="absolute right-0 top-full z-50 mt-2 hidden w-56 origin-top-right rounded-md bg-background shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                  >
                    <div className="py-1" role="none">
                      {[
                        { value: "featured", label: "Featured" },
                        { value: "price-asc", label: "Price: Low to High" },
                        { value: "price-desc", label: "Price: High to Low" },
                        { value: "name-asc", label: "Name: A-Z" },
                        { value: "name-desc", label: "Name: Z-A" },
                      ].map((option) => (
                        <button
                          key={option.value}
                          className={`block w-full px-4 py-2 text-left text-sm ${
                            sortOption === option.value
                              ? "bg-accent text-accent-foreground"
                              : "text-foreground"
                          }`}
                          role="menuitem"
                          onClick={() => {
                            handleSortChange(option.value);
                            const menu = document.getElementById(
                              "desktop-sort-menu"
                            );
                            if (menu) {
                              menu.classList.add("hidden");
                            }
                          }}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Active filters */}
            {(selectedCategories.length > 0 ||
              selectedSizes.length > 0 ||
              selectedColors.length > 0 ||
              selectedPriceRange[0] !== priceRange[0] ||
              selectedPriceRange[1] !== priceRange[1] ||
              selectedTags.length > 0) && (
              <div className="mb-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-medium">Active Filters:</span>
                  
                  {selectedCategories.map((category) => {
                    const categoryObject = categories.find(
                      (c) => c.id === category
                    );
                    return (
                      <Button
                        key={category}
                        variant="secondary"
                        size="sm"
                        className="flex items-center gap-1"
                        onClick={() => handleCategoryChange(category)}
                      >
                        {categoryObject?.label || category}
                        <X className="h-3 w-3" />
                      </Button>
                    );
                  })}
                  
                  {selectedSizes.map((size) => (
                    <Button
                      key={size}
                      variant="secondary"
                      size="sm"
                      className="flex items-center gap-1"
                      onClick={() => handleSizeChange(size)}
                    >
                      Size: {size}
                      <X className="h-3 w-3" />
                    </Button>
                  ))}
                  
                  {selectedColors.map((color) => {
                    const colorObject = colors.find((c) => c.id === color);
                    return (
                      <Button
                        key={color}
                        variant="secondary"
                        size="sm"
                        className="flex items-center gap-1"
                        onClick={() => handleColorChange(color)}
                      >
                        <span
                          className="mr-1 h-3 w-3 rounded-full"
                          style={{ backgroundColor: color }}
                        ></span>
                        {colorObject?.label || color}
                        <X className="h-3 w-3" />
                      </Button>
                    );
                  })}
                  
                  {(selectedPriceRange[0] !== priceRange[0] ||
                    selectedPriceRange[1] !== priceRange[1]) && (
                    <Button
                      variant="secondary"
                      size="sm"
                      className="flex items-center gap-1"
                      onClick={() =>
                        setSelectedPriceRange([priceRange[0], priceRange[1]])
                      }
                    >
                      ${selectedPriceRange[0]} - ${selectedPriceRange[1]}
                      <X className="h-3 w-3" />
                    </Button>
                  )}
                  
                  {selectedTags.map((tag) => (
                    <Button
                      key={tag}
                      variant="secondary"
                      size="sm"
                      className="flex items-center gap-1"
                      onClick={() =>
                        setSelectedTags((prev) =>
                          prev.filter((t) => t !== tag)
                        )
                      }
                    >
                      {tag === "new" ? "New Arrival" : "Eco-Friendly"}
                      <X className="h-3 w-3" />
                    </Button>
                  ))}
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClearAllFilters}
                  >
                    Clear All
                  </Button>
                </div>
              </div>
            )}
            
            {sortedProducts.length === 0 ? (
              <div className="mt-16 text-center">
                <h3 className="text-lg font-medium">No products found</h3>
                <p className="mt-2 text-muted-foreground">
                  Try adjusting your filters to find what you're looking for.
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={handleClearAllFilters}
                >
                  Clear All Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                {sortedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    image={product.images[0]}
                    category={product.category}
                    isNew={product.isNew}
                    isEco={product.isEco}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
