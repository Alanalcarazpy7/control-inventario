import { useQuery } from "@tanstack/react-query";
import { HomeTemplate, useEmpresaStore } from "../index";

export function Home() {
  const { contarusuariosXempresa, dataEmpresa } = useEmpresaStore();
  
  const { data } = useQuery({
    queryKey: [
      "contar usuarios por empresa",
      { idempresa: dataEmpresa?.id },
    ],
    queryFn: () =>
      contarusuariosXempresa({ id_empresa: dataEmpresa?.id }),
    enabled: !!dataEmpresa.id,
  });
  
  return (
    <HomeTemplate/>
  )
}
