import { createFileRoute, useSearch } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { events, categories, cities } from "@/lib/data";
import { EventCard } from "@/components/EventCard";
import { useMemo, useState } from "react";
import { LayoutGrid, List } from "lucide-react";

export const Route = createFileRoute("/events/")({
  validateSearch: (s: Record<string, unknown>) => ({
    category: (s.category as string) || "",
    city: (s.city as string) || "",
    q: (s.q as string) || "",
  }),
  component: EventsList,
});

function EventsList() {
  const initial = useSearch({ from: "/events/" });
  const [cat, setCat] = useState(initial.category);
  const [city, setCity] = useState(initial.city);
  const [price, setPrice] = useState(2000000);
  const [format, setFormat] = useState("");
  const [view, setView] = useState<"grid"|"list">("grid");
  const [sort, setSort] = useState("date");

  const filtered = useMemo(() => {
    let r = events.filter((e) =>
      (!cat || e.category === cat) &&
      (!city || e.city === city) &&
      (!format || e.format === format) &&
      e.priceFrom <= price &&
      (!initial.q || e.title.toLowerCase().includes(initial.q.toLowerCase()))
    );
    if (sort === "price") r = [...r].sort((a,b)=>a.priceFrom-b.priceFrom);
    if (sort === "rating") r = [...r].sort((a,b)=>b.rating-a.rating);
    if (sort === "date") r = [...r].sort((a,b)=>+new Date(a.date)-+new Date(b.date));
    return r;
  }, [cat, city, price, format, sort, initial.q]);

  return (
    <AppLayout>
      <div className="mx-auto max-w-7xl px-4 py-6 lg:px-6">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold">Tadbirlar katalogi</h1>
            <p className="text-sm text-muted-foreground">Jami {filtered.length} ta tadbir topildi</p>
          </div>
          <div className="flex gap-2 items-center">
            <select value={sort} onChange={(e)=>setSort(e.target.value)} className="rounded-full border px-3 py-1.5 text-sm bg-white">
              <option value="date">Sana bo'yicha</option>
              <option value="price">Narx bo'yicha</option>
              <option value="rating">Reyting bo'yicha</option>
            </select>
            <div className="flex rounded-full border bg-white">
              <button onClick={()=>setView("grid")} className={`p-2 ${view==="grid"?"bg-primary text-primary-foreground rounded-full":""}`}><LayoutGrid className="h-4 w-4"/></button>
              <button onClick={()=>setView("list")} className={`p-2 ${view==="list"?"bg-primary text-primary-foreground rounded-full":""}`}><List className="h-4 w-4"/></button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-[260px_1fr] gap-6">
          {/* Filters */}
          <aside className="rounded-xl border bg-white p-4 h-fit sticky top-20">
            <h3 className="font-bold text-sm mb-3">Filtrlar</h3>

            <FilterGroup label="Kategoriya">
              <Radio value="" current={cat} onChange={setCat} label="Barchasi"/>
              {categories.map(c => <Radio key={c.id} value={c.name} current={cat} onChange={setCat} label={c.name}/>)}
            </FilterGroup>

            <FilterGroup label="Shahar">
              <Radio value="" current={city} onChange={setCity} label="Barchasi"/>
              {cities.map(c => <Radio key={c.name} value={c.name} current={city} onChange={setCity} label={c.name}/>)}
            </FilterGroup>

            <FilterGroup label={`Narx oralig'i — ${price.toLocaleString()} so'm gacha`}>
              <input type="range" min={0} max={2000000} step={50000} value={price} onChange={(e)=>setPrice(+e.target.value)} className="w-full accent-primary"/>
            </FilterGroup>

            <FilterGroup label="Format">
              <Radio value="" current={format} onChange={setFormat} label="Barchasi"/>
              <Radio value="Oflayn" current={format} onChange={setFormat} label="Oflayn"/>
              <Radio value="Onlayn" current={format} onChange={setFormat} label="Onlayn"/>
              <Radio value="Mehmonli" current={format} onChange={setFormat} label="Mehmonli"/>
            </FilterGroup>

            <button onClick={()=>{setCat("");setCity("");setPrice(2000000);setFormat("");}} className="mt-2 w-full rounded-full bg-primary py-2 text-sm font-semibold text-primary-foreground">Filtrlarni tozalash</button>
          </aside>

          <div>
            {filtered.length === 0 ? (
              <div className="rounded-xl border bg-white p-10 text-center text-muted-foreground">Hech qanday tadbir topilmadi</div>
            ) : view === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">{filtered.map(e => <EventCard key={e.id} e={e}/>)}</div>
            ) : (
              <div className="space-y-3">{filtered.map(e => (
                <a key={e.id} href={`/events/${e.id}`} className="flex gap-4 rounded-xl border bg-white p-3 hover:shadow">
                  <img src={e.image} alt="" className="h-28 w-44 rounded-lg object-cover"/>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs text-primary font-medium">{e.category} • {e.city}</div>
                    <div className="font-semibold mt-1">{e.title}</div>
                    <div className="text-xs text-muted-foreground mt-1">{e.venue}</div>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-sm font-bold">{e.priceFrom.toLocaleString()} so'm dan</span>
                      <span className="text-xs text-primary">★ {e.rating}</span>
                    </div>
                  </div>
                </a>
              ))}</div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

function FilterGroup({ label, children }: { label: string; children: any }) {
  return (
    <div className="mb-4">
      <div className="text-xs font-semibold text-muted-foreground mb-2">{label}</div>
      <div className="space-y-1">{children}</div>
    </div>
  );
}
function Radio({ value, current, onChange, label }: { value: string; current: string; onChange: (v: string)=>void; label: string }) {
  return (
    <label className="flex items-center gap-2 text-sm cursor-pointer">
      <input type="radio" checked={current===value} onChange={()=>onChange(value)} className="accent-primary"/>
      {label}
    </label>
  );
}
