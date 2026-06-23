export type Event = {
  id: string;
  title: string;
  category: "Konsert" | "Futbol" | "Teatr" | "Kino" | "Festival" | "Stand-up" | "Seminar" | "Konferensiya" | "Fitnes";
  city: "Toshkent" | "Samarqand" | "Buxoro" | "Andijon" | "Namangan" | "Farg'ona" | "Xorazm";
  venue: string;
  date: string; // ISO
  priceFrom: number;
  image: string;
  description: string;
  organizer: string;
  rating: number;
  totalSeats: number;
  soldSeats: number;
  format: "Oflayn" | "Onlayn" | "Mehmonli";
  vip?: boolean;
  featured?: boolean;
  trending?: boolean;
  ticketTypes: { id: string; name: string; price: number; left: number; total: number; color: string }[];
};

const img = (q: string, seed: number) =>
  `https://images.unsplash.com/photo-${q}?auto=format&fit=crop&w=800&q=70&sig=${seed}`;

// Curated Unsplash images (concert / stadium / theater / festival)
const imgs = [
  "1514525253161-7a46d19cd819", // concert
  "1459865264687-595d652de67e", // stadium
  "1503095396549-807759245b35", // theater
  "1492684223066-81342ee5ff30", // festival crowd
  "1470229722913-7c0e2dbbafd3", // concert lights
  "1551836022-d5d88e9218df", // stand-up
  "1540575467063-178a50c2df87", // conference
  "1505373877841-8d25f7d46678", // dj
  "1517457373958-b7bdd4587205", // hall
  "1493225457124-a3eb161ffa5f", // crowd
  "1540317580384-e5d43616b9aa", // theater 2
  "1501281668745-f7f57925c3b4", // stadium 2
];

const pic = (i: number) =>
  `https://images.unsplash.com/photo-${imgs[i % imgs.length]}?auto=format&fit=crop&w=900&q=70`;

