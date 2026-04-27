import { mkdirSync } from "node:fs";
import { sql } from "drizzle-orm";
import { type PgliteDatabase, drizzle } from "drizzle-orm/pglite";
import { z } from "zod";

const DB_DIR = process.env.RACEBOWL_DB_DIR ?? `${process.cwd()}/.data/pglite`;

let _db: PgliteDatabase | null = null;

function getDb(): PgliteDatabase {
  if (_db) return _db;
  try {
    mkdirSync(DB_DIR, { recursive: true });
  } catch {
    // ignore — read-only fs in some build envs
  }
  _db = drizzle({ connection: { dataDir: DB_DIR } });
  return _db;
}

export const db = new Proxy({} as PgliteDatabase, {
  get(_target, prop, receiver) {
    return Reflect.get(getDb() as object, prop, receiver);
  },
});

export async function pingDb() {
  await getDb().execute(sql`select 1`);
  return true;
}

const statSchema = z.object({
  label: z.string(),
  value: z.string(),
  caption: z.string().optional(),
  accent: z.enum(["orange", "green", "amber", "blue"]).default("orange"),
});

const menuItemSchema = z.object({
  slug: z.string(),
  title: z.string(),
  category: z.string(),
  price: z.number(),
  points: z.number(),
  image: z.string(),
  spicy: z.boolean().optional(),
  featured: z.boolean().optional(),
  description: z.string(),
});

const orderSchema = z.object({
  id: z.string(),
  total: z.number(),
  status: z.enum(["Selesai", "Dikirim", "Diproses", "Dibatalkan"]),
  payment: z.string(),
  date: z.string(),
  itemCount: z.number(),
  eta: z.string(),
  image: z.string(),
});

const voucherSchema = z.object({
  code: z.string(),
  title: z.string(),
  minSpend: z.number(),
  expiresAt: z.string(),
  status: z.enum(["available", "used", "expired"]),
  imageLabel: z.string(),
});

const rewardSchema = z.object({
  slug: z.string(),
  title: z.string(),
  points: z.number(),
  stock: z.number(),
  image: z.string(),
  category: z.string(),
});

const missionSchema = z.object({
  slug: z.string(),
  title: z.string(),
  reward: z.number(),
  progress: z.number(),
  target: z.number(),
  status: z.enum(["Selesai", "Mulai"]),
  cadence: z.enum(["Harian", "Mingguan", "Spesial"]),
  description: z.string(),
});

const eventSchema = z.object({
  slug: z.string(),
  title: z.string(),
  date: z.string(),
  location: z.string(),
  description: z.string(),
  image: z.string(),
});

const paymentMethodSchema = z.object({
  type: z.string(),
  label: z.string(),
  detail: z.string(),
  primary: z.boolean().default(false),
});

const faqSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

export const heroSlides = [
  {
    eyebrow: "Race mode",
    title: "FAST. HOT. CRISPY.",
    subtitle: "Born to be fast. Made to satisfy.",
    cta: "Diskon 25% semua menu",
  },
  {
    eyebrow: "Reward rush",
    title: "SPIN WHEEL, MENANGKAN HADIAH",
    subtitle: "Main harian buat dapetin tiket, voucher, dan Race Points.",
    cta: "Main sekarang",
  },
  {
    eyebrow: "Street event",
    title: "RACEBOWL ON EVENT!",
    subtitle: "Ikuti event seru, klaim promo, dan naikkan level member.",
    cta: "Lihat jadwal",
  },
] as const;

export const homeShortcuts = [
  { title: "Event", href: "/events", icon: "flag" },
  { title: "Wheel", href: "/wheel", icon: "circle-dot" },
  { title: "Mission", href: "/missions", icon: "clipboard-check" },
  { title: "Point", href: "/race-points", icon: "badge-cent" },
  { title: "Voucher", href: "/voucher", icon: "ticket" },
  { title: "Referral", href: "/profile", icon: "users" },
] as const;

export const featuredStats = statSchema.array().parse([
  { label: "Race Points", value: "1.250", caption: "Total poin kamu" },
  {
    label: "Menu Favorit",
    value: "12",
    caption: "Siap reorder cepat",
    accent: "amber",
  },
  {
    label: "Level",
    value: "Racer",
    caption: "250 poin lagi ke next tier",
    accent: "green",
  },
]);

