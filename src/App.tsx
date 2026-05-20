import React, { useState, useEffect, useRef } from 'react';
import { 
  ShoppingBag, 
  User, 
  Bot, 
  Gift, 
  Compass, 
  Sparkles, 
  Coins, 
  Bell, 
  Globe, 
  Star, 
  Trash2, 
  Plus, 
  Minus, 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  X, 
  Check, 
  RefreshCw, 
  Settings, 
  LogOut, 
  Layers, 
  Home, 
  Smartphone, 
  PlusCircle, 
  CheckCircle, 
  Info, 
  MessageSquare,
  Search,
  ChevronRight,
  Filter,
  ArrowRight,
  UserCheck,
  Camera,
  Upload,
  Image as ImageIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PRODUCTS_DATA, GIFTS_LIST, DICTIONARY } from './data';
import { Product, GiftItem, PromoCode, Order, CartItem, ChatMessage, PushNotification, Language } from './types';

const PRESET_AVATARS = [
  { id: 'av1', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120', name: 'Female Agro researcher' },
  { id: 'av2', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120', name: 'Male Agro expert' },
  { id: 'av3', url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120', name: 'Smart specialist Female' },
  { id: 'av4', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120', name: 'Specialist Male' },
  { id: 'av5', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120', name: 'Agri Business Lead' },
  { id: 'av6', url: 'https://images.unsplash.com/photo-1628157582853-a796fa650a6a?auto=format&fit=crop&w=120', name: '3D Expert boy' },
  { id: 'av7', url: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120', name: '3D Maker avatar' },
  { id: 'av8', url: 'https://images.unsplash.com/photo-1607990283143-e81e7a2c93ab?auto=format&fit=crop&w=120', name: 'Tech Developer avatar' },
];

export default function App() {
  // Locale State
  const [lang, setLang] = useState<Language>('uz');

  // Simulator Frame view vs Full Browser view
  const [isPhoneFrame, setIsPhoneFrame] = useState<boolean>(true);

  // Splash Screen & Avatar customizer States
  const [showSplash, setShowSplash] = useState<boolean>(true);
  const [profilePic, setProfilePic] = useState<string>(() => {
    return localStorage.getItem('infarm_profile_pic') || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120';
  });
  const [showAvatarSelector, setShowAvatarSelector] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  // Auth State
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true); // Logged in as demo by default for instant premium experience
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [authForm, setAuthForm] = useState({
    name: 'MUHAMMADAZIZ',
    surname: "Rasuljonov ILHOMJON O'G'LI",
    phone: '+998 94 441-69-01',
    password: '1m2m3m4m'
  });

  // User Core State
  const [userCoins, setUserCoins] = useState<number>(38); // Initial starting coins to let user test rewards instantly!
  const [wonGifts, setWonGifts] = useState<GiftItem[]>([
    {
      id: "g5",
      name_uz: "Premium Urg'ochi urug'lar to'plami",
      name_ru: "Набор элитных семян",
      name_en: "Premium Elite Seeds Bundle",
      type: "seedkit",
      costCoins: 10,
      icon: "Sprout",
      color: "#EC4899",
      claimedAt: "2026-05-18 14:30"
    }
  ]);
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>([
    {
      code: "INFARMSTART",
      discountPercentage: 5,
      description_uz: "Birinchi xarid uchun maxsus 5% chegirma",
      description_ru: "Специальная скидка 5% на первый заказ",
      description_en: "Special 5% discount for your initial purchase",
      isUsed: false,
      earnedAt: "2026-05-19 09:12"
    }
  ]);
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "INF-9382",
      date: "2026-05-19 11:24",
      items: [
        {
          product: PRODUCTS_DATA[2], // BioProbe Wi-Fi
          quantity: 1
        }
      ],
      total: 450000,
      discountApplied: 0,
      finalTotal: 450000,
      address: "Toshkent sh., Chilonzor daxasi, 12-uy",
      phone: "+998 90 123-45-67",
      status: "processing"
    }
  ]);

  // Catalog and Navigation
  const [products, setProducts] = useState<Product[]>(PRODUCTS_DATA);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'market' | 'rewards' | 'cart' | 'profile' | 'admin'>('market');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Cart State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [deliveryAddress, setDeliveryAddress] = useState<string>('Toshkent sh., Yunusobod tumani, Amir Temur ko‘chasi, 45-bino');
  const [orderPhone, setOrderPhone] = useState<string>('+998 90 123-45-67');
  const [couponCodeInput, setCouponCodeInput] = useState<string>('');
  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);

  // Spin Wheel Game State
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [wheelDegree, setWheelDegree] = useState<number>(0);
  const [wheelMessage, setWheelMessage] = useState<string | null>(null);
  const [hasSpunFreeToday, setHasSpunFreeToday] = useState<boolean>(false);

  // Push Notifications State
  const [notifications, setNotifications] = useState<PushNotification[]>([
    {
      id: "n1",
      title_uz: "Xush kelibsiz! 🌱",
      title_ru: "Добро пожаловать! 🌱",
      title_en: "Welcome Aboard! 🌱",
      body_uz: "INFARM MARKET tarmog'iga qo'shilganingiz uchun sizga 15 bepul coin hadya etildi!",
      body_ru: "За вступление в сеть INFARM MARKET вам начислено 15 приветственных коинов!",
      body_en: "To celebrate your entry to INFARM MARKET, we gifted you 15 loyalty coins!",
      time: "Hozirgina",
      read: false,
      type: "coin"
    },
    {
      id: "n2",
      title_uz: "Aksiya: 5% Starter Promo-kod",
      title_ru: "Акция: Стартовый купон 5%",
      title_en: "Hot Deal: 5% Starter Coupon",
      body_uz: "INFARMSTART promo-kodidan istalgan vaqt buyurtma rasmiylashtirishda foydalaning.",
      body_ru: "Используйте промокод INFARMSTART при первой покупке для мгновенной выгоды.",
      body_en: "Type coupon code INFARMSTART at checkout to score initial discounts.",
      time: "2 soat oldin",
      read: true,
      type: "promo"
    }
  ]);
  const [showNotificationsDropdown, setShowNotificationsDropdown] = useState<boolean>(false);
  const [toasts, setToasts] = useState<{id: string, message: string}[]>([]);

  // AI Chatbot State
  const [isBotOpen, setIsBotOpen] = useState<boolean>(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      id: "bot-init",
      role: "model",
      text: "Assalomu alaykum! Men INFARM agrotexnik AI assistentiman. Sizga aqlli do'konimiz, coinlar, sovg'alar va mahsulotlarimizni tanlashda yordam beraman. Savolingiz bo'lsa marhamat! 🥬",
      timestamp: "05:07"
    }
  ]);
  const [chatInput, setChatInput] = useState<string>('');
  const [isBotTyping, setIsBotTyping] = useState<boolean>(false);
  const [voiceSimulatedActive, setVoiceSimulatedActive] = useState<boolean>(false);
  const [voiceTextOutput, setVoiceTextOutput] = useState<string | null>(null);

  // Admin Custom Controls State
  const [adminStats, setAdminStats] = useState({
    totalSales: 450000,
    registeredUsersCount: 148,
    activeCouponsCreated: 3,
    redeemedGiftsCount: 12
  });
  
  // Custom Product Submission (Admin Panel)
  const [newProductForm, setNewProductForm] = useState({
    name_uz: '',
    name_ru: '',
    name_en: '',
    price: 320000,
    category: 'sensors' as any,
    rating: 4.8,
    description_uz: '',
    description_ru: '',
    description_en: '',
    image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=400&q=80'
  });

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory, isBotTyping]);

  // Helper dictionary translations
  const t = (key: string): string => {
    if (DICTIONARY[key]) {
      return DICTIONARY[key][lang] || DICTIONARY[key]['uz'];
    }
    return key;
  };

  // Toast Trigger Helper
  const triggerToast = (msg: string) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message: msg }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  // File upload and drag drop custom profile photo mechanisms
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        triggerToast(lang === 'uz' ? "Rasm hajmi 2MB dan oshmasligi kerak!" : "Размер фото не должен превышать 2 МБ!");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setProfilePic(reader.result);
          localStorage.setItem('infarm_profile_pic', reader.result);
          triggerToast(t('profile_pic_updated'));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        if (file.size > 2 * 1024 * 1024) {
          triggerToast(lang === 'uz' ? "Rasm hajmi 2MB dan oshmasligi kerak!" : "Размер фото не должен превышать 2 МБ!");
          return;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === 'string') {
            setProfilePic(reader.result);
            localStorage.setItem('infarm_profile_pic', reader.result);
            triggerToast(t('profile_pic_updated'));
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  // Push Trigger Helper
  const triggerPush = (title_uz: string, title_ru: string, title_en: string, body_uz: string, body_ru: string, body_en: string, type: 'coin' | 'promo' | 'delivery' | 'gift') => {
    const newPush: PushNotification = {
      id: Date.now().toString(),
      title_uz,
      title_ru,
      title_en,
      body_uz,
      body_ru,
      body_en,
      time: "Hozirgina",
      read: false,
      type
    };
    setNotifications(prev => [newPush, ...prev]);
    
    // Auto trigger push banner sound simulated toast
    const title = lang === 'uz' ? title_uz : (lang === 'ru' ? title_ru : title_en);
    triggerToast(`🔔 PUSH: ${title}`);
  };

  // Auth Submit Handlers
  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authForm.name || !authForm.phone) {
      triggerToast(lang === 'uz' ? "Iltimos hamma maydonlarni to'ldiring!" : "Пожалуйста, заполните все поля!");
      return;
    }
    setIsLoggedIn(true);
    triggerToast(lang === 'uz' ? `Xush kelibsiz, ${authForm.name}!` : `Добро пожаловать, ${authForm.name}!`);
    triggerPush(
      "Kirish bajarildi", "Вход выполнен", "Access Granted",
      "INFARM MARKET tarmog'iga xavfsiz premium ulanish o'rnatildi.",
      "Установлено безопасное премиальное подключение к вашей учетной записи.",
      "A secure premium connection to your account credentials has been established.",
      "coin"
    );
  };

  // Handle Google Auth Simulator
  const handleGoogleAuthSimulate = () => {
    setAuthForm({
      name: 'MUHAMMADAZIZ',
      surname: "Rasuljonov ILHOMJON O'G'LI",
      phone: '+998 94 441-69-01',
      password: '1m2m3m4m'
    });
    setIsLoggedIn(true);
    triggerToast("Google OAuth Verified ✔️");
    triggerPush(
      "Google orqali kirish", "Вход через Google", "Google Verified Entry",
      "Siz Google hisobingiz orqali tizimga muvaffaqiyatli kirdingiz.",
      "Вы успешно вошли в систему через защищенный аккаунт Google.",
      "You have authenticated via Google unified secure account connection.",
      "coin"
    );
  };

  // Cart Handlers
  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    const existing = cart.find(item => item.product.id === product.id);
    if (existing) {
      setCart(cart.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
    triggerToast(`${product[`name_${lang}`]} ${t('added_to_cart')}`);
  };

  const updateCartQty = (productId: string, delta: number) => {
    setCart(cart.map(item => {
      if (item.product.id === productId) {
        const nq = item.quantity + delta;
        return { ...item, quantity: nq > 0 ? nq : 1 };
      }
      return item;
    }).filter(Boolean));
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter(item => item.product.id !== productId));
    triggerToast(lang === 'uz' ? "Mahsulot savatchadan olib tashlandi" : "Товар удален из корзины");
  };

  // Promo Code Validation
  const handleApplyPromo = () => {
    if (!couponCodeInput.trim()) return;
    const codeUpper = couponCodeInput.toUpperCase().trim();
    
    // Check against user owned or universal coupons
    const match = promoCodes.find(p => p.code === codeUpper && !p.isUsed);
    if (match) {
      setAppliedPromo(match);
      triggerToast(`${t('promo_applied')} ${match.discountPercentage}%`);
    } else if (codeUpper === "INFARMSTART") {
      const generated: PromoCode = {
        code: "INFARMSTART",
        discountPercentage: 5,
        description_uz: "Aksiya starter kodi",
        description_ru: "Стартовый код акции",
        description_en: "Promo starter coupon",
        isUsed: false,
        earnedAt: "Now"
      };
      setAppliedPromo(generated);
      triggerToast(`${t('promo_applied')} 5%`);
    } else {
      triggerToast(lang === 'uz' ? "Noto'g'ri yoxud eski promo-kod" : "Неверный или использованный промокод");
    }
  };

  // Place Order checkout
  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const discount = appliedPromo ? Math.round((subtotal * appliedPromo.discountPercentage) / 100) : 0;
    const finalTotal = subtotal - discount;

    // Loyalty Coin earnings: 1 coin for every 100 000 so'm
    const earnedCoins = Math.floor(finalTotal / 100000);

    const newOrder: Order = {
      id: `INF-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      items: [...cart],
      total: subtotal,
      discountApplied: discount,
      finalTotal: finalTotal,
      address: deliveryAddress,
      phone: orderPhone,
      status: 'pending'
    };

    // Update States
    setOrders([newOrder, ...orders]);
    setCart([]);
    setAppliedPromo(null);
    setCouponCodeInput('');
    
    // Credit coins
    if (earnedCoins > 0) {
      setUserCoins(prev => prev + earnedCoins);
      triggerPush(
        "Koinlar hisobingizga tushdi! 🪙", "Коины начислены! 🪙", "Coins Received! 🪙",
        `Xarid uchun sizga qo'shimcha ${earnedCoins} ta INFARM Coin doimiy ravishda berildi!`,
        `За вашу покупку вам дополнительно начислено ${earnedCoins} INFARM коинов!`,
        `You have been credited ${earnedCoins} Loyalty Coins for your order support!`,
        "coin"
      );
    }

    triggerToast(lang === 'uz' ? "Buyurtmangiz muvaffaqiyatli rasmiylashtirildi!" : "Ваш заказ успешно отправлен в обработку!");

    // Set interactive push notifications
    setTimeout(() => {
      triggerPush(
        "Buyurtma qabul qilindi 📦", "Заказ подтвержден 📦", "Order Verified 📦",
        `Sizning #${newOrder.id} buyurtmangiz navbatga qo'shildi va tayyorlanmoqda.`,
        `Ваш заказ #${newOrder.id} принят системой и собирается на складе.`,
        `Your premium hardware suite is grouped under order reference #${newOrder.id}.`,
        "delivery"
      );
    }, 4000);

    setActiveTab('profile'); // Send to profile to view delivery trail
  };

  // Spin Fortune Wheel Animation & Logic
  const handleSpinWheel = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setWheelMessage(null);

    // Randomize rotation: 5 full turns + random degrees
    const extraDegrees = Math.floor(Math.random() * 360);
    const targetDegrees = wheelDegree + (360 * 7) + extraDegrees;
    setWheelDegree(targetDegrees);

    // Pinpoint what user won from index (divided in 6 slices)
    const normalizedAngle = (targetDegrees % 360);
    // 6 sectors of 60 degrees:
    // 0-60: +1 Coin, 61-120: Premium Seed Bundle, 121-180: +5 Coins, 181-240: "INFARM15" Promo (15% off), 241-300: +2 Coins, 311-360: +10 Coins
    let coinAward = 0;
    let giftWon: PromoCode | null = null;
    let prizeName = '';

    const section = Math.floor((360 - (normalizedAngle % 360)) / 60) % 6;
    
    if (section === 0) {
      coinAward = 1;
      prizeName = "+1 INFARM Coin";
    } else if (section === 1) {
      prizeName = lang === 'uz' ? "Premium Urg'ochi Urug' to'plami!" : "Набор премиальных семян";
      coinAward = 5; // give coins as placeholder to buy or direct
    } else if (section === 2) {
      coinAward = 5;
      prizeName = "+5 INFARM Coins! 🪙";
    } else if (section === 3) {
      prizeName = "INFARM15 (15% Chegirma Promo-kod)";
      giftWon = {
        code: "INFARM15",
        discountPercentage: 15,
        description_uz: "G'oliblik kodi: 15% chegirma",
        description_ru: "Выигрышный купон: 15% скидка",
        description_en: "Spin Wheel Win: Flat 15% Off",
        isUsed: false,
        earnedAt: "Bugun"
      };
    } else if (section === 4) {
      coinAward = 2;
      prizeName = "+2 INFARM Coins";
    } else {
      coinAward = 10;
      prizeName = "⚡ +10 INFARM Coins Super Win! ⚡";
    }

    setTimeout(() => {
      setIsSpinning(false);
      setHasSpunFreeToday(true);
      
      if (coinAward > 0) {
        setUserCoins(prev => prev + coinAward);
      }
      if (giftWon) {
        setPromoCodes(prev => [giftWon!, ...prev]);
      }

      const displayMessage = t('wheel_win_congrats') + prizeName;
      setWheelMessage(displayMessage);
      triggerToast(displayMessage);

      // Trigger Push notification
      triggerPush(
        "Omad Charxi g'olibi! 🔮", "Выигрыш на Колесе Фортуны! 🔮", "Fortune Wheel Winner! 🔮",
        `Siz omad charxida o'ynab "${prizeName}" yutib oldingiz. Bonus esdalik sovg'alarini ko'ring.`,
        `Вы сыграли в суточную лотерею и забрали: "${prizeName}". Посмотрите свои призы!`,
        `You spun the daily roulette wheel and pocketed "${prizeName}" on your active profile.`,
        giftWon ? "promo" : "coin"
      );
    }, 4000);
  };

  // Gift Exchange / Redemption using Coins
  const handleRedeemGift = (gift: GiftItem) => {
    if (userCoins < gift.costCoins) {
      triggerToast(t('reward_not_enough_coins'));
      return;
    }

    // Deduct coins & add to won gifts
    setUserCoins(prev => prev - gift.costCoins);
    
    const claimedGift: GiftItem = {
      ...gift,
      id: `CLAIM-${Math.floor(100 + Math.random() * 900)}`,
      claimedAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };

    setWonGifts([claimedGift, ...wonGifts]);
    
    // If gift is a promo-code, generate active promocode item too
    if (gift.type === 'promo5' || gift.type === 'promo10') {
      const pCode: PromoCode = {
        code: `VAL-${Math.floor(1000 + Math.random() * 9000)}`,
        discountPercentage: gift.type === 'promo10' ? 50 : 25,
        description_uz: gift[`name_uz`],
        description_ru: gift[`name_ru`],
        description_en: gift[`name_en`],
        isUsed: false,
        earnedAt: "Now"
      };
      setPromoCodes([pCode, ...promoCodes]);
    }

    triggerToast(lang === 'uz' ? `${gift.name_uz} muvaffaqiyatli ochildi!` : `${gift.name_ru} успешно разблокирован!`);
    
    triggerPush(
      "Sovg'a qabul qilindi 🎁", "Подарок получен 🎁", "Gift Dispatched 🎁",
      `Siz ${gift.costCoins} coin uchun "${gift.name_uz}" sovg'asini ochdingiz. Operatorimiz yetkazish uchun telefon orqali tezda bog'lanadi.`,
      `Вы успешно обменяли коины (${gift.costCoins}) на товар "${gift.name_ru}". Скоро курьер созвонится с вами.`,
      `You successfully redeemed ${gift.costCoins} coins for "${gift.name_en}". Our logistical agents will dial your number soon.`,
      "gift"
    );
  };

  // AI Chatbot Server Sync
  const handleSendChatMessage = async (e?: React.FormEvent, customMsg?: string) => {
    if (e) e.preventDefault();
    const textToSend = customMsg || chatInput;
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatHistory(prev => [...prev, userMsg]);
    if (!customMsg) setChatInput(''); // clear textfield
    setIsBotTyping(true);

    // Call REST endpoint
    try {
      const activeOrder = orders.find(o => o.status !== 'delivered') || orders[0] || null;
      
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: textToSend,
          history: chatHistory,
          language: lang,
          userName: `${authForm.name} ${authForm.surname}`,
          userCoins: userCoins,
          currentOrder: activeOrder
        })
      });

      const data = await response.json();
      
      // Delay response slightly for extreme chat realism
      setTimeout(() => {
        setIsBotTyping(false);
        const botMsg: ChatMessage = {
          id: `msg-${Date.now() + 1}`,
          role: 'model',
          text: data.response || "Server is ready",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setChatHistory(prev => [...prev, botMsg]);

        // If voice mode simulated active, update voice transcription
        if (voiceSimulatedActive) {
          setVoiceTextOutput(data.response);
          // Play smart text-to-speech if browser supports
          if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(data.response);
            utterance.lang = lang === 'uz' ? 'uz-UZ' : (lang === 'ru' ? 'ru-RU' : 'en-US');
            window.speechSynthesis.speak(utterance);
          }
        }
      }, 950);

    } catch (err) {
      console.error(err);
      setIsBotTyping(false);
      // Failover trigger
      const fallback: ChatMessage = {
        id: `msg-fail-${Date.now()}`,
        role: 'model',
        text: "Kechirasiz, aqlli sensorlar va tarmoq ulanishida kichik xatolik bo'ldi. INFARM asboblari haqida har doim savollaringizga javob berishga tayyorman! 🌱",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatHistory(prev => [...prev, fallback]);
    }
  };

  // Simulate Voice Message Recording/Sending
  const handleSimulateVoiceInput = () => {
    setVoiceSimulatedActive(true);
    triggerToast(lang === 'uz' ? "🎙️ Mikrofondan ovoz yozilmoqda..." : "🎙️ Идет симуляция записи голоса...");
    
    // Auto translate standard vocal prompts depending on language
    setTimeout(() => {
      const promptText = lang === 'uz' 
        ? "Menga ajoyib avtomatlashtirilgan aqlli growbox haqida ma'lumot ber va uni tavsiya qil"
        : lang === 'ru'
        ? "Расскажи мне подробную информацию про умный гроубокс и его цену"
        : "What organic sensors can help me monitor real-time soil variables?";
      
      triggerToast(lang === 'uz' ? `Ovozli xabar matnga o'girildi: "${promptText}"` : `Распознавание речи: "${promptText}"`);
      handleSendChatMessage(undefined, promptText);
    }, 2500);
  };

  // Admin Actions
  const handleAdminAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProductForm.name_uz || !newProductForm.price) return;

    const added: Product = {
      id: `p${products.length + 1}`,
      name_uz: newProductForm.name_uz,
      name_ru: newProductForm.name_ru || newProductForm.name_uz,
      name_en: newProductForm.name_en || newProductForm.name_uz,
      price: Number(newProductForm.price),
      category: newProductForm.category,
      image: newProductForm.image,
      rating: newProductForm.rating,
      description_uz: newProductForm.description_uz || "Yangi agrotexnika mahsuloti",
      description_ru: newProductForm.description_ru || "Новое интеллектуальное оборудование",
      description_en: newProductForm.description_en || "Next-generation smart farm component"
    };

    setProducts([...products, added]);
    triggerToast("Mahsulot muvaffaqiyatli qo'shildi! (Admin)");
    triggerPush(
      "Yangi mahsulot sotuvda! 🔥", "Новый товар в наличии! 🔥", "New Hardware Alert! 🔥",
      `Do'konimizga yangi mahsulot qo'shildi: ${added.name_uz}. Uni ko'rish uchun marketni ko'ring.`,
      `В каталог добавлен новый товар: ${added.name_ru}. Ознакомьтесь в витрине.`,
      `Fresh item listed: ${added.name_en}. Head to the store tab to analyze specs.`,
      "promo"
    );

    // Reset Form
    setNewProductForm({
      name_uz: '',
      name_ru: '',
      name_en: '',
      price: 320000,
      category: 'sensors',
      rating: 4.8,
      description_uz: '',
      description_ru: '',
      description_en: '',
      image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=400&q=80'
    });
  };

  // Switch Order statuses via Admin
  const handleUpdateOrderStatus = (orderId: string, nextStatus: 'pending' | 'processing' | 'shipped' | 'delivered') => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: nextStatus } : o));
    triggerToast(`Status updated for ${orderId}: ${nextStatus}`);
    
    // Trigger push warning to user
    triggerPush(
      `Buyurtmangiz holati o'zgardi 🚚`, 
      `Изменение статуса доставки 🚚`,
      `Order Transit Notification 🚚`,
      `Sizning #${orderId} buyurtmangiz endi: ${nextStatus === 'processing' ? "tayyorlanmoqda" : nextStatus === 'shipped' ? "yo'lda" : "yetkazib berildi"}!`,
      `Ваш заказ #${orderId} теперь в статусе: ${nextStatus === 'processing' ? "собирается" : nextStatus === 'shipped' ? "в пути к вам" : "успешно доставлен"}!`,
      `Your delivery package #${orderId} has transitioned: ${nextStatus}!`,
      "delivery"
    );
  };

  // Cheat coin addition
  const handleAddCoinsCheat = (amount: number) => {
    setUserCoins(prev => prev + amount);
    triggerToast(`Cheat mode: added ${amount} coin-loyalty balance!`);
  };

  // Custom styling elements
  const activeTabClass = "flex flex-col items-center justify-center flex-1 text-emerald-400 font-semibold border-t-2 border-emerald-400 py-2 transition-all duration-300 transform scale-105";
  const inactiveTabClass = "flex flex-col items-center justify-center flex-1 text-gray-400 hover:text-emerald-500 py-2 transition-all duration-300";

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-black">
      
      {/* Dynamic Animated Status Indicators / Push Toasts */}
      <div className="fixed top-20 right-4 z-50 flex flex-col space-y-3 pointer-events-auto max-w-sm">
        {toasts.map(toast => (
          <div key={toast.id} className="bg-neutral-900/90 border border-emerald-500/40 backdrop-blur-md px-4 py-3 rounded-xl shadow-lg shadow-emerald-950/20 text-xs flex items-center justify-between space-x-2 animate-bounce">
            <span className="text-emerald-400 font-mono text-xs">{toast.message}</span>
            <button onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))} className="text-gray-500 hover:text-emerald-400">
              <X className="w-3" />
            </button>
          </div>
        ))}
      </div>

      {/* Main Container Wrapper */}
      <div className="w-full max-w-7xl mx-auto px-4 py-4 flex-1 flex flex-col items-center justify-center">
        
        {/* PREMIUM UPPER NAVIGATION & UTILITY BAR (No tech larp lines, just pure elegant choices) */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between mb-6 pb-4 border-b border-neutral-800 gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-neutral-900 border border-emerald-500/30 rounded-xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <Compass className="w-8 h-8 text-emerald-400 animate-spin-slow" />
            </div>
            <div>
              <h1 id="app-logo-text" className="text-2xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-neutral-50 via-emerald-400 to-emerald-200">
                {t('app_title')}
              </h1>
              <p className="text-[10px] uppercase tracking-widest text-emerald-500/70 font-mono">
                {t('tagline')}
              </p>
            </div>
          </div>

          {/* Quick Stats Banner & Switchers */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            
            {/* Display Coin balance preview inside top bar always */}
            {isLoggedIn && (
              <div onClick={() => setActiveTab('rewards')} className="flex items-center space-x-2 cursor-pointer bg-emerald-950/30 border border-emerald-400/30 px-3 py-1.5 rounded-full hover:bg-emerald-950/50 transition-all">
                <Coins className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span className="text-xs font-bold text-emerald-300 font-mono">{userCoins} Coin</span>
              </div>
            )}

            {/* Language Switcher */}
            <div className="flex items-center bg-neutral-900 border border-neutral-800 rounded-lg p-1 space-x-1">
              <Globe className="w-3.5 h-3.5 text-emerald-500 ml-1.5" />
              {(['uz', 'ru', 'en'] as Language[]).map(l => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2 py-1 rounded text-[11px] font-bold uppercase transition-all duration-200 ${lang === l ? 'bg-emerald-500 text-black shadow-md' : 'text-gray-400 hover:text-emerald-400'}`}
                >
                  {l}
                </button>
              ))}
            </div>

            {/* Device Layout Switcher */}
            <button
              onClick={() => setIsPhoneFrame(!isPhoneFrame)}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-neutral-800 bg-neutral-900 hover:bg-neutral-800 transition-all text-xs"
              title="Toggle iPhone simulated style vs full stretched screen"
            >
              <Smartphone className={`w-4 h-4 ${isPhoneFrame ? 'text-emerald-400' : 'text-gray-400'}`} />
              <span className="hidden sm:inline font-mono text-[11px]">
                {isPhoneFrame ? "iPhone Canvas" : "Stretch Canvas"}
              </span>
            </button>

            {/* Push notification bell */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowNotificationsDropdown(!showNotificationsDropdown);
                  // Make all read on click
                  if (!showNotificationsDropdown) {
                    setNotifications(notifications.map(n => ({...n, read: true})));
                  }
                }}
                className="relative p-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-lg text-neutral-300 transition-all"
              >
                <Bell className="w-4 h-4 text-emerald-400" />
                {notifications.some(n => !n.read) && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
                )}
              </button>

              {/* Push dropdown list */}
              {showNotificationsDropdown && (
                <div className="absolute right-0 mt-2 w-80 bg-neutral-900/95 border border-neutral-800/90 rounded-2xl shadow-2xl p-4 z-40 backdrop-blur-lg">
                  <div className="flex items-center justify-between border-b border-neutral-800 pb-2 mb-2">
                    <span className="text-xs font-bold text-neutral-300">PUSH Notifications</span>
                    <button onClick={() => {
                      setNotifications([]);
                      triggerToast("Clear notifications");
                    }} className="text-[10px] text-gray-500 hover:text-red-400">Clear all</button>
                  </div>
                  <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                    {notifications.length === 0 ? (
                      <p className="text-[11px] text-gray-500 text-center py-4">No push history</p>
                    ) : (
                      notifications.map(n => (
                        <div key={n.id} className="text-xs border-b border-neutral-800/50 pb-2">
                          <p className="font-bold text-emerald-400 flex items-center justify-between">
                            <span>{lang === 'uz' ? n.title_uz : (lang === 'ru' ? n.title_ru : n.title_en)}</span>
                            <span className="text-[9px] font-mono text-gray-500 font-normal">{n.time}</span>
                          </p>
                          <p className="text-[11px] text-neutral-300 mt-0.5 font-normal">
                            {lang === 'uz' ? n.body_uz : (lang === 'ru' ? n.body_ru : n.body_en)}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Demo Helper Switcher: Quick Coin Injector */}
            <button
              onClick={() => handleAddCoinsCheat(25)}
              className="px-2.5 py-1.5 rounded-lg border border-dashed border-emerald-500/40 hover:border-emerald-400/80 bg-neutral-950 text-emerald-400 text-[10px] font-mono transition-all"
              title="Add 25 coins for instant verification of gifts system"
            >
              +25 Coins Cheat
            </button>
          </div>
        </div>

        {/* INTERACTIVE COMPONENT: PRE-VIEW CONTAINER CONFIG (iPhone / Desktop Canvas Style) */}
        <div className={`w-full transition-all duration-500 flex flex-col items-center justify-center ${isPhoneFrame ? 'max-w-[430px] mx-auto' : 'max-w-5xl'}`}>
          
          <div className={`w-full flex flex-col bg-neutral-900 border border-neutral-800 transition-all overflow-hidden ${isPhoneFrame ? 'rounded-[46px] shadow-[0_0_80px_rgba(16,185,129,0.1)] border-emerald-500/25 relative' : 'rounded-3xl shadow-xl'}`}>
            
            {/* iPhone Pro Screen Top Bar Simulator */}
            {isPhoneFrame && (
              <div className="w-full bg-neutral-950/90 pt-3 pb-1.5 px-6 flex justify-between items-center z-10 select-none">
                <span className="text-[11px] font-mono text-neutral-300">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                <div className="w-24 h-4 bg-neutral-900 rounded-full border border-neutral-800 flex items-center justify-center px-1">
                  <div className="w-3.5 h-1.5 bg-neutral-800 rounded-full mr-2"></div>
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                </div>
                <div className="flex items-center space-x-1.5 text-neutral-300 text-[11px]">
                  <span className="text-[9px] text-emerald-400 font-mono">5G LTE</span>
                  <div className="w-5 h-2.5 border border-neutral-600 rounded-sm p-0.5 flex bg-emerald-400/20">
                    <div className="w-full h-full bg-emerald-400 rounded-sm"></div>
                  </div>
                </div>
              </div>
            )}

            {/* INNER APPLICATION CANVAS */}
            <div className="p-4 flex-1 flex flex-col overflow-y-auto space-y-4 min-h-[580px] max-h-[750px] overflow-x-hidden scrollbar-thin scrollbar-thumb-neutral-800">
              
              {/* AUTH SCREEN (MANDATORY REGISTRATSIYA SECTIONS SIMULATED SECURELY OR COMPLETED) */}
              {!isLoggedIn ? (
                <div className="flex-1 flex flex-col justify-center py-6 px-1">
                  <div className="text-center mb-6">
                    <div className="inline-block p-4 bg-neutral-950 border border-emerald-500/30 rounded-full mb-3 shadow-[0_4px_20px_rgba(16,185,129,0.1)]">
                      <UserCheck className="w-10 h-10 text-emerald-400" />
                    </div>
                    <h2 className="text-xl font-bold text-neutral-100 uppercase tracking-wider">{t('auth_title')}</h2>
                    <p className="text-xs text-neutral-400 mt-2 max-w-xs mx-auto">
                      {t('auth_subtitle')}
                    </p>
                  </div>

                  <form onSubmit={handleAuthSubmit} className="space-y-4 bg-neutral-950/80 p-5 rounded-2xl border border-neutral-800 glassmorphism">
                    <div>
                      <label className="block text-[10px] uppercase text-emerald-400 font-mono mb-1">{t('auth_name')}</label>
                      <input
                        type="text"
                        value={authForm.name}
                        onChange={e => setAuthForm({ ...authForm, name: e.target.value })}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-neutral-100 focus:outline-none focus:border-emerald-400"
                        placeholder="MUHAMMADAZIZ"
                        required
                      />
                    </div>

                    {authMode === 'register' && (
                      <div>
                        <label className="block text-[10px] uppercase text-emerald-400 font-mono mb-1">{t('auth_surname')}</label>
                        <input
                          type="text"
                          value={authForm.surname}
                          onChange={e => setAuthForm({ ...authForm, surname: e.target.value })}
                          className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-neutral-100 focus:outline-none focus:border-emerald-400"
                          placeholder="Rasuljonov"
                        />
                      </div>
                    )}

                    <div>
                      <label className="block text-[10px] uppercase text-emerald-400 font-mono mb-1">{t('auth_phone')}</label>
                      <input
                        type="tel"
                        value={authForm.phone}
                        onChange={e => setAuthForm({ ...authForm, phone: e.target.value })}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-neutral-100 focus:outline-none focus:border-emerald-400"
                        placeholder="+998 90 123-45-67"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase text-emerald-400 font-mono mb-1">{t('auth_password')}</label>
                      <input
                        type="password"
                        value={authForm.password}
                        onChange={e => setAuthForm({ ...authForm, password: e.target.value })}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-neutral-100 focus:outline-none focus:border-emerald-400"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-emerald-500 hover:bg-emerald-400 text-black py-2.5 rounded-xl text-xs font-black uppercase transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(16,185,129,0.3)] cursor-pointer"
                    >
                      {authMode === 'login' ? t('auth_btn_login') : t('auth_btn_register')}
                    </button>

                    <div className="relative flex py-2 items-center">
                      <div className="flex-grow border-t border-neutral-800"></div>
                      <span className="flex-shrink mx-4 text-[10px] text-gray-500 uppercase font-mono">OR</span>
                      <div className="flex-grow border-t border-neutral-800"></div>
                    </div>

                    {/* Google OAuth Simulator */}
                    <button
                      type="button"
                      onClick={handleGoogleAuthSimulate}
                      className="w-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-200 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center space-x-2 transition-all cursor-pointer"
                    >
                      <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                      </svg>
                      <span>{t('auth_or_google')}</span>
                    </button>
                  </form>

                  <div className="text-center mt-4">
                    <button
                      onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                      className="text-xs text-emerald-400 hover:underline font-mono"
                    >
                      {authMode === 'login' ? t('auth_toggle_no_account') : t('auth_toggle_has_account')}
                    </button>
                  </div>
                </div>
              ) : (
                
                // LOGGED IN PORTAL (MARKETS, WHEELS, PROFILE, CARTS, ADMIN)
                <>
                  {/* Tab 1: Market (Home / Shop List) */}
                  {activeTab === 'market' && (
                    <div className="space-y-4 animate-fade-in">
                      
                      {/* Search and Category filters */}
                      <div className="space-y-3">
                        <div className="relative">
                          <input
                            type="text"
                            placeholder={t('search_placeholder')}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl py-2 px-3 pl-10 text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-emerald-400 focus:border-emerald-400 font-sans"
                          />
                          <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-emerald-400/80" />
                          {searchQuery && (
                            <button onClick={() => setSearchQuery('')} className="absolute right-3.5 top-2.5 text-neutral-400 hover:text-emerald-400">
                              <X className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>

                        {/* Category filter sliding rails */}
                        <div className="flex space-x-1.5 overflow-x-auto pb-1.5 scrollbar-none">
                          <button
                            onClick={() => setCategoryFilter('all')}
                            className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase transition-all whitespace-nowrap ${categoryFilter === 'all' ? 'bg-emerald-400 text-black shadow-lg shadow-emerald-500/10' : 'bg-neutral-950 text-gray-400 hover:text-neutral-100 border border-neutral-800'}`}
                          >
                            {t('all')}
                          </button>
                          {['hydro', 'growbox', 'sensors', 'nutrients', 'organic'].map((cat) => (
                            <button
                              key={cat}
                              onClick={() => setCategoryFilter(cat)}
                              className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase transition-all whitespace-nowrap ${categoryFilter === cat ? 'bg-emerald-400 text-black' : 'bg-neutral-950 text-gray-400 hover:text-neutral-100 border border-neutral-800'}`}
                            >
                              {t(cat)}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Store Grid */}
                      <div className="grid grid-cols-1 xs:grid-cols-2 gap-4">
                        {products
                          .filter(p => categoryFilter === 'all' || p.category === categoryFilter)
                          .filter(p => {
                            const term = searchQuery.toLowerCase();
                            return p.name_uz.toLowerCase().includes(term) || p.name_ru.toLowerCase().includes(term) || p.name_en.toLowerCase().includes(term);
                          })
                          .map((product) => (
                            <div 
                              key={product.id}
                              onClick={() => setSelectedProduct(product)}
                              className="group bg-neutral-950 border border-neutral-800 hover:border-emerald-500/25 rounded-2xl p-3 flex flex-col space-y-2.5 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg cursor-pointer relative overflow-hidden"
                            >
                              {/* Thumbnail Picture */}
                              <div className="relative w-full h-32 bg-neutral-900 rounded-xl overflow-hidden">
                                <img 
                                  src={product.image} 
                                  alt={product[`name_${lang}`]} 
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                                />
                                <div className="absolute top-2 right-2 bg-neutral-950/80 backdrop-blur-md border border-neutral-800 px-2 py-0.5 rounded-full flex items-center space-x-0.5">
                                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                                  <span className="text-[10px] font-bold text-amber-300 font-mono">{product.rating.toFixed(1)}</span>
                                </div>
                              </div>

                              <div className="flex-1 flex flex-col justify-between">
                                <div>
                                  <span className="text-[8px] uppercase tracking-wider text-emerald-400/80 font-mono font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full">
                                    {t(product.category)}
                                  </span>
                                  <h3 className="text-xs font-bold text-neutral-100 leading-tight mt-1.5 group-hover:text-emerald-300 transition-colors">
                                    {product[`name_${lang}`]}
                                  </h3>
                                </div>

                                <div className="mt-3 pt-2 border-t border-neutral-900 flex items-center justify-between">
                                  <div>
                                    <p className="text-[9px] text-gray-500 uppercase font-mono leading-none">Price</p>
                                    <p className="text-xs font-black text-emerald-400 font-mono mt-0.5">
                                      {product.price.toLocaleString()} <span className="text-[9px] font-normal">{t('price_uzs')}</span>
                                    </p>
                                  </div>
                                  
                                  <button
                                    onClick={(e) => handleAddToCart(product, e)}
                                    className="p-2 bg-emerald-500 hover:bg-emerald-400 text-black rounded-lg transition-transform hover:scale-110 active:scale-95 cursor-pointer shadow-md shadow-emerald-950/20"
                                    title="Add to cart"
                                  >
                                    <ShoppingBag className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                            </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tab 2: Rewards Center & Spin Wheel */}
                  {activeTab === 'rewards' && (
                    <div className="space-y-6 animate-fade-in">
                      
                      {/* Spin Wheel Section */}
                      <div className="bg-neutral-950 border border-neutral-800 rounded-3xl p-5 text-center relative overflow-hidden glassmorphism">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl"></div>

                        <h2 className="text-sm font-black uppercase text-emerald-400 tracking-widest flex items-center justify-center gap-1.5">
                          <Sparkles className="w-4 h-4 animate-pulse text-emerald-400" />
                          {t('wheel_title')}
                        </h2>
                        <p className="text-[10px] text-neutral-400 max-w-xs mx-auto mt-1">
                          {t('wheel_desc')}
                        </p>

                        {/* Interactive Dynamic Soundwave & Visual Circle */}
                        <div className="my-6 relative flex flex-col items-center justify-center">
                          
                          {/* Pin Pointer Indicator */}
                          <div className="absolute -top-1 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[16px] border-t-emerald-400 z-10 filter drop-shadow(0_2px_4px_rgba(0,0,0,0.5))"></div>

                          {/* Wheel Wrapper */}
                          <div 
                            className="w-48 h-48 rounded-full border-4 border-neutral-800 bg-neutral-950 flex items-center justify-center relative overflow-hidden transition-transform duration-[4000ms] ease-out shadow-[0_0_40px_rgba(16,185,129,0.08)]"
                            style={{ 
                              transform: `rotate(${wheelDegree}deg)`,
                            }}
                          >
                            {/* Colorful Sector Dividers */}
                            <div className="absolute inset-0 w-full h-full rotate-0 border-r border-neutral-800/10"></div>
                            
                            {/* Dummy text layout sectors pointing outward for futuristic looks */}
                            <div className="absolute inset-0 flex items-center justify-center text-[10px] font-mono font-bold text-gray-500">
                              <span className="absolute transform rotate-0 translate-y-[-70px] text-emerald-400">+1 COIN</span>
                              <span className="absolute transform rotate-60 translate-y-[70px] text-rose-400">SEEDS</span>
                              <span className="absolute transform rotate-120 translate-x-[-65px] translate-y-[-30px] text-amber-400 font-black">+5 COINS</span>
                              <span className="absolute transform rotate-180 translate-x-[65px] translate-y-[30px] text-blue-400">15% OFF</span>
                              <span className="absolute transform rotate-240 translate-x-[35px] translate-y-[-60px] text-emerald-400">+2 COIN</span>
                              <span className="absolute transform rotate-300 translate-x-[-35px] translate-y-[60px] text-yellow-400 font-bold">⭐ 10 COINS</span>
                            </div>

                            {/* Center Pin Button */}
                            <div className="absolute w-12 h-12 rounded-full bg-neutral-900 border-2 border-emerald-400/80 shadow-xl flex items-center justify-center select-none z-20">
                              <div className="w-4 h-4 rounded-full bg-emerald-400 animate-ping absolute"></div>
                              <Coins className="w-5 h-5 text-emerald-400" />
                            </div>
                          </div>
                        </div>

                        {/* Control Button */}
                        <div className="space-y-2">
                          <button
                            onClick={handleSpinWheel}
                            disabled={isSpinning || (hasSpunFreeToday && userCoins < 5)}
                            className="w-full max-w-xs bg-emerald-500 text-black py-2 rounded-xl text-xs font-black uppercase transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(16,185,129,0.25)] disabled:opacity-50 cursor-pointer"
                          >
                            {isSpinning ? t('wheel_spin_running') : (
                              hasSpunFreeToday ? "SPIN FOR 5 COINS 🪙" : t('wheel_spin_btn')
                            )}
                          </button>
                          
                          {useRef(hasSpunFreeToday).current && (
                            <p className="text-[9px] text-neutral-500 font-mono">
                              Free daily spin used. Extra spins cost 5 coins.
                            </p>
                          )}
                          
                          {wheelMessage && (
                            <p className="text-xs text-emerald-400 font-bold tracking-wide mt-2 animate-pulse">
                              {wheelMessage}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Gifts Redeeming Store */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-100 flex items-center gap-1.5">
                            <Gift className="w-4 h-4 text-emerald-400" />
                            {t('rewards_store_title')}
                          </h2>
                          <span className="text-[10px] text-emerald-400 font-mono bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 font-bold">
                            My Coins: {userCoins}
                          </span>
                        </div>
                        <p className="text-[11px] text-neutral-400 leading-normal">
                          {t('rewards_store_desc')}
                        </p>

                        <div className="grid grid-cols-2 gap-3.5">
                          {GIFTS_LIST.map((gift) => {
                            const affordable = userCoins >= gift.costCoins;
                            return (
                              <div 
                                key={gift.id} 
                                className="bg-neutral-950 border border-neutral-800 rounded-2xl p-3 flex flex-col justify-between space-y-3 relative overflow-hidden"
                              >
                                <div className="absolute top-2 right-2 flex items-center space-x-0.5 bg-neutral-900 border border-neutral-800 px-1.5 py-0.5 rounded text-[9px] font-mono text-emerald-400 font-bold">
                                  <Coins className="w-2.5 h-2.5" />
                                  <span>{gift.costCoins}</span>
                                </div>
                                
                                <div className="pt-2">
                                  <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center mb-2">
                                    <Gift className="w-5 h-5" style={{ color: gift.color }} />
                                  </div>
                                  <h3 className="text-xs font-bold text-neutral-100">{gift[`name_${lang}`]}</h3>
                                  <p className="text-[9px] text-gray-400 mt-1">
                                    {gift.type.startsWith('promo') ? "Digital Voucher" : "Premium Hardware"}
                                  </p>
                                </div>

                                <button
                                  onClick={() => handleRedeemGift(gift)}
                                  className={`w-full py-1.5 rounded-xl text-[10px] font-bold uppercase transition-all tracking-wider cursor-pointer ${affordable ? 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-md' : 'bg-neutral-900 text-gray-600 border border-neutral-800 cursor-not-allowed'}`}
                                >
                                  {affordable ? t('reward_btn_claim') : t('reward_not_enough_coins')}
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                    </div>
                  )}

                  {/* Tab 3: Cart & Checkout */}
                  {activeTab === 'cart' && (
                    <div className="space-y-5 animate-fade-in">
                      <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-100 flex items-center gap-1.5">
                        <ShoppingBag className="w-4 h-4 text-emerald-400" />
                        SAVATCHA ({cart.reduce((s, i) => s + i.quantity, 0)})
                      </h2>

                      {cart.length === 0 ? (
                        <div className="text-center py-12 bg-neutral-950 border border-neutral-800 rounded-3xl p-6">
                          <ShoppingBag className="w-12 h-12 text-gray-600 mx-auto mb-3 animate-pulse" />
                          <p className="text-xs text-neutral-400 max-w-xs mx-auto mb-4">
                            {t('cart_empty')}
                          </p>
                          <button
                            onClick={() => setActiveTab('market')}
                            className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold uppercase px-6 py-2 rounded-xl text-xs transition-all transform hover:scale-105"
                          >
                            XARID QILIShNI BOShLASh
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {/* Cart items list */}
                          <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                            {cart.map((item) => (
                              <div key={item.product.id} className="bg-neutral-950 border border-neutral-800 rounded-xl p-2.5 flex items-center justify-between gap-2">
                                <img src={item.product.image} className="w-12 h-12 object-cover rounded-lg" alt="" />
                                <div className="flex-1 min-w-0">
                                  <h4 className="text-xs font-bold text-neutral-100 truncate">{item.product[`name_${lang}`]}</h4>
                                  <p className="text-[10px] font-mono text-emerald-400 font-bold mt-0.5">
                                    {item.product.price.toLocaleString()} {t('price_uzs')}
                                  </p>
                                </div>
                                <div className="flex items-center space-x-1.5">
                                  <button onClick={() => updateCartQty(item.product.id, -1)} className="p-1 bg-neutral-900 border border-neutral-800 text-gray-400 hover:text-emerald-400 rounded">
                                    <Minus className="w-3 h-3" />
                                  </button>
                                  <span className="text-xs font-bold font-mono text-neutral-100 w-4 text-center">{item.quantity}</span>
                                  <button onClick={() => updateCartQty(item.product.id, 1)} className="p-1 bg-neutral-900 border border-neutral-800 text-gray-400 hover:text-emerald-400 rounded">
                                    <Plus className="w-3 h-3" />
                                  </button>
                                  <button onClick={() => removeFromCart(item.product.id)} className="p-1 text-gray-500 hover:text-red-400 rounded ml-1">
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Promotional Codes */}
                          <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-3.5 space-y-3">
                            <label className="block text-[10px] font-mono uppercase text-emerald-400">{t('promo_code_label')}</label>
                            <div className="flex space-x-2">
                              <input
                                type="text"
                                placeholder="E.g. INFARMSTART"
                                value={couponCodeInput}
                                onChange={(e) => setCouponCodeInput(e.target.value)}
                                className="flex-1 bg-neutral-900 border border-neutral-800 px-3 py-1.5 rounded-xl text-xs uppercase text-neutral-100 text-center font-mono focus:outline-none"
                              />
                              <button
                                onClick={handleApplyPromo}
                                className="bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 px-4 py-1.5 rounded-xl text-xs font-bold text-emerald-400 hover:text-emerald-300 cursor-pointer"
                              >
                                Apply
                              </button>
                            </div>
                            {appliedPromo && (
                              <p className="text-[10px] text-emerald-400 font-bold animate-pulse text-center">
                                ✓ Applied {appliedPromo.discountPercentage}% off! ({appliedPromo.code})
                              </p>
                            )}
                          </div>

                          {/* Shipping Details */}
                          <form onSubmit={handleCheckoutSubmit} className="bg-neutral-950 border border-neutral-800 rounded-2xl p-3.5 space-y-3">
                            <h3 className="text-xs font-bold text-neutral-200">DELIVERY SPECIFICATION</h3>
                            <div>
                              <label className="block text-[9px] uppercase font-mono text-gray-500">{t('delivery_address')}</label>
                              <input
                                type="text"
                                value={deliveryAddress}
                                onChange={(e) => setDeliveryAddress(e.target.value)}
                                required
                                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-1.5 text-xs text-neutral-200 mt-1 focus:outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-[9px] uppercase font-mono text-gray-500">Contact Telephone</label>
                              <input
                                type="tel"
                                value={orderPhone}
                                onChange={(e) => setOrderPhone(e.target.value)}
                                required
                                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-1.5 text-xs text-neutral-200 mt-1 focus:outline-none"
                              />
                            </div>

                            {/* Summary Math Calculation */}
                            <div className="border-t border-neutral-900 pt-3 space-y-1.5 text-xs">
                              <div className="flex justify-between text-gray-400 text-[11px]">
                                <span>{t('subtotal')}</span>
                                <span className="font-mono">
                                  {cart.reduce((s, i) => s + (i.product.price * i.quantity), 0).toLocaleString()} {t('price_uzs')}
                                </span>
                              </div>
                              {appliedPromo && (
                                <div className="flex justify-between text-emerald-400 font-bold text-[11px]">
                                  <span>Discount ({appliedPromo.couponCodeInput || appliedPromo.code})</span>
                                  <span className="font-mono">
                                    -{Math.round((cart.reduce((s, i) => s + (i.product.price * i.quantity), 0) * appliedPromo.discountPercentage) / 100).toLocaleString()} {t('price_uzs')}
                                  </span>
                                </div>
                              )}
                              
                              <div className="flex justify-between text-yellow-500 font-bold text-[10px] font-mono leading-none py-1">
                                <span>🪙 Automated Loyalty Earn:</span>
                                <span>
                                  +{Math.floor((cart.reduce((s, i) => s + (i.product.price * i.quantity), 0) - (appliedPromo ? Math.round((cart.reduce((s, i) => s + (i.product.price * i.quantity), 0) * appliedPromo.discountPercentage) / 100) : 0)) / 100000)} Coins
                                </span>
                              </div>

                              <div className="flex justify-between text-neutral-100 font-bold text-sm border-t border-neutral-900 pt-2">
                                <span>FINAL TOTAL</span>
                                <span className="text-emerald-400 font-mono">
                                  {(cart.reduce((s, i) => s + (i.product.price * i.quantity), 0) - (appliedPromo ? Math.round((cart.reduce((s, i) => s + (i.product.price * i.quantity), 0) * appliedPromo.discountPercentage) / 100) : 0)).toLocaleString()} {t('price_uzs')}
                                </span>
                              </div>
                            </div>

                            <button
                              type="submit"
                              className="w-full bg-emerald-500 hover:bg-emerald-400 text-black py-2.5 rounded-xl text-xs font-black uppercase transition-all shadow-[0_4px_20px_rgba(16,185,129,0.25)] cursor-pointer"
                            >
                              {t('place_order_btn')}
                            </button>
                          </form>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Tab 4: Profile / Cabinets & Orders Tracking */}
                  {activeTab === 'profile' && (
                    <div className="space-y-6 animate-fade-in">
                      <div className="bg-neutral-950 border border-neutral-800 rounded-3xl p-5 relative overflow-hidden glassmorphism">
                        
                        <div className="flex flex-col space-y-4">
                          <div className="flex items-center space-x-4">
                            <div 
                              onClick={() => setShowAvatarSelector(!showAvatarSelector)}
                              className="w-16 h-16 rounded-2xl bg-neutral-900 border border-neutral-800 overflow-hidden relative flex items-center justify-center cursor-pointer group hover:border-emerald-500/50 transition-all duration-300 shadow-[0_4px_15px_rgba(16,185,129,0.1)]"
                              title={t('change_profile_pic_hint')}
                            >
                              {/* Premium customizable profile pic */}
                              <img src={profilePic} className="w-full h-full object-cover" alt="Profile" />
                              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <Camera className="w-5 h-5 text-emerald-400 animate-pulse" />
                              </div>
                              <div className="absolute inset-0 border border-emerald-500/30 rounded-2xl"></div>
                            </div>
                            <div className="flex-1">
                              {(authForm.name.toUpperCase().includes('MUHAMMADAZIZ') || authForm.surname.toUpperCase().includes('RASULJONOV')) ? (
                                <span className="text-[9px] font-mono text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full font-bold inline-flex items-center gap-1 animate-pulse">
                                  <Sparkles className="w-3 h-3 text-amber-400" />
                                  👑 TIZIM BOSH ADMINI (OWNER)
                                </span>
                              ) : (
                                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full font-bold">Premium Club Member</span>
                              )}
                              <h3 className="text-sm font-extrabold text-neutral-100 mt-1">{authForm.name} {authForm.surname}</h3>
                              <p className="text-[10px] text-gray-500 font-mono leading-none mt-1">{authForm.phone}</p>
                              <button 
                                type="button"
                                onClick={() => setShowAvatarSelector(!showAvatarSelector)}
                                className="text-[10px] text-emerald-400 hover:text-emerald-300 font-mono flex items-center gap-1 mt-1.5 cursor-pointer underline underline-offset-2 bg-transparent border-none p-0"
                              >
                                <Settings className="w-3 h-3 animate-spin-slow" />
                                {lang === 'uz' ? "Profil rasm tahrirlash" : lang === 'ru' ? "Изменить фото профиля" : "Edit profile photo"}
                              </button>
                            </div>
                          </div>

                          {/* Collapsible Avatar/Profile Pic Designer Drawer */}
                          <AnimatePresence>
                            {showAvatarSelector && (
                              <motion.div 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="bg-neutral-900/60 p-4 rounded-2xl border border-neutral-800 mt-2 space-y-4 overflow-hidden"
                              >
                                <div>
                                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-neutral-300 mb-2 font-mono flex items-center gap-1">
                                    <ImageIcon className="w-3.5 h-3.5 text-emerald-400" />
                                    {t('preset_avatars')}
                                  </h4>
                                  {/* Presets Grid */}
                                  <div className="grid grid-cols-4 gap-2">
                                    {PRESET_AVATARS.map((avatar) => (
                                      <button
                                        key={avatar.id}
                                        type="button"
                                        onClick={() => {
                                          setProfilePic(avatar.url);
                                          localStorage.setItem('infarm_profile_pic', avatar.url);
                                          triggerToast(t('profile_pic_updated'));
                                        }}
                                        className={`w-12 h-12 rounded-xl overflow-hidden border-2 transition-all relative ${profilePic === avatar.url ? 'border-emerald-400 scale-105 shadow-[0_0_10px_rgba(16,185,129,0.3)]' : 'border-transparent hover:border-neutral-700'}`}
                                      >
                                        <img src={avatar.url} className="w-full h-full object-cover" alt="" />
                                        {profilePic === avatar.url && (
                                          <div className="absolute inset-0 bg-emerald-500/10 flex items-center justify-center">
                                            <Check className="w-4 h-4 text-emerald-400 bg-neutral-950/80 rounded-full p-0.5" />
                                          </div>
                                        )}
                                      </button>
                                    ))}
                                  </div>
                                </div>

                                {/* Drag & Drop or Custom File Upload Zone */}
                                <div className="border-t border-neutral-800 pt-3">
                                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-neutral-300 mb-2 font-mono flex items-center gap-1">
                                    <Upload className="w-3.5 h-3.5 text-emerald-400" />
                                    {lang === 'uz' ? "O'z rasmingizni yuklang" : lang === 'ru' ? "Загрузить свое фото" : "Upload Custom Photo"}
                                  </h4>
                                  
                                  <div 
                                    onDragOver={handleDragOver}
                                    onDrop={handleDrop}
                                    className="border border-dashed border-neutral-800 hover:border-emerald-500/40 rounded-xl p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-all bg-neutral-950/40 group relative"
                                    onClick={() => document.getElementById('profile-pic-uploader')?.click()}
                                  >
                                    <input 
                                      type="file" 
                                      id="profile-pic-uploader" 
                                      className="hidden" 
                                      accept="image/*"
                                      onChange={handleFileUpload}
                                    />
                                    <Camera className="w-6 h-6 text-gray-500 group-hover:text-emerald-400 transition-colors duration-200 mb-1" />
                                    <p className="text-[10px] text-gray-400 select-none">
                                      {t('change_profile_pic_hint')}
                                    </p>
                                    <span className="text-[9px] text-gray-600 mt-1 uppercase font-mono tracking-widest block">MAX: 2MB</span>
                                  </div>
                                </div>

                                {/* Link Direct Upload Option */}
                                <div className="border-t border-neutral-800 pt-3">
                                  <label className="block text-[9px] uppercase font-mono text-gray-500 mb-1">
                                    {lang === 'uz' ? "Yoki Rasm URL manzili" : lang === 'ru' ? "Или URL адрес изображения" : "Or Image URL Link"}
                                  </label>
                                  <div className="flex gap-2">
                                    <input 
                                      type="text"
                                      placeholder="https://images.unsplash.com/..."
                                      className="flex-1 bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-1.5 text-[11px] text-neutral-200 focus:outline-none focus:border-emerald-400"
                                      value={profilePic.startsWith('data:') ? '' : profilePic}
                                      onChange={(e) => {
                                        if (e.target.value.trim()) {
                                          setProfilePic(e.target.value.trim());
                                          localStorage.setItem('infarm_profile_pic', e.target.value.trim());
                                        }
                                      }}
                                    />
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* Financial dashboard */}
                        <div className="grid grid-cols-2 gap-3 mt-6 border-t border-neutral-950 pt-5">
                          <div className="bg-neutral-900/60 p-3 rounded-2xl border border-neutral-900">
                            <span className="text-[9px] uppercase tracking-wider text-gray-500 font-mono block">COINS ACCUMULATED</span>
                            <div className="flex items-center space-x-1 mt-1">
                              <Coins className="w-4 h-4 text-emerald-400 animate-pulse" />
                              <span className="text-sm font-mono font-black text-emerald-400">{userCoins}</span>
                            </div>
                          </div>
                          <div className="bg-neutral-900/60 p-3 rounded-2xl border border-neutral-900">
                            <span className="text-[9px] uppercase tracking-wider text-gray-500 font-mono block">UNLOCKED GIFTS</span>
                            <div className="flex items-center space-x-1 mt-1">
                              <Gift className="w-4 h-4 text-pink-400" />
                              <span className="text-sm font-mono font-black text-pink-400">{wonGifts.length} items</span>
                            </div>
                          </div>
                        </div>

                        <button 
                          onClick={() => setIsLoggedIn(false)}
                          className="mt-6 w-full py-2 bg-neutral-950 border border-neutral-800 hover:border-red-500/30 text-gray-400 hover:text-red-400 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          <span>SIGN OUT FROM DEPLOYMENT</span>
                        </button>
                      </div>

                      {/* Unlocked rewards list */}
                      <div className="space-y-3">
                        <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-2">
                          <Gift className="w-4 h-4 text-pink-400" />
                          {t('gifts_won_section')} ({wonGifts.length})
                        </h2>

                        {wonGifts.length === 0 ? (
                          <p className="text-[11px] text-gray-600 italic">No rewards yet. Collect INFARM Coins to unlock amazing gadgets!</p>
                        ) : (
                          <div className="grid grid-cols-1 gap-2">
                            {wonGifts.map((w, index) => (
                              <div key={`${w.id}-${index}`} className="bg-neutral-950 border border-neutral-800/80 p-3 rounded-xl flex justify-between items-center text-xs">
                                <div className="flex items-center space-x-2.5">
                                  <div className="p-1.5 bg-neutral-900 border border-neutral-800 rounded">
                                    <Gift className="w-4 h-4" style={{color: w.color}} />
                                  </div>
                                  <div>
                                    <p className="font-bold text-neutral-100">{w[`name_${lang}`]}</p>
                                    <p className="text-[9px] text-emerald-400 font-mono">Redeemed: {w.claimedAt || "Hozirgina"}</p>
                                  </div>
                                </div>
                                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded text-[10px] font-mono">
                                  Status: Sent
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Promo Codes list */}
                      <div className="space-y-3">
                        <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-2">
                          <Coins className="w-4 h-4 text-emerald-400" />
                          {t('promo_codes_section')} ({promoCodes.length})
                        </h2>
                        
                        <div className="space-y-2">
                          {promoCodes.map((p, idx) => (
                            <div key={idx} className="bg-neutral-950 border border-neutral-800 p-3 rounded-xl flex items-center justify-between">
                              <div>
                                <span className="text-xs font-black text-emerald-400 font-mono block bg-neutral-900 border border-neutral-800 px-2.5 py-1 rounded inline-block uppercase select-all tracking-wider">
                                  {p.code}
                                </span>
                                <span className="text-[10px] text-gray-400 block mt-2">{p[`description_${lang}`]}</span>
                              </div>
                              <span className="text-[10px] font-mono font-bold text-amber-300">
                                {p.discountPercentage}% OFF
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Order Transactions & Real-time Delivery status tracker */}
                      <div className="space-y-3">
                        <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-2 animate-pulse">
                          <ShoppingBag className="w-4 h-4 text-emerald-400" />
                          {t('orders_history')} ({orders.length})
                        </h2>

                        {orders.length === 0 ? (
                          <p className="text-[11px] text-gray-600 italic">Hali buyurtmalar tarixi mavjud emas.</p>
                        ) : (
                          <div className="space-y-3">
                            {orders.map((o) => (
                              <div key={o.id} className="bg-neutral-950 border border-neutral-800 rounded-2xl p-4 space-y-3">
                                <div className="flex items-center justify-between text-xs pb-2 border-b border-neutral-900">
                                  <div>
                                    <p className="font-extrabold text-neutral-200">{o.id}</p>
                                    <p className="text-[10px] text-gray-500 mt-0.5">{o.date}</p>
                                  </div>
                                  <div className="text-right">
                                    <p className="font-black text-emerald-400 font-mono">{o.finalTotal.toLocaleString()} {t('price_uzs')}</p>
                                    <p className="text-[8px] text-gray-500 uppercase font-mono mt-0.5">{o.items.length} items</p>
                                  </div>
                                </div>

                                {/* Custom Delivery Tracking Timeline Progress */}
                                <div className="space-y-2">
                                  <p className="text-[9px] uppercase font-mono text-emerald-500 leading-none">REAL-TIME TRAILLING STATUS</p>
                                  <div className="flex justify-between text-[10px] font-mono relative pt-1">
                                    {/* Line progress */}
                                    <div className="absolute top-2.5 left-2 right-2 h-0.5 bg-neutral-800"></div>
                                    <div className="absolute top-2.5 left-2 h-0.5 bg-emerald-400 transition-all duration-1000" style={{
                                      width: o.status === 'pending' ? '10%' : o.status === 'processing' ? '40%' : o.status === 'shipped' ? '70%' : '100%'
                                    }}></div>

                                    <span className={`z-10 bg-neutral-950 px-1 ${o.status === 'pending' ? 'text-emerald-400 font-bold' : 'text-gray-500'}`}>Kutilmoqda</span>
                                    <span className={`z-10 bg-neutral-950 px-1 ${o.status === 'processing' ? 'text-emerald-400 font-bold animate-pulse' : 'text-gray-500'}`}>Tayyorlanish</span>
                                    <span className={`z-10 bg-neutral-950 px-1 ${o.status === 'shipped' ? 'text-emerald-400 font-bold' : 'text-gray-500'}`}>Yo'lda</span>
                                    <span className={`z-10 bg-neutral-950 px-1 ${o.status === 'delivered' ? 'text-emerald-400 font-bold' : 'text-gray-500'}`}>Topshirildi</span>
                                  </div>
                                </div>

                                <div className="bg-neutral-900/40 p-2.5 rounded-xl text-[11px] text-gray-400 space-y-1">
                                  <p>📍 <strong className="text-gray-300">Address:</strong> {o.address}</p>
                                  <p>📞 <strong className="text-gray-300">Phone:</strong> {o.phone}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                    </div>
                  )}

                  {/* Tab 5: Admin Panel (Product generation, statistics editing, order routing) */}
                  {activeTab === 'admin' && (
                    <div className="space-y-6 animate-fade-in">
                      <div className="bg-neutral-950 border border-neutral-800 rounded-3xl p-5 relative overflow-hidden glassmorphism">
                        <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-400 mb-4 flex items-center gap-1.5 border-b border-neutral-950 pb-2">
                          <Settings className="w-4 h-4" />
                          {t('admin_stats_title')}
                        </h2>

                        {(authForm.name.toUpperCase().includes('MUHAMMADAZIZ') || authForm.surname.toUpperCase().includes('RASULJONOV')) && (
                          <div className="mb-4 bg-gradient-to-r from-amber-500/10 to-transparent border border-amber-500/20 p-4 rounded-2xl relative overflow-hidden">
                            <div className="absolute top-1 right-2 opacity-15">
                              <Sparkles className="w-12 h-12 text-amber-400 animate-pulse" />
                            </div>
                            <h3 className="text-[10px] font-black tracking-wider text-amber-400 uppercase font-mono flex items-center gap-1">
                              👑 TIZIM BOSH ADMINI (OWNER)
                            </h3>
                            <p className="text-xs text-neutral-100 mt-1 font-bold">
                              Rasuljonov Muhammadaziz Ilhomjon o'g'li
                            </p>
                            <p className="text-[10px] text-gray-400 leading-normal mt-1">
                              Barcha boshqaruv funksiyalari (tahrirlash, mahsulot qo'shish va hisobotlar) siz uchun to'liq faollashtirildi! Hammasi nazorat ostida! 🌱
                            </p>
                          </div>
                        )}

                        <div className="grid grid-cols-2 gap-3.5">
                          <div className="bg-neutral-900 p-3 rounded-xl border border-neutral-800">
                            <span className="text-[9px] uppercase tracking-wider text-gray-500 font-mono block">SIMULATED REVENUE</span>
                            <span className="text-xs font-mono font-black text-emerald-400">{(adminStats.totalSales).toLocaleString()} UZS</span>
                          </div>
                          <div className="bg-neutral-900 p-3 rounded-xl border border-neutral-800">
                            <span className="text-[9px] uppercase tracking-wider text-gray-500 font-mono block">REGISTRATIONS</span>
                            <span className="text-xs font-mono font-black text-emerald-400">{adminStats.registeredUsersCount} accounts</span>
                          </div>
                          <div className="bg-neutral-900 p-3 rounded-xl border border-neutral-800">
                            <span className="text-[9px] uppercase tracking-wider text-gray-500 font-mono block">ACTIVE PROMOS INC</span>
                            <span className="text-xs font-mono font-black text-emerald-400">{promoCodes.length} codes</span>
                          </div>
                          <div className="bg-neutral-900 p-3 rounded-xl border border-neutral-800">
                            <span className="text-[9px] uppercase tracking-wider text-gray-500 font-mono block">COINS RECHARGE</span>
                            <span className="text-xs font-mono font-black text-emerald-400">Unlimited (Cheat Mode)</span>
                          </div>
                        </div>
                      </div>

                      {/* Order management system */}
                      <div className="space-y-3">
                        <h3 className="text-xs font-bold uppercase text-neutral-200">ACTIVE CLIENT TRANSACTIONS</h3>
                        <div className="space-y-2">
                          {orders.map((o) => (
                            <div key={o.id} className="bg-neutral-950 border border-neutral-800 p-3 rounded-xl text-xs space-y-2">
                              <div className="flex justify-between items-center font-bold">
                                <span>{o.id} - ({o.items.length} products)</span>
                                <span className="text-emerald-400">{o.finalTotal.toLocaleString()} UZS</span>
                              </div>
                              <p className="text-[10px] text-neutral-400 leading-none">Status: <strong className="text-emerald-400 uppercase">{o.status}</strong></p>
                              
                              <div className="flex flex-wrap gap-2.5 pt-1 border-t border-neutral-900">
                                <button onClick={() => handleUpdateOrderStatus(o.id, 'processing')} className="px-2 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 rounded text-[10px] font-mono">Set Preparing</button>
                                <button onClick={() => handleUpdateOrderStatus(o.id, 'shipped')} className="px-2 py-1 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded text-[10px] font-mono">Set On Courier</button>
                                <button onClick={() => handleUpdateOrderStatus(o.id, 'delivered')} className="px-2 py-1 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 rounded text-[10px] font-mono animate-pulse">Set Delivered</button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Add creative innovation product form */}
                      <form onSubmit={handleAdminAddProduct} className="bg-neutral-950 border border-neutral-800 rounded-3xl p-5 space-y-3.5">
                        <h3 className="text-xs font-bold text-neutral-200 uppercase tracking-wider">{t('admin_add_prod')}</h3>
                        
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[9px] uppercase font-mono text-gray-500">Name (UZ)</label>
                            <input
                              type="text"
                              required
                              value={newProductForm.name_uz}
                              onChange={e => setNewProductForm({...newProductForm, name_uz: e.target.value})}
                              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-2.5 py-1.5 text-xs text-neutral-200 mt-1 focus:outline-none"
                              placeholder="E.g. Bio-datchik"
                            />
                          </div>
                          <div>
                            <label className="block text-[9px] uppercase font-mono text-gray-500">Price (UZS)</label>
                            <input
                              type="number"
                              required
                              value={newProductForm.price}
                              onChange={e => setNewProductForm({...newProductForm, price: Number(e.target.value)})}
                              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-2.5 py-1.5 text-xs text-neutral-200 mt-1 focus:outline-none"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[9px] uppercase font-mono text-gray-500">Category</label>
                          <select
                            value={newProductForm.category}
                            onChange={e => setNewProductForm({...newProductForm, category: e.target.value as any})}
                            className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-2.5 py-1.5 text-xs text-neutral-200 mt-1 focus:outline-none"
                          >
                            <option value="hydro">Gidroponika</option>
                            <option value="growbox">Growbox</option>
                            <option value="sensors">Wi-Fi Sensorlar</option>
                            <option value="nutrients">O'g'itlar</option>
                            <option value="organic">Premium Bio Hosil</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[9px] uppercase font-mono text-gray-500">Thumbnail Image URL</label>
                          <input
                            type="text"
                            value={newProductForm.image}
                            onChange={e => setNewProductForm({...newProductForm, image: e.target.value})}
                            className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-2.5 py-1.5 text-xs text-neutral-200 mt-1 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[9px] uppercase font-mono text-gray-500">Description (UZ)</label>
                          <textarea
                            value={newProductForm.description_uz}
                            onChange={e => setNewProductForm({...newProductForm, description_uz: e.target.value})}
                            rows={2}
                            className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-2.5 py-1.5 text-xs text-neutral-200 mt-1 focus:outline-none"
                            placeholder="Tashqi havo haroratiga javob beruvchi..."
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full bg-emerald-500 hover:bg-emerald-400 text-black py-2 rounded-xl text-xs font-black uppercase transition-all duration-300 hover:scale-[1.03] cursor-pointer"
                        >
                          SUBMIT NEW STOCK NOW
                        </button>
                      </form>
                    </div>
                  )}

                </>
              )}

            </div>

            {/* PRE-RENDERED NAVIGATION BOTTOM BAR (Telegram & Uzum hybrid mobile tab bar) */}
            {isLoggedIn && (
              <div className="bg-neutral-950 border-t border-neutral-850/80 px-2 py-1.5 flex justify-between items-center select-none z-10 glassmorphism">
                <button
                  onClick={() => { setActiveTab('market'); setSelectedProduct(null); }}
                  className={activeTab === 'market' ? activeTabClass : inactiveTabClass}
                >
                  <Home className="w-5.5 h-5.5 mb-0.5" />
                  <span className="text-[10px] tracking-wide font-normal">{t('tab_home')}</span>
                </button>

                <button
                  onClick={() => { setActiveTab('rewards'); setSelectedProduct(null); }}
                  className={activeTab === 'rewards' ? activeTabClass : inactiveTabClass}
                >
                  <Gift className="w-5.5 h-5.5 mb-0.5" />
                  <span className="text-[10px] tracking-wide font-normal">{t('tab_rewards')}</span>
                </button>

                <button
                  onClick={() => { setActiveTab('cart'); setSelectedProduct(null); }}
                  className={`${activeTab === 'cart' ? activeTabClass : inactiveTabClass} relative`}
                >
                  <ShoppingBag className="w-5.5 h-5.5 mb-0.5" />
                  {cart.length > 0 && (
                    <span className="absolute top-1.5 right-6 bg-emerald-500 text-black text-[9px] font-black font-mono w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                      {cart.reduce((s, i) => s + i.quantity, 0)}
                    </span>
                  )}
                  <span className="text-[10px] tracking-wide font-normal">{t('tab_cart')}</span>
                </button>

                <button
                  onClick={() => { setActiveTab('profile'); setSelectedProduct(null); }}
                  className={activeTab === 'profile' ? activeTabClass : inactiveTabClass}
                >
                  <User className="w-5.5 h-5.5 mb-0.5" />
                  <span className="text-[10px] tracking-wide font-normal">{t('tab_profile')}</span>
                </button>

                <button
                  onClick={() => { setActiveTab('admin'); setSelectedProduct(null); }}
                  className={activeTab === 'admin' ? activeTabClass : inactiveTabClass}
                >
                  <Settings className="w-5.5 h-5.5 mb-0.5" />
                  <span className="text-[10px] tracking-wide font-normal">{t('tab_admin')}</span>
                </button>
              </div>
            )}

            {/* Simulated iPhone Home Indicator bar */}
            {isPhoneFrame && (
              <div className="w-full bg-neutral-950 py-1.5 flex justify-center items-center select-none">
                <div className="w-32 h-1 bg-neutral-800 rounded-full hover:bg-neutral-700 transition-colors"></div>
              </div>
            )}

          </div>
        </div>

      </div>

      {/* POPUP MODAL: PRODUCT DETAIL SHEETS OVERLAY OR MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-neutral-950/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-5 max-w-sm w-full space-y-4 shadow-2xl relative animate-fade-in-up">
            
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 p-2 bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 text-gray-400 hover:text-emerald-400 rounded-full transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-neutral-950">
              <img src={selectedProduct.image} className="w-full h-full object-cover" alt="" />
              <span className="absolute top-3 left-3 bg-emerald-500/90 text-black font-mono font-black text-[9px] uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                {t(selectedProduct.category)}
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black text-neutral-100 uppercase tracking-wide">
                  {selectedProduct[`name_${lang}`]}
                </h3>
                <div className="flex items-center space-x-1 font-mono text-xs font-bold text-amber-400 bg-neutral-950 px-2 py-0.5 rounded-full">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{selectedProduct.rating.toFixed(1)}</span>
                </div>
              </div>

              <p className="text-xs text-neutral-400 leading-relaxed pt-1.5">
                {selectedProduct[`description_${lang}`]}
              </p>
            </div>

            {/* Dummy interactive comment/review generator to enhance marketplace realism */}
            <div className="bg-neutral-950 p-2.5 rounded-xl border border-neutral-800/80 space-y-1">
              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-mono block">CLIENT REVIEW</span>
              <p className="text-xs text-neutral-300 font-normal italic">
                ⭐5/5 "Hammasi a'lo darajada ishladi! Coin tizimi orqali AirPods ga ega bo'lish ajoyib!" - <span className="text-emerald-400">Bekzod K.</span>
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-neutral-800/60 font-mono">
              <div>
                <span className="text-[9px] text-gray-500 block">TOTAL SUM</span>
                <span className="text-sm font-black text-emerald-400">
                  {selectedProduct.price.toLocaleString()} {t('price_uzs')}
                </span>
              </div>

              <button
                onClick={(e) => {
                  handleAddToCart(selectedProduct, e);
                  setSelectedProduct(null);
                }}
                className="bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase tracking-wider py-2 px-4 rounded-xl text-xs transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:scale-105 active:scale-95 cursor-pointer"
              >
                {t('add_to_cart')}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* FUTURISTIC PREMIUM AI CHATBOT PORTAL */}
      <div className="fixed bottom-6 right-6 z-40">
        
        {/* Floating pulse button */}
        {!isBotOpen && (
          <button
            onClick={() => setIsBotOpen(true)}
            className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black flex items-center justify-center shadow-[0_0_25px_rgba(16,185,129,0.45)] cursor-pointer relative group transition-transform hover:scale-110 active:scale-95 animate-pulse"
          >
            <Bot className="w-6 h-6 text-black group-hover:rotate-12 transition-transform" />
            <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-neutral-900 border-2 border-emerald-400 rounded-full flex items-center justify-center">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping"></span>
            </span>
          </button>
        )}

        {/* Floating Chat dialog window */}
        {isBotOpen && (
          <div className="w-80 h-96 bg-neutral-900 border border-neutral-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden relative backdrop-blur-md glassmorphism animate-bounce-short">
            
            {/* Dark cosmic header */}
            <div className="bg-neutral-950 px-4 py-3 border-b border-neutral-800 flex items-center justify-between select-none">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-emerald-500/30 flex items-center justify-center">
                  <Bot className="w-4.5 h-4.5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-neutral-200">INFARM AI</h3>
                  <div className="flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping"></span>
                    <span className="text-[9px] text-gray-500 font-mono">ONLINE</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-1">
                {/* Simulated Voice Output Toggle (Speech output enabled indicator) */}
                <button
                  onClick={() => {
                    setVoiceSimulatedActive(!voiceSimulatedActive);
                    triggerToast(voiceSimulatedActive ? "Voice synthesis: disabled" : "Voice synthesis: active! Bypasses transcription!");
                  }}
                  className={`p-1 hover:bg-neutral-850 rounded text-xs transition-colors ${voiceSimulatedActive ? 'text-emerald-400' : 'text-gray-500'}`}
                  title="Toggle Voice assistant answers audio"
                >
                  <Volume2 className="w-4 h-4" />
                </button>

                <button 
                  onClick={() => setIsBotOpen(false)}
                  className="p-1 hover:bg-neutral-850 rounded text-gray-500 hover:text-emerald-400 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat output streams */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-neutral-900/40 select-text">
              {chatHistory.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                >
                  <div className={`max-w-[85%] rounded-2xl px-3 py-2 text-xs leading-normal font-sans ${msg.role === 'user' ? 'bg-emerald-500 text-black rounded-tr-none font-medium' : 'bg-neutral-950 border border-neutral-800 text-neutral-200 rounded-tl-none'}`}>
                    <span className="whitespace-pre-line block">{msg.text}</span>
                    <span className={`text-[8px] block mt-1 text-right ${msg.role === 'user' ? 'text-emerald-950' : 'text-gray-500 font-mono'}`}>
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              ))}

              {isBotTyping && (
                <div className="flex justify-start">
                  <div className="bg-neutral-950 border border-neutral-800 rounded-2xl rounded-tl-none px-3.5 py-2.5 text-xs text-neutral-400 flex items-center space-x-1.5">
                    <span className="inline-block w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="inline-block w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="inline-block w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              )}

              <div ref={chatEndRef}></div>
            </div>

            {/* Voice Soundwave Simulator Indicator */}
            {voiceSimulatedActive && (
              <div className="px-4 py-1.5 bg-emerald-950/20 border-t border-b border-emerald-900/30 flex items-center justify-between text-[10px] font-mono text-emerald-400 select-none">
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping"></span>
                  Vocal Transcribing Stream...
                </span>
                <div className="flex items-center space-x-0.5">
                  <span className="w-1 h-3 bg-emerald-400 animate-pulse" style={{ animationDuration: '400ms' }}></span>
                  <span className="w-1 h-4 bg-emerald-400 animate-pulse" style={{ animationDuration: '700ms' }}></span>
                  <span className="w-1 h-2 bg-emerald-400 animate-pulse" style={{ animationDuration: '500ms' }}></span>
                  <span className="w-1 h-4 bg-emerald-400 animate-pulse" style={{ animationDuration: '800ms' }}></span>
                </div>
              </div>
            )}

            {/* Simulated Voice Prompt Buttons */}
            <div className="px-3 py-1 bg-neutral-950/50 flex flex-wrap gap-1.5 pb-2">
              <button 
                onClick={() => handleSendChatMessage(undefined, "Tavsiyalar")}
                className="bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 px-2 py-0.5 rounded text-[9px] font-mono text-gray-400 hover:text-emerald-400"
              >
                🌱 Catalogs
              </button>
              <button 
                onClick={() => handleSendChatMessage(undefined, "Coin haqida")}
                className="bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 px-2 py-0.5 rounded text-[9px] font-mono text-gray-400 hover:text-emerald-400"
              >
                🪙 Coins & Gifts
              </button>
              <button 
                onClick={() => handleSendChatMessage(undefined, "Buyurtma statusi")}
                className="bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 px-2 py-0.5 rounded text-[9px] font-mono text-gray-400 hover:text-emerald-400"
              >
                🚚 Track Order
              </button>
            </div>

            {/* Chat submission controls */}
            <form onSubmit={(e) => handleSendChatMessage(e)} className="bg-neutral-950 px-3.5 py-2.5 border-t border-neutral-800 flex items-center space-x-2">
              {/* Simulate microphone button and toggle soundwave transcribing instantly */}
              <button
                type="button"
                onClick={handleSimulateVoiceInput}
                className="p-1.5 bg-neutral-900 border border-neutral-800 hover:border-emerald-500/30 text-emerald-400 rounded-xl transition-all cursor-pointer"
                title="Send Simulated Premium Voice Message"
              >
                <Mic className="w-4 h-4" />
              </button>

              <input
                type="text"
                placeholder={t('bot_placeholder')}
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="flex-1 bg-neutral-900 border border-neutral-800 rounded-xl py-1.5 px-3 text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none"
              />

              <button
                type="submit"
                className="p-1.5 bg-emerald-500 hover:bg-emerald-400 text-black rounded-xl transition-all cursor-pointer"
              >
                <Send className="w-3.5 h-3.5 text-black" />
              </button>
            </form>

          </div>
        )}
      </div>

    </div>
  );
}
