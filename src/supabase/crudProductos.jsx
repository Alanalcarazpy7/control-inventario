import { supabase } from "../index";
import Swal from "sweetalert2";
export const InsertarProductos = async (p) => {
  const { error } = await supabase.rpc("insertarproductos", p);

  if (error) {
    //usamos SweetAlert2 para mostrar un mensaje de error ya predefinido si ocurre un error al insertar el usuario
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });
  }
};

export async function MostrarProductos(p) {
  const { data } = await supabase.rpc("mostrarproductos", p);
  return data;
}

export async function EliminarProductos(p) {
  const { error } = await supabase.from("productos").delete().eq("id", p.id);
  if (error) {
    alert("Error al Eliminar una categoria", error.message);
  }
}

export async function EditarProductos(p) {
  const { error } = await supabase.from("productos").update(p).eq("id", p.id);
  if (error) {
    alert("Error al editar una categoria", error.message);
  }
}

export async function BuscarProductos(p) {
  const { data } = await supabase.rpc("buscarproductos",p);
  return data;
}

//REPORTES
export async function ReportStockProductosTodos(p) {
  const { data, error } = await supabase.from("productos").select().eq("id_empresa", p.id_empresa);
  if (error) {
    return;
  }
  return data;
}

export async function ReportStockPorProductos(p) {
  const { data, error } = await supabase
    .from("productos")
    .select()
    .eq("id_empresa", p.id_empresa)
    .eq("id",p.id_producto);
  if (error) {
    return;
  }
  return data;
}


export async function ReportStockBajoMinimo(p) {
  const { data, error } = await supabase.rpc("reportproductosbajominimo", p);
  if (error) {
    return;
  }
  return data;
}

export async function ReportKardexEntradaSalida(p) {
  const { data, error } = await supabase.rpc("reportekardexproducto", p);
  if (error) {
    return;
  }
  return data;
}

export async function ReportInventarioValorado(p) {
  const { data, error } = await supabase.rpc("inventariovalorado", p);
  if (error) {
    return;
  }
  return data;
}