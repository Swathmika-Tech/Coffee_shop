export type CategoryType = 'all' | 'pour-over' | 'espresso' | 'signatures' | 'beans' | 'bakery';

export interface SizeOption {
  label: string;
  volume: string;
  priceDelta: number;
}

export interface MilkOption {
  id: string;
  name: string;
  priceDelta: number;
}

export interface WeightOption {
  label: string;
  priceDelta: number;
}

export interface CoffeeItem {
  id: string;
  name: string;
  subName?: string;
  category: 'pour-over' | 'espresso' | 'signatures' | 'beans' | 'bakery';
  price: number;
  description: string;
  origin?: string;
  process?: string;
  roastLevel?: 'Light' | 'Medium-Light' | 'Medium' | 'Dark';
  tastingNotes: string[];
  elevation?: string;
  image: string;
  isSeasonal?: boolean;
  isSignature?: boolean;
  dietary?: ('Vegan' | 'Gluten-Free' | 'Dairy-Free' | 'Decaf')[];
  customizable: boolean;
  availableOptions?: {
    sizes?: SizeOption[];
    milks?: MilkOption[];
    temperatures?: string[];
    sweetness?: string[];
    grindTypes?: string[];
    weights?: WeightOption[];
    allowExtraShots?: boolean;
  };
}

export interface CartCustomizations {
  size?: string;
  milk?: string;
  temperature?: string;
  sweetness?: string;
  grindType?: string;
  bagWeight?: string;
  extraShots?: number;
  specialNotes?: string;
}

export interface CartItem {
  id: string;
  itemId: string;
  name: string;
  unitPrice: number;
  totalPrice: number;
  quantity: number;
  image: string;
  customizations: CartCustomizations;
}

export type FulfillmentType = 'pickup' | 'dine-in' | 'delivery';

export interface OrderFulfillment {
  type: FulfillmentType;
  tableNumber?: string;
  pickupTime?: string;
  deliveryAddress?: string;
  customerName: string;
  customerPhone: string;
}

export type OrderStatus = 'received' | 'grinding' | 'brewing' | 'ready';

export interface Order {
  orderId: string;
  timestamp: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  tip: number;
  total: number;
  fulfillment: OrderFulfillment;
  status: OrderStatus;
}

export interface Reservation {
  id: string;
  type: 'table' | 'tasting_flight';
  date: string;
  time: string;
  guests: number;
  seatingArea: string;
  name: string;
  email: string;
  phone: string;
  notes?: string;
  createdAt: string;
}

export interface BrewGuide {
  id: string;
  method: string;
  ratio: number; // e.g. 1:16
  recommendedGrind: string;
  waterTemp: string;
  brewTime: string;
  description: string;
  steps: {
    stage: string;
    targetWater: (coffeeWeight: number) => number;
    timeSeconds: number;
    instruction: string;
  }[];
}
