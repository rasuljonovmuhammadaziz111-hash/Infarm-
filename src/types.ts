export type Language = 'uz' | 'ru' | 'en';

export interface Product {
  id: string;
  name_uz: string;
  name_ru: string;
  name_en: string;
  price: number;
  category: 'hydro' | 'growbox' | 'sensors' | 'nutrients' | 'organic';
  image: string;
  rating: number;
  description_uz: string;
  description_ru: string;
  description_en: string;
}

export interface UserProfile {
  name: string;
  surname: string;
  phone: string;
  coins: number;
  wonGifts: GiftItem[];
  promoCodes: PromoCode[];
  orderHistory: Order[];
}

export interface GiftItem {
  id: string;
  name_uz: string;
  name_ru: string;
  name_en: string;
  type: 'airpods' | 'headphones' | 'powerbank' | 'promo5' | 'promo10' | 'seedkit' | 'minigift';
  costCoins: number;
  icon: string;
  color: string;
  claimedAt?: string;
}

export interface PromoCode {
  code: string;
  discountPercentage: number;
  description_uz: string;
  description_ru: string;
  description_en: string;
  isUsed: boolean;
  earnedAt: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  discountApplied: number;
  finalTotal: number;
  address: string;
  phone: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
  isVoiceSimulated?: boolean;
}

export interface PushNotification {
  id: string;
  title_uz: string;
  title_ru: string;
  title_en: string;
  body_uz: string;
  body_ru: string;
  body_en: string;
  time: string;
  read: boolean;
  type: 'coin' | 'promo' | 'delivery' | 'gift';
}