export const menuItems = menuItemSchema.array().parse([
  {
    slug: "racebowl-chicken",
    title: "Racebowl Chicken",
    category: "Rice Bowl",
    price: 28000,
    points: 280,
    image:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80",
    description:
      "Chicken bowl signature dengan saus Race Sauce, Spicy Mayo, dan Teriyaki.",
    featured: true,
  },
  {
    slug: "spicy-chicken",
    title: "Spicy Chicken",
    category: "Rice Bowl",
    price: 29000,
    points: 290,
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80",
    description: "Ayam pedas dengan karakter bold untuk racer sejati.",
    spicy: true,
  },
  {
    slug: "double-chicken",
    title: "Double Chicken",
    category: "Rice Bowl",
    price: 36000,
    points: 360,
    image:
      "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=900&q=80",
    description: "Double protein untuk yang ingin porsi ngebut.",
  },
  {
    slug: "shrimp-bowl",
    title: "Shrimp Bowl",
    category: "Rice Bowl",
    price: 32000,
    points: 320,
    image:
      "https://images.unsplash.com/photo-1565299585323-38174c4a6471?auto=format&fit=crop&w=900&q=80",
    description: "Shrimp bowl gurih dengan finish sedikit smoky.",
  },
  {
    slug: "lemon-tea",
    title: "Lemon Tea",
    category: "Drink",
    price: 12000,
    points: 120,
    image:
      "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&q=80",
    description: "Minuman klasik penyegar setelah race mode.",
  },
  {
    slug: "pink-lava",
    title: "Pink Lava",
    category: "Drink",
    price: 14000,
    points: 140,
    image:
      "https://images.unsplash.com/photo-1551024709-8f23befc6cf7?auto=format&fit=crop&w=900&q=80",
    description: "Minuman warna neon dengan feel playful dan premium.",
  },
]);

type CustomizerOption = { title: string; price: number; selected?: boolean };

export const customizer: {
  basePrice: number;
  protein: string;
  riceOptions: CustomizerOption[];
  sauces: CustomizerOption[];
  eggs: CustomizerOption[];
  drinks: CustomizerOption[];
} = {
  basePrice: 28000,
  protein: "Chicken",
  riceOptions: [
    { title: "Nasi Putih", price: 0, selected: true },
    { title: "Nasi Garlic", price: 3000 },
    { title: "Nasi Mentega", price: 3000 },
    { title: "Nasi Merah", price: 3000 },
  ],
  sauces: [
    { title: "Race Sauce", price: 0, selected: true },
    { title: "Spicy Mayo", price: 0, selected: true },
    { title: "Teriyaki", price: 0, selected: true },
    { title: "Garlic Butter", price: 0 },
    { title: "Cheese Sauce", price: 3000 },
  ],
  eggs: [
    { title: "Setengah Matang", price: 0, selected: true },
    { title: "Matang", price: 0 },
    { title: "Orak Arik", price: 0 },
    { title: "Tidak Pakai Telur", price: 0 },
  ],
  drinks: [
    { title: "Lemon Tea", price: 12000, selected: true },
    { title: "Mineral Water", price: 6000 },
    { title: "Coke", price: 10000 },
    { title: "Es Jeruk", price: 10000 },
    { title: "Pink Lava", price: 14000 },
  ],
};

export const orders = orderSchema.array().parse([
  {
    id: "RB-240518-27",
    total: 38000,
    status: "Selesai",
    payment: "QRIS (GoPay)",
    date: "18 Mei 2024 · 19:41",
    itemCount: 2,
    eta: "10 - 15 menit",
    image: menuItems[0].image,
  },
  {
    id: "RB-240517-18",
    total: 32000,
    status: "Dikirim",
    payment: "QRIS (OVO)",
    date: "17 Mei 2024 · 12:35",
    itemCount: 1,
    eta: "8 menit",
    image: menuItems[1].image,
  },
  {
    id: "RB-240516-09",
    total: 42000,
    status: "Diproses",
    payment: "GoPay",
    date: "16 Mei 2024 · 18:22",
    itemCount: 2,
    eta: "14 menit",
    image: menuItems[2].image,
  },
  {
    id: "RB-240515-33",
    total: 28000,
    status: "Dibatalkan",
    payment: "QRIS (GoPay)",
    date: "15 Mei 2024 · 11:09",
    itemCount: 1,
    eta: "-",
    image: menuItems[3].image,
  },
]);

