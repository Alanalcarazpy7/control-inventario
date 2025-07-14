import { useQuery } from "@tanstack/react-query";
import {
  BloqueoPagina,
  KardexTemplate,
  SpinnerLoader,
  useEmpresaStore,
  useKardexStore,
  useProductosStore,
  useUsuariosStore,
} from "../index";

export function Kardex() {
  const { mostrarkardex, buscarkardex, buscador, datakardex } =
    useKardexStore();


  const { buscarproductos, buscador:buscadorproductos } = useProductosStore();

  const { dataEmpresa } = useEmpresaStore();

  const { data, isLoading, error } = useQuery({
    queryKey: ["mostrar kardex", { _id_empresa: dataEmpresa?.id }],

    queryFn: () => mostrarkardex({ _id_empresa: dataEmpresa?.id }),
    enabled: dataEmpresa?.id != null,
  });

  const { data: buscarproduct } = useQuery({
    queryKey: [
      "buscar productos ",
      { _id_empresa: dataEmpresa?.id, buscador: buscadorproductos },
    ],
    queryFn: () =>
      buscarproductos({
        _id_empresa: dataEmpresa?.id,
        buscador: buscadorproductos,
      }),
    enabled: dataEmpresa?.id != null,
  });

  const { data: buscarkard } = useQuery({
    queryKey: [
      "buscar kardex ",
      { _id_empresa: dataEmpresa?.id, buscador: buscador },
    ],
    queryFn: () =>
      buscarkardex({
        _id_empresa: dataEmpresa?.id,
        buscador: buscador,
      }),
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

  return <KardexTemplate data={datakardex} />;
}
