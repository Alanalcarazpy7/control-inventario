import { supabase, ObtenerIdAuthSupabase } from "../index";
import Swal from "sweetalert2";
export const InsertarUsuarios = async (p) => {
  const { data, error } = await supabase
    .from("usuarios")
    .insert(p)
    .select()
    .maybeSingle(); //hace que se devuelva como resultado un objeto o null si no se encuentra el usuario
  if (error) {
    //usamos SweetAlert2 para mostrar un mensaje de error ya predefinido si ocurre un error al insertar el usuario
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Error al insertar usuario: " + error.message,
    });
  }
  if (data) {
    return data;
  }
};

export const MostrarUsuarios = async () => {
  const idUser = await ObtenerIdAuthSupabase();
  const { data } = await supabase
    .from("usuarios")
    .select()
    .eq("idauth", idUser)
    .maybeSingle();
  if (data) {
    return data;
  }
};

export const MostrarUsuariosTodos = async(p)=> {
  const { data } = await supabase.rpc("mostrarpersonal", p);
  if (data) {
    return data;
  }
}

export async function EliminarUsuarios(p) {
  const { error } = await supabase.from("usuarios").delete().eq("id", p.id);
  if (error) {
    alert("Error al Eliminar una Personal", error.message);
  }
}

export async function EditarUsuarios(p) {
  const { error } = await supabase.from("usuarios").update(p).eq("id", p.id);
  if (error) {
    alert("Error al editar Personal", error.message);
  }
}

export async function BuscarUsuarios(p) {
  const { data } = await supabase.rpc("buscarpersonal",p);
  return data;
}

export const InsertarAsignaciones = async (p) => {
  const { error } = await supabase
    .from("asignarempresa")
    .insert(p)
    .select()
    .maybeSingle();
  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Error al insertar usuario: " + error.message,
    });
  }
};


export const InsertarPermisos = async (p) => {
  const { error } = await supabase
    .from("permisos")
    .insert(p)
    .maybeSingle();
  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Error al insertar usuario: " + error.message,
    });
  }
};

export const MostrarPermisos = async (p) => {
  const { data } = await supabase
    .from("permisos")
    .select(`id,id_usuario,idmodulo,modulos(nombre)`)
    .eq("id_usuario",p.id_usuario)
  return data
};

export async function EliminarPermisos(p) {
  const { error } = await supabase.from("permisos").delete().eq("id_usuario", p.id_usuario);
  if (error) {
    alert("Error al Eliminar un Usuario", error.message);
  }
}

export const MostrarModulos = async (p) => {
  const { data } = await supabase
    .from("modulos")
    .select()
  return data;
};