import styled from "styled-components"
import { AccionTabla,v } from "../../index"

export function ContentAccionesTabla({funcionEditar,funcionEliminar}) {
  return (
    <Container>
      <AccionTabla
        funcion={funcionEditar}
        color="#7d7d7d"
        fontsize="18px"
        icono={<v.iconeditarTabla />}
      />
      <AccionTabla
        funcion={funcionEliminar}
        color="#f76e8e"
        fontsize="18px"
        icono={<v.iconeliminarTabla />}
      />
    </Container>
  );
}

const Container = styled.div`
  display:flex;
  gap:10px;
  flex-wrap:wrap;
  @media(max-width:48em){
    justify-content:end;
  }
`