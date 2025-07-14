import { useQuery } from "@tanstack/react-query";
import {
  BloqueoPagina,
  CategoriasTemplate,
  SpinnerLoader,
  useCategoriasStore,
  useEmpresaStore,
  useUsuariosStore,
} from "../index";

export function Categorias() {
  const { mostrarcategorias, buscarcategorias, buscador, datacategorias } =
    useCategoriasStore();

  const { dataEmpresa, dataMarca } = useEmpresaStore();

  const { data, isLoading, error } = useQuery({
    queryKey: ["mostrar categorias", { id_empresa: dataEmpresa?.id }],

    queryFn: () => mostrarcategorias({ id_empresa: dataEmpresa?.id }),
    enabled: dataEmpresa?.id != null,
  });

  const { data: buscardata } = useQuery({
    queryKey: [
      "buscar categorias",
      { id_empresa: dataEmpresa?.id, descripcion: buscador },
    ],
    queryFn: () =>
      buscarcategorias({
        id_empresa: dataEmpresa?.id,
        descripcion: buscador,
      }),
    enabled: dataEmpresa?.id != null,
  });

  const { datapermisos } = useUsuariosStore();
  const statePermiso = datapermisos?.some((objeto) =>
    objeto.modulos.nombre.includes("Categoria de productos")
  );
  console.log(datapermisos);
  if (isLoading || datapermisos.length === 0){
    return <SpinnerLoader />;
  }

  if (statePermiso == false) {
    return <BloqueoPagina />;
  }

  if (error) {
    return <span>Error...</span>;
  }

  return <CategoriasTemplate data={datacategorias} />;
}
