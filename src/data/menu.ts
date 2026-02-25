export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  inStock: boolean;
  stockQty: number;
  upsells?: { name: string; price: number }[];
};

export type Category = {
  id: string;
  name: string;
  icon: string;
};

export const categories: Category[] = [
  { id: "starters", name: "Starters", icon: "🔥" },
  { id: "mains", name: "Main Course", icon: "🥩" },
  { id: "sides", name: "Sides", icon: "🥗" },
  { id: "drinks", name: "Drinks", icon: "🍷" },
  { id: "desserts", name: "Desserts", icon: "🍰" },
];

export const menuItems: MenuItem[] = [
  {
    id: "s1",
    name: "Flame-Grilled Prawns",
    description: "Tiger prawns marinated in garlic butter and chilli, charred over open flame",
    price: 1200,
    category: "starters",
    image: "https://images.unsplash.com/photo-1625943553852-781c6dd46faa?w=400&h=300&fit=crop",
    inStock: true,
    stockQty: 25,
    upsells: [{ name: "Extra garlic butter", price: 100 }],
  },
  {
    id: "s2",
    name: "Savannah Wings",
    description: "Crispy chicken wings glazed with our signature smoky barbecue sauce",
    price: 850,
    category: "starters",
    image: "https://images.unsplash.com/photo-1608039829572-9b0189c912f5?w=400&h=300&fit=crop",
    inStock: true,
    stockQty: 40,
    upsells: [{ name: "Ranch dip", price: 50 }],
  },
  {
    id: "s3",
    name: "Beef Samosas",
    description: "Hand-folded pastry filled with spiced minced beef, served with tamarind chutney",
    price: 650,
    category: "starters",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop",
    inStock: true,
    stockQty: 30,
  },
  {
    id: "m1",
    name: "Tomahawk Ribeye",
    description: "700g bone-in ribeye, dry-aged 28 days, grilled to perfection over acacia wood",
    price: 4500,
    category: "mains",
    image: "https://images.unsplash.com/photo-1558030006-450675393462?w=400&h=300&fit=crop",
    inStock: true,
    stockQty: 12,
    upsells: [
      { name: "Truffle butter", price: 300 },
      { name: "Upgrade to 1kg", price: 1500 },
    ],
  },
  {
    id: "m2",
    name: "Nyama Choma Platter",
    description: "Traditional Kenyan grilled goat ribs with kachumbari and ugali",
    price: 2800,
    category: "mains",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop",
    inStock: true,
    stockQty: 20,
    upsells: [{ name: "Extra ugali", price: 100 }],
  },
  {
    id: "m3",
    name: "Grilled Lamb Chops",
    description: "New Zealand lamb rack, rosemary-crusted, served with mint jus and roasted vegetables",
    price: 3200,
    category: "mains",
    image: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400&h=300&fit=crop",
    inStock: true,
    stockQty: 15,
    upsells: [{ name: "Add chimichurri", price: 150 }],
  },
  {
    id: "m4",
    name: "Flame-Seared Salmon",
    description: "Atlantic salmon fillet, miso-glazed, served on a bed of sautéed greens",
    price: 2600,
    category: "mains",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop",
    inStock: true,
    stockQty: 10,
  },
  {
    id: "si1",
    name: "Truffle Fries",
    description: "Hand-cut fries tossed in truffle oil and parmesan",
    price: 550,
    category: "sides",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop",
    inStock: true,
    stockQty: 50,
  },
  {
    id: "si2",
    name: "Grilled Corn",
    description: "Sweet corn grilled with chili-lime butter and cotija cheese",
    price: 350,
    category: "sides",
    image: "https://images.unsplash.com/photo-1470119693884-47d3a1e9d7fe?w=400&h=300&fit=crop",
    inStock: true,
    stockQty: 35,
  },
  {
    id: "d1",
    name: "Smoky Old Fashioned",
    description: "Bourbon, smoked maple syrup, Angostura bitters, orange peel",
    price: 950,
    category: "drinks",
    image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=400&h=300&fit=crop",
    inStock: true,
    stockQty: 100,
  },
  {
    id: "d2",
    name: "Dawa Cocktail",
    description: "Kenya's signature cocktail – vodka, lime, honey, crushed ice",
    price: 750,
    category: "drinks",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&h=300&fit=crop",
    inStock: true,
    stockQty: 100,
    upsells: [{ name: "Make it double", price: 350 }],
  },
  {
    id: "d3",
    name: "Fresh Passion Juice",
    description: "Freshly squeezed passion fruit, lightly sweetened",
    price: 350,
    category: "drinks",
    image: "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=400&h=300&fit=crop",
    inStock: true,
    stockQty: 100,
  },
  {
    id: "de1",
    name: "Lava Chocolate Cake",
    description: "Warm molten chocolate cake with vanilla bean ice cream and gold leaf",
    price: 850,
    category: "desserts",
    image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400&h=300&fit=crop",
    inStock: true,
    stockQty: 15,
    upsells: [{ name: "Add espresso shot", price: 200 }],
  },
  {
    id: "de2",
    name: "Crème Brûlée",
    description: "Classic vanilla custard with caramelised sugar crust",
    price: 700,
    category: "desserts",
    image: "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=400&h=300&fit=crop",
    inStock: true,
    stockQty: 18,
  },
];
