import { useQuery } from "@tanstack/react-query";
import {
  BloqueoPagina,
  ReportesTemplate,
  SpinnerLoader,
  useEmpresaStore,
  useKardexStore,
  useUsuariosStore,
} from "../index";

export function Reportes() {
  const { mostrarkardex, buscador } = useKardexStore();

  const { dataEmpresa } = useEmpresaStore();
  

  const { data, isLoading, error } = useQuery({
    queryKey: ["mostrar kardex", { _id_empresa: dataEmpresa?.id }],

    queryFn: () => mostrarkardex({ _id_empresa: dataEmpresa?.id }),
    enabled: dataEmpresa?.id != null,
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

  return <ReportesTemplate />;
}
