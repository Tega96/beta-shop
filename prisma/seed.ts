import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const sampleProducts = [
  {
    name: "Apple iPhone 16 Pro Max",
    slug: "apple-iphone-16-pro-max",
    brand: "Apple",
    description: "The ultimate iPhone featuring a stunning Grade 5 titanium design, the groundbreaking A18 Pro chip, 4K 120 fps Dolby Vision, and the revolutionary Camera Control button for instant photo and video capture.",
    basePrice: 1199,
    rating: 4.9,
    reviewCount: 148,
    isFeatured: true,
    isNewArrival: true,
    category: "Smartphones",
    images: [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=1000&q=80"
    ],
    specs: {
      screen: "6.9-inch Super Retina XDR OLED, ProMotion 120Hz",
      processor: "Apple A18 Pro (3nm) with 6-core GPU",
      ram: "8GB Unified Memory",
      battery: "4685 mAh, 33W Fast Charging, MagSafe 25W",
      camera: "48MP Fusion + 48MP Ultra Wide + 12MP 5x Telephoto",
      os: "iOS 18 with Apple Intelligence",
      network: "5G (Sub-6 & mmWave), Wi-Fi 7, Bluetooth 5.3"
    },
    variants: [
      { colorName: "Desert Titanium", colorHex: "#C2B299", storage: "256GB", price: 1199, sku: "IP16PM-DT-256" },
      { colorName: "Desert Titanium", colorHex: "#C2B299", storage: "512GB", price: 1399, sku: "IP16PM-DT-512" },
      { colorName: "Desert Titanium", colorHex: "#C2B299", storage: "1TB", price: 1599, sku: "IP16PM-DT-1TB" },
      { colorName: "Natural Titanium", colorHex: "#9A968F", storage: "256GB", price: 1199, sku: "IP16PM-NT-256" },
      { colorName: "Natural Titanium", colorHex: "#9A968F", storage: "512GB", price: 1399, sku: "IP16PM-NT-512" },
      { colorName: "Black Titanium", colorHex: "#2E2F32", storage: "256GB", price: 1199, sku: "IP16PM-BT-256" },
      { colorName: "Black Titanium", colorHex: "#2E2F32", storage: "512GB", price: 1399, sku: "IP16PM-BT-512" },
      { colorName: "White Titanium", colorHex: "#EAE9E5", storage: "256GB", price: 1199, sku: "IP16PM-WT-256" }
    ]
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    slug: "samsung-galaxy-s24-ultra",
    brand: "Samsung",
    description: "Unleash new levels of creativity, productivity, and possibility with Galaxy AI. Built with a durable titanium exterior, flat 6.8-inch Dynamic AMOLED 2X display, and integrated S Pen.",
    basePrice: 1299,
    rating: 4.8,
    reviewCount: 112,
    isFeatured: true,
    isNewArrival: false,
    category: "Smartphones",
    images: [
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=1000&q=80"
    ],
    specs: {
      screen: "6.8-inch Dynamic AMOLED 2X, 120Hz, 2600 nits peak",
      processor: "Snapdragon 8 Gen 3 for Galaxy",
      ram: "12GB LPDDR5X",
      battery: "5000 mAh, 45W Wired, 15W Wireless",
      camera: "200MP Main + 50MP 5x Periscope + 10MP 3x + 12MP Ultra-Wide",
      os: "One UI 6.1 (Android 14) with 7 years of OS updates",
      network: "5G, Wi-Fi 7, Bluetooth 5.3, UWB"
    },
    variants: [
      { colorName: "Titanium Gray", colorHex: "#747579", storage: "256GB", price: 1299, sku: "S24U-TG-256" },
      { colorName: "Titanium Gray", colorHex: "#747579", storage: "512GB", price: 1419, sku: "S24U-TG-512" },
      { colorName: "Titanium Black", colorHex: "#2B2C30", storage: "256GB", price: 1299, sku: "S24U-TB-256" },
      { colorName: "Titanium Black", colorHex: "#2B2C30", storage: "512GB", price: 1419, sku: "S24U-TB-512" },
      { colorName: "Titanium Violet", colorHex: "#4E4B66", storage: "512GB", price: 1419, sku: "S24U-TV-512" }
    ]
  },
  {
    name: "Google Pixel 9 Pro XL",
    slug: "google-pixel-9-pro-xl",
    brand: "Google",
    description: "The most powerful Pixel yet. Featuring Google Tensor G4 engineered for Gemini advanced AI, a pro-level triple camera system, and an ultra-bright Super Actua display.",
    basePrice: 1099,
    rating: 4.8,
    reviewCount: 86,
    isFeatured: true,
    isNewArrival: true,
    category: "Smartphones",
    images: [
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=1000&q=80"
    ],
    specs: {
      screen: "6.8-inch Super Actua LTPO OLED (1-120Hz), 3000 nits",
      processor: "Google Tensor G4 with Titan M2 security coprocessor",
      ram: "16GB RAM for advanced on-device AI",
      battery: "5060 mAh, 37W Fast Charging, Wireless Qi",
      camera: "50MP Octa PD Main + 48MP Quad PD Ultrawide + 48MP 5x Telephoto",
      os: "Android 14 / Android 15 with 7 years of feature drops",
      network: "5G Sub-6/mmWave, Wi-Fi 7, Satellite SOS"
    },
    variants: [
      { colorName: "Obsidian", colorHex: "#212121", storage: "128GB", price: 1099, sku: "PIX9P-OB-128" },
      { colorName: "Obsidian", colorHex: "#212121", storage: "256GB", price: 1199, sku: "PIX9P-OB-256" },
      { colorName: "Porcelain", colorHex: "#ECEAE4", storage: "128GB", price: 1099, sku: "PIX9P-PC-128" },
      { colorName: "Porcelain", colorHex: "#ECEAE4", storage: "256GB", price: 1199, sku: "PIX9P-PC-256" },
      { colorName: "Hazel", colorHex: "#727773", storage: "256GB", price: 1199, sku: "PIX9P-HZ-256" }
    ]
  },
  {
    name: "Apple iPhone 16",
    slug: "apple-iphone-16",
    brand: "Apple",
    description: "Equipped with the all-new A18 processor built for Apple Intelligence, versatile 48MP Fusion camera with 2x Telephoto optical quality, and the programmable Action button.",
    basePrice: 799,
    rating: 4.7,
    reviewCount: 92,
    isFeatured: false,
    isNewArrival: true,
    category: "Smartphones",
    images: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=1000&q=80"
    ],
    specs: {
      screen: "6.1-inch Super Retina XDR OLED, 2000 nits peak",
      processor: "Apple A18 chip with 5-core GPU",
      ram: "8GB RAM",
      battery: "3561 mAh, 25W MagSafe Fast Charging",
      camera: "48MP Fusion + 12MP Ultra Wide with Macro",
      os: "iOS 18 with Apple Intelligence",
      network: "5G, Wi-Fi 7, Emergency SOS via satellite"
    },
    variants: [
      { colorName: "Ultramarine", colorHex: "#35528b", storage: "128GB", price: 799, sku: "IP16-UM-128" },
      { colorName: "Ultramarine", colorHex: "#35528b", storage: "256GB", price: 899, sku: "IP16-UM-256" },
      { colorName: "Teal", colorHex: "#528482", storage: "128GB", price: 799, sku: "IP16-TL-128" },
      { colorName: "Pink", colorHex: "#da93a2", storage: "128GB", price: 799, sku: "IP16-PK-128" },
      { colorName: "Black", colorHex: "#212121", storage: "128GB", price: 799, sku: "IP16-BK-128" }
    ]
  },
  {
    name: "Samsung Galaxy Z Fold 6",
    slug: "samsung-galaxy-z-fold-6",
    brand: "Samsung",
    description: "The thinnest, lightest, and most pocketable Fold yet. Next-gen foldable screen with Armor Aluminum frame and Galaxy AI productivity tools built for multitasking.",
    basePrice: 1899,
    rating: 4.8,
    reviewCount: 45,
    isFeatured: true,
    isNewArrival: true,
    category: "Smartphones",
    images: [
      "https://images.unsplash.com/photo-1585060544812-6b45742d762f?auto=format&fit=crop&w=1000&q=80"
    ],
    specs: {
      screen: "7.6-inch Foldable Dynamic AMOLED 2X + 6.3-inch Cover Display (120Hz)",
      processor: "Snapdragon 8 Gen 3 for Galaxy",
      ram: "12GB LPDDR5X",
      battery: "4400 mAh Dual Battery with 25W Fast Charge",
      camera: "50MP Wide + 10MP 3x Telephoto + 12MP Ultra-Wide",
      os: "One UI 6.1.1 on Android 14",
      network: "5G, Wi-Fi 6E/7, Ultra-Wideband"
    },
    variants: [
      { colorName: "Silver Shadow", colorHex: "#BAC0C6", storage: "256GB", price: 1899, sku: "ZF6-SS-256" },
      { colorName: "Silver Shadow", colorHex: "#BAC0C6", storage: "512GB", price: 2019, sku: "ZF6-SS-512" },
      { colorName: "Navy", colorHex: "#25344D", storage: "256GB", price: 1899, sku: "ZF6-NV-256" }
    ]
  },
  {
    name: "OnePlus 12",
    slug: "oneplus-12",
    brand: "OnePlus",
    description: "Extreme performance paired with Hasselblad 4th Gen Camera System. 100W SUPERVOOC charging gets you from 1% to 100% in just 26 minutes.",
    basePrice: 799,
    rating: 4.7,
    reviewCount: 68,
    isFeatured: false,
    isNewArrival: false,
    category: "Smartphones",
    images: [
      "https://images.unsplash.com/photo-1567581935884-3349723552ca?auto=format&fit=crop&w=1000&q=80"
    ],
    specs: {
      screen: "6.82-inch 2K ProXDR LTPO AMOLED, 120Hz, 4500 nits",
      processor: "Snapdragon 8 Gen 3",
      ram: "16GB LPDDR5X",
      battery: "5400 mAh, 100W SUPERVOOC, 50W AIRVOOC",
      camera: "50MP Sony LYT-808 + 64MP 3x Periscope + 48MP Ultra-Wide",
      os: "OxygenOS 14 based on Android 14",
      network: "5G, Wi-Fi 7, Bluetooth 5.4"
    },
    variants: [
      { colorName: "Flowy Emerald", colorHex: "#2C4C42", storage: "256GB", price: 799, sku: "OP12-FE-256" },
      { colorName: "Flowy Emerald", colorHex: "#2C4C42", storage: "512GB", price: 899, sku: "OP12-FE-512" },
      { colorName: "Silky Black", colorHex: "#1E1E1E", storage: "256GB", price: 799, sku: "OP12-SB-256" }
    ]
  }
];

async function main() {
  console.log("Seeding database with sample phone catalog...");

  for (const item of sampleProducts) {
    const { variants, ...productData } = item;

    const createdProduct = await prisma.product.upsert({
      where: { slug: item.slug },
      update: {
        ...productData,
      },
      create: {
        ...productData,
      },
    });

    for (const variant of variants) {
      await prisma.productVariant.upsert({
        where: { sku: variant.sku },
        update: {
          productId: createdProduct.id,
          ...variant,
        },
        create: {
          productId: createdProduct.id,
          ...variant,
        },
      });
    }

    console.log(`✓ Seeded ${item.name} with ${variants.length} variants.`);
  }

  console.log("Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
