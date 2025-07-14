import { supabase } from "../index";
import Swal from "sweetalert2";
export const InsertarCategorias = async (p) => {
  const { error } = await supabase.rpc("insertarcategorias", p);

  if (error) {
    //usamos SweetAlert2 para mostrar un mensaje de error ya predefinido si ocurre un error al insertar el usuario
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });
  }
};

export async function MostrarCategorias(p) {
  const { data } = await supabase
    .from("categorias")
    .select()
    .eq("id_empresa", p.id_empresa)
    .order("id", { ascending: true });
  return data;
}

export async function EliminarCategorias(p) {
  const { error } = await supabase.from("categorias").delete().eq("id", p.id);
  if (error) {
    alert("Error al Eliminar una categoria", error.message);
  }
}

export async function EditarCategorias(p) {
  const { error } = await supabase.from("categorias").update(p).eq("id", p.id);
  if (error) {
    alert("Error al editar una categoria", error.message);
  }
}

export async function BuscarCategorias(p) {
  const { data } = await supabase
    .from("categorias")
    .select()
    .eq("id_empresa", p.id_empresa)
    .ilike("descripcion", "%" + p.descripcion + "%");
  return data;
}
