import { supabase, ObtenerIdAuthSupabase } from "../index";


export const MostrarEmpresa = async (p) => {
  const { data, error } = await supabase
    /*asi se hace un inner join entre la tabla asignar empresa y empresa para identificar que usuario esta en una empresa determinada*/
    .from("asignarempresa")
    .select(`empresa (id,nombre,simbolomoneda)`)
    .eq("id_usuario", p.idUsuario)
    .maybeSingle();
  if (data) {
    return data;
  }
};

export const ContarUsuariosXEmpresa = async (p) => {
  // Llamada a la función RPC para contar usuarios por empresa
  const { data, error } = await supabase.rpc('contar_usuarios_por_empresa', {
    idempresa:p.id_empresa,
  });
  if (data) {
    return data;
  }
}