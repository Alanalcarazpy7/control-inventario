import { useQuery } from "@tanstack/react-query";
import {
  BloqueoPagina,
  ProductosTemplate,
  SpinnerLoader,
  useCategoriasStore,
  useEmpresaStore,
  useMarcaStore,
  useProductosStore,
  useUsuariosStore,
} from "../index";

export function Productos() {
  const { mostrarproductos, buscarproductos, buscador, dataproductos } = useProductosStore();
  const { mostrarMarca } = useMarcaStore()
  const { mostrarcategorias} =useCategoriasStore();
  const { dataEmpresa } = useEmpresaStore();

  const { data: buscardata } = useQuery({
    queryKey: [
      "buscar productos ",
      { _id_empresa: dataEmpresa?.id, buscador: buscador },
    ],
    queryFn: () =>
      buscarproductos({
        _id_empresa: dataEmpresa?.id,
        buscador: buscador,
      }),
    enabled: dataEmpresa?.id != null,
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ["mostrar productos", { _id_empresa: dataEmpresa?.id }],

    queryFn: () => mostrarproductos({ _id_empresa: dataEmpresa?.id }),
    enabled: dataEmpresa?.id != null,
  });
  

  

  const { data:datamarcas } = useQuery({
    queryKey: ["mostrar marca", { id_empresa: dataEmpresa?.id }],

    queryFn: () => mostrarMarca({ id_empresa: dataEmpresa?.id }),
    enabled: dataEmpresa?.id != null,
  });

  const { data:datacategoria } = useQuery({
    queryKey: ["mostrar categorias", { id_empresa: dataEmpresa?.id }],

    queryFn: () => mostrarcategorias({ id_empresa: dataEmpresa?.id }),
    enabled: dataEmpresa?.id != null,
  });

  const { datapermisos } = useUsuariosStore();
  const statePermiso = datapermisos?.some((objeto) =>
    objeto.modulos.nombre.includes("Productos")
  );

  if (isLoading || datapermisos.length === 0) {
    return <SpinnerLoader />;
  }

  if (statePermiso == false) {
    return <BloqueoPagina />;
  }

  
  if (error) {
    return <span>Error...</span>;
    
  }
  
  return <ProductosTemplate data={dataproductos} />;
}
