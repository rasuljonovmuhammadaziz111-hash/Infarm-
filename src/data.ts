import { Product, GiftItem, Language } from './types';

export const PRODUCTS_DATA: Product[] = [
  {
    id: "p1",
    name_uz: "INFARM Tower Smart V2 (Gidroponika)",
    name_ru: "INFARM Tower Smart V2 (Гидропоника)",
    name_en: "INFARM Tower Smart V2 (Hydroponic)",
    price: 1800000,
    category: "hydro",
    image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=400&q=80",
    rating: 4.9,
    description_uz: "96 dona o'simlik uchun avtomatlashtirilgan oziqlantirish va LED yorug'lik tizimiga ega gidroponik minora.",
    description_ru: "Гидропонная башня на 96 растений с автоматической системой питания и светодиодным освещением.",
    description_en: "Hydroponic tower for 96 plants with automatic feeding system and smart LED lighting."
  },
  {
    id: "p2",
    name_uz: "Infarm Capsule V1 (Smart Growbox)",
    name_ru: "Infarm Capsule V1 (Умный гроубокс)",
    name_en: "Infarm Capsule V1 (Smart Growbox)",
    price: 4500000,
    category: "growbox",
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=400&q=80",
    rating: 5.0,
    description_uz: "Iqlim, namlik va CO2 darajasini telefon orqali to'liq nazorat qiluvchi premium darajadagi growbox.",
    description_ru: "Премиальный гроубокс с полным мобильным контролем климата, влажности и уровня CO2.",
    description_en: "Premium microclimate growbox with full mobile app control for temperature, humidity, and CO2."
  },
  {
    id: "p3",
    name_uz: "BioProbe Wi-Fi (Tuproq va suv sensor)",
    name_ru: "BioProbe Wi-Fi (Датчик почвы и воды)",
    name_en: "BioProbe Wi-Fi (Soil & Water Sensor)",
    price: 450000,
    category: "sensors",
    image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=400&q=80",
    rating: 4.7,
    description_uz: "Tuproqdagi namlik, tuz darajasi (EC) va haroratni o'lchaydigan ko'p funksiyali Wi-Fi datchik.",
    description_ru: "Многофункциональный Wi-Fi датчик для измерения влажности почвы, уровня солей (EC) и температуры.",
    description_en: "Multifunctional Wi-Fi sensor measuring soil moisture, electrical conductivity (EC), and temperature."
  },
  {
    id: "p4",
    name_uz: "HumusGrow Red (Premium Bio-gumus)",
    name_ru: "HumusGrow Red (Премиальный биогумус)",
    name_en: "HumusGrow Red (Premium Bio-Humus)",
    price: 120000,
    category: "nutrients",
    image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&w=400&q=80",
    rating: 4.8,
    description_uz: "Kaliforniya qizil yomg'ir chuvalchanglari yordamida tayyorlangan 100% organik mineral o'g'it (5 kg).",
    description_ru: "100% органическое удобрение, полученное с помощью калифорнийских красных червей (5 кг).",
    description_en: "100% organic premium bio-humus fertilizer produced by California red worms (5 kg)."
  },
  {
    id: "p5",
    name_uz: "Premium Za'faron Bio (10g)",
    name_ru: "Премиальный Био-Шафран (10г)",
    name_en: "Premium Bio Saffron (10g)",
    price: 1200000,
    category: "organic",
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=400&q=80",
    rating: 4.9,
    description_uz: "Farg'ona vodiysida yetishtirilgan 100% toza premium sifatli ekologik za'faron ziravori.",
    description_ru: "100% чистый органический премиум шафран, выращенный в Ферганской долине.",
    description_en: "100% pure organic premium saffron hand-picked in the Fergana Valley."
  },
  {
    id: "p6",
    name_uz: "Wi-Fi Sug'orish Controlleri",
    name_ru: "Wi-Fi контроллер полива",
    name_en: "Wi-Fi Watering Controller",
    price: 650000,
    category: "sensors",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=400&q=80",
    rating: 4.6,
    description_uz: "Istalgan joydan smartfon orqali boshqariladigan 4 kanalli aqlli tomchilatib sug'orish tizimi controlleri.",
    description_ru: "4-канальный контроллер капельного полива с управлением со смартфона из любой точки мира.",
    description_en: "4-channel smart drip irrigation controller managed from anywhere via smartphone."
  }
];

