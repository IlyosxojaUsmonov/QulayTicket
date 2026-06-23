import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { Home, Calendar, Ticket, User, Tag, Settings, BarChart3, Search, Bell, ShoppingCart, Heart, Menu, X, LogOut, Plus } from "lucide-react";
import { useState, type ReactNode } from "react";
import { useAuth } from "@/lib/auth";

const navItems = [
  { to: "/", label: "Bosh sahifa", icon: Home },
  { to: "/events", label: "Tadbirlar", icon: Calendar },
  { to: "/tickets", label: "Biletlarim", icon: Ticket },
  { to: "/profile", label: "Profil", icon: User },
  { to: "/sell", label: "Sotuvcha", icon: Tag },
  { to: "/organizer", label: "Tashkilotchi paneli", icon: BarChart3 },
  { to: "/settings", label: "Sozlamalar", icon: Settings },
];

export function AppLayout({ children }: { children: ReactNode }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (q.trim()) navigate({ to: "/search", search: { q } as any });
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Topbar */}
      <header className="sticky top-0 z-40 border-b bg-white">
        <div className="flex h-16 items-center gap-3 px-4 lg:px-6">
          <button className="lg:hidden" onClick={() => setOpen(true)} aria-label="Menyu">
            <Menu className="h-5 w-5" />
          </button>
          <Link to="/" className="flex shrink-0 items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground font-bold">Q</div>
            <span className="hidden sm:block text-lg font-bold">QulayTicket</span>
          </Link>
          <form onSubmit={onSearch} className="ml-2 flex-1 max-w-xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Tadbirlarni qidirish…"
                className="w-full rounded-full border bg-muted/40 pl-10 pr-4 py-2 text-sm outline-none focus:border-primary focus:bg-white"
              />
            </div>
          </form>
          <div className="hidden md:flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <button className="hover:text-foreground">UZ</button>
            <span>|</span>
            <button className="hover:text-foreground">RU</button>
            <span>|</span>
            <button className="hover:text-foreground">EN</button>
          </div>
          <Link
            to="/sell"
            className="hidden sm:inline-flex items-center gap-1 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90"
          >
            <Plus className="h-4 w-4" /> Bilet sotish
          </Link>
          <button className="relative" aria-label="Bildirishnomalar">
            <Bell className="h-5 w-5" />
          </button>
          <Link to="/tickets" aria-label="Savatcha">
            <ShoppingCart className="h-5 w-5" />
          </Link>
          <Link to="/tickets" aria-label="Saqlanganlar" className="hidden sm:inline">
            <Heart className="h-5 w-5" />
          </Link>
          {user ? (
            <Link to="/profile" className="flex items-center gap-2 rounded-full bg-muted px-2 py-1 hover:bg-muted/70">
              <div className="grid h-7 w-7 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                {user.name.slice(0, 2).toUpperCase()}
              </div>
              <span className="hidden md:inline text-sm font-medium">{user.name}</span>
            </Link>
          ) : (
            <Link to="/auth" className="rounded-full border px-3 py-1.5 text-sm font-medium hover:bg-muted">
              Kirish
            </Link>
          )}
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed lg:sticky top-16 z-30 h-[calc(100vh-4rem)] w-64 shrink-0 border-r bg-white transition-transform ${
            open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <div className="flex h-full flex-col p-3">
            <div className="flex items-center justify-between lg:hidden mb-2">
              <span className="font-semibold">Menyu</span>
              <button onClick={() => setOpen(false)} aria-label="Yopish">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex-1 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.to || (item.to !== "/" && pathname.startsWith(item.to));
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                      active ? "bg-primary/15 text-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <div className="rounded-xl bg-primary/10 p-3 text-xs">
              <div className="font-semibold text-foreground mb-1">Yangi tadbir!</div>
              <p className="text-muted-foreground">Humo Arena'da katta konsert — biletlar sotuvda</p>
            </div>
            {user && (
              <button
                onClick={logout}
                className="mt-2 flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4" /> Chiqish
              </button>
            )}
          </div>
        </aside>

        {open && <div className="fixed inset-0 z-20 bg-black/30 lg:hidden" onClick={() => setOpen(false)} />}

        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
