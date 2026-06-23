import { createFileRoute, useNavigate, useSearch } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";
import { Ticket } from "lucide-react";

export const Route = createFileRoute("/auth")({
  validateSearch: (s: Record<string, unknown>) => ({ redirect: (s.redirect as string) || "/" }),
  component: AuthPage,
});

function AuthPage() {
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const search = useSearch({ from: "/auth" });
  const [mode, setMode] = useState<"login" | "register">("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.email || !form.password) return toast.error("Email va parol kiriting");
    setLoading(true);
    try {
      if (mode === "login") await login(form.email, form.password);
      else await register(form.name || form.email.split("@")[0], form.email, form.password);
      toast.success("Xush kelibsiz!");
      navigate({ to: search.redirect as any });
    } catch (e: any) {
      toast.error(e.message || "Xatolik");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      <div className="relative hidden md:block">
        <img src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1400&q=70" className="absolute inset-0 h-full w-full object-cover" alt=""/>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/60 to-black/70"/>
        <div className="relative z-10 flex h-full flex-col justify-between p-10 text-white">
          <div className="flex items-center gap-2 font-bold text-xl">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-primary-foreground">Q</div>
            QulayTicket
          </div>
          <div>
            <h2 className="text-3xl font-extrabold leading-tight">O'zbekistondagi eng yaxshi tadbirlarga bir bosishda kiring</h2>
            <p className="mt-3 text-white/85">Konsert, sport, teatr — barchasi bir joyda. Tez, qulay va ishonchli.</p>
          </div>
          <div className="text-xs text-white/70">© 2025 QulayTicket</div>
        </div>
      </div>

      <div className="flex items-center justify-center p-6 bg-[#FAFAFA]">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 border shadow-sm">
          <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary text-primary-foreground mb-4">
            <Ticket className="h-6 w-6"/>
          </div>
          <h1 className="text-2xl font-bold">{mode === "login" ? "Xush kelibsiz" : "Ro'yxatdan o'tish"}</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {mode === "login" ? "Akkauntingizga kiring" : "Yangi akkaunt yarating"} (demo — istalgan email/parol)
          </p>

          <form onSubmit={submit} className="mt-6 space-y-3">
            {mode === "register" && (
              <Field label="Ism" value={form.name} onChange={(v)=>setForm({...form, name:v})} placeholder="Ismingiz"/>
            )}
            <Field label="Email" type="email" value={form.email} onChange={(v)=>setForm({...form, email:v})} placeholder="email@example.com"/>
            <Field label="Parol" type="password" value={form.password} onChange={(v)=>setForm({...form, password:v})} placeholder="••••••••"/>

            <button disabled={loading} className="w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-50">
              {loading ? "Yuklanmoqda…" : mode === "login" ? "Kirish" : "Ro'yxatdan o'tish"}
            </button>
          </form>

          <div className="mt-4 text-center text-sm text-muted-foreground">
            {mode === "login" ? "Akkauntingiz yo'qmi?" : "Akkauntingiz bormi?"}{" "}
            <button onClick={()=>setMode(mode==="login"?"register":"login")} className="text-primary font-semibold hover:underline">
              {mode === "login" ? "Ro'yxatdan o'tish" : "Kirish"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type="text", placeholder }: { label:string; value:string; onChange:(v:string)=>void; type?:string; placeholder?:string }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e)=>onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-primary"
      />
    </label>
  );
}
