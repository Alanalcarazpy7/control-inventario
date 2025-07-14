import { useQuery } from "@tanstack/react-query";
import {
  BloqueoPagina,
  SpinnerLoader,
  useEmpresaStore,
  useUsuariosStore,
  UsuariosTemplate,
} from "../index";

export function Usuarios() {
  const {
    mostrarusuariosTodos,
    buscarusuarios,
    buscador,
    mostrarmodulos,
    datausuarios,
    datapermisos,
  } = useUsuariosStore();
  
  const { dataEmpresa } = useEmpresaStore();

  const {
    data: datausuario,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["mostrar usuarios", { _id_empresa: dataEmpresa?.id }],

    queryFn: () => mostrarusuariosTodos({ _id_empresa: dataEmpresa?.id }),
    enabled: dataEmpresa?.id != null,
  });

  const { data: buscardata } = useQuery({
    queryKey: [
      "buscar usuarios",
      { _id_empresa: dataEmpresa?.id, buscador: buscador },
    ],
    queryFn: () =>
      buscarusuarios({
        _id_empresa: dataEmpresa?.id,
        buscador: buscador,
      }),
    enabled: dataEmpresa?.id != null,
  });

  const { data: datamodulos } = useQuery({
    queryKey: ["mostrar modulos"],
    queryFn: mostrarmodulos,
  });

  const statePermiso = datapermisos?.some((objeto) =>
    objeto.modulos.nombre.includes("Personal")
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

  return <UsuariosTemplate data={datausuarios} />;
}
