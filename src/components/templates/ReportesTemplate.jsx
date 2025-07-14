import styled from "styled-components";
import { NavLink, Outlet } from "react-router-dom";
import { Title } from "../atomos/Title";

export function ReportesTemplate() {
  return (
    <Container>
      <Title>Reportes</Title>
      <PageContainer>
        <Content>
          <Outlet />
        </Content>
        <Sidebar>
          <SidebarSection>
            <SidebarTitle>Stock Actual:</SidebarTitle>
            <SidebarItem to="stock-actual-todos">Todos</SidebarItem>
            <SidebarItem to="stock-actual-por-producto">
              Por Producto
            </SidebarItem>
            <SidebarItem to="stock-bajo-minimo">Bajo del minimo</SidebarItem>
          </SidebarSection>
          <SidebarSection>
            <SidebarTitle>Entradas y Salidas</SidebarTitle>
            <SidebarItem to="kardez-entradas-salidas">Por Producto</SidebarItem>
          </SidebarSection>
          <SidebarSection>
            <SidebarTitle>Valorizado</SidebarTitle>
            <SidebarItem to="inventario-valorado">
              Valor Por Producto
            </SidebarItem>
          </SidebarSection>
        </Sidebar>
      </PageContainer>
    </Container>
  );
}
const Content = styled.div`
  padding: 20px;
  border-radius: 8px;
  margin: 20px;
  flex: 1;
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  justify-content: center;
  width: 100%;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;
const Container = styled.div`
  min-height: 100vh;
  padding: 15px;
  width: 100%;
  color: ${({ theme }) => theme.text};
`;

const Sidebar = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  @media (min-width: 768px) {
    width: 250px;
    order: 2;
  }
`;
const SidebarSection = styled.div`
  margin-bottom: 20px;
  border-radius: 10px;
  border: 2px solid ${({ theme }) => theme.color2};
  padding: 12px;
`;

const SidebarTitle = styled.h3`
  margin-bottom: 20px;
  font-size: 1.2em;
`;

const SidebarItem = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-radius: 12px;
  cursor: pointer;
  margin: 5px 0;
  padding: 0 5%;
  text-decoration: none;
  color: ${({ theme }) => theme.text};
  height: 60px;
  &:hover {
    color: ${({ theme }) => theme.colorSubtitle};
  };
  /*Este active es propiedad del Navlink que tiene esta clase,por eso se usa .active*/
  &.active {
    background: ${({ theme }) => theme.bg6};
    border: 2px solid ${({ theme }) => theme.bg5};
    color: ${({ theme }) => theme.color1};
    font-weight: 600;
  }
`;
