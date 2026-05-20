import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// INFARM MARKET static products database for AI suggestions
const PRODUCTS = [
  {
    id: "p1",
    name_uz: "INFARM Tower Smart V2 (Gidroponika minorasi)",
    name_ru: "INFARM Tower Smart V2 (Гидропонная башня)",
    name_en: "INFARM Tower Smart V2 (Hydroponic Tower)",
    price: 1800000,
    category: "hydro",
    image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=400&q=80",
    rating: 4.9,
    description_uz: "96 dona o'simlik uchun avtomatlashtirilgan oziqlantirish va yorug'lik tizimiga ega gidroponik minora.",
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
    price: 4500000 / 10, // 450,000 UZS
    priceActual: 450000,
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
    name_uz: "Premium Za'faron Bio Quritilgan (10g)",
    name_ru: "Премиальный Био-Шафран Сушеный (10г)",
    name_en: "Premium Bio Saffron Dried (10g)",
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
    name_uz: "Avtomatik Wi-Fi Sug'orish Datchigi",
    name_ru: "Автоматический Wi-Fi контроллер полива",
    name_en: "Automatic Wi-Fi Watering Controller",
    price: 650000,
    category: "sensors",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=400&q=80",
    rating: 4.6,
    description_uz: "Istalgan joydan smartfon orqali boshqariladigan 4 kanalli aqlli tomchilatib sug'orish tizimi controlleri.",
    description_ru: "4-канальный контроллер капельного полива с управлением со смартфона из любой точки мира.",
    description_en: "4-channel smart drip irrigation controller managed from anywhere via smartphone."
  }
];

