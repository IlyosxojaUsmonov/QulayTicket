import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { events, categories, cities, partners, featuredOrgs, reviews, faqs } from "@/lib/data";
import { EventCard } from "@/components/EventCard";
import { useAuth } from "@/lib/auth";
import { useEffect, useState } from "react";
import { ChevronDown, Smartphone, Download } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/auth" });
  }, [loading, user, navigate]);

  if (loading || !user) return null;

  const trending = events.filter((e) => e.trending);
  const featured = events.filter((e) => e.featured);
  const upcoming = events.slice(0, 6);
  const vip = events.filter((e) => e.vip);

  return (
    <AppLayout>
      {/* Hero */}
      <section className="relative h-[360px] overflow-hidden">
        <img src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1800&q=70" alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        <div className="relative mx-auto flex h-full max-w-5xl flex-col items-center justify-center px-4 text-center text-white">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
            O'zbekiston bo'ylab eng yaxshi tadbirlar — bir joyda
          </h1>
          <p className="mt-3 text-sm sm:text-base text-white/85 max-w-2xl">
            Konsert, sport, teatr, festival va boshqa minglab tadbirlarga bilet oling. Tez, qulay va ishonchli.
          </p>
          <SearchBar />
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <Link to="/events" className="rounded-full bg-white/15 backdrop-blur px-4 py-2 text-sm font-medium hover:bg-white/25">Barcha tadbirlar</Link>
            <Link to="/sell" className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Tashkilotchi bo'ling</Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-10 px-4 py-8 lg:px-6">
        {/* Categories */}
        <section>
          <h2 className="mb-4 text-xl font-bold">Mashhur kategoriyalar</h2>
          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-3">
            {categories.map((c) => (
              <Link
                key={c.id}
                to="/events"
                search={{ category: c.name } as any}
                className="flex flex-col items-center gap-2 rounded-xl bg-white p-3 border hover:shadow-md"
              >
                <div className="grid h-12 w-12 place-items-center rounded-full text-2xl" style={{ background: c.color + "22" }}>
                  {c.icon}
                </div>
                <span className="text-xs font-medium text-center">{c.name}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Trending */}
        <Section title="🔥 Trending Events" link="/events">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {trending.map((e) => <EventCard key={e.id} e={e} />)}
          </div>
        </Section>

        {/* Featured */}
        <Section title="⭐ Tavsiya etilgan tadbirlar" link="/events">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {featured.map((e) => <EventCard key={e.id} e={e} />)}
          </div>
        </Section>

        {/* Reviews */}
        <section>
          <h2 className="mb-4 text-xl font-bold">Foydalanuvchi fikrlari</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {reviews.map((r) => (
              <div key={r.name} className="rounded-xl border bg-white p-4">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-primary/20 font-bold text-sm">{r.name.slice(0,2)}</div>
                  <div>
                    <div className="font-semibold text-sm">{r.name}</div>
                    <div className="text-primary text-xs">{"★".repeat(r.rating)}</div>
                  </div>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{r.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Partners */}
        <section className="rounded-xl bg-white border p-6 text-center">
          <h3 className="font-bold mb-4">💛 Bizning hamkorlar</h3>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-muted-foreground">
            {partners.map((p) => <span key={p}>{p}</span>)}
          </div>
        </section>

        {/* Mobile app */}
        <section className="grid md:grid-cols-2 gap-6 rounded-xl bg-gradient-to-r from-primary/15 to-primary/5 p-6 border">
          <div>
            <div className="flex items-center gap-2 text-lg font-bold"><Smartphone className="h-5 w-5"/> Mobil ilovamizni yuklab oling!</div>
            <p className="mt-2 text-sm text-muted-foreground">Biletni tezroq sotib oling, tadbirlar haqida birinchilardan bo'lib xabardor bo'ling va maxsus chegirmalardan foydalaning.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <button className="flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-white text-xs"><Download className="h-4 w-4"/>App Store</button>
              <button className="flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-white text-xs"><Download className="h-4 w-4"/>Google Play</button>
            </div>
          </div>
          <div className="grid place-items-center">
            <div className="w-32 h-56 rounded-3xl border-4 border-foreground/80 bg-white grid place-items-center text-xs text-muted-foreground">📱 QulayTicket</div>
          </div>
        </section>

        {/* Featured organizers */}
        <Section title="Featured Tashkilotchilar">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {featuredOrgs.map((o) => (
              <div key={o.name} className="rounded-xl border bg-white p-4 text-center">
                <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-primary/20 font-bold">{o.name.slice(0,2)}</div>
                <div className="mt-2 text-sm font-semibold">{o.name}</div>
                <div className="text-xs text-muted-foreground">{o.events} tadbir</div>
                <div className="text-xs text-primary mt-1">★ {o.rating}</div>
              </div>
            ))}
          </div>
        </Section>

        {/* Cities */}
        <Section title="O'zbekiston bo'ylab tadbirlar">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {cities.map((c) => (
              <Link key={c.name} to="/events" search={{ city: c.name } as any} className="relative h-32 overflow-hidden rounded-xl">
                <img src={c.image} alt={c.name} className="absolute inset-0 h-full w-full object-cover"/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"/>
                <div className="absolute bottom-3 left-3 text-white">
                  <div className="font-bold">{c.name}</div>
                  <div className="text-xs">{c.count} tadbir</div>
                </div>
              </Link>
            ))}
          </div>
        </Section>

        {/* Stats */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 rounded-xl bg-primary p-6 text-primary-foreground">
          {[["250,000+","Faol foydalanuvchilar"],["12,500+","O'tkazilgan tadbirlar"],["1,800,000+","Sotilgan biletlar"],["850+","Hamkor tashkilotchilar"]].map(([n,l])=>(
            <div key={l} className="text-center">
              <div className="text-2xl font-extrabold">{n}</div>
              <div className="text-xs mt-1">{l}</div>
            </div>
          ))}
        </section>

        <Section title="Yaqinlashayotgan tadbirlar" link="/events">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">{upcoming.slice(0,6).map(e => <EventCard key={e.id} e={e}/>)}</div>
        </Section>

        <Section title="💎 VIP Events">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">{vip.slice(0,3).map(e => <EventCard key={e.id} e={e}/>)}</div>
        </Section>

        {/* Newsletter */}
        <section className="rounded-xl border bg-white p-6 text-center">
          <h3 className="font-bold">📬 Yangiliklar va maxsus takliflar</h3>
          <p className="text-xs text-muted-foreground mt-1">Email manzilingizni qoldiring va eng so'nggi tadbirlar haqida birinchilardan xabardor bo'ling!</p>
          <form className="mt-4 flex flex-wrap justify-center gap-2" onSubmit={(e)=>e.preventDefault()}>
            <input type="email" placeholder="Email manzilingiz…" className="rounded-full border px-4 py-2 text-sm w-72"/>
            <button className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground">Obuna bo'lish</button>
          </form>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="mb-4 text-xl font-bold">❓ Ko'p beriladigan savollar</h2>
          <div className="space-y-2">
            {faqs.map((f, i) => <FaqItem key={i} {...f}/>)}
          </div>
        </section>

        <footer className="border-t pt-6 pb-10 text-center text-xs text-muted-foreground">
          © 2025 QulayTicket. Barcha huquqlar himoyalangan.
        </footer>
      </div>
    </AppLayout>
  );
}

function Section({ title, link, children }: { title: string; link?: string; children: any }) {
  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">{title}</h2>
        {link && <Link to={link as any} className="text-sm text-primary font-medium hover:underline">Barchasi →</Link>}
      </div>
      {children}
    </section>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border bg-white">
      <button onClick={() => setOpen(!open)} className="flex w-full items-center justify-between p-4 text-left">
        <span className="font-medium text-sm">{q}</span>
        <ChevronDown className={`h-4 w-4 transition ${open ? "rotate-180" : ""}`}/>
      </button>
      {open && <div className="px-4 pb-4 text-sm text-muted-foreground">{a}</div>}
    </div>
  );
}

function SearchBar() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  return (
    <form
      onSubmit={(e) => { e.preventDefault(); navigate({ to: "/search", search: { q } as any }); }}
      className="mt-6 flex flex-wrap items-center gap-2 rounded-full bg-white/95 p-2 text-foreground shadow-xl"
    >
      <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Sana tanlang" className="min-w-0 flex-1 rounded-full px-4 py-2 text-sm outline-none"/>
      <input placeholder="Shahar tanlang" className="hidden md:block flex-1 rounded-full px-4 py-2 text-sm outline-none border-l"/>
      <input placeholder="Kategoriya" className="hidden md:block flex-1 rounded-full px-4 py-2 text-sm outline-none border-l"/>
      <button className="rounded-full bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground">Qidirish</button>
    </form>
  );
}
