import { createFileRoute, useSearch } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { events } from "@/lib/data";
import { EventCard } from "@/components/EventCard";

export const Route = createFileRoute("/search")({
  validateSearch: (s: Record<string, unknown>) => ({ q: (s.q as string) || "" }),
  component: SearchPage,
});

function SearchPage() {
  const { q } = useSearch({ from: "/search" });
  const results = events.filter(e =>
    !q || e.title.toLowerCase().includes(q.toLowerCase()) ||
    e.venue.toLowerCase().includes(q.toLowerCase()) ||
    e.category.toLowerCase().includes(q.toLowerCase())
  );
  return (
    <AppLayout>
      <div className="mx-auto max-w-7xl px-4 py-6 lg:px-6">
        <h1 className="text-2xl font-bold">Qidiruv natijalari</h1>
        <p className="text-sm text-muted-foreground mb-4">"{q}" so'rovi bo'yicha {results.length} ta natija</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {results.map(e => <EventCard key={e.id} e={e}/>)}
        </div>
      </div>
    </AppLayout>
  );
}
