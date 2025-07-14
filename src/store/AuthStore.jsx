//Zustand sirve para manejar el estado global de la aplicacion como Redux pero es mas sencillo y ligero
//login con supabase y manejamos el estado de autenticacion con zustand
//Todo se saca de la documentacion oficial de supabase y zustand
import { create } from 'zustand';
import { supabase } from "../index";
//El set sirve para actualizar el estado de la aplicacion y el get para obtener el estado actual
export const useAuthStore = create((set, get) => ({
  //iniciar sesion con supabase
  signInWithEmail: async (p) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: p.correo,
      password: p.pass,
    });
    if (error) {
      console.error('Error al iniciar sesión:', error);
      return null;
    }
    return data.user; // Devuelve el usuario autenticado
  },

  //cerrar cuenta con supabase
  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new Error('A ocurrido un error al cerrar sesión'+error);
    }
  },
}));