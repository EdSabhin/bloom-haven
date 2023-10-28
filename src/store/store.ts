import { create } from "zustand";
import { Session } from "../models/auth.model";
import { SupabaseUser } from "../models/user.model";
import { Product } from "../models/product.model";

type Store = {
  session: Session | null;
  user: SupabaseUser | null;
  products: Product[];
  setProducts: any;
  realTime: boolean;
  setRealTime: (realtime: boolean) => void;
  setSession: (session: Session | null) => void;
  setUser: (user: SupabaseUser | null) => void;
};

const useStore = create<Store>((set) => {
  // Carga los datos desde el localStorage si están disponibles
  const session: Session | null = localStorage.getItem("session") || localStorage.getItem("sb-wxnrsymkujzanksnrsdc-auth-token")
    ? JSON.parse(localStorage.getItem("session")!) ||
    JSON.parse(localStorage?.getItem("sb-wxnrsymkujzanksnrsdc-auth-token")!)
    : null;
  const user: SupabaseUser | null = localStorage.getItem("user") || localStorage.getItem("sb-wxnrsymkujzanksnrsdc-auth-token")
    ? JSON.parse(localStorage.getItem("user")!) ||  localStorage.getItem("sb-wxnrsymkujzanksnrsdc-auth-token").user
    : null;

  return {
    session: session,
    user: user,
    realTime: false,
    setRealTime: (realTime: boolean) => set(() => ({ realTime })),
    products: [],
    setProducts: (products: Product[]) => set(() => ({ products })),
    setSession: (session: Session | null) => {
      // Guarda los datos en localStorage y actualiza el estado del componente
      localStorage.setItem("session", JSON.stringify(session));
      set(() => ({ session }));
    },
    setUser: (user: SupabaseUser | null) => {
      // Guarda los datos en localStorage y actualiza el estado del componente
      localStorage.setItem("user", JSON.stringify(user));
      set(() => ({ user }));
    },
  };
});

export default useStore;
