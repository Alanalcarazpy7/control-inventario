import styled from "styled-components";
import { Routes, Route } from "react-router-dom";

import {
  SpinnerLoader,
  UserAuth,
  useUsuariosStore,
  useEmpresaStore,
  Sidebar,
  MenuHamurguesa,
} from "../index";
import {Device} from "../styles/breakpoints"
import { useQuery } from "@tanstack/react-query";
import { ErrorMolecula } from "../components/moleculas/ErrorMolecula";
import { useState } from "react";

export function Layaout({ children }) {
  const { user } = UserAuth();

  const { mostrarUsuarios, idusuario, mostrarpermisos } = useUsuariosStore();
  const { mostrarEmpresa } = useEmpresaStore();

  const {
    data: datausuarios,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["mostrar usuarios"],
    queryFn: mostrarUsuarios,
  });

  const { data: dataempresa } = useQuery({
    queryKey: ["mostrar empresa", { idUsuario: idusuario }],
    queryFn: () => mostrarEmpresa({ idUsuario: idusuario }),
    enabled: !!datausuarios, // Solo se ejecuta si datausuarios está definido
  });

  const { data: datapermisos } = useQuery({
    queryKey: ["mostrar permisos", { id_usuario: idusuario }],
    queryFn: () => mostrarpermisos({ id_usuario: idusuario }),
    enabled: !!datausuarios, // Solo se ejecuta si datausuarios está definido
  });
  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  if (isLoading) return <SpinnerLoader />;
  if (error) return <ErrorMolecula mensaje={error.message} />;

  return (
    <Container className={sidebarOpen ? "active" : ""}>
      <section className="ContentSidebar">
        <Sidebar
          state={sidebarOpen}
          setState={() => setSidebarOpen(!sidebarOpen)}
        />
      </section>
      <section className="ContentMenuHamburguesa">
        <MenuHamurguesa />
      </section>
      <section className="ContentRoutes">{children}</section>
    </Container>
  );
}

const Container = styled.main`
  display: grid;
  grid-template-columns: 1fr;
  /*El styled component al hacer esto ya sabra el tema si es light o dark y le aplicara el color que se definio en el themes.jsx*/
  background-color: ${(props) => props.theme.bgtotal};
  color: ${(props) => props.theme.text};
  .ContentSidebar {
    display: none;
  }
  .ContentMenuHamburguesa {
    display: block;
    position: absolute;
    left: 20px;
  }
  /*EL media va desde un dispositivo pequeño a uno grande*/
  @media ${Device.tablet} {
    grid-template-columns: 65px 1fr;
    &.active {
      grid-template-columns: 220px 1fr;
    }
    .ContentSidebar {
      display: initial;
    }
    .ContentMenuHamburguesa {
      display: none;
    }
  }
  .ContentRoutes {
    grid-column: 1;
    width: 100%;
    @media ${Device.tablet} {
      grid-column: 2;
    }
  }
`;
