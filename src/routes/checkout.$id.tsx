import { createFileRoute, useNavigate, useParams } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { events } from "@/lib/data";
import { addBooking, formatSom } from "@/lib/bookings";
import { useAuth } from "@/lib/auth";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Check, Clock } from "lucide-react";

export const Route = createFileRoute("/checkout/$id")({
  component: Checkout,
});

const SECTORS = [
  { name: "VIP A", color: "#FACC15", row: 1, count: 3 },
  { name: "Premium", color: "#3B82F6", row: 2, count: 4 },
  { name: "Standart", color: "#10B981", row: 3, count: 5 },
  { name: "Ekonom", color: "#EF4444", row: 4, count: 6 },
];

function Checkout() {
  const { id } = useParams({ from: "/checkout/$id" });
  const e = events.find((x) => x.id === id)!;
  const navigate = useNavigate();
  const { user } = useAuth();

  const [step, setStep] = useState<1|2|3|4>(1);
  const [selectedType, setSelectedType] = useState(e.ticketTypes[0]);
  const [seats, setSeats] = useState<string[]>([]);
  const [info, setInfo] = useState({ name: user?.name || "", surname: "", phone: "+998 ", email: user?.email || "" });
  const [pay, setPay] = useState<"card"|"payme"|"click">("card");
  const [promo, setPromo] = useState(""); const [discount, setDiscount] = useState(0);

  const total = useMemo(() => Math.max(0, seats.length * selectedType.price * (1 - discount)), [seats, selectedType, discount]);
  const service = 15000;

  const toggleSeat = (s: string) => setSeats((p) => p.includes(s) ? p.filter(x=>x!==s) : [...p, s]);

  const applyPromo = () => {
    if (promo.toLowerCase() === "qulay20") { setDiscount(0.2); toast.success("20% chegirma qo'llandi"); }
    else { setDiscount(0); toast.error("Noto'g'ri promo kod"); }
  };

  const confirm = () => {
    if (!user) { navigate({ to: "/auth" }); return; }
    if (seats.length === 0) { toast.error("Joy tanlang"); return; }
    const b = addBooking({
      eventId: e.id, eventTitle: e.title, eventImage: e.image, eventDate: e.date, venue: e.venue,
      ticketType: selectedType.name, seats, qty: seats.length, total: total + service,
      status: "active", userId: user.id,
    });
    toast.success("Bilet sotib olindi: " + b.id);
    navigate({ to: "/tickets" });
  };

  return (
    <AppLayout>
      <div className="mx-auto max-w-7xl px-4 py-6 lg:px-6">
        <h1 className="text-2xl font-bold">Joy tanlash va checkout</h1>
        <div className="text-xs text-muted-foreground">Bosh sahifa / Konsert / Joy tanlash va to'lov</div>

        {/* Stepper */}
        <ol className="mt-4 flex flex-wrap items-center gap-2 text-sm">
          {["Joy tanlash","Ma'lumotlar","To'lov","Tasdiqlash"].map((s,i)=>{
            const n = i+1;
            return (
              <li key={s} className={`flex items-center gap-2 rounded-full px-3 py-1.5 ${step>=n?"bg-primary text-primary-foreground":"bg-muted text-muted-foreground"}`}>
                <span className="grid h-5 w-5 place-items-center rounded-full bg-white/80 text-foreground text-xs font-bold">{step>n?<Check className="h-3 w-3"/>:n}</span>
                {s}
              </li>
            );
          })}
          <li className="ml-auto flex items-center gap-1 text-xs text-orange-600"><Clock className="h-3 w-3"/> 05:47 vaqtingiz qoldi</li>
        </ol>

        <div className="mt-6 grid lg:grid-cols-[1fr_360px] gap-6">
          <div className="space-y-4 min-w-0">
            {step === 1 && (
              <section className="rounded-xl border bg-white p-4">
                <h2 className="font-bold mb-3">{e.venue} — Sektor xaritasi</h2>
                <div className="mx-auto rounded-full bg-foreground/90 text-white text-center py-2 max-w-md font-semibold">SAHNA</div>
                <div className="mt-6 space-y-3">
                  {SECTORS.map(s => (
                    <div key={s.name}>
                      <div className="text-xs font-medium mb-1">{s.name}</div>
                      <div className="flex flex-wrap gap-2">
                        {Array.from({length:s.count}).map((_,i) => {
                          const id = `${s.name}-${i+1}`;
                          const active = seats.includes(id);
                          return (
                            <button key={id} onClick={()=>{setSelectedType(e.ticketTypes.find(t=>t.name.includes(s.name.split(" ")[0])) || e.ticketTypes[0]); toggleSeat(id);}}
                              className={`h-10 w-16 rounded-md text-xs font-bold transition ${active?"ring-2 ring-foreground":""}`}
                              style={{background: s.color, color:"#0f172a"}}>
                              {id}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex flex-wrap gap-3 text-xs">
                  {e.ticketTypes.map(t => (
                    <div key={t.id} className="flex items-center gap-1"><span className="h-3 w-3 rounded" style={{background:t.color}}/> {t.name} ({formatSom(t.price)})</div>
                  ))}
                </div>
                <div className="mt-6 flex justify-end">
                  <button disabled={seats.length===0} onClick={()=>setStep(2)} className="rounded-full bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-50">Davom etish</button>
                </div>
              </section>
            )}

            {step === 2 && (
              <section className="rounded-xl border bg-white p-4 space-y-3">
                <h2 className="font-bold">Kontakt ma'lumotlari</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  <Field label="Ism" value={info.name} onChange={v=>setInfo({...info,name:v})}/>
                  <Field label="Familya" value={info.surname} onChange={v=>setInfo({...info,surname:v})}/>
                  <Field label="Telefon raqam" value={info.phone} onChange={v=>setInfo({...info,phone:v})}/>
                  <Field label="Email" value={info.email} onChange={v=>setInfo({...info,email:v})}/>
                </div>
                <div className="flex justify-between">
                  <button onClick={()=>setStep(1)} className="rounded-full border px-5 py-2 text-sm">Orqaga</button>
                  <button onClick={()=>setStep(3)} className="rounded-full bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground">Davom etish</button>
                </div>
              </section>
            )}

            {step === 3 && (
              <section className="rounded-xl border bg-white p-4 space-y-3">
                <h2 className="font-bold">To'lov usuli</h2>
                {[
                  {k:"card",l:"Karta orqali (Visa/MasterCard)"},
                  {k:"payme",l:"Payme"},
                  {k:"click",l:"Click"},
                ].map(o => (
                  <label key={o.k} className={`flex items-center gap-3 rounded-lg border p-3 cursor-pointer ${pay===o.k?"border-primary bg-primary/5":""}`}>
                    <input type="radio" checked={pay===o.k} onChange={()=>setPay(o.k as any)} className="accent-primary"/>{o.l}
                  </label>
                ))}
                <div className="flex justify-between">
                  <button onClick={()=>setStep(2)} className="rounded-full border px-5 py-2 text-sm">Orqaga</button>
                  <button onClick={()=>setStep(4)} className="rounded-full bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground">Davom etish</button>
                </div>
              </section>
            )}

            {step === 4 && (
              <section className="rounded-xl border bg-white p-4 space-y-3">
                <h2 className="font-bold">Tasdiqlash</h2>
                <div className="text-sm text-muted-foreground">Buyurtmangizni tekshiring va to'lovni amalga oshiring.</div>
                <ul className="text-sm space-y-1">
                  <li><b>Tadbir:</b> {e.title}</li>
                  <li><b>Joylar:</b> {seats.join(", ")}</li>
                  <li><b>Mijoz:</b> {info.name} {info.surname} • {info.phone}</li>
                  <li><b>To'lov:</b> {pay.toUpperCase()}</li>
                </ul>
                <div className="rounded-lg bg-green-50 text-green-700 text-xs p-2">✔ SSL-256-bit shifrlash bilan himoyalangan to'lov</div>
                <div className="flex justify-between">
                  <button onClick={()=>setStep(3)} className="rounded-full border px-5 py-2 text-sm">Orqaga</button>
                  <button onClick={confirm} className="rounded-full bg-primary px-6 py-2 text-sm font-bold text-primary-foreground">To'lovni tasdiqlash — {formatSom(total+service)}</button>
                </div>
              </section>
            )}
          </div>

          {/* Summary */}
          <aside className="rounded-xl border bg-white p-4 h-fit sticky top-20">
            <h3 className="font-bold mb-3">Buyurtma xulosasi</h3>
            <div className="flex gap-3">
              <img src={e.image} className="h-16 w-20 rounded object-cover"/>
              <div className="text-sm">
                <div className="font-semibold">{e.title}</div>
                <div className="text-xs text-muted-foreground">{e.venue}</div>
              </div>
            </div>
            <div className="mt-4 space-y-2 text-sm">
              <Row k={`${selectedType.name} × ${seats.length||0}`} v={formatSom(selectedType.price*seats.length)}/>
              <Row k="Servis to'lovi" v={formatSom(service)}/>
              {discount>0 && <Row k={`Chegirma (${discount*100}%)`} v={"-"+formatSom(selectedType.price*seats.length*discount)}/>}
              <div className="border-t pt-2 flex justify-between font-bold text-base"><span>Jami</span><span>{formatSom(total+service)}</span></div>
            </div>

            <div className="mt-4">
              <div className="text-xs font-semibold text-muted-foreground mb-1">Promo kod</div>
              <div className="flex gap-2">
                <input value={promo} onChange={(e)=>setPromo(e.target.value)} placeholder="QULAY20" className="flex-1 rounded-lg border px-3 py-2 text-sm"/>
                <button onClick={applyPromo} className="rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground">Qo'llash</button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </AppLayout>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string)=>void }) {
  return (
    <label className="block"><span className="text-xs font-medium text-muted-foreground">{label}</span>
      <input value={value} onChange={(e)=>onChange(e.target.value)} className="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-primary"/>
    </label>
  );
}
function Row({k,v}:{k:string;v:string}){return <div className="flex justify-between"><span className="text-muted-foreground">{k}</span><span>{v}</span></div>;}
