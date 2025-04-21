export interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  category: string;
  color: string;
  size: string[];
  description: string;
  features: string[];
  isNew?: boolean;
  isEco?: boolean;
  isFeatured?: boolean;
}

export const products: Product[] = [
  {
    id: "eco-trail-01",
    name: "Eco Trail Runner",
    price: 129.99 * 83,
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
      "https://images.unsplash.com/photo-1607522370275-f14206abe5d3",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a",
    ],
    category: "men",
    color: "#3F704D",
    size: ["7", "8", "9", "10", "11", "12"],
    description: "Made from recycled materials, these trail runners are perfect for your outdoor adventures. The breathable upper and supportive sole provide comfort all day long.",
    features: [
      "Recycled PET upper from plastic bottles",
      "Natural rubber outsole",
      "Removable cork insole",
      "Water-resistant coating",
      "Reinforced toe cap"
    ],
    isNew: true,
    isEco: true,
    isFeatured: true
  },
  {
    id: "bamboo-loafer-01",
    name: "Bamboo Comfort Loafer",
    price: 99.99 * 83,
    images: [
      "https://images.unsplash.com/photo-1560343090-f0409e92791a",
      "https://images.unsplash.com/photo-1516478177764-9fe5bd7e9717",
      "https://images.unsplash.com/photo-1543508282-6319a3e2621f",
    ],
    category: "women",
    color: "#BEAA8A",
    size: ["5", "6", "7", "8", "9", "10"],
    description: "These comfortable loafers feature a bamboo textile upper and a cushioned sole made from natural materials. Perfect for everyday wear.",
    features: [
      "Bamboo textile upper",
      "Organic cotton lining",
      "Cushioned latex foam insole",
      "Slip-resistant rubber outsole",
      "Hand-stitched detailing"
    ],
    isEco: true,
    isFeatured: true
  },
  {
    id: "hemp-casual-01",
    name: "Hemp Casual Sneaker",
    price: 89.99 * 83,
    images: [
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5",
    ],
    category: "men",
    color: "#D4C8B0",
    size: ["7", "8", "9", "10", "11", "12"],
    description: "Classic casual sneaker with hemp canvas upper and a comfortable fit. Versatile enough for any casual occasion.",
    features: [
      "100% organic hemp upper",
      "Recycled rubber outsole",
      "Cushioned footbed",
      "Bio-based water repellent",
      "Organic cotton laces"
    ],
    isFeatured: true
  },
  {
    id: "cork-sandal-01",
    name: "Cork Comfort Sandal",
    price: 79.99 * 83,
    images: [
      "https://images.unsplash.com/photo-1603487742131-4160ec999306",
      "https://images.unsplash.com/photo-1562273138-f46be4ebdf33",
      "https://images.unsplash.com/photo-1531310197839-ccf54634509e",
    ],
    category: "women",
    color: "#D2B48C",
    size: ["5", "6", "7", "8", "9", "10"],
    description: "Embrace comfort with these cork sandals featuring adjustable straps and a contoured footbed that molds to your feet.",
    features: [
      "Sustainable cork footbed",
      "Vegetable-tanned leather straps",
      "EVA sole for lightweight comfort",
      "Anatomically shaped for support",
      "Adjustable buckles"
    ],
    isFeatured: true
  },
  {
    id: "recycled-runner-01",
    name: "Recycled Performance Runner",
    price: 139.99 * 83,
    images: [
      "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb",
      "https://images.unsplash.com/photo-1539185441755-769473a23570",
      "https://images.unsplash.com/photo-1604671801908-6f0c6a092c05",
    ],
    category: "men",
    color: "#5D8AA8",
    size: ["7", "8", "9", "10", "11", "12"],
    description: "High-performance running shoes made from recycled ocean plastic. Engineered for comfort, support, and speed.",
    features: [
      "Upper made from recycled ocean plastic",
      "Responsive cushioning",
      "Breathable mesh lining",
      "Enhanced arch support",
      "Reflective details for visibility"
    ],
    isNew: true,
    isEco: true
  },
  {
    id: "canvas-slip-01",
    name: "Organic Canvas Slip-On",
    price: 69.99 * 83,
    images: [
      "https://images.unsplash.com/photo-1631984564919-1ffb8e6d4d85",
      "https://images.unsplash.com/photo-1604671801908-6f0c6a092c05",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a",
    ],
    category: "women",
    color: "#FFFFFF",
    size: ["5", "6", "7", "8", "9", "10"],
    description: "Simple, classic slip-on shoes made from organic canvas. The perfect everyday casual shoe that goes with everything.",
    features: [
      "100% organic cotton canvas",
      "Natural rubber outsole",
      "Elastic side panels",
      "Cushioned footbed",
      "Machine washable"
    ],
    isEco: true
  },
  {
    id: "hiking-boot-01",
    name: "Sustainable Hiking Boot",
    price: 159.99 * 83,
    images: [
      "https://images.unsplash.com/photo-1638247025967-b4e38f787b76",
      "https://images.unsplash.com/photo-1520639888713-7851133b1ed0",
      "https://images.unsplash.com/photo-1553808373-fa8eb8b8f6e5",
    ],
    category: "men",
    color: "#654321",
    size: ["7", "8", "9", "10", "11", "12"],
    description: "Rugged hiking boots built for the trail with eco-friendly materials. Waterproof, durable, and comfortable for all your adventures.",
    features: [
      "Waterproof recycled materials",
      "Vibram eco-step outsole",
      "Shock-absorbing midsole",
      "Padded collar and tongue",
      "Speed-hook lacing system"
    ],
    isNew: true,
    isEco: true
  },
  {
    id: "ballet-flat-01",
    name: "Eco Ballet Flat",
    price: 89.99 * 83,
    images: [
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2",
      "https://images.unsplash.com/photo-1610398752800-146f269dfcc8",
      "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95",
    ],
    category: "women",
    color: "#A9A9A9",
    size: ["5", "6", "7", "8", "9", "10"],
    description: "Classic ballet flats made with sustainable materials. Elegant, versatile, and comfortable for all-day wear.",
    features: [
      "Plant-based leather alternative",
      "Memory foam cushioning",
      "Flexible non-slip sole",
      "Elasticized topline for secure fit",
      "Breathable lining"
    ],
    isEco: true
  }
];

export const categories = [
  { id: "men", label: "Men", count: 4 },
  { id: "women", label: "Women", count: 4 },
];

export const sizes = [
  { id: "5", label: "5" },
  { id: "6", label: "6" },
  { id: "7", label: "7" },
  { id: "8", label: "8" },
  { id: "9", label: "9" },
  { id: "10", label: "10" },
  { id: "11", label: "11" },
  { id: "12", label: "12" },
];

export const colors = [
  { id: "#3F704D", label: "Green" },
  { id: "#BEAA8A", label: "Beige" },
  { id: "#D4C8B0", label: "Tan" },
  { id: "#D2B48C", label: "Khaki" },
  { id: "#5D8AA8", label: "Blue" },
  { id: "#FFFFFF", label: "White" },
  { id: "#654321", label: "Brown" },
  { id: "#A9A9A9", label: "Gray" },
];

export const priceRange: [number, number] = [0, 200];
