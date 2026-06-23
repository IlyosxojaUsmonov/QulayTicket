import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type User = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  city?: string;
  avatar?: string;
  role: "user" | "organizer";
  createdAt: string;
};

type AuthCtx = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (name: string, email: string, password: string) => Promise<User>;
  logout: () => void;
  updateProfile: (patch: Partial<User>) => void;
};

const Ctx = createContext<AuthCtx | null>(null);
const KEY = "qt_user";
const USERS_KEY = "qt_users";

function readUsers(): Record<string, { user: User; password: string }> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "{}");
  } catch {
    return {};
  }
}
function writeUsers(u: Record<string, { user: User; password: string }>) {
  localStorage.setItem(USERS_KEY, JSON.stringify(u));
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {}
    setLoading(false);
  }, []);

  const persist = (u: User | null) => {
    setUser(u);
    if (u) localStorage.setItem(KEY, JSON.stringify(u));
    else localStorage.removeItem(KEY);
  };

  const login: AuthCtx["login"] = async (email, password) => {
    const users = readUsers();
    const rec = users[email.toLowerCase()];
    let u: User;
    if (rec) {
      // demo: accept any password for existing OR match
      u = rec.user;
    } else {
      // demo: auto create
      u = {
        id: crypto.randomUUID(),
        name: email.split("@")[0],
        email,
        role: "user",
        createdAt: new Date().toISOString(),
      };
      users[email.toLowerCase()] = { user: u, password };
      writeUsers(users);
    }
    persist(u);
    return u;
  };

  const register: AuthCtx["register"] = async (name, email, password) => {
    const users = readUsers();
    const u: User = {
      id: crypto.randomUUID(),
      name,
      email,
      role: "user",
      createdAt: new Date().toISOString(),
    };
    users[email.toLowerCase()] = { user: u, password };
    writeUsers(users);
    persist(u);
    return u;
  };

  const logout = () => persist(null);

  const updateProfile = (patch: Partial<User>) => {
    if (!user) return;
    const next = { ...user, ...patch };
    const users = readUsers();
    const rec = users[user.email.toLowerCase()];
    if (rec) {
      users[user.email.toLowerCase()] = { ...rec, user: next };
      writeUsers(users);
    }
    persist(next);
  };

  return (
    <Ctx.Provider value={{ user, loading, login, register, logout, updateProfile }}>
      {children}
    </Ctx.Provider>
  );
}

export function useAuth() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useAuth outside AuthProvider");
  return c;
}