// Lazy Gemini Initializer
let aiClient: GoogleGenAI | null = null;
function getGemini(): GoogleGenAI | null {
  const key = process.env.GEMINI_API_KEY;
  if (!key || key === "MY_GEMINI_API_KEY") {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// Simulated Failsafe Chat system if API key is missing
function generateSimulatedResponse(message: string, lang: 'uz' | 'ru' | 'en', userName: string, coins: number, lastOrder: any): string {
  const msg = message.toLowerCase();
  
  // Custom language templates
  const responsesUz = {
    greeting: `Assalomu alaykum, ${userName || 'Aziz Foydalanuvchi'}! Bizning premium INFARM MARKET aqlli maslahatchisiga xush kelibsiz. 🌱 Sizga qanday yordam bera olaman?\n\nMen mahsulot tanlash, buyurtmalar statusi yoki to'plangan Coin balansingiz haqida ma'lumot bera olaman.`,
    coins: `Sizda hozirda *${coins} INFARM Coin* mavjud. 🪙\n\nHar 100 000 so'm xaridingiz uchun avtomatik ravishda *1 Coin* olasiz. Ushbu coinlarni profile qismida maxsus Sovg'alar va Chegirma Promo-kodlariga ayirboshlashingiz mumkin (AirPods v3, Powerbank va h.z.).`,
    order_none: "Sizda hali faol buyurtmalar yo'q. Marketplace bo'limidan mahsulot tanlab xarid qilishingiz mumkin!",
    order_status: lastOrder 
      ? `Sizning oxirgi buyurtmangiz:\n📦 *ID:* #${lastOrder.id}\n📍 *Manzil:* ${lastOrder.address}\n💵 *Summa:* ${lastOrder.total?.toLocaleString()} so'm\n🚚 *Holati:* ${lastOrder.status === 'pending' ? "Kutilmoqda 🟡" : lastOrder.status === 'processing' ? "Tayyorlanmoqda 🟠" : lastOrder.status === 'shipped' ? "Yo'lda (Kuryerda) 🔵" : "Yetkazib berildi 🟢"}\n\nKuryerimiz siz bilan tez orada bog'lanadi.`
      : "Sizda faol buyurtma topilmadi. Buyurtma berishingiz bilanoq bu yerda uning holatini kuzatishingiz mumkin.",
    products: `Bizning premium takliflarimiz:\n` + PRODUCTS.map(p => `• *${p.name_uz}* — 💵 *${p.price.toLocaleString()} UZS* (Reyting: ⭐${p.rating})\n   _${p.description_uz}_`).join('\n\n'),
    help: "Sizga qaysi mahsulot g'oyasi yoki tizimimiz haqida ma'lumot kerak? Masalan 'Smart Growbox' haqida so'rashingiz mumkin.",
    default: "O'zbekistondagi eng aqlli agrotexnik tizimlar - INFARM MARKET yordamchisi. 💡 Smart Growboxlar, minorali gidroponika va tuproq datchiklari bo'yicha eng zo'r takliflarni tayyorlab beraman.\n\nHarakat qiling, premium mahsulotlarni savatchaga qo'shing va Coinlaringizga sovg'alar oling!",
    promo: "Ajoyib kutilmagan sovg'a! Haqiqiy g'oliblar uchun maxsus 5% lik start promo-kodi: 🌱 **INFARMSTART** ! Uni to'lov vaqtida ishlating."
  };

  const responsesRu = {
    greeting: `Здравствуйте, ${userName || 'Уважаемый Клиент'}! Добро пожаловать в премиум AI-консультант INFARM MARKET. 🌱 Чем я могу помочь вам сегодня?\n\nЯ могу подобрать оборудование, рассказать о статусе заказов или ваших INFARM коинах.`,
    coins: `На вашем счету на данный момент *${coins} коинов*! 🪙\n\nЗа каждые 100 000 сумов заказа вы автоматически получаете *1 коин*. Коины можно тратить в профиле на отличные подарки и купоны (наушники AirPods, повербанки и промокоды).`,
    order_none: "У вас пока нет активных заказов. Перейдите в маркетплейс, чтобы оформить свой первый заказ!",
    order_status: lastOrder 
      ? `Ваш последний заказ:\n📦 *ID:* #${lastOrder.id}\n📍 *Адрес:* ${lastOrder.address}\n💵 *Сумма:* ${lastOrder.total?.toLocaleString()} сум\n🚚 *Статус:* ${lastOrder.status === 'pending' ? "Ожидает подтверждения 🟡" : lastOrder.status === 'processing' ? "В обработке 🟠" : lastOrder.status === 'shipped' ? "Доставляется 🔵" : "Доставлен 🟢"}\n\nКурьер свяжется с вами в ближайшее время.`
      : "Активных заказов не найдено. После совершения покупки вы сможете узнать здесь статус доставки.",
    products: `Наши лучшие премиум предложения:\n` + PRODUCTS.map(p => `• *${p.name_ru}* — 💵 *${p.price.toLocaleString()} UZS* (Рейтинг: ⭐${p.rating})\n   _${p.description_ru}_`).join('\n\n'),
    help: "О каком продукте или технологии вы хотите узнать? К примеру, спросите про 'Автоматический полив' или 'Гидропонную башню'.",
    default: "Я ваш круглосуточный агротех-помощник INFARM MARKET. 💡 Помогу выбрать автоматический гроубокс, датчики влажности Wi-Fi или премиум семена.\n\nКопите коины и обменивайте их на ценные призы в меню подарков!",
    promo: "Отличные новости! Воспользуйтесь специальным стартовым промокодом на скидку 5%: 🌱 **INFARMSTART** при оформлении заказа."
  };

  const responsesEn = {
    greeting: `Hello, ${userName || 'Valued Customer'}! Welcome to the INFARM MARKET Smart AI Assistant. 🌱 How can I elevate your farming or gardening today?\n\nI can recommend high-tech devices, assist with checkout, explain coins, or check order deliveries.`,
    coins: `You currently hold *${coins} INFARM Coins*! 🪙\n\nYou automatically earn *1 Coin* for every 100,000 UZS spent. Exchange your coins in the profile for premium rewards like AirPods, powerbanks, and high-value discount promo codes!`,
    order_none: "No transactions found yet. Explore our high-tech catalog and make your first experience!",
    order_status: lastOrder 
      ? `Your latest order:\n📦 *ID:* #${lastOrder.id}\n📍 *Destination:* ${lastOrder.address}\n💵 *Total:* ${lastOrder.total?.toLocaleString()} UZS\n🚚 *Delivery:* ${lastOrder.status === 'pending' ? "Pending Confirmation 🟡" : lastOrder.status === 'processing' ? "Processing 🟠" : lastOrder.status === 'shipped' ? "Shipped & Out for Delivery 🔵" : "Delivered Successfully 🟢"}\n\nOur delivery team is on the way.`
      : "No active orders found. Check back once you finalize a cart checkout.",
    products: `Our premium collections:\n` + PRODUCTS.map(p => `• *${p.name_en}* — 💵 *${p.price.toLocaleString()} UZS* (Rating: ⭐${p.rating})\n   _${p.description_en}_`).join('\n\n'),
    help: "Which hardware are you inquiring about? For example, ask about 'Hydroponic Tower' or 'Soil Sensor'.",
    default: "I am your 24/7 agricultural technology advisor at INFARM MARKET. 💡 I can help you set up home growboxes, automatic drip watering devices, or high-purity saffron.\n\nShop premium goods, earn loyalty coins, and try your luck on the Daily Spin Wheel!",
    promo: "Exclusive surprise! Use our starter code for a 5% discount: 🌱 **INFARMSTART** on your next checkout."
  };

  const pool = lang === 'uz' ? responsesUz : (lang === 'ru' ? responsesRu : responsesEn);

  if (msg.includes("salom") || msg.includes("hello") || msg.includes("привет") || msg.includes("здравствуй") || msg.includes("start")) {
    return pool.greeting;
  }
  if (msg.includes("coin") || msg.includes("koin") || msg.includes("balans") || msg.includes("baho") || msg.includes("koinalar")) {
    return pool.coins;
  }
  if (msg.includes("buyurt") || msg.includes("order") || msg.includes("zakaz") || msg.includes("dostavka") || msg.includes("status") || msg.includes("qachon")) {
    return pool.order_status;
  }
  if (msg.includes("mahsulot") || msg.includes("tovar") || msg.includes("product") || msg.includes("katalog") || msg.includes("price") || msg.includes("narx")) {
    return pool.products;
  }
  if (msg.includes("promo") || msg.includes("kod") || msg.includes("kupon") || msg.includes("chegirm") || msg.includes("skidk") || msg.includes("discount")) {
    return pool.promo;
  }
  if (msg.includes("yordam") || msg.includes("help") || msg.includes("savol") || msg.includes("bila")) {
    return pool.help;
  }

  // Smart keyword match to products
  if (msg.includes("growbox") || msg.includes("capsule") || msg.includes("box") || msg.includes("гроубокс") || msg.includes("kapsula")) {
    return lang === 'uz' 
      ? `🌱 *Infarm Capsule V1 Growbox* haqida:\nBu tizim uy sharoitida istalgan o'simlikni mukammal harorat, namlik va ultrabinafsha LED yorug'lik ostida parvarishlash kafolatini beradi. Narxi: 4,500,000 UZS. Smartfoningiz bilan to'liq integratsiya qilinadi!`
      : lang === 'ru'
      ? `🌱 О гроубоксе *Infarm Capsule V1*:\nЭта премиум-система гарантирует идеальный рост любых растений у вас дома благодаря авто-контролю климата и спектральному LED. Цена: 4,500,000 UZS. Полностью управляется из сотового телефона!`
      : `🌱 Inside *Infarm Capsule V1 Growbox*:\nThis premium chamber regulates climatic variables, humidity, and custom LED wavelengths on autopilot. Price: 4,500,000 UZS. Completely synced on mobile!`;
  }

  if (msg.includes("minor") || msg.includes("tower") || msg.includes("gidropon") || msg.includes("башн") || msg.includes("гидропон")) {
    return lang === 'uz'
      ? `💦 *INFARM Tower Smart V2* - mineral ozuqa suvi aylanishiga asoslangan tuproqsiz hosildor gidroponika tizimi. 96 uya mavjud bo'lib, xonada juda kam joy egallaydi. Narxi: 1,800,000 UZS.`
      : lang === 'ru'
      ? `💦 *INFARM Tower Smart V2* — вертикальная гидропонная башня без земной почвы. Вмещает 96 растений на минимальной комнатного площади. Настоящая ферма у вас дома! Цена: 1,800,000 UZS.`
      : `💦 *INFARM Tower Smart V2* — a multi-tier vertical soil-less hydroponic tower. Fits 96 crops inside minimal floor footprints. True vertical home farm! Price: 1,800,000 UZS.`;
  }

  return pool.default;
}

// REST Endpoint: Gemini AI Chat Assistant
app.post("/api/chat", async (req, res) => {
  const { message, history, language, userName, userCoins, currentOrder } = req.body;
  
  const currentLang = language || "uz";
  const actualName = userName || "Aziz Foydalanuvchi";
  const coinsAmount = userCoins !== undefined ? userCoins : 15;
  
  const currentOrderStr = currentOrder 
    ? `Order ID: #${currentOrder.id}, Delivery Address: "${currentOrder.address}", Total Cost: ${currentOrder.total} UZS, Status: "${currentOrder.status}"`
    : "No active order at the moment.";

  // Try to connect to Gemini via SDK
  const gemini = getGemini();

  if (!gemini) {
    // Return simulated premium response instantaneously with typing effect delay
    const reply = generateSimulatedResponse(message, currentLang, actualName, coinsAmount, currentOrder);
    return res.json({ response: reply });
  }

  try {
    const productsJsonContext = JSON.stringify(PRODUCTS, null, 2);

    const systemInstruction = `
You are the advanced smart AI assistant for INFARM MARKET (Agrotechnology & Premium Smart Farming marketplace in Uzbekistan).
You serve as a direct 24/7 expert agronomist, marketplace advisor, and support helper.

Rules of Interaction:
1. Always respond in the requested language: "${currentLang}" (O'zbekcha / Russian / English).
2. Maintain a futuristic, professional, agrotech-premium, highly friendly and polite tone. Use emojis like 🌱, 🪙, 📦, 🚚, 💦, ⭐ where appropriate to make readable lists.
3. Keep answers compact, readable, and structured using bold text and bullet points.
4. Recommend products from our catalog explicitly. Mention their premium status and prices:
Catalog: ${productsJsonContext}
5. You must give advice using user context when requested:
- User Name: "${actualName}"
- User Coins Balance: "${coinsAmount} INFARM Coins"
- Current Order Details: "${currentOrderStr}"
6. Answer instructions about loyalty coins: "Every 100,000 UZS spent awards 1 Automatic Coin. In the profile section, coins can be redeemed for gifts (AirPods, Powerbanks, Promo codes, custom drops)".
7. Answer instructions about the daily bonus wheel: "Users can spin the daily wheel to win random coins or secret discount promo codes once a day".
8. Encourage the user to shop, add products to their shopping cart, or try out the Spin Wheel.
    `;

    // Process chat history from request into GenAI format
    // Map roles 'user' -> 'user', 'model' -> 'model'
    const formattedContents: any[] = [];
    if (history && Array.isArray(history)) {
      history.slice(-10).forEach(h => {
        formattedContents.push({
          role: h.role === "user" ? "user" : "model",
          parts: [{ text: h.text }]
        });
      });
    }

    // Append the current message
    formattedContents.push({
      role: "user",
      parts: [{ text: message }]
    });

    const result = await gemini.models.generateContent({
      model: "gemini-3.5-flash",
      contents: formattedContents,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    const replyText = result.text || generateSimulatedResponse(message, currentLang, actualName, coinsAmount, currentOrder);
    res.json({ response: replyText });

  } catch (error: any) {
    console.error("Gemini API call failed, using failsafe fallback:", error.message || error);
    // Silent fallback to keep user experiences seamless
    const reply = generateSimulatedResponse(message, currentLang, actualName, coinsAmount, currentOrder);
    res.json({ response: reply });
  }
});

// Serve frontend assets
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // In development, hook the Vite server
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve bundled dist files
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[INFARM SERVER] Running on exclusive host http://0.0.0.0:${PORT}`);
  });
}

startServer();
