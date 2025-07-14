import styled from "styled-components";
import { LinksArray, SecondarylinksArray, ToggleTema } from "../../../index.js";
import { v } from "../../../styles/variables";
import { NavLink } from "react-router-dom";
import { useState } from "react";

export function MenuHamurguesa() {
  const [click, setClick] = useState(false);
  

  return (
    <Container>
      <NavBar>
        <section>
          <HamburgerMenu>
            <label
              htmlFor="checkbox"
              className={click ? "toggle active" : "toggle"}
              onClick={() => setClick(!click)}
            >
              <div className="bars" id="bar1"></div>
              <div className="bars" id="bar2"></div>
              <div className="bars" id="bar3"></div>
            </label>
          </HamburgerMenu>
        </section>
        <Menu $click={click.toString()}>
          {LinksArray.map(({ icon, label, to }) => (
            <div
              onClick={() => setClick(!click)}
              className="LinkContainer"
              key={label}
            >
              <NavLink to={to} className="Links">
                <div className="Linkicon">{icon}</div>
                <span className="label">{label}</span>
              </NavLink>
            </div>
          ))}
          <Divider />
          {SecondarylinksArray.map(({ icon, label, to }) => (
            <div
              className="LinkContainer"
              key={label}
              onClick={() => setClick(!click)}
            >
              <NavLink to={to} className="Links">
                <div className="Linkicon">{icon}</div>
                <span className="label">{label}</span>
              </NavLink>
            </div>
          ))}
          <ToggleTema />
          <Divider />
        </Menu>
      </NavBar>
    </Container>
  );
}

const Container = styled.div`
  background: ${(props) => props.theme.body};
`;

const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const HamburgerMenu = styled.span`
  position: fixed;
  top: 2rem;
  z-index: 100;
  /* From Uiverse.io by vinodjangid07 */
  #checkbox {
    display: none;
  }

  .toggle {
    position: relative;
    width: 40px;
    height: 40px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition-duration: 0.5s;
    &.active {
      transition-duration: 0.5s;
      transform: rotate(180deg);
      .bars {
        position: absolute;
        transition-duration: 0.5s;
      }
      #bar2 {
        transform: scaleX(0);
        transition-duration: 0.5s;
      }
      #bar1 {
        width: 100%;
        transform: rotate(45deg);
        transition-duration: 0.5s;
      }
      #bar3 {
        width: 100%;
        transform: rotate(-45deg);
        transition-duration: 0.5s;
      }
    }
  }

  .bars {
    width: 100%;
    height: 4px;
    background-color: ${(props) => props.theme.text};
    border-radius: 4px;
  }

  #bar2 {
    transition-duration: 0.8s;
  }

  #bar1,
  #bar3 {
    width: 70%;
  }
`;

//Sidebar button para abrir/cerrar el sidebar
const Menu = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
  z-index:10;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  background: ${(props) => `rgba(${props.theme.bodyRgba},0.85)`};
  backdrop-filter: blur(3px);
  transform: ${(props) =>
  props.$click === "true" ? "translateY(0)" : "translateY(1000%)"};
  transition: all 0.3s ease;
  .LinkContainer{
    .Links{
      width: 100vw;
      display: flex;
      align-items: center;
      text-decoration: none;
      color: ${(props) => props.theme.text};
      height: 80px;
      .Linkicon{
        padding:${v.smSpacing} ${v.smSpacing};
        font-size: 25px;
      }
    }
    &:hover {
      background: ${(props) => props.theme.bgAlpha};
    }
  }
`;

//Linea divisoria entre los links
const Divider = styled.div`
  height: 1px;
  width: 100%;
  background: ${(props) => props.theme.bg4};
  margin: ${() => v.lgSpacing} 0;
`;
