import styled from "styled-components";
import { Header, BannerEmpresa, Title } from "../../index";
import { useState } from "react";
export function EmpresaTemplate() {
  const [state, setState] = useState(false);
  return (
    <Container>
      <header className="header">
        <Header
          stateConfig={{ state: state, setState: () => setState(!state) }}
        />
      </header>
      <section className="area1">
        <ContentFiltro>
          <Title>Tu empresa</Title>
        </ContentFiltro>
      </section>
      <section className="area2"></section>
      <section className="main">
        <BannerEmpresa />
        {/* <Lottieanimacion
            alto="300"
            ancho="300"
            animacion={vacio}
          /> */}
      </section>
    </Container>
  );
}
const Container = styled.div`
  position: relative;
  min-height: 100vh;
  padding: 15px;
  width: 100%;
  overflow: hidden;
  background: ${({ theme }) => theme.bgtotal};
  color: ${({ theme }) => theme.text};
  display: grid;
  grid-template:
    "header" 100px
    "area1" 0px
    "area2" 60px
    "main" auto;

  .header {
    grid-area: header;
    /* background-color: rgba(103, 93, 241, 0.14); */
    display: flex;
    align-items: center;
  }
  .area1 {
    margin-top: 15px;
    grid-area: area1;
    /* background-color: rgba(229, 67, 26, 0.14); */
    display: flex;
    align-items: center;
  }
  .area2 {
    grid-area: area2;
    /* background-color: rgba(77, 237, 106, 0.14); */
    display: flex;
    align-items: center;
    justify-content: end;
  }
  .main {
    grid-area: main;
    /* background-color: rgba(179, 46, 241, 0.14); */
  }
`;
const ContentFiltro = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: end;
  width: 100%;
  gap: 15px;
`;
