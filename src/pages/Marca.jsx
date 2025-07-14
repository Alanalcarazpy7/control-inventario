import { useQuery } from "@tanstack/react-query";
import {
  BloqueoPagina,
  MarcaTemplate,
  SpinnerLoader,
  useEmpresaStore,
  useMarcaStore,
  useUsuariosStore,
} from "../index";

export function Marca() {
  const { mostrarMarca, buscarMarca, buscador } = useMarcaStore();

  const { dataEmpresa, dataMarca } = useEmpresaStore();
  

  const { data,isLoading, error } = useQuery({
    queryKey: ["mostrar marca", { id_empresa: dataEmpresa?.id }],
  
    queryFn: () => mostrarMarca({ id_empresa: dataEmpresa?.id }),
    enabled: dataEmpresa?.id!=null,
  });

  const { data: buscardata } = useQuery({
  
    queryKey: [
      "buscar marca",
      { id_empresa: dataEmpresa?.id, descripcion: buscador },
    ],
    queryFn: () =>
      buscarMarca({
        id_empresa: dataEmpresa?.id,
        descripcion: buscador,
      }),
    enabled: dataEmpresa?.id!=null,
  });
  const { datapermisos } = useUsuariosStore();
  const statePermiso = datapermisos?.some((objeto) =>
    objeto.modulos.nombre.includes("Marca de productos")
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

  return <MarcaTemplate data={ data} />;
}
