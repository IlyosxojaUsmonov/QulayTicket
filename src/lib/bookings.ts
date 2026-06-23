import type { Event } from "./data";

export type Booking = {
  id: string;
  eventId: string;
  eventTitle: string;
  eventImage: string;
  eventDate: string;
  venue: string;
  ticketType: string;
  seats: string[];
  qty: number;
  total: number;
  status: "active" | "used" | "refunded";
  createdAt: string;
  userId: string;
};

const KEY = "qt_bookings";

export function getBookings(userId?: string): Booking[] {
  if (typeof window === "undefined") return [];
  try {
    const all: Booking[] = JSON.parse(localStorage.getItem(KEY) || "[]");
    return userId ? all.filter((b) => b.userId === userId) : all;
  } catch {
    return [];
  }
}

export function addBooking(b: Omit<Booking, "id" | "createdAt">): Booking {
  const all = getBookings();
  const nb: Booking = { ...b, id: "QT" + Date.now().toString().slice(-7), createdAt: new Date().toISOString() };
  localStorage.setItem(KEY, JSON.stringify([nb, ...all]));
  return nb;
}

export function updateBooking(id: string, patch: Partial<Booking>) {
  const all = getBookings();
  const next = all.map((b) => (b.id === id ? { ...b, ...patch } : b));
  localStorage.setItem(KEY, JSON.stringify(next));
}

export function formatSom(n: number) {
  return n.toLocaleString("ru-RU") + " so'm";
}

export function formatDate(iso: string) {
  const d = new Date(iso);
  const months = ["Yanvar","Fevral","Mart","Aprel","May","Iyun","Iyul","Avgust","Sentyabr","Oktyabr","Noyabr","Dekabr"];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}, ${String(d.getHours()).padStart(2,"0")}:${String(d.getMinutes()).padStart(2,"0")}`;
}

export function priceRange(e: Event) {
  const prices = e.ticketTypes.map((t) => t.price);
  return { min: Math.min(...prices), max: Math.max(...prices) };
}
