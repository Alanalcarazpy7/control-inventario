import styled from "styled-components";
import {
  Header,
  ContentFiltro,
  Title,
  Buscador,
  Btnsave,
  Tabs,
  RegistrarKardex,
  useKardexStore,
} from "../../index";
import { useState } from "react";

export function KardexTemplate({ data }) {
  const [state, setState] = useState(false);
  const [dataSelect, setdataSelect] = useState([]);
  const [accion, setAccion] = useState("");
  const [openRegistro, setopenRegistro] = useState(false);
  const { setBuscador } = useKardexStore();
  const [tipoKardex, setTipo] = useState();

  const nuevaEntrada = () => {
    setopenRegistro(true);
    setTipo("Entrada");
  };

  const nuevaSalida = () => {
    setopenRegistro(true);
    setTipo("Salida");
  };

  return (
    <Container>
      {openRegistro && (
        <RegistrarKardex
          dataSelect={dataSelect}
          accion={accion}
          onClose={() => setopenRegistro(!openRegistro)}
          tipoKardex={tipoKardex}
        />
      )}

      <header className="header">
        <Header
          stateConfig={{ state: state, setState: () => setState(!state) }}
        />
      </header>
      <section className="area1">
        <ContentFiltro>
          <Title>Kardex</Title>
          <Btnsave
            funcion={nuevaEntrada}
            bgcolor="#52de65"
            titulo="+ Entradas"
          />
          <Btnsave funcion={nuevaSalida} bgcolor="#fb6661" titulo="- Salidas" />
        </ContentFiltro>
      </section>
      <section className="area2">
        <Buscador setBuscador={setBuscador} />
      </section>
      <section className="main">
        <Tabs data={data} />
      </section>
    </Container>
  );
}

const Container = styled.div`
  min-height: 100vh;
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
    justify-content: end;
  }
  .main {
    grid-area: main;
    /*background-color: rgba(179, 46, 241, 0.14);*/
    display: flex;
    justify-content: center;
  }
`;