export const pointHistory = [
  {
    title: "Pesanan #RB12345",
    subtitle: "Pesanan berhasil",
    value: "+50 Poin",
    positive: true,
  },
  {
    title: "Misi Harian",
    subtitle: "Login harian",
    value: "+5 Poin",
    positive: true,
  },
  {
    title: "Ajak Teman",
    subtitle: "Teman berhasil daftar",
    value: "+100 Poin",
    positive: true,
  },
  {
    title: "Tukar Voucher Rp 10.000",
    subtitle: "Penukaran voucher",
    value: "-1.000 Poin",
    positive: false,
  },
  {
    title: "Spin Wheel",
    subtitle: "Spin harian",
    value: "+50 Poin",
    positive: true,
  },
] as const;

export const rewards = rewardSchema.array().parse([
  {
    slug: "paket-racebowl",
    title: "Paket Makanan Racebowl",
    points: 1000,
    stock: 100,
    image: menuItems[0].image,
    category: "Makanan & Minuman",
  },
  {
    slug: "minuman-racebowl",
    title: "Minuman Racebowl",
    points: 500,
    stock: 150,
    image: menuItems[4].image,
    category: "Makanan & Minuman",
  },
  {
    slug: "voucher-10k",
    title: "Voucher Diskon Rp 10.000",
    points: 1000,
    stock: 200,
    image: "voucher",
    category: "Voucher",
  },
  {
    slug: "voucher-20",
    title: "Voucher Diskon 20%",
    points: 1500,
    stock: 100,
    image: "voucher",
    category: "Voucher",
  },
  {
    slug: "topi-racebowl",
    title: "Topi Racebowl",
    points: 2500,
    stock: 50,
    image: "merch",
    category: "Merchandise",
  },
  {
    slug: "tshirt-racebowl",
    title: "T-Shirt Racebowl",
    points: 3500,
    stock: 30,
    image: "merch",
    category: "Merchandise",
  },
]);

export const vouchers = voucherSchema.array().parse([
  {
    code: "RB10K-AB12CD",
    title: "Voucher Diskon Rp 10.000",
    minSpend: 50000,
    expiresAt: "31 Mei 2025",
    status: "available",
    imageLabel: "10K",
  },
  {
    code: "RB20OFF-XZ34EF",
    title: "Voucher Diskon 20%",
    minSpend: 100000,
    expiresAt: "31 Mei 2025",
    status: "available",
    imageLabel: "20% OFF",
  },
  {
    code: "RBONGKIR-98GHJK",
    title: "Voucher Gratis Ongkir",
    minSpend: 40000,
    expiresAt: "15 Juni 2025",
    status: "available",
    imageLabel: "GRATIS ONGKIR",
  },
  {
    code: "RB15K-OLD123",
    title: "Voucher Diskon Rp 15.000",
    minSpend: 75000,
    expiresAt: "10 Mei 2025",
    status: "expired",
    imageLabel: "15K",
  },
]);

export const missions = missionSchema.array().parse([
  {
    slug: "login-harian",
    title: "Login Harian",
    reward: 10,
    progress: 1,
    target: 1,
    status: "Selesai",
    cadence: "Harian",
    description: "Login ke aplikasi Racebowl dan klaim poin harian.",
  },
  {
    slug: "pesan-1-kali",
    title: "Pesan 1 Kali",
    reward: 20,
    progress: 0,
    target: 1,
    status: "Mulai",
    cadence: "Harian",
    description: "Selesaikan 1 pesanan untuk mendapatkan Race Points.",
  },
  {
    slug: "gunakan-promo",
    title: "Gunakan Promo",
    reward: 15,
    progress: 0,
    target: 1,
    status: "Mulai",
    cadence: "Harian",
    description: "Gunakan satu promo saat checkout.",
  },
  {
    slug: "pesan-5-kali",
    title: "Pesan 5 Kali",
    reward: 100,
    progress: 3,
    target: 5,
    status: "Mulai",
    cadence: "Mingguan",
    description: "Selesaikan 5 pesanan dalam seminggu.",
  },
  {
    slug: "pelanggan-setia",
    title: "Pelanggan Setia",
    reward: 300,
    progress: 12,
    target: 20,
    status: "Mulai",
    cadence: "Spesial",
    description: "Selesaikan 20 pesanan untuk bonus progres jangka panjang.",
  },
]);