export const GIFTS_LIST: GiftItem[] = [
  {
    id: "g1",
    name_uz: "Apple AirPods v3",
    name_ru: "Apple AirPods v3",
    name_en: "Apple AirPods v3",
    type: "airpods",
    costCoins: 80,
    icon: "Headphones",
    color: "#10B981"
  },
  {
    id: "g2",
    name_uz: "Premium Powerbank 20K",
    name_ru: "Premium Powerbank 20K",
    name_en: "Premium Powerbank 20K",
    type: "powerbank",
    costCoins: 35,
    icon: "BatteryCharging",
    color: "#3B82F6"
  },
  {
    id: "g3",
    name_uz: "Premium Quloqchinlar Bass+",
    name_ru: "Премиум Наушники Bass+",
    name_en: "Premium Headphones Bass+",
    type: "headphones",
    costCoins: 45,
    icon: "Music",
    color: "#8B5CF6"
  },
  {
    id: "g4",
    name_uz: "50% Chegirma Promo-kod",
    name_ru: "Промокод на скидку 50%",
    name_en: "50% Discount Promo-Code",
    type: "promo10",
    costCoins: 20,
    icon: "Tag",
    color: "#F59E0B"
  },
  {
    id: "g5",
    name_uz: "Premium Urg'ochi urug'lar to'plami",
    name_ru: "Набор элитных семян",
    name_en: "Premium Elite Seeds Bundle",
    type: "seedkit",
    costCoins: 10,
    icon: "Sprout",
    color: "#EC4899"
  },
  {
    id: "g6",
    name_uz: "Mini Ec-metr datchigi",
    name_ru: "Мини Ec-метр датчик",
    name_en: "Mini Ec-meter probe",
    type: "minigift",
    costCoins: 15,
    icon: "Zap",
    color: "#06B6D4"
  }
];

