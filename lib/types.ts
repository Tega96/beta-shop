export interface ProductSpecs {
  screen?: string;
  processor?: string;
  ram?: string;
  battery?: string;
  camera?: string;
  os?: string;
  network?: string;
  [key: string]: string | undefined;
}

export interface ProductVariantType {
  id: string;
  productId: string;
  colorName: string;
  colorHex: string;
  storage: string;
  price: number;
  stock: number;
  sku: string;
  image?: string | null;
}

export interface ProductType {
  id: string;
  name: string;
  slug: string;
  brand: string;
  description: string;
  basePrice: number;
  rating: number;
  reviewCount: number;
  isFeatured: boolean;
  isNewArrival: boolean;
  category: string;
  images: string[];
  specs: ProductSpecs;
  variants: ProductVariantType[];
}

export interface CartItem {
  productId: string;
  variantId: string;
  name: string;
  slug: string;
  brand: string;
  colorName: string;
  colorHex: string;
  storage: string;
  price: number;
  quantity: number;
  image: string;
  sku: string;
}

export interface ShippingAddressInput {
  fullName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface CreateOrderPayload {
  items: CartItem[];
  shippingAddress: ShippingAddressInput;
  paymentMethod: string;
  notes?: string;
}
