import styled from "styled-components";
import { v } from "../../../index";
export function Paginacion({ table, setPagina, maximo }) {
  /*toda la funcion de table viene de la documentacion de paginacion de tanstack table:
  https://tanstack.com/table/latest/docs/framework/react/examples/pagination-controlled*/
  return (
    <Container>
      <button
        disabled={!table.getCanPreviousPage()}
        onClick={() => table.setPageIndex(0)}
      >
        <span className="iconos">{<v.iconotodos />}</span>
      </button>
      <button
        disabled={!table.getCanPreviousPage()}
        onClick={() => table.previousPage()}
      >
        <span className="iconos izquierda">{<v.iconoflechaderecha />}</span>
      </button>

      <span>{table.getState().pagination.pageIndex + 1}</span>
      <p> de {table.getPageCount()}</p>
      <button
        disabled={!table.getCanNextPage()}
        onClick={() => table.nextPage()}
      >
        <span className="iconos">{<v.iconoflechaderecha />}</span>
      </button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  button {
    background-color: #ff7800;
    border: none;
    padding: 5px 10px;
    border-radius: 3px;
    height: 40px;
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    text-align: center;
    transition: 0.3s;
    &:hover {
      box-shadow: 0px 10px 15px -3px #ff7800;
    }
    .iconos {
      color: #fff;
      &.izquierda {
        transform: rotate(-180deg);
      }
    }
  }
  button[disabled] {
    background-color: #646464;
    cursor: no-drop;
    box-shadow: none;
  }
`;
