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
  const session: Session | null = typeof window !== 'undefined' && localStorage.getItem("session")
    ? JSON.parse(localStorage.getItem("session")!)
    : null;
  const user: SupabaseUser | null = typeof window !== 'undefined' && localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : null;

  return {
    session: session,
    user: user,
    realTime: false,
    setRealTime: (realTime: boolean) => set(() => ({ realTime })),
    products: [],
    setProducts: (products: Product[]) => set(() => ({ products })),
    setSession: (session: Session | null) => {
      if (typeof window !== 'undefined') {
        // Guarda los datos en localStorage y actualiza el estado del componente
        localStorage.setItem("session", JSON.stringify(session));
      }
      set(() => ({ session }));
    },
    setUser: (user: SupabaseUser | null) => {
      if (typeof window !== 'undefined') {
        // Guarda los datos en localStorage y actualiza el estado del componente
        localStorage.setItem("user", JSON.stringify(user));
      }
      set(() => ({ user }));
    },
  };
});

export default useStore;