export const events: Event[] = [
  {
    id: "e1",
    title: "Sevara Nazarxon — \"Yulduzlar Kechasi\" Konsert Dasturi",
    category: "Konsert",
    city: "Toshkent",
    venue: "Humo Arena, Toshkent",
    date: "2025-03-15T19:00:00",
    priceFrom: 150000,
    image: pic(0),
    description:
      "O'zbekistonning sevimli xonandasi Sevara Nazarxonning katta konsert dasturi. Mashhur qo'shiqlar, maxsus mehmonlar va unutilmas kech.",
    organizer: "Global Live Events",
    rating: 4.8,
    totalSeats: 5000,
    soldSeats: 3200,
    format: "Oflayn",
    vip: true,
    trending: true,
    featured: true,
    ticketTypes: [
      { id: "t1", name: "VIP Diamond", price: 1500000, left: 8, total: 50, color: "#FACC15" },
      { id: "t2", name: "VIP Gold", price: 800000, left: 60, total: 200, color: "#F59E0B" },
      { id: "t3", name: "Standart", price: 350000, left: 850, total: 1500, color: "#10B981" },
      { id: "t4", name: "Ekonom", price: 150000, left: 120, total: 1200, color: "#3B82F6" },
    ],
  },
  {
    id: "e2",
    title: "Pахtakor vs Navbahor — Super Liga",
    category: "Futbol",
    city: "Toshkent",
    venue: "Milliy Stadion, Toshkent",
    date: "2025-03-24T18:30:00",
    priceFrom: 80000,
    image: pic(1),
    description: "Super Liga eng kutilgan o'yini. Pахtakor va Navbahor jamoalari uchrashuvi.",
    organizer: "Sport Events Uz",
    rating: 4.6,
    totalSeats: 35000,
    soldSeats: 21000,
    format: "Oflayn",
    trending: true,
    ticketTypes: [
      { id: "t1", name: "VIP", price: 500000, left: 20, total: 100, color: "#FACC15" },
      { id: "t2", name: "Sektor A", price: 200000, left: 200, total: 5000, color: "#10B981" },
      { id: "t3", name: "Sektor B", price: 120000, left: 1500, total: 10000, color: "#3B82F6" },
      { id: "t4", name: "Standart", price: 80000, left: 5000, total: 19900, color: "#94A3B8" },
    ],
  },
  {
    id: "e3",
    title: "Hamlet — Navoiy Nomidagi Teatr",
    category: "Teatr",
    city: "Toshkent",
    venue: "Navoiy Teatri, Toshkent",
    date: "2025-04-02T18:00:00",
    priceFrom: 60000,
    image: pic(2),
    description: "Shekspirning mashhur 'Hamlet' tragediyasi sahnasi. Klassik teatr san'ati.",
    organizer: "Navoiy Teatri",
    rating: 4.9,
    totalSeats: 800,
    soldSeats: 540,
    format: "Oflayn",
    featured: true,
    ticketTypes: [
      { id: "t1", name: "Parter", price: 200000, left: 12, total: 100, color: "#FACC15" },
      { id: "t2", name: "Balkon", price: 120000, left: 50, total: 300, color: "#10B981" },
      { id: "t3", name: "Standart", price: 60000, left: 200, total: 400, color: "#3B82F6" },
    ],
  },
  {
    id: "e4",
    title: "Abror Baxtiyorov — Yangi Dastur",
    category: "Stand-up",
    city: "Toshkent",
    venue: "Stand-up Hall, Toshkent",
    date: "2025-04-08T20:00:00",
    priceFrom: 120000,
    image: pic(5),
    description: "Abror Baxtiyorovning eng kulgili stand-up dasturi.",
    organizer: "Comedy Uz",
    rating: 4.7,
    totalSeats: 600,
    soldSeats: 410,
    format: "Oflayn",
    trending: true,
    ticketTypes: [
      { id: "t1", name: "VIP", price: 300000, left: 5, total: 40, color: "#FACC15" },
      { id: "t2", name: "Standart", price: 120000, left: 120, total: 560, color: "#10B981" },
    ],
  },
  {
    id: "e5",
    title: "TechFest Uzbekistan 2025",
    category: "Konferensiya",
    city: "Toshkent",
    venue: "EXPO Center, Toshkent",
    date: "2025-05-12T09:00:00",
    priceFrom: 200000,
    image: pic(6),
    description: "Yillik texnologiya konferensiyasi. Mahalliy va xalqaro spikerlar.",
    organizer: "EduForum Uz",
    rating: 4.8,
    totalSeats: 2000,
    soldSeats: 1240,
    format: "Mehmonli",
    featured: true,
    ticketTypes: [
      { id: "t1", name: "VIP Pass", price: 1200000, left: 30, total: 200, color: "#FACC15" },
      { id: "t2", name: "Standart", price: 400000, left: 400, total: 1200, color: "#10B981" },
      { id: "t3", name: "Talaba", price: 200000, left: 150, total: 600, color: "#3B82F6" },
    ],
  },
  {
    id: "e6",
    title: "Silk Road Music Festival",
    category: "Festival",
    city: "Samarqand",
    venue: "Registon Maydoni, Samarqand",
    date: "2025-06-20T17:00:00",
    priceFrom: 250000,
    image: pic(3),
    description: "An'anaviy va zamonaviy musiqa festivali. Xalqaro guruhlar.",
    organizer: "Muzeyya Production",
    rating: 4.9,
    totalSeats: 8000,
    soldSeats: 4500,
    format: "Oflayn",
    featured: true,
    vip: true,
    ticketTypes: [
      { id: "t1", name: "VIP", price: 1000000, left: 50, total: 300, color: "#FACC15" },
      { id: "t2", name: "Premium", price: 500000, left: 400, total: 2000, color: "#F59E0B" },
      { id: "t3", name: "Standart", price: 250000, left: 1500, total: 5700, color: "#10B981" },
    ],
  },
  {
    id: "e7",
    title: "Zamonaviy Raqs Ko'rgazmasi",
    category: "Festival",
    city: "Toshkent",
    venue: "Yoshlar Saroyi, Toshkent",
    date: "2025-04-18T19:00:00",
    priceFrom: 60000,
    image: pic(10),
    description: "Mahalliy raqs guruhlarining yillik tanlovi.",
    organizer: "Dance Uz",
    rating: 4.5,
    totalSeats: 1200,
    soldSeats: 600,
    format: "Oflayn",
    ticketTypes: [
      { id: "t1", name: "VIP", price: 200000, left: 30, total: 100, color: "#FACC15" },
      { id: "t2", name: "Standart", price: 60000, left: 400, total: 1100, color: "#10B981" },
    ],
  },
  {
    id: "e8",
    title: "Invest Central Asia Forum",
    category: "Konferensiya",
    city: "Toshkent",
    venue: "Hilton Tashkent",
    date: "2025-07-10T09:00:00",
    priceFrom: 500000,
    image: pic(6),
    description: "Markaziy Osiyo investitsiya forumi.",
    organizer: "LCC Comedy Club",
    rating: 4.7,
    totalSeats: 500,
    soldSeats: 280,
    format: "Mehmonli",
    ticketTypes: [
      { id: "t1", name: "VIP", price: 2000000, left: 20, total: 100, color: "#FACC15" },
      { id: "t2", name: "Standart", price: 500000, left: 150, total: 400, color: "#10B981" },
    ],
  },
  {
    id: "e9",
    title: "Jazz Night Toshkent",
    category: "Konsert",
    city: "Toshkent",
    venue: "Steam Pub, Toshkent",
    date: "2025-03-28T20:00:00",
    priceFrom: 90000,
    image: pic(7),
    description: "Jonli jazz musiqasi kechasi.",
    organizer: "Jazz Club",
    rating: 4.6,
    totalSeats: 200,
    soldSeats: 110,
    format: "Oflayn",
    ticketTypes: [
      { id: "t1", name: "Stol", price: 250000, left: 8, total: 20, color: "#FACC15" },
      { id: "t2", name: "Standart", price: 90000, left: 70, total: 180, color: "#10B981" },
    ],
  },
  {
    id: "e10",
    title: "Digital Marketing Seminar",
    category: "Seminar",
    city: "Toshkent",
    venue: "IT Park, Toshkent",
    date: "2025-04-25T10:00:00",
    priceFrom: 75000,
    image: pic(8),
    description: "SMM va digital marketing bo'yicha amaliy seminar.",
    organizer: "EduForum Uz",
    rating: 4.4,
    totalSeats: 150,
    soldSeats: 90,
    format: "Onlayn",
    ticketTypes: [
      { id: "t1", name: "Standart", price: 75000, left: 60, total: 150, color: "#10B981" },
    ],
  },
  {
    id: "e11",
    title: "Premyera: Olami Yete",
    category: "Kino",
    city: "Toshkent",
    venue: "Magic Cinema, Toshkent",
    date: "2025-04-05T19:00:00",
    priceFrom: 45000,
    image: pic(9),
    description: "Yangi o'zbek kinosining premyerasi.",
    organizer: "Magic Cinema",
    rating: 4.3,
    totalSeats: 300,
    soldSeats: 170,
    format: "Oflayn",
    ticketTypes: [
      { id: "t1", name: "VIP", price: 120000, left: 10, total: 30, color: "#FACC15" },
      { id: "t2", name: "Standart", price: 45000, left: 130, total: 270, color: "#10B981" },
    ],
  },
  {
    id: "e12",
    title: "Yoga & Wellness Retreat",
    category: "Fitnes",
    city: "Toshkent",
    venue: "Wellness Studio",
    date: "2025-05-03T08:00:00",
    priceFrom: 110000,
    image: pic(11),
    description: "Bir kunlik yoga va wellness retriti.",
    organizer: "Wellness Uz",
    rating: 4.8,
    totalSeats: 80,
    soldSeats: 45,
    format: "Oflayn",
    ticketTypes: [
      { id: "t1", name: "Standart", price: 110000, left: 35, total: 80, color: "#10B981" },
    ],
  },
];

