import { Link } from "@tanstack/react-router";
import type { Event } from "@/lib/data";
import { formatSom } from "@/lib/bookings";

export function EventCard({ e, compact = false }: { e: Event; compact?: boolean }) {
  return (
    <Link
      to="/events/$id"
      params={{ id: e.id }}
      className="group block overflow-hidden rounded-xl border bg-white transition hover:shadow-lg"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <img src={e.image} alt={e.title} loading="lazy" className="h-full w-full object-cover transition group-hover:scale-105" />
      </div>
      <div className="p-3">
        <div className="text-[11px] font-medium text-primary">{new Date(e.date).toLocaleDateString("uz-UZ", { day: "numeric", month: "short" })} • {e.category}</div>
        <h3 className={`mt-1 line-clamp-2 font-semibold leading-tight ${compact ? "text-sm" : "text-[15px]"}`}>{e.title}</h3>
        <div className="mt-1 text-xs text-muted-foreground">{e.venue}</div>
        <div className="mt-2 flex items-center justify-between">
          <div className="text-sm font-bold">{formatSom(e.priceFrom)}</div>
          <span className="text-primary font-semibold">Ko'rish</span>
        </div>
      </div>
    </Link>
  );
}
