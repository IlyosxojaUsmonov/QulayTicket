import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";

export const Route = createFileRoute("/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const { user, logout } = useAuth();
  return (
    <AppLayout>
      <div className="mx-auto max-w-3xl px-4 py-6 lg:px-6 space-y-4">
        <h1 className="text-2xl font-bold">Sozlamalar</h1>

        <Card title="Akkaunt">
          <div className="text-sm space-y-1">
            <div><b>Email:</b> {user?.email}</div>
            <div><b>Ism:</b> {user?.name}</div>
            <div><b>Ro'l:</b> {user?.role}</div>
          </div>
        </Card>

        <Card title="Bildirishnomalar">
          {["Email orqali yangi tadbirlar","SMS eslatmalar","Push notifications","Marketing xabarlari"].map(l=>(
            <label key={l} className="flex items-center justify-between py-2 text-sm border-b last:border-0">
              <span>{l}</span><input type="checkbox" defaultChecked className="accent-primary h-4 w-4"/>
            </label>
          ))}
        </Card>

        <Card title="Til va valyuta">
          <div className="grid sm:grid-cols-2 gap-3">
            <select className="rounded-lg border px-3 py-2 text-sm"><option>O'zbek</option><option>Русский</option><option>English</option></select>
            <select className="rounded-lg border px-3 py-2 text-sm"><option>UZS - So'm</option><option>USD - Dollar</option></select>
          </div>
        </Card>

        <Card title="Xavfsizlik">
          <button onClick={()=>toast.info("Demo: parolni o'zgartirish")} className="text-sm rounded-full border px-4 py-2 mr-2">Parolni o'zgartirish</button>
          <button onClick={()=>{logout(); toast.success("Chiqildi");}} className="text-sm rounded-full bg-red-50 text-red-600 px-4 py-2">Akkauntdan chiqish</button>
        </Card>
      </div>
    </AppLayout>
  );
}

function Card({title,children}:{title:string;children:any}){return <section className="rounded-xl border bg-white p-4"><h2 className="font-bold mb-3">{title}</h2>{children}</section>;}
