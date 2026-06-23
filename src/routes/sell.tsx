import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/sell")({
  component: SellTicket,
});

function SellTicket() {
  const nav = useNavigate();
  const [f, setF] = useState({ title: "", category: "Konsert", city: "Toshkent", venue: "", date: "", price: "", description: "" });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!f.title || !f.date) { toast.error("Maydonlarni to'ldiring"); return; }
    toast.success("Tadbir e'lon qilindi! Tashkilotchi panelida ko'rinadi");
    setTimeout(()=>nav({to:"/organizer"}), 600);
  }

  return (
    <AppLayout>
      <div className="mx-auto max-w-3xl px-4 py-6 lg:px-6">
        <h1 className="text-2xl font-bold">Bilet sotish — yangi tadbir</h1>
        <p className="text-sm text-muted-foreground">Yangi tadbiringiz haqida ma'lumot kiriting</p>

        <form onSubmit={submit} className="mt-6 space-y-4 rounded-xl border bg-white p-5">
          <Row label="Tadbir nomi"><input value={f.title} onChange={e=>setF({...f,title:e.target.value})} className="i" placeholder="Mening konsertim"/></Row>
          <div className="grid sm:grid-cols-2 gap-3">
            <Row label="Kategoriya"><select value={f.category} onChange={e=>setF({...f,category:e.target.value})} className="i">{["Konsert","Futbol","Teatr","Kino","Festival","Stand-up","Seminar","Konferensiya"].map(c=><option key={c}>{c}</option>)}</select></Row>
            <Row label="Shahar"><select value={f.city} onChange={e=>setF({...f,city:e.target.value})} className="i">{["Toshkent","Samarqand","Buxoro","Farg'ona"].map(c=><option key={c}>{c}</option>)}</select></Row>
          </div>
          <Row label="Maydon"><input value={f.venue} onChange={e=>setF({...f,venue:e.target.value})} className="i" placeholder="Humo Arena"/></Row>
          <div className="grid sm:grid-cols-2 gap-3">
            <Row label="Sana va vaqt"><input type="datetime-local" value={f.date} onChange={e=>setF({...f,date:e.target.value})} className="i"/></Row>
            <Row label="Boshlang'ich narx (so'm)"><input type="number" value={f.price} onChange={e=>setF({...f,price:e.target.value})} className="i" placeholder="150000"/></Row>
          </div>
          <Row label="Tavsif"><textarea value={f.description} onChange={e=>setF({...f,description:e.target.value})} rows={4} className="i" placeholder="Tadbir haqida ma'lumot…"/></Row>
          <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">📷 Plakat rasmini bu yerga yuklang</div>
          <button className="w-full rounded-full bg-primary py-2.5 font-semibold text-primary-foreground">E'lon qilish</button>
        </form>
      </div>
      <style>{`.i{width:100%;border:1px solid hsl(var(--border));border-radius:8px;padding:8px 12px;font-size:14px;outline:none;background:white} .i:focus{border-color:var(--primary)}`}</style>
    </AppLayout>
  );
}

function Row({label,children}:{label:string;children:any}){return <label className="block"><span className="text-xs font-medium text-muted-foreground">{label}</span><div className="mt-1">{children}</div></label>;}
