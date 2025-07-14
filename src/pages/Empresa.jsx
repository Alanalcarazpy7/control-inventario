import { useEmpresaStore } from "../store/EmpresaStore";

import { EmpresaTemplate, BloqueoPagina, SpinnerLoader } from "../index";
import { useQuery } from "@tanstack/react-query";
import { useUsuariosStore } from "../store/UsuariosStore";

export function Empresa() {
  const { contarusuariosXempresa, dataEmpresa } = useEmpresaStore();
  //llamar a consultar usuarios por empresa
  const { data: datausuariosporempresa, isLoading,error } = useQuery({
    queryKey: ["contar usuarios por empresa", { idempresa: dataEmpresa?.id }],
    queryFn: () => contarusuariosXempresa({ id_empresa: dataEmpresa?.id }),
    enabled: !!dataEmpresa.id,
  });

  const { datapermisos } = useUsuariosStore();
    const statePermiso = datapermisos?.some((objeto) =>
      objeto.modulos.nombre.includes("Tu empresa")
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

  return (
    <>
      <EmpresaTemplate />
    </>
  );
}
