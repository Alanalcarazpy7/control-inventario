import { useEffect, useState } from "react";
import styled from "styled-components";
import { v } from "../../../styles/variables";
import { Device } from "../../../styles/breakpoints";
import {
  InputText,
  Btnsave,
  ConvertirCapitalize,
  useProductosStore,
  ContainerSelector,
  Selector,
  useMarcaStore,
  Btnfiltro,
  RegistrarMarca,
  ListaGenerica,
  useCategoriasStore,
  RegistrarCategorias,
} from "../../../index";
import { useForm } from "react-hook-form";
import { useEmpresaStore } from "../../../store/EmpresaStore";
export function RegistrarProductos({ onClose, dataSelect, accion }) {
  const {
    insertarproductos,
    editarproductos,
  } = useProductosStore();
  const { dataEmpresa } = useEmpresaStore();
  const { marcaItemSelect, dataMarca, selectMarca } = useMarcaStore();
  const { categoriasItemSelect, datacategorias, selectcategorias } =
    useCategoriasStore();
  const [stateMarca, setStateMarca] = useState();
  const [stateCategoria, setStateCategoria] = useState();
  const [subaccion, setAccion] = useState("");
  const [openRegistroMarca, setopenRegistroMarca] = useState();
  const [openRegistroCategoria, setopenRegistroCategoria] = useState();
  const nuevoRegistroMarca = () => {
    setopenRegistroMarca(!openRegistroMarca);
    setAccion("Nuevo");
  };

  const nuevoRegistroCategoria = () => {
    setopenRegistroCategoria(!openRegistroCategoria);
    setAccion("Nuevo");
  };
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  async function insertar(data) {
    if (accion === "Editar") {
      
      const p = {
        id: dataSelect.id,
        descripcion: ConvertirCapitalize(data.descripcion),
        idmarca: marcaItemSelect.id,
        stock: parseFloat(data.stock),
        stock_minimo: parseFloat(data.stockminimo),
        codigobarras: parseFloat(data.codigobarras),
        codigointerno: data.codigointerno,
        precioventa: parseFloat(data.precioventa),
        preciocompra: parseFloat(data.preciocompra),
        id_categoria: categoriasItemSelect.id,
        id_empresa: dataEmpresa.id,
      };
      await editarproductos(p);
      onClose();
    } else {
      
      const p = {
        _descripcion: ConvertirCapitalize(data.descripcion),
        _idmarca: marcaItemSelect.id,
        _stock: parseFloat(data.stock),
        _stock_minimo: parseFloat(data.stockminimo),
        _codigobarras: parseFloat(data.codigobarras),
        _codigointerno: data.codigointerno,
        _precioventa: parseFloat(data.precioventa),
        _preciocompra: parseFloat(data.preciocompra),
        _id_categoria: categoriasItemSelect.id,
        _id_empresa: dataEmpresa.id,
      };
      await insertarproductos(p);
      onClose();
    }
  }
  useEffect(() => {
    if (accion === "Editar") {
      selectMarca({ id: dataSelect.idmarca, descripcion: dataSelect.marca })
      selectcategorias({ id: dataSelect.id_categoria, descripcion: dataSelect.categoria });
    }
  }, []);
  return (
    <Container>
      <div className="sub-contenedor">
        <div className="headers">
          <section>
            <h1>
              {accion == "Editar"
                ? "Editar producto"
                : "Registrar nuevo producto"}
            </h1>
          </section>

          <section>
            <span onClick={onClose}>x</span>
          </section>
        </div>

        <form className="formulario" onSubmit={handleSubmit(insertar)}>
          <section className="seccion1">
            <article>
              <InputText icono={<v.icononombre />}>
                <input
                  className="form__field"
                  defaultValue={dataSelect.descripcion}
                  type="text"
                  placeholder=""
                  {...register("descripcion", {
                    required: true,
                  })}
                />
                <label className="form__label">descripcion</label>
                {errors.nombre?.type === "required" && <p>Campo requerido</p>}
              </InputText>
            </article>

            <ContainerSelector>
              <label>Marca:</label>
              <Selector
                texto1="🍿"
                texto2={marcaItemSelect?.descripcion}
                color="#fc6027"
                state={stateMarca}
                funcion={() => setStateMarca(!stateMarca)}
              />
              {stateMarca && (
                <ListaGenerica
                  data={dataMarca}
                  scroll="scroll"
                  bottom="-260px"
                  setState={() => setStateMarca(!stateMarca)}
                  funcion={selectMarca}
                />
              )}
              <Btnfiltro
                textcolor="#353535"
                bgcolor="f6f3f3"
                icono={<v.agregar />}
                funcion={nuevoRegistroMarca}
              />
            </ContainerSelector>

            <article>
              <InputText icono={<v.iconostock />}>
                <input
                  className="form__field"
                  defaultValue={dataSelect.stock}
                  type="number"
                  step="0.01"
                  placeholder=""
                  {...register("stock", {
                    required: true,
                  })}
                />
                <label className="form__label">Stock</label>
                {errors.stock?.type === "required" && <p>Campo requerido</p>}
              </InputText>
            </article>

            <article>
              <InputText icono={<v.iconostock />}>
                <input
                  className="form__field"
                  defaultValue={dataSelect.stock_minimo}
                  type="number"
                  step="0.01"
                  placeholder=""
                  {...register("stockminimo", {
                    required: true,
                  })}
                />
                <label className="form__label">Stock Minimo</label>
                {errors.stockminimo?.type === "required" && (
                  <p>Campo requerido</p>
                )}
              </InputText>
            </article>

            <ContainerSelector>
              <label>Categoria:</label>
              <Selector
                texto1="🍿"
                texto2={categoriasItemSelect?.descripcion}
                color="#fc6027"
                state={stateCategoria}
                funcion={() => setStateCategoria(!stateCategoria)}
              />
              {stateCategoria && (
                <ListaGenerica
                  data={datacategorias}
                  scroll="scroll"
                  bottom="-260px"
                  setState={() => setStateCategoria(!stateCategoria)}
                  funcion={selectcategorias}
                />
              )}
              <Btnfiltro
                textcolor="#353535"
                bgcolor="f6f3f3"
                icono={<v.agregar />}
                funcion={nuevoRegistroCategoria}
              />
            </ContainerSelector>
          </section>

          <section className="seccion2">
            <article>
              <InputText icono={<v.iconocodigobarras />}>
                <input
                  className="form__field"
                  defaultValue={dataSelect.codigobarras}
                  type="text"
                  placeholder=""
                  {...register("codigobarras", {
                    required: true,
                  })}
                />
                <label className="form__label">Codigo de Barras</label>
                {errors.codigobarras?.type === "required" && (
                  <p>Campo requerido</p>
                )}
              </InputText>
            </article>

            <article>
              <InputText icono={<v.iconocodigointerno />}>
                <input
                  className="form__field"
                  defaultValue={dataSelect.codigointerno}
                  type="text"
                  placeholder=""
                  {...register("codigointerno", {
                    required: true,
                  })}
                />
                <label className="form__label">Codigo Interno</label>
                {errors.codigointerno?.type === "required" && (
                  <p>Campo requerido</p>
                )}
              </InputText>
            </article>

            <article>
              <InputText icono={<v.iconoprecioventa />}>
                <input
                  className="form__field"
                  defaultValue={dataSelect.precioventa}
                  type="number"
                  placeholder=""
                  {...register("precioventa", {
                    required: true,
                  })}
                />
                <label className="form__label">Precio de Venta</label>
                {errors.precioventa?.type === "required" && (
                  <p>Campo requerido</p>
                )}
              </InputText>
            </article>

            <article>
              <InputText icono={<v.iconopreciocompra />}>
                <input
                  className="form__field"
                  defaultValue={dataSelect.preciocompra}
                  type="number"
                  placeholder=""
                  {...register("preciocompra", {
                    required: true,
                  })}
                />
                <label className="form__label">Precio de Compra</label>
                {errors.preciocompra?.type === "required" && (
                  <p>Campo requerido</p>
                )}
              </InputText>
            </article>
          </section>

          <div className="btnguardarContent">
            <Btnsave
              icono={<v.iconoguardar />}
              titulo="Guardar"
              bgcolor="#ef552b"
            />
          </div>
        </form>

        {openRegistroMarca && (
          <RegistrarMarca
            dataSelect={dataSelect}
            accion={subaccion}
            onClose={() => setopenRegistroMarca(!openRegistroMarca)}
          />
        )}

        {openRegistroCategoria && (
          <RegistrarCategorias
            dataSelect={dataSelect}
            accion={subaccion}
            onClose={() => setopenRegistroCategoria(!openRegistroCategoria)}
          />
        )}
      </div>
    </Container>
  );
}
const Container = styled.div`
  transition: 0.5s;
  top: 0;
  left: 0;
  position: fixed;
  background-color: rgba(10, 9, 9, 0.5);
  display: flex;
  width: 100%;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  z-index: 1000;

  .sub-contenedor {
    width: 100%;
    max-width: 90%;
    border-radius: 20px;
    background: ${({ theme }) => theme.bgtotal};
    box-shadow: -10px 15px 30px rgba(10, 9, 9, 0.4);
    padding: 13px 36px 20px 36px;
    z-index: 100;
    height: 80vh;
    overflow-y: auto;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 6px;
      border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #484848;
      border-radius: 10px;
    }

    .headers {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;

      h1 {
        font-size: 20px;
        font-weight: 500;
      }
      span {
        font-size: 20px;
        cursor: pointer;
      }
    }
    .formulario {
      display: grid;
      grid-template-columns: 1fr;
      gap: 15px;

      @media ${Device.tablet} {
        grid-template-columns: repeat(2, 1fr);
      }
      section {
        gap: 20px;
        display: flex;
        flex-direction: column;
      }
      .btnguardarContent {
        display: flex;
        justify-content: end;
        grid-column: 1;
        @media ${Device.tablet} {
          grid-column: 2;
        }
      }
    }
  }
`;

const ContentTitle = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 20px;
  svg {
    font-size: 25px;
  }
  input {
    border: none;
    outline: none;
    background: transparent;
    padding: 2px;
    width: 40px;
    font-size: 28px;
  }
`;
const ContainerEmojiPicker = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;
