import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { events } from "@/lib/data";
import { useAuth } from "@/lib/auth";
import { Plus, TrendingUp, Users, DollarSign, Calendar } from "lucide-react";

export const Route = createFileRoute("/organizer")({
  component: Organizer,
});

const orders = [
  ["#QT4321","Dilshod Rahimov","Navruz konsert","350,000","Tasdiqlangan","green"],
  ["#QT4322","Malika Tursunova","IT Conference","350,000","Tasdiqlangan","green"],
  ["#QT4319","Jasur Karimov","Standup show","150,000","Kutilmoqda","orange"],
  ["#QT4318","Shahlo Mirza","Opera teatri","200,000","Bekor","red"],
  ["#QT4317","Otabek Karimov","Festival match","120,000","Tasdiqlangan","green"],
];

const upcoming = [
  ["Navruz Mega Konsert","27 mart, 2025 — Humo Arena","2 kun"],
  ["IT Summit 2025","29 mart, 2025 — IT Park","4 kun"],
  ["Standup night","Beyot, 2025 — Toshkent","12 kun"],
  ["Superliga final","5 mart, 2025 — Bunyodkor","20 kun"],
];

function Organizer() {
  const { user } = useAuth();
  return (
    <AppLayout>
      <div className="mx-auto max-w-7xl px-4 py-6 lg:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div>
            <h1 className="text-2xl font-bold">Tashkilotchi paneli</h1>
            <p className="text-sm text-muted-foreground">Tezkor ko'rinish, statistika va boshqarish</p>
          </div>
          <div className="flex gap-2">
            <button className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground flex items-center gap-1"><Plus className="h-4 w-4"/> Yangi tadbir yaratish</button>
            <button className="rounded-full border px-4 py-2 text-sm">Hisobot</button>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
          <Kpi icon={DollarSign} label="Jami sotuv" value="246,500,000" delta="+12.5%" sub="so'm"/>
          <Kpi icon={TrendingUp} label="Bu oy sotilgan" value="67,200,000" delta="+8.2%" sub="so'm"/>
          <Kpi icon={Users} label="Konversion %" value="14.7%" delta="+2.1%"/>
          <Kpi icon={Calendar} label="Faol tadbirlar" value="12" sub="ta"/>
          <Kpi icon={Users} label="Foydalanuvchi reyti" value="5,842" delta="+88"/>
        </div>

        <div className="grid lg:grid-cols-3 gap-4">
          {/* Sales chart */}
          <div className="lg:col-span-2 rounded-xl border bg-white p-4">
            <div className="flex justify-between mb-3">
              <div className="font-semibold">Sotuv analitikasi (oxirgi 6 oy)</div>
              <div className="text-xs text-muted-foreground">Oylik · Haftalik</div>
            </div>
            <FakeChart/>
          </div>

          {/* Geo */}
          <div className="rounded-xl border bg-white p-4">
            <div className="font-semibold mb-3">Geografik taqsim</div>
            <div className="relative mx-auto aspect-square max-w-[200px] rounded-full" style={{background:"conic-gradient(#FACC15 0 45%, #10B981 45% 60%, #3B82F6 60% 80%, #EF4444 80% 100%)"}}/>
            <ul className="mt-3 text-xs space-y-1">
              <Legend color="#FACC15" label="Toshkent 45%"/>
              <Legend color="#10B981" label="Samarqand 15%"/>
              <Legend color="#3B82F6" label="Buxoro 20%"/>
              <Legend color="#EF4444" label="Boshqa 20%"/>
            </ul>
          </div>

          {/* Recent orders */}
          <div className="lg:col-span-2 rounded-xl border bg-white p-4">
            <div className="flex justify-between mb-3"><div className="font-semibold">So'nggi buyurtmalar</div><button className="text-xs text-primary">Barchasini ko'rish</button></div>
            <table className="w-full text-sm">
              <thead className="text-xs text-muted-foreground"><tr><th className="text-left p-2">ID</th><th className="text-left">Mijoz</th><th className="text-left">Tadbir</th><th>Summa</th><th>Holat</th></tr></thead>
              <tbody>{orders.map(o=>(
                <tr key={o[0]} className="border-t">
                  <td className="p-2 font-mono text-xs">{o[0]}</td><td>{o[1]}</td><td>{o[2]}</td><td className="text-center">{o[3]}</td>
                  <td className="text-center"><span className={`text-xs font-medium`} style={{color:o[5]==="green"?"#10B981":o[5]==="orange"?"#F59E0B":"#EF4444"}}>{o[4]}</span></td>
                </tr>
              ))}</tbody>
            </table>
          </div>

          {/* Upcoming */}
          <div className="rounded-xl border bg-white p-4">
            <div className="font-semibold mb-3">Yaqinlashayotgan tadbirlar</div>
            <ul className="space-y-2">{upcoming.map(([t,d,when])=>(
              <li key={t} className="flex items-center gap-3 rounded-lg border p-2">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-primary/20">🎟</div>
                <div className="min-w-0 flex-1"><div className="text-sm font-semibold truncate">{t}</div><div className="text-xs text-muted-foreground">{d}</div></div>
                <span className="text-xs text-primary font-semibold">{when}</span>
              </li>
            ))}</ul>
          </div>

          {/* Ticket types */}
          <div className="rounded-xl border bg-white p-4">
            <div className="font-semibold mb-3">Bilet turlari va narxlar</div>
            <ul className="space-y-2 text-sm">
              {[["VIP","500,000","48/150 sotilgan","#FACC15"],["Premium","300,000","120/300","#3B82F6"],["Standart","150,000","225/500","#10B981"],["Sorah (3+)","100,000","60/150","#94A3B8"]].map(([n,p,s,c])=>(
                <li key={n} className="flex items-center justify-between rounded-lg border p-2">
                  <div className="flex items-center gap-2"><span className="h-3 w-3 rounded" style={{background:c}}/><div><div className="font-semibold">{n}</div><div className="text-xs text-muted-foreground">{p} so'm</div></div></div>
                  <div className="text-xs text-muted-foreground">{s}</div>
                </li>
              ))}
            </ul>
          </div>

          {/* Promo */}
          <div className="rounded-xl border bg-white p-4">
            <div className="font-semibold mb-3">Promo kampaniyalar</div>
            <PromoBar name="NAVRUZ25" used={221} of={500} status="Faol"/>
            <PromoBar name="EARLYBIRD" used={102} of={150} status="Faol"/>
            <PromoBar name="ELRUH15" used={102} of={50} status="Tugagan"/>
            <button className="mt-3 w-full rounded-lg border-2 border-dashed border-primary py-2 text-sm font-semibold text-primary">+ Yangi promo kod</button>
          </div>

          {/* Profile */}
          <div className="rounded-xl border bg-white p-4">
            <div className="font-semibold mb-3">Tashkilotchi profili</div>
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground font-bold">{user?.name.slice(0,2).toUpperCase() || "AS"}</div>
              <div>
                <div className="font-bold">{user?.name || "Aziz Sultanov"}</div>
                <div className="text-xs text-green-600">✓ Tasdiqlangan</div>
              </div>
            </div>
            <ul className="text-xs space-y-1 mt-3 text-muted-foreground">
              <li>Email: {user?.email || "info@qulayticket.uz"}</li>
              <li>Telefon: +998 90 123 45 67</li>
              <li>Reyting: ★ 4.7</li>
            </ul>
            <button className="mt-3 w-full rounded-full border py-2 text-sm font-semibold">Profilni tahrirlash</button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-4 mt-4">
          {/* Refund */}
          <div className="rounded-xl border bg-white p-4">
            <div className="font-semibold mb-3">Refund va so'rovlar</div>
            <ul className="space-y-2 text-sm">
              {[["Shahlo Mirza","Opera teatri — 200,000 so'm","red"],["Rustam Aliyev","Sara sayohati — Konsert","yellow"],["Nadira Boltabaeva","Standup — 150,000 so'm","red"]].map(([n,d,c])=>(
                <li key={n} className="flex items-center justify-between rounded-lg p-2" style={{background:c==="red"?"#fee2e2":c==="yellow"?"#fef3c7":"transparent"}}>
                  <div><div className="font-semibold">{n}</div><div className="text-xs text-muted-foreground">{d}</div></div>
                  <button className="text-xs rounded-full border bg-white px-3 py-1">Ko'rib chiqish</button>
                </li>
              ))}
            </ul>
          </div>

          {/* Venue map */}
          <div className="rounded-xl border bg-white p-4">
            <div className="font-semibold mb-3">Venue va Seat Map</div>
            <div className="relative aspect-video rounded-lg overflow-hidden grid place-items-center text-5xl" style={{background:"radial-gradient(circle, #fde047, transparent), linear-gradient(45deg, #3b82f6 25%, #10b981 25% 50%, #f59e0b 50% 75%, #ef4444 75%)"}}>🏟️</div>
            <div className="mt-2 text-xs flex flex-wrap gap-3">
              <Legend color="#3B82F6" label="Bosh (162)"/>
              <Legend color="#F59E0B" label="Sara (62)"/>
              <Legend color="#EF4444" label="Sotilgan (220)"/>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

function Kpi({icon:I,label,value,delta,sub}:{icon:any;label:string;value:string;delta?:string;sub?:string}){
  return <div className="rounded-xl border bg-white p-3">
    <div className="flex items-center justify-between"><I className="h-4 w-4 text-primary"/>{delta && <span className="text-xs text-green-600">{delta}</span>}</div>
    <div className="mt-2 text-xl font-extrabold">{value}{sub && <span className="text-xs font-normal text-muted-foreground ml-1">{sub}</span>}</div>
    <div className="text-xs text-muted-foreground">{label}</div>
  </div>;
}
function Legend({color,label}:{color:string;label:string}){return <li className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded" style={{background:color}}/>{label}</li>;}
function PromoBar({name,used,of,status}:{name:string;used:number;of:number;status:string}){
  const pct=Math.min(100,(used/of)*100);
  return <div className="mb-2"><div className="flex justify-between text-sm"><b>{name}</b><span className={`text-xs ${status==="Faol"?"text-green-600":"text-muted-foreground"}`}>{status}</span></div>
    <div className="text-xs text-muted-foreground">{used} sotilgan • {of} marta ishlatilgan</div>
    <div className="mt-1 h-2 rounded-full bg-muted overflow-hidden"><div className="h-full bg-primary" style={{width:pct+"%"}}/></div></div>;
}
function FakeChart(){return <svg viewBox="0 0 400 150" className="w-full h-32">
  <polyline fill="none" stroke="#FACC15" strokeWidth="2" points="0,120 40,90 80,100 120,70 160,80 200,50 240,60 280,30 320,45 360,20 400,35"/>
  <polyline fill="none" stroke="#0f172a" strokeWidth="2" opacity="0.6" points="0,130 40,110 80,115 120,90 160,100 200,75 240,85 280,60 320,70 360,55 400,65"/>
</svg>;}