export const events = eventSchema.array().parse([
  {
    slug: "indonesia-motorcycle-show-2024",
    title: "Indonesia Motorcycle Show 2024",
    date: "29 Mei – 2 Juni 2024",
    location: "ICE BSD City, Tangerang",
    description:
      "Temui Racebowl di booth kami dan nikmati promo spesial serta berbagai aktivitas seru.",
    image:
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=900&q=80",
  },
  {
    slug: "jakarta-food-festival-2024",
    title: "Jakarta Food Festival 2024",
    date: "7 – 9 Juni 2024",
    location: "Gambir Expo, Jakarta",
    description:
      "Nikmati menu favoritmu dan event exclusive hanya di booth Racebowl.",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80",
  },
  {
    slug: "sunday-ride-bandung",
    title: "Sunday Ride Bandung",
    date: "16 Juni 2024",
    location: "Lap. Gasibu, Bandung",
    description: "Ride bareng, game seru, dan makan enak bareng Racebowl.",
    image:
      "https://images.unsplash.com/photo-1517846693594-1567da72af75?auto=format&fit=crop&w=900&q=80",
  },
]);

export const paymentMethods = paymentMethodSchema.array().parse([
  { type: "Visa", label: "Visa", detail: "**** **** **** 1234", primary: true },
  { type: "Mastercard", label: "Mastercard", detail: "**** **** **** 5678" },
  { type: "DANA", label: "DANA", detail: "0812 3456 7890" },
  { type: "OVO", label: "OVO", detail: "0812 3456 7890" },
]);

export const favoriteItems = [
  {
    title: "Iced Latte",
    subtitle: "Race Bowl Coffee",
    price: 20000,
    points: 200,
    image:
      "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Chicken Bowl",
    subtitle: "Race Bowl",
    price: 35000,
    points: 350,
    image: menuItems[0].image,
  },
  {
    title: "Weekend Race Challenge",
    subtitle: "Event",
    price: 100,
    points: 100,
    image: events[0].image,
  },
  {
    title: "RB Official Jersey",
    subtitle: "Merchandise",
    price: 250000,
    points: 2500,
    image:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80",
  },
] as const;

export const accountOverview = {
  name: "Raka Pratama",
  tier: "Racer",
  phone: "+62 812-3456-7890",
  email: "raka.pratama@gmail.com",
  points: 1250,
  nextLevelPoints: 250,
  memberSince: "12 Mei 2024",
} as const;

export const accountDetails = {
  fullName: "Race Bowl",
  email: "racebowl123@gmail.com",
  phone: "0812 •••• ••••",
  birthday: "12 Mei 2000",
  region: "Indonesia",
  language: "Bahasa Indonesia",
} as const;

export const aboutCards = [
  {
    title: "Tentang Kami",
    body: "RaceBowl adalah platform gaya hidup dan komunitas untuk para pecinta balap dan kecepatan. Kami menghadirkan pengalaman makanan, event, merchandise, dan reward dalam satu ekosistem.",
  },
  {
    title: "Misi Kami",
    body: "Menghubungkan komunitas pecinta balap melalui pengalaman digital yang seru, inovatif, dan bermanfaat.",
  },
  {
    title: "Visi Kami",
    body: "Menjadi platform komunitas otomotif dan lifestyle terdepan di Indonesia.",
  },
] as const;

export const faqs = faqSchema.array().parse([
  {
    question: "Bagaimana cara mendapatkan Race Points?",
    answer:
      "Race Points bisa didapat dari pesanan, misi, spin wheel, referral, dan penggunaan voucher tertentu.",
  },
  {
    question: "Kapan voucher saya bisa digunakan?",
    answer:
      "Voucher aktif bisa dipakai saat checkout selama minimum belanja dan masa berlaku terpenuhi.",
  },
  {
    question: "Bagaimana cara melacak pesanan saya?",
    answer:
      "Masuk ke halaman order dan pilih pesanan aktif untuk melihat status secara real-time.",
  },
  {
    question: "Metode pembayaran apa saja yang tersedia?",
    answer:
      "GoPay, OVO, DANA, ShopeePay, kartu debit/kredit, QRIS, dan virtual account.",
  },
]);

export const supportChannels = [
  { label: "Live Chat", value: "Chat langsung dengan tim kami" },
  { label: "Email", value: "support@racebowl.id" },
  { label: "WhatsApp", value: "0812 3456 7890" },
] as const;

export const wheelRewards = [
  "1.000 Race Points",
  "Tiket Diskon 20%",
  "500 Race Points",
  "Merchandise Eksklusif",
  "2.000 Race Points",
  "Gratis Ongkir",
  "250 Race Points",
  "1 Tiket Wheel",
] as const;

export type MenuItem = z.infer<typeof menuItemSchema>;
export type Order = z.infer<typeof orderSchema>;
export type Reward = z.infer<typeof rewardSchema>;
export type Mission = z.infer<typeof missionSchema>;
export type EventItem = z.infer<typeof eventSchema>;
export type Voucher = z.infer<typeof voucherSchema>;