export const categories = [
  { id: "konsert", name: "Konsert", icon: "🎵", color: "#FACC15" },
  { id: "futbol", name: "Futbol", icon: "⚽", color: "#10B981" },
  { id: "teatr", name: "Teatr", icon: "🎭", color: "#EC4899" },
  { id: "kino", name: "Kino", icon: "🎬", color: "#3B82F6" },
  { id: "festival", name: "Festival", icon: "🎉", color: "#F59E0B" },
  { id: "standup", name: "Stand-up", icon: "🎤", color: "#8B5CF6" },
  { id: "seminar", name: "Seminar", icon: "📚", color: "#06B6D4" },
  { id: "fitnes", name: "Fitnes forum", icon: "💪", color: "#EF4444" },
  { id: "konferensiya", name: "Konferensiya", icon: "🎙️", color: "#14B8A6" },
];

export const cities = [
  { name: "Toshkent", count: 342, image: "https://images.unsplash.com/photo-1610116306796-6fea9f4fae38?auto=format&fit=crop&w=600&q=70" },
  { name: "Samarqand", count: 128, image: "https://images.unsplash.com/photo-1604999333679-b86d54738315?auto=format&fit=crop&w=600&q=70" },
  { name: "Buxoro", count: 87, image: "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?auto=format&fit=crop&w=600&q=70" },
  { name: "Farg'ona", count: 63, image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=70" },
];

export const partners = ["UzTV", "Ipoteka Bank", "Uzbekistan Airways", "Beeline", "Korzinka", "MyTaxi"];

export const featuredOrgs = [
  { name: "EventPro UZ", events: 138, rating: 4.7 },
  { name: "Sport Events Uz", events: 124, rating: 4.6 },
  { name: "Muzeyya Production", events: 92, rating: 4.8 },
  { name: "EduForum Uz", events: 71, rating: 4.5 },
  { name: "LCC Comedy Club", events: 112, rating: 4.6 },
];

export const reviews = [
  { name: "Malika Rasmatova", rating: 5, text: "QulayTicket orqali bilet olish juda oson. Konsertga borishdan oldin hech qanday muammo bo'lmadi. Ajoyib xizmat!" },
  { name: "Jasur Holmatov", rating: 5, text: "Futbol o'yiniga bilet olish endi juda qulay. Oilam bilan stadiondan zavqlandik. Rahmat QulayTicket!" },
  { name: "Nodira Karimova", rating: 5, text: "Teatr biletini oroyin olish imkoniyati bor ekan! Hamma narsani uyda turib hal qildim. Juda yoqdi platforma." },
];

export const faqs = [
  { q: "Biletni qanday sotib olaman?", a: "Tadbirni tanlang, joyingizni belgilang, to'lov amalga oshiring — biletingiz elektron shaklda telefoningizga keladi." },
  { q: "Biletni qaytarish mumkinmi?", a: "Ha, tadbir boshlanishidan kamida 48 soat oldin biletni qaytarishingiz mumkin. To'lovning 80-100% summa ichida qaytariladi." },
  { q: "Qanday to'lov usullari mavjud?", a: "Payme, Click, UzCard, Humo, Visa va Mastercard kartalaridan foydalanishingiz mumkin." },
  { q: "Tashkilotchi bo'lish uchun nima qilish kerak?", a: "Ro'yxatdan o'ting, profilingizni to'ldiring va 'Tashkilotchi bo'lish' tugmasini bosing. Jamoamiz 24 soat ichida tasdiqlaydi." },
];
