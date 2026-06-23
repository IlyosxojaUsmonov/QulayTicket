import { createFileRoute, Link } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { useAuth } from "@/lib/auth";
import { getBookings, formatDate, formatSom, updateBooking } from "@/lib/bookings";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Download, X } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/tickets")({
  component: Tickets,
});

function Tickets() {
  const { user, loading } = useAuth();
  const nav = useNavigate();
  const [tab, setTab] = useState<"active"|"archive">("active");
  const [tick, setTick] = useState(0);

  useEffect(() => { if (!loading && !user) nav({ to: "/auth" }); }, [loading, user, nav]);
  const all = useMemo(() => user ? getBookings(user.id) : [], [user, tick]);
  if (!user) return null;

  const items = all.filter(b => tab==="active" ? b.status==="active" : b.status!=="active");

  const cancel = (id: string) => {
    updateBooking(id, { status: "refunded" });
    setTick(t=>t+1);
    toast.success("Bilet bekor qilindi");
  };

  return (
    <AppLayout>
      <div className="mx-auto max-w-5xl px-4 py-6 lg:px-6">
        <h1 className="text-2xl font-bold mb-1">Mening biletlarim</h1>
        <p className="text-sm text-muted-foreground mb-4">Aktiv va arxiv biletlaringizni ko'ring</p>

        <div className="flex gap-2 mb-4">
          <button onClick={()=>setTab("active")} className={`rounded-full px-4 py-2 text-sm font-medium ${tab==="active"?"bg-primary text-primary-foreground":"bg-white border"}`}>Aktiv ({all.filter(b=>b.status==="active").length})</button>
          <button onClick={()=>setTab("archive")} className={`rounded-full px-4 py-2 text-sm font-medium ${tab==="archive"?"bg-primary text-primary-foreground":"bg-white border"}`}>Arxiv ({all.filter(b=>b.status!=="active").length})</button>
        </div>

        {items.length === 0 ? (
          <div className="rounded-xl border bg-white p-10 text-center">
            <div className="text-5xl mb-2">🎟</div>
            <div className="font-semibold">Bu yerda biletlar yo'q</div>
            <Link to="/events" className="inline-block mt-3 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground">Tadbirlarni ko'rish</Link>
          </div>
        ) : (
          <div className="space-y-3">{items.map(b => (
            <div key={b.id} className="rounded-xl border bg-white overflow-hidden grid sm:grid-cols-[160px_1fr_180px]">
              <img src={b.eventImage} className="h-full w-full object-cover aspect-[4/3] sm:aspect-auto"/>
              <div className="p-4 min-w-0">
                <div className="text-xs text-primary font-medium">#{b.id}</div>
                <div className="font-bold mt-1">{b.eventTitle}</div>
                <div className="text-xs text-muted-foreground mt-1">📅 {formatDate(b.eventDate)} • 📍 {b.venue}</div>
                <div className="text-xs mt-2">🎟 {b.ticketType} • Joylar: {b.seats.join(", ")}</div>
                <div className="text-sm font-bold mt-1">{formatSom(b.total)}</div>
              </div>
              <div className="border-t sm:border-t-0 sm:border-l p-4 flex flex-col gap-2 items-stretch justify-center">
                <div className="grid h-24 w-24 mx-auto place-items-center rounded bg-foreground/5 text-[10px] text-muted-foreground font-mono">QR<br/>{b.id}</div>
                {b.status === "active" ? (
                  <>
                    <button className="rounded-full bg-primary py-1.5 text-xs font-semibold text-primary-foreground flex items-center justify-center gap-1"><Download className="h-3 w-3"/> Yuklab olish</button>
                    <button onClick={()=>cancel(b.id)} className="rounded-full border py-1.5 text-xs font-semibold text-red-600 flex items-center justify-center gap-1"><X className="h-3 w-3"/> Bekor qilish</button>
                  </>
                ) : (
                  <div className="text-center text-xs text-muted-foreground">{b.status==="refunded"?"Bekor qilingan":"Foydalanilgan"}</div>
                )}
              </div>
            </div>
          ))}</div>
        )}
      </div>
    </AppLayout>
  );
}
