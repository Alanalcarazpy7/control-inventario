//Todo se saca de la documentacion oficial de supabase y zustand
import { create } from "zustand";
import {
  BuscarUsuarios,
  EditarUsuarios,
  EliminarUsuarios,
  MostrarUsuarios,
  MostrarUsuariosTodos,
  InsertarUsuarios,
  supabase,
  InsertarAsignaciones,
  InsertarPermisos,
  MostrarModulos,
  MostrarPermisos,
  EliminarPermisos,
  DataModulosConfiguracion,
} from "../index";
//El set sirve para actualizar el estado de la aplicacion y el get para obtener el estado actual
export const useUsuariosStore = create((set, get) => ({
  //Registrar un nuevo usuario administrador
  insertarUsuarioAdmin: async (p) => {
    const { data, error } = await supabase.auth.signUp({
      email: p.correo,
      password: p.pass,
    });
    if (error) {
      return null;
    }
    //Si todo salio bien, se crea un nuevo usuario administrador
    const datauser = await InsertarUsuarios({
      idauth: data.user.id,
      fecharegistro: new Date(),
      tipouser: "superadmin",
      correo:p.correo
    });
    return datauser;
  },

  //Obtener el usuario administrador
  idusuario: 0,
  mostrarUsuarios: async () => {
    const response = await MostrarUsuarios();
    set({ idusuario: response.id });
    return response;
  },

  buscador: "",
  setBuscador: (p) => {
    set({ buscador: p });
  },
  datausuarios: [],
  usuariosItemSelect: [],
  parametros: {},

  mostrarusuariosTodos: async (p) => {
    const response = await MostrarUsuariosTodos(p);
    set({ parametros: p });
    set({ datausuarios: response });
    set({ usuariosItemSelect: response[0] });
    return response;
  },

  selectusuarios: (p) => {
    set({ usuariosItemSelect: p });
  },
  insertarusuarios: async (parametrosAuth, p, datacheckpermisos) => {
    /*trae el correo y contraseña de supabase*/
    const { data, error } = await supabase.auth.signUp({
      email: parametrosAuth.correo,
      password: parametrosAuth.pass,
    });
    if (error) return null;
    const dataNewUser = await InsertarUsuarios({
      nombres: p.nombres,
      correo: p.correo,
      nro_doc: p.nro_doc,
      telefono: p.telefono,
      direccion: p.direccion,
      fecharegistro: new Date(),
      estado: "activo",
      idauth: data.user.id,
      tipouser: p.tipouser,
      tipodoc: p.tipodoc,
    });

    await InsertarAsignaciones({
      id_empresa: p.id_empresa,
      id_usuario: dataNewUser.id,
    });
    datacheckpermisos.forEach(async (item) => {
      if (item.check) {
        let parametrospermisos = {
          id_usuario: dataNewUser.id,
          idmodulo: item.id,
        };
        await InsertarPermisos(parametrospermisos);
      }
    });
    await supabase.auth.signOut();
  },

  eliminarusuarios: async (p) => {
    await EliminarUsuarios(p);
    const { mostrarusuariosTodos } = get();
    const { parametros } = get();
    set(mostrarusuariosTodos(parametros));
  },
  editarusuarios: async (p, datacheckpermisos, idempresa) => {
    await EditarUsuarios(p);
    await EliminarPermisos({ id_usuario: p.id });
    datacheckpermisos.forEach(async (item) => {
      if (item.check) {
        let parametrospermisos = {
          id_usuario: p.id,
          idmodulo: item.id,
        };
        await InsertarPermisos(parametrospermisos);
      }
    });

    const { mostrarusuariosTodos } = get();
    set(mostrarusuariosTodos({ _id_empresa: idempresa }));
  },
  buscarusuarios: async (p) => {
    const response = await BuscarUsuarios(p);
    set({ datausuarios: response });
    return response;
  },

  datamodulos: [],
  mostrarmodulos: async () => {
    const response = await MostrarModulos();
    set({ datamodulos: response });
    return response;
  },

  datapermisos: [],
  mostrarpermisos: async (p) => {
    const response = await MostrarPermisos(p);
    set({ datapermisos: response });
    let allDocs = [];
    DataModulosConfiguracion.map((element) => {
      const statePermiso = response.some((objeto) =>
        objeto.modulos.nombre.includes(element.title)
      );
      if (statePermiso) {
        allDocs.push({ ...element, state: true });
      } else {
        allDocs.push({ ...element, state: false });
      }
    });
    DataModulosConfiguracion.splice(0, DataModulosConfiguracion.length)
    DataModulosConfiguracion.push(...allDocs)
    return response;
  },

  datapermisosEdit: [],
  mostrarpermisosEdit: async (p) => {
    const response = await MostrarPermisos(p);
    set({ datapermisosEdit: response });
    return response;
  },
}));
