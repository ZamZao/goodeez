export type Product = {
  id: string;
  slug: string;
  name: string;
  description?: string;
  price: number;
  imageUrl: string;
  collectionId?: string;
  category?: string; // Keeping for backward compatibility if needed, but collectionId is preferred
  tags?: string[];
};

export type Collection = {
  id: string;
  slug: string;
  name: string;
  description?: string;
  imageUrl?: string;
  productIds: string[];
};

export type PackItem = {
  productId: string;
  quantity: number;
};

export type Pack = {
  id: string;
  slug: string;
  name: string;
  description?: string;
  items: PackItem[];
  price: number;
  imageUrl?: string;
};

// Cart Types
export type CartItem = {
  product: Product;
  quantity: number;
};

export type CartLineBase = {
  id: string;
  quantity: number;
};

export type CartProductLine = CartLineBase & {
  type: 'product';
  productId: string;
  unitPrice: number;
};

export type CartPackLine = CartLineBase & {
  type: 'pack';
  packId: string;
  unitPrice: number;
  items: PackItem[];
};

export type CartLine = CartProductLine | CartPackLine;

export type Cart = {
  lines: CartLine[];
};

// Logo Types (Keeping these for the admin tool)
export type LogoWarp = 
  | { type: 'none' }
  | { type: 'cylindrical'; intensity: number }
  | { type: 'perspective'; intensity: number };

export type Point = { x: number; y: number };

export type LogoBlendMode = 'normal' | 'multiply' | 'screen' | 'overlay' | 'darken' | 'lighten' | 'color-burn' | 'hard-light' | 'soft-light';

export type LogoLayer = {
  id: string;
  // Basic positioning (legacy/simple mode)
  centerXPct: number;
  centerYPct: number;
  widthPct: number;
  rotateDeg?: number;
  
  // Advanced positioning (4-point)
  // If corners are present, they override center/width/rotate
  corners?: {
    topLeft: Point;
    topRight: Point;
    bottomRight: Point;
    bottomLeft: Point;
  };

  warp?: LogoWarp;
  blendMode?: LogoBlendMode;
  opacity?: number;
  logoUrl?: string; // Optional override for specific logo on this layer
};

export type LogoPlacement = LogoLayer[] | {
  layers: LogoLayer[];
  generatedImage?: string;
};

// Portal configuration
export interface PortalConfig {
  slug: string
  name: string
  logoUrl: string
  primaryColor?: string
  secondaryColor?: string
  createdAt: string
}

// Customer information
export interface CustomerInfo {
  firstName: string
  lastName: string
  email: string
  company?: string
  department?: string
  phone?: string
}

// Order
export interface Order {
  id: string
  tenant: string
  orderDate: string
  customer: CustomerInfo
  items: any[] // Relaxing this for now to avoid conflicts during migration
  total: number
  status: 'pending' | 'confirmed' | 'processing' | 'completed'
}
