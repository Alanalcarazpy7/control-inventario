import { useState } from "react";
import styled from "styled-components";
import { v } from "../../styles/variables";
import { Device } from "../../styles/breakpoints";
import { TablaKardex } from "../../index";
export function Tabs(data) {
  const [activetab, setactiveTab] = useState(0);
  const handleClick = (index) => {
    setactiveTab(index);
  };
  return (
    <Container className="container" activetab={`${activetab}00%`}>
      <ul className="tabs">
        <li
          className={activetab == 0 ? "active" : ""}
          onClick={() => handleClick(0)}
        >
          {<v.iconopie />}Kardex
        </li>
        <li
          className={activetab == 1 ? "active" : ""}
          onClick={() => handleClick(1)}
        >
          {<v.iconopie />}Titulo 2
        </li>
        <span className="glider"></span>
      </ul>
      <div className="tab-content">
        {activetab === 0 && <TablaKardex data={data.data} />}
        {activetab === 1 && <span>Tab1</span>}
        {activetab === 2 && <span>Tab2</span>}
      </div>
    </Container>
  );
}
const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  border: 1px solid #6a6b6c;
  border-radius: 15px;
  height: 100%;
  .tabs {
    list-style-type: style none;
    display: flex;
    position: relative;
    border-radius: 100px;
    justify-content: space-between;
    top: 0;
    left: 0;
    flex-direction: column;
    @media ${Device.tablet} {
      flex-direction: row;
    }
    li {
      gap: 8px;
      display: fLex;
      align-items: center;
      justify-content: center;
      height: 54px;
      width: 180px;
      font-size: 1.25rem;
      font-weight: 500;
      border-radius: 99px;
      cursor: pointer;
      transition: cotor 0.15s ease-in;
    }
    .glider {
      position: absolute;
      color: "#fff";
      display: fLex;
      height: 54px;
      width: 4px;
      background-color: #e05024;
      z-index: 1;
      border-radius: 15px;
      transition: 0.25s ease-out;
      transform: translateY(${(props) => props.activetab});
      box-shadow: 0px 10px 20px -3px #ff5722;
      bottom: 0;
      /*translada el subrayado en el eje Y*/
      @media ${Device.tablet} {
        transform: translateX(${(props) => props.activetab});
        height: 4px;
        width: 180px;
        bottom: 0;
      }
    }
  }
  .tab-content {
    margin-top: 20px;
    height: 100%;
    width: 100%;
  }
`;
