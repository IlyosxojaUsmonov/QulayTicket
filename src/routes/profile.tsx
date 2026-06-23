import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { useAuth } from "@/lib/auth";
import { getBookings, formatSom } from "@/lib/bookings";
import { useEffect, useMemo, useState } from "react";
import { Settings, CheckCircle2 } from "lucide-react";
import { events } from "@/lib/data";

export const Route = createFileRoute("/profile")({
  component: Profile,
});

function Profile() {
  const { user, loading, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", city: "" });

  useEffect(() => { if (!loading && !user) navigate({ to: "/auth" }); }, [loading, user, navigate]);
  useEffect(() => { if (user) setForm({ name: user.name, phone: user.phone||"", city: user.city||"Toshkent" }); }, [user]);

  const bookings = useMemo(() => user ? getBookings(user.id) : [], [user]);
  if (!user) return null;

  const active = bookings.filter(b => b.status==="active");
  const total = bookings.reduce((s,b)=>s+b.total, 0);
  const upcoming = events.slice(0,3);

  return (
    <AppLayout>
      <div className="mx-auto max-w-7xl px-4 py-6 lg:px-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Shaxsiy boshqaruv markazi</h1>
          <div className="text-xs text-muted-foreground">Oxirgi kirish: {new Date().toLocaleString("uz-UZ")}</div>
        </div>

        <div className="grid lg:grid-cols-3 gap-4">
          {/* Profile card */}
          <div className="rounded-xl border bg-white p-4">
            <div className="flex items-center gap-3">
              <div className="grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground font-bold text-lg">{user.name.slice(0,2).toUpperCase()}</div>
              <div className="min-w-0">
                <div className="font-bold truncate">{user.name}</div>
                <div className="text-xs text-muted-foreground truncate">{user.email}</div>
                <div className="text-xs text-muted-foreground">{user.phone || "+998 90 123 45 67"}</div>
              </div>
            </div>
            <div className="mt-3 space-y-1 text-sm">
              <div><b>Jinsi:</b> Erkak</div>
              <div><b>Manzil:</b> {user.city || "Toshkent"}</div>
            </div>
            <button onClick={()=>setEdit(true)} className="mt-3 w-full rounded-full bg-primary py-2 text-sm font-semibold text-primary-foreground">Profilni tahrirlash</button>
          </div>

          {/* Cashback */}
          <div className="rounded-xl border bg-white p-4">
            <div className="font-semibold text-sm">Cashback va bonuslar</div>
            <div className="mt-2 flex items-end justify-between">
              <div>
                <div className="text-xs text-muted-foreground">Joriy balans</div>
                <div className="text-2xl font-extrabold">127,500 so'm</div>
              </div>
              <div className="text-xs text-green-600">+18,000 so'm bu hafta</div>
            </div>
            <div className="mt-3 text-xs space-y-1 text-muted-foreground">
              <div>Daromad o'tgan oy: 78,000 so'm</div>
              <div>Cashback %: 5%</div>
            </div>
            <button className="mt-3 w-full rounded-full border py-2 text-sm font-semibold">Daftari ko'rinishi</button>
          </div>

          {/* Notifications */}
          <div className="rounded-xl border bg-white p-4">
            <div className="font-semibold text-sm">Bildirishnomalar</div>
            <ul className="mt-2 space-y-2 text-sm">
              <li>🎟 Tadbir eslatmasi — Navoiy konsert ertaga 19:00</li>
              <li>💰 Cashback olishingiz mumkin: 25,000 so'm</li>
              <li>🆕 Yangi tadbir e'lon qilindi: Festival Live</li>
            </ul>
          </div>

          {/* My tickets (active) */}
          <div className="rounded-xl border bg-white p-4 lg:col-span-2">
            <div className="flex items-center justify-between mb-2">
              <div className="font-semibold">Mening biletlarim (aktiv)</div>
              <Link to="/tickets" className="text-xs text-primary">{active.length} ta aktiv →</Link>
            </div>
            {active.length === 0 ? (
              <div className="text-sm text-muted-foreground py-6 text-center">Aktiv biletlar yo'q. <Link to="/events" className="text-primary">Tadbirlarni ko'rish</Link></div>
            ) : (
              <div className="space-y-2">{active.slice(0,3).map(b => (
                <div key={b.id} className="flex items-center gap-3 rounded-lg border p-3">
                  <img src={b.eventImage} className="h-14 w-14 rounded object-cover"/>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm truncate">{b.eventTitle}</div>
                    <div className="text-xs text-muted-foreground">{new Date(b.eventDate).toLocaleDateString("uz-UZ")} • {b.venue}</div>
                  </div>
                  <button className="rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground">Ko'rish</button>
                </div>
              ))}</div>
            )}
          </div>

          {/* Upcoming events */}
          <div className="rounded-xl border bg-white p-4">
            <div className="font-semibold mb-2">Kelgusi tadbirlar</div>
            <ul className="text-sm space-y-2">{upcoming.map(e => (
              <li key={e.id}><Link to="/events/$id" params={{id:e.id}} className="hover:text-primary">{e.title}</Link><div className="text-xs text-muted-foreground">{new Date(e.date).toLocaleDateString("uz-UZ")}</div></li>
            ))}</ul>
          </div>

          {/* Bought tickets */}
          <div className="rounded-xl border bg-white p-4 lg:col-span-2">
            <div className="font-semibold mb-2">Sotib olingan biletlar tarixi</div>
            <div className="overflow-x-auto"><table className="w-full text-sm">
              <thead className="text-xs text-muted-foreground"><tr><th className="text-left p-2">Tadbir</th><th>Sana</th><th>Narx</th><th>Holat</th></tr></thead>
              <tbody>{bookings.length === 0 ? <tr><td colSpan={4} className="text-center py-6 text-muted-foreground">Tarix bo'sh</td></tr> :
                bookings.map(b => (
                  <tr key={b.id} className="border-t"><td className="p-2">{b.eventTitle}</td><td className="text-center">{new Date(b.eventDate).toLocaleDateString("uz-UZ")}</td><td className="text-center">{formatSom(b.total)}</td><td className="text-center"><span className="text-green-600 text-xs flex items-center gap-1 justify-center"><CheckCircle2 className="h-3 w-3"/> Aktiv</span></td></tr>
                ))
              }</tbody>
            </table></div>
            <div className="mt-3 text-sm border-t pt-3 grid grid-cols-3 gap-3 text-center">
              <div><div className="text-xs text-muted-foreground">Sotib olindi</div><div className="font-bold text-green-600">{formatSom(total)}</div></div>
              <div><div className="text-xs text-muted-foreground">Cashback</div><div className="font-bold">{formatSom(total*0.05)}</div></div>
              <div><div className="text-xs text-muted-foreground">Daromad</div><div className="font-bold">-</div></div>
            </div>
          </div>

          {/* Saved + Settings */}
          <div className="rounded-xl border bg-white p-4">
            <div className="font-semibold mb-2">Saqlangan tadbirlar</div>
            <div className="text-center text-sm text-muted-foreground py-6">💛 Hech narsa saqlanmagan</div>
            <Link to="/events" className="block text-center text-xs text-primary">Tadbirlarni ko'rish</Link>
          </div>

          <div className="rounded-xl border bg-white p-4">
            <div className="font-semibold mb-3 flex items-center gap-2"><Settings className="h-4 w-4"/> Xavfsizlik va sozlamalar</div>
            <ul className="space-y-2 text-sm">
              <Toggle label="Email xabarlari" defaultChecked/>
              <Toggle label="SMS xabarlari" defaultChecked/>
              <Toggle label="2-faktorli kirish"/>
              <Toggle label="Yangi taklif" defaultChecked/>
            </ul>
            <button className="mt-4 text-xs text-red-600">Akkauntni o'chirish</button>
          </div>
        </div>

        {edit && (
          <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4" onClick={()=>setEdit(false)}>
            <div className="w-full max-w-md rounded-xl bg-white p-5" onClick={e=>e.stopPropagation()}>
              <h3 className="font-bold mb-3">Profilni tahrirlash</h3>
              <div className="space-y-2">
                <label className="block text-sm"><span className="text-xs text-muted-foreground">Ism</span><input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"/></label>
                <label className="block text-sm"><span className="text-xs text-muted-foreground">Telefon</span><input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"/></label>
                <label className="block text-sm"><span className="text-xs text-muted-foreground">Shahar</span><input value={form.city} onChange={e=>setForm({...form,city:e.target.value})} className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"/></label>
              </div>
              <div className="mt-4 flex gap-2 justify-end">
                <button onClick={()=>setEdit(false)} className="rounded-full border px-4 py-2 text-sm">Bekor qilish</button>
                <button onClick={()=>{updateProfile(form); setEdit(false);}} className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Saqlash</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}

function Toggle({label, defaultChecked}:{label:string;defaultChecked?:boolean}){
  const [on,setOn]=useState(!!defaultChecked);
  return <li className="flex items-center justify-between"><span>{label}</span>
    <button onClick={()=>setOn(!on)} className={`h-5 w-9 rounded-full transition ${on?"bg-primary":"bg-muted"}`}><span className={`block h-4 w-4 rounded-full bg-white transition ${on?"ml-5":"ml-0.5"} mt-0.5`}/></button>
  </li>;
}