export const DICTIONARY: Record<string, Record<Language, string>> = {
  // Common UI
  app_title: {
    uz: "Infarm.uz",
    ru: "Infarm.uz",
    en: "Infarm.uz"
  },
  tagline: {
    uz: "Premium agrotexnika va aqlli dehqonchilik bozori",
    ru: "Премиум агротехника и умное фермерство",
    en: "Premium agrotech & smart farming ecosystem"
  },
  hello: {
    uz: "Assalomu alaykum",
    ru: "Здравствуйте",
    en: "Welcome"
  },
  loading: {
    uz: "Yuklanmoqda...",
    ru: "Загрузка...",
    en: "Loading..."
  },
  search_placeholder: {
    uz: "Premium tizimlarni izlash...",
    ru: "Поиск премиум оборудования...",
    en: "Search organic hardware..."
  },
  all: {
    uz: "Barchasi",
    ru: "Все",
    en: "All"
  },
  hydro: {
    uz: "Gidroponika",
    ru: "Гидропоника",
    en: "Hydroponics"
  },
  growbox: {
    uz: "Avtomatik Growboxlar",
    ru: "Умные Гроубоксы",
    en: "Growboxes"
  },
  sensors: {
    uz: "Wi-Fi Sensorlar",
    ru: "Wi-Fi Сенсоры",
    en: "Smart Sensors"
  },
  nutrients: {
    uz: "Organik o'g'itlar",
    ru: "Био удобрения",
    en: "Bio Nutrients"
  },
  organic: {
    uz: "Premium Bio Hosil",
    ru: "Премиум био-урожай",
    en: "Premium Harvest"
  },

  // Navigation Tabs
  tab_home: {
    uz: "Do'kon",
    ru: "Маркет",
    en: "Market"
  },
  tab_rewards: {
    uz: "Bonuslar",
    ru: "Бонусы",
    en: "Spin & Win"
  },
  tab_cart: {
    uz: "Savatcha",
    ru: "Корзина",
    en: "Cart"
  },
  tab_profile: {
    uz: "Profil",
    ru: "Кабинет",
    en: "Profile"
  },
  tab_admin: {
    uz: "Admin",
    ru: "Админ",
    en: "Admin"
  },

  // Auth Screen
  auth_title: {
    uz: "Premium Tizimga Kirish",
    ru: "Вход в премиум систему",
    en: "Secure Marketplace Entrance"
  },
  auth_subtitle: {
    uz: "INFARM premium ekotizimidan foydalanish uchun ro'yxatdan o'ting yoki kiring.",
    ru: "Войдите, чтобы отслеживать заказы, копить коины и крутить колесо фортуны.",
    en: "Sign in to track orders, accumulate coins, and spin the Fortune Wheel."
  },
  auth_name: {
    uz: "Ism",
    ru: "Имя",
    en: "First Name"
  },
  auth_surname: {
    uz: "Familya",
    ru: "Фамилия",
    en: "Last Name"
  },
  auth_phone: {
    uz: "Telefon raqami",
    ru: "Номер телефона",
    en: "Phone number"
  },
  auth_password: {
    uz: "Parol",
    ru: "Пароль",
    en: "Password"
  },
  auth_btn_login: {
    uz: "Tizimga kirish",
    ru: "Войти",
    en: "Sign In"
  },
  auth_btn_register: {
    uz: "Ro'yxatdan o'tish",
    ru: "Зарегистрироваться",
    en: "Create Account"
  },
  auth_or_google: {
    uz: "Google orqali kirish (Tezkor)",
    ru: "Войти через Google (Быстро)",
    en: "Continue with Google (Demo)"
  },
  auth_toggle_no_account: {
    uz: "Hisobingiz yo'qmi? Ro'yxatdan o'tish",
    ru: "Нет аккаунта? Зарегистрируйтесь",
    en: "Don't have an account? Sign up"
  },
  auth_toggle_has_account: {
    uz: "Hisobingiz bormi? Tizimga kirish",
    ru: "Уже есть аккаунт? Войти",
    en: "Already have an account? Log in"
  },

  // Coin and Loyalty Panel
  coin_balance_title: {
    uz: "INFARM COIN BALANSI",
    ru: "БАЛАНС INFARM КОИНОВ",
    en: "INFARM COIN BALANCE"
  },
  coin_earning_rule: {
    uz: "Har 100 000 UZS xarid uchun 1 Coin avtomat o'tkaziladi",
    ru: "За каждые 100 000 UZS заказа начисляется 1 коин бесплатно",
    en: "Every 100,000 UZS spent credits 1 interactive Loyalty Coin"
  },
  coin_earn_button: {
    uz: "Coinlarni ko'paytirish",
    ru: "Заработать коины",
    en: "Grow My Coins"
  },

  // Spin Wheel Game
  wheel_title: {
    uz: "OMAD CHARXI",
    ru: "КОЛЕСО УДАЧИ",
    en: "FORTUNE SPIN WHEEL"
  },
  wheel_desc: {
    uz: "Har kuni bepul 1 marta aylantiring! Bizning maxsus bonuslar va coinlarni yutib oling.",
    ru: "Испытайте удачу! Раз в сутки доступно бесплатное вращение с гарантированными призами.",
    en: "Spin the premium wheel daily for free! Earn bonus loyalty coins and digital coupons."
  },
  wheel_spin_btn: {
    uz: "AYLANTIRISH (BEPUL)",
    ru: "КРУТИТЬ (БЕСПЛАТНО)",
    en: "SPIN NOW (FREE)"
  },
  wheel_spin_running: {
    uz: "Aylanmoqda...",
    ru: "Колесо крутится...",
    en: "Spinning..."
  },
  wheel_win_congrats: {
    uz: "Tabriklaymiz! Siz yutib oldingiz: ",
    ru: "Поздравляем! Ваш выигрыш: ",
    en: "Congratulations! You claimed: "
  },

  // Rewards Store
  rewards_store_title: {
    uz: "SOVG'ALAR DO'KONI",
    ru: "ОБМЕН ПОДАРКОВ",
    en: "COIN REWARDS HUB"
  },
  rewards_store_desc: {
    uz: "Siz to'plagan coinlarga premium gadjetlar, elita urug'lar yoki chegirma promo-kodlarini oching.",
    ru: "Обменивайте накопленные коины на ценную технику, скидочные купоны или наборы семян.",
    en: "Redeem your accumulated coins for luxury gadgets, organic seeds, or massive vouchers."
  },
  reward_btn_claim: {
    uz: "Oching",
    ru: "Забрать",
    en: "Redeem"
  },
  reward_not_enough_coins: {
    uz: "Coin yetarli emas",
    ru: "Недостаточно коинов",
    en: "Insufficient Coins"
  },

  // Marketplace / Detail / Cart
  price_uzs: {
    uz: "so'm",
    ru: "сум",
    en: "UZS"
  },
  rating_label: {
    uz: "Reyting",
    ru: "Рейтинг",
    en: "Rating"
  },
  reviews_label: {
    uz: "Izohlar",
    ru: "Отзывы",
    en: "Reviews"
  },
  add_to_cart: {
    uz: "Savatchaga qo'shish",
    ru: "В корзину",
    en: "Add to Cart"
  },
  added_to_cart: {
    uz: "Muvaffaqiyatli qo'shildi!",
    ru: "Добавлено в корзину!",
    en: "Item added to cart!"
  },
  cart_empty: {
    uz: "Savatchangiz bo'sh. Marketplace bo'limidan mahsulot tanlang.",
    ru: "Ваша корзина пуста. Наполните её премиальным оборудованием.",
    en: "Your cart is currently empty. Explore our innovative catalog."
  },
  checkout_summary_title: {
    uz: "BUYURTMA TAFSILOTLARI",
    ru: "ДЕТАЛИ ЗАКАЗА",
    en: "ORDER TOTAL SUMMARY"
  },
  subtotal: {
    uz: "Jami",
    ru: "Итого за товары",
    en: "Subtotal"
  },
  promo_code_label: {
    uz: "Promo-kod kiritish",
    ru: "Применить промокод",
    en: "Enter Promo Code"
  },
  promo_applied: {
    uz: "Promo-kod qo'llanildi: ",
    ru: "Промокод успешно применен: ",
    en: "Promo code successfully active: "
  },
  promo_earned: {
    uz: "Yangi Coinlar:",
    ru: "Новые Коины:",
    en: "Coins earned:"
  },
  delivery_address: {
    uz: "Yetkazib berish manzili",
    ru: "Адрес доставки",
    en: "Delivery address detail"
  },
  delivery_status: {
    uz: "Buyurtma statusi",
    ru: "Статус доставки",
    en: "Delivery Status"
  },
  place_order_btn: {
    uz: "BUYURTMANI RASMIYLASHTIRISH",
    ru: "ПОДТВЕРДИТЬ И ОПЛАТИТЬ",
    en: "CONFIRM & SUBMIT ORDER"
  },

  // Profiles
  profile_title: {
    uz: "FOYDALANUVChI PROFILI",
    ru: "ПРОФИЛЬ ПОЛЬЗОВАТЕЛЯ",
    en: "USER ACCOUNT PORTAL"
  },
  orders_history: {
    uz: "Buyurtmalar tarixi",
    ru: "История заказов",
    en: "Past Order Transactions"
  },
  gifts_won_section: {
    uz: "Sizning sovg'alaringiz",
    ru: "Мои открытые подарки",
    en: "My Redeemed Rewards"
  },
  promo_codes_section: {
    uz: "Mavjud promo-kodlar",
    ru: "Мои промокоды",
    en: "My Discount Promo-Codes"
  },

  // Admin Screen
  admin_stats_title: {
    uz: "TIZIM STATISTIKASI (ADMIN)",
    ru: "СТАТИСТИКА СИСТЕМЫ (АДМИН)",
    en: "INFARM ANALYTICS (ADMIN)"
  },
  admin_add_prod: {
    uz: "Yangi mahsulot qo'shish",
    ru: "Добавить новый товар",
    en: "Insert Innovative Product"
  },
  admin_create_promo: {
    uz: "Promo-kod yaratish",
    ru: "Сгенерировать промокод",
    en: "Generate New Promo-Code"
  },
  admin_orders_manage: {
    uz: "Buyurtmalar boshqaruvi",
    ru: "Управление заказами",
    en: "Manage Orders Queue"
  },

  // Bot Floating UI & Screen
  bot_title: {
    uz: "INFARM AI MASLAHATChI",
    ru: "ИНФАРМ AI АССИСТЕНТ",
    en: "INFARM SMART AGRO-BOT"
  },
  bot_typing: {
    uz: "AI yozmoqda...",
    ru: "ИИ печатает...",
    en: "AI is thinking..."
  },
  bot_suggest_voice: {
    uz: "Ovozli xabar yuborish",
    ru: "Отправить голосовое",
    en: "Send Voice Message (Simulated)"
  },
  bot_placeholder: {
    uz: "Agrotexnika haqida savol so'rang...",
    ru: "Спросите бота о теплицах и семенах...",
    en: "Ask AI about crop health or products..."
  }
};
