import styled from "styled-components";
import {
  Header,
  Btnfiltro,
  ContentFiltro,
  Title,
  v,
  Buscador,
  RegistrarCategorias,
  useCategoriasStore
} from "../../index";
import { useState } from "react";
import { TablaCategorias } from "../organismos/tablas/TablaCategorias";

export function CategoriasTemplate({ data }) {
  const [state, setState] = useState(false);
  const [dataSelect, setdataSelect] = useState([]);
  const [accion, setAccion] = useState("");
  const [openRegistro, setopenRegistro] = useState(false);
  const { setBuscador } = useCategoriasStore();

  const nuevoRegistro = () => {
    setopenRegistro(!openRegistro);
    setAccion("Nuevo");
    setdataSelect([]);
  };

  return (
    <Container>
      {openRegistro && (
        <RegistrarCategorias
          dataSelect={dataSelect}
          accion={accion}
          onClose={() => setopenRegistro(!openRegistro)}
        />
      )}

      <header className="header">
        <Header
          stateConfig={{ state: state, setState: () => setState(!state) }}
        />
      </header>
      <section className="area1">
        <ContentFiltro>
          <Title>Categorias</Title>
          <Btnfiltro
            funcion={nuevoRegistro}
            bgcolor="#f6f3f3"
            textcolor="#353535"
            icono={<v.agregar />}
          />
        </ContentFiltro>
      </section>
      <section className="area2">
        <Buscador setBuscador={setBuscador} />
      </section>
      <section className="main">
        <TablaCategorias
          setopenRegistro={setopenRegistro}
          setdataSelect={setdataSelect}
          setAccion={setAccion}
          data={data}
        />
      </section>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  background-color: ${(props) => props.theme.bgtotal};
  color: ${(props) => props.theme.text};
  width: 100%;
  display: grid;
  padding: 15px;
  grid-template:
    "header" 100px
    "area1" 100px
    "area2" 100px
    "main" auto;
  .header {
    grid-area: header;
    /*background-color: rgba(103, 93, 241, 0.14);*/
    display: flex;
    align-items: center;
  }
  .area1 {
    grid-area: area1;
    /*background-color: rgba(229, 67, 26, 0.14);*/
    display: flex;
    align-items: center;
  }
  .area2 {
    grid-area: area2;
    /*background-color: rgba(77, 237, 106, 0.14);*/
    display: flex;
    align-items: center;
    justify-content:end;
  }
  .main {
    grid-area: main;
    /*background-color: rgba(179, 46, 241, 0.14);*/
    display: flex;
    justify-content: center;
  }
`;
