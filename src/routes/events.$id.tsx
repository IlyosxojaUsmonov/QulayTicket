import { createFileRoute, Link, useNavigate, useParams, notFound } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { events } from "@/lib/data";
import { formatDate, formatSom } from "@/lib/bookings";
import { EventCard } from "@/components/EventCard";
import { Calendar, MapPin, Users, Heart, Share2, Star, PlayCircle, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/events/$id")({
  component: EventDetail,
});

function EventDetail() {
  const { id } = useParams({ from: "/events/$id" });
  const e = events.find((x) => x.id === id);
  const navigate = useNavigate();
  if (!e) throw notFound();

  const [now, setNow] = useState(Date.now());
  useEffect(() => { const t = setInterval(()=>setNow(Date.now()), 1000); return ()=>clearInterval(t); }, []);
  const diff = Math.max(0, +new Date(e.date) - now);
  const days = Math.floor(diff/86400000);
  const hrs = Math.floor(diff/3600000)%24;
  const mins = Math.floor(diff/60000)%60;
  const secs = Math.floor(diff/1000)%60;

  const similar = events.filter((x) => x.category === e.category && x.id !== e.id).slice(0,3);
  const sold = Math.round((e.soldSeats / e.totalSeats) * 100);

  return (
    <AppLayout>
      {/* Hero */}
      <div className="relative h-[280px] overflow-hidden">
        <img src={e.image} alt={e.title} className="absolute inset-0 h-full w-full object-cover"/>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"/>
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="text-xs mb-1 text-white/70">Bosh sahifa / Tadbirlar / {e.category}</div>
          <h1 className="text-2xl md:text-3xl font-extrabold max-w-3xl">{e.title}</h1>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-white/90">
            <span>📅 {formatDate(e.date)}</span>
            <span>📍 {e.venue}</span>
            <span className="flex items-center gap-1"><Star className="h-3 w-3 fill-primary text-primary"/> {e.rating} ({Math.floor(e.soldSeats*0.4)} sharh)</span>
            <span>🎟 {e.soldSeats.toLocaleString()} / {e.totalSeats.toLocaleString()} sotildi</span>
          </div>
        </div>
        <div className="absolute top-4 right-4 flex gap-2">
          <button className="rounded-full bg-white/90 px-3 py-2 text-sm flex items-center gap-1"><Heart className="h-4 w-4"/> Saqlash</button>
          <button className="rounded-full bg-white/90 px-3 py-2 text-sm flex items-center gap-1"><Share2 className="h-4 w-4"/> Ulashish</button>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6 lg:px-6 grid lg:grid-cols-[1fr_360px] gap-6">
        <div className="space-y-6 min-w-0">
          <Card title="Tadbir haqida"><p className="text-sm text-muted-foreground leading-relaxed">{e.description}</p></Card>

          <Card title="Dastur (Agenda)">
            <ul className="text-sm space-y-2">
              {[
                ["18:00 – 19:00","Eshiklar ochilishi va welcome zone"],
                ["19:00 – 19:30","DJ set / Warm-up dasturi"],
                ["19:30 – 20:45","1-qism (klassik hitlar)"],
                ["20:45 – 21:00","Tanaffus"],
                ["21:00 – 22:30","2-qism (yangi albom + maxsus mehmonlar)"],
              ].map(([t,d])=>(
                <li key={t} className="flex gap-3 border-l-2 border-primary pl-3">
                  <span className="font-bold w-28">{t}</span><span className="text-muted-foreground">{d}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card title="Galereya">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[0,1,2,3].map(i => <img key={i} src={`${e.image}&z=${i}`} className="aspect-square w-full rounded-lg object-cover"/>)}
            </div>
          </Card>

          <Card title="Video Preview">
            <div className="relative aspect-video rounded-lg overflow-hidden bg-black">
              <img src={e.image} className="absolute inset-0 h-full w-full object-cover opacity-60"/>
              <PlayCircle className="absolute inset-0 m-auto h-20 w-20 text-primary"/>
            </div>
          </Card>

          <Card title="Joylashuv">
            <div className="grid sm:grid-cols-[1fr_1.4fr] gap-4">
              <div className="aspect-square rounded-lg bg-gradient-to-br from-blue-100 to-green-100 grid place-items-center text-4xl">🗺️</div>
              <div>
                <div className="font-semibold">{e.venue}</div>
                <div className="text-sm text-muted-foreground mt-1 space-y-1">
                  <div className="flex items-center gap-2"><MapPin className="h-4 w-4"/> {e.city} sh.</div>
                  <div>🚇 Metro yaqinida</div>
                  <div className="flex items-center gap-2"><Users className="h-4 w-4"/> Sig'imi: {e.totalSeats.toLocaleString()} o'rin</div>
                </div>
              </div>
            </div>
          </Card>

          <Card title="Tashkilotchi">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-full bg-primary/20 font-bold">{e.organizer.slice(0,2)}</div>
              <div>
                <div className="font-semibold">{e.organizer}</div>
                <div className="text-xs text-muted-foreground">Premium tashkilotchi • 2018-yildan beri</div>
                <div className="text-xs mt-1 flex gap-3 text-muted-foreground">
                  <span>★ {e.rating} reyting</span><span>47 ta tadbir</span><span className="text-green-600 flex items-center gap-1"><CheckCircle2 className="h-3 w-3"/> Tasdiqlangan</span>
                </div>
              </div>
            </div>
          </Card>

          <Card title="Foydalanuvchi sharhlari">
            <div className="text-3xl font-bold flex items-center gap-2">{e.rating} <span className="text-base text-primary">★★★★★</span><span className="text-xs text-muted-foreground">({Math.floor(e.soldSeats*0.4)} ta sharh)</span></div>
            <div className="mt-4 space-y-3">
              {[
                ["Malika Razmatova", "Ajoyib tadbir edi! Ovozi juda yaxshi va sahna dizayni mukammal edi. Keyingi konsertgayam boraman!"],
                ["Bobur Toshpulatov", "Hammasi juda qulay edi. Xizmat darajasi yuqori. Faqat avtoturargoh birozz muammo bo'ldi lekin umuman ajoyib."],
                ["Nodira Karimova", "Bilet narxi sizini oqladi. Professional tashkillashtirilgan, raqsda boshlandi va niho'ayatda yaxshi mood yaratdi."],
              ].map(([n, t]) => (
                <div key={n} className="border-l-2 border-primary pl-3">
                  <div className="text-sm font-semibold flex items-center gap-2">{n} <span className="text-xs text-primary">★★★★★</span></div>
                  <p className="text-sm text-muted-foreground mt-1">{t}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Sticky ticket box */}
        <aside className="space-y-4">
          <div className="sticky top-20 space-y-4">
            <div className="rounded-xl border bg-white p-4">
              <h3 className="font-bold mb-3">Bilet turlari</h3>
              <div className="space-y-2">
                {e.ticketTypes.map(t => (
                  <div key={t.id} className="flex items-center justify-between rounded-lg border p-3">
                    <div>
                      <div className="font-semibold text-sm">{t.name}</div>
                      <div className="text-xs text-muted-foreground">{t.left > 10 ? "Mavjud" : t.left>0 ? `Kam qoldi (${t.left})` : "Tugadi"}</div>
                      <div className="text-base font-bold mt-1" style={{color:t.color}}>{formatSom(t.price)}</div>
                    </div>
                    <div className={`h-3 w-3 rounded-full ${t.left>0?"bg-green-500":"bg-red-500"}`}/>
                  </div>
                ))}
              </div>
              <button onClick={()=>navigate({to:"/checkout/$id", params:{id:e.id}})} className="mt-3 w-full rounded-full bg-primary py-2.5 text-sm font-bold text-primary-foreground hover:opacity-90">
                Bilet sotib olish
              </button>
            </div>

            <div className="rounded-xl border bg-white p-4 text-sm">
              <h3 className="font-bold mb-2">Tadbir ma'lumotlari</h3>
              <div className="space-y-1 text-muted-foreground">
                <div><b className="text-foreground">Sana:</b> {formatDate(e.date)}</div>
                <div><b className="text-foreground">Joy:</b> {e.venue}</div>
                <div><b className="text-foreground">Sig'im:</b> {e.totalSeats.toLocaleString()}</div>
                <div><b className="text-foreground">Til:</b> O'zbek, Rus</div>
              </div>
              <div className="mt-3">
                <div className="text-xs text-muted-foreground mb-1">Mavjud o'rinlar — {sold}%</div>
                <div className="h-2 rounded-full bg-muted overflow-hidden"><div className="h-full bg-primary" style={{width:sold+"%"}}/></div>
              </div>
            </div>

            <div className="rounded-xl border bg-white p-4">
              <h3 className="font-bold mb-3">Countdown</h3>
              <div className="grid grid-cols-4 gap-2 text-center">
                {[["Kun",days],["Soat",hrs],["Daqiqa",mins],["Soniya",secs]].map(([l,v]:any)=>(
                  <div key={l} className="rounded-lg bg-primary/15 p-2">
                    <div className="text-xl font-extrabold">{String(v).padStart(2,"0")}</div>
                    <div className="text-[10px] text-muted-foreground">{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Similar */}
      {similar.length>0 && (
        <div className="mx-auto max-w-7xl px-4 lg:px-6 pb-10">
          <h2 className="text-xl font-bold mb-4">O'xshash tadbirlar</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">{similar.map(s => <EventCard key={s.id} e={s}/>)}</div>
        </div>
      )}
    </AppLayout>
  );
}

function Card({title, children}:{title:string;children:any}){
  return <section className="rounded-xl border bg-white p-4"><h3 className="font-bold mb-3">{title}</h3>{children}</section>;
}
