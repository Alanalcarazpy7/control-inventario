//Todo se saca de la documentacion oficial de supabase y zustand
import { create } from 'zustand';
import { MostrarEmpresa, ContarUsuariosXEmpresa } from "../index";
//El set sirve para actualizar el estado de la aplicacion y el get para obtener el estado actual
export const useEmpresaStore = create((set, get) => ({
  //mostrarEmpresa
  contadorusuarios:0,
  dataEmpresa: [],
  mostrarEmpresa: async (p) => {
    const response = await MostrarEmpresa(p);
    set({ dataEmpresa: response.empresa});
    return response.empresa;
  },

  contarusuariosXempresa: async (p) => {
    const response = await ContarUsuariosXEmpresa(p);
    set({ contadorusuarios: response});
      return response;
  }
}));