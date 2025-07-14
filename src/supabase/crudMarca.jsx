import { supabase } from "../index";
import Swal from "sweetalert2";
export const InsertarMarca = async (p) => {
  const { error } = await supabase.rpc("insertarmarca", p);

  if (error) {
    //usamos SweetAlert2 para mostrar un mensaje de error ya predefinido si ocurre un error al insertar el usuario
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });
  }
};

export async function MostrarMarca(p) {
  const { data } = await supabase
    .from("marca")
    .select()
    .eq("id_empresa", p.id_empresa)
    .order("id", { ascending: true });
  return data;
}

export async function EliminarMarca(p) {
  const { error } = await supabase
    .from("marca")
    .delete()
    .eq("id", p.id);
  if (error) {
    alert("Error al Eliminar una marca", error.message);
  }
}

export async function EditarMarca(p) {
  const { error } = await supabase
    .from("marca")
    .update(p)
    .eq("id", p.id);
  if (error) {
    alert("Error al editar marca", error.message);
  }
}

export async function BuscarMarca(p) {
  const { data } = await supabase
    .from("marca")
    .select()
    .eq("id_empresa", p.id_empresa)
    .ilike("descripcion","%"+p.descripcion+"%");
  return data
}
