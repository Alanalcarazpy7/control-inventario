import { create } from 'zustand';
import {BuscarProductos, EditarProductos, EliminarProductos, InsertarProductos, MostrarProductos, ReportInventarioValorado, ReportKardexEntradaSalida, ReportStockBajoMinimo, ReportStockPorProductos, ReportStockProductosTodos } from "../index";
export const useProductosStore = create((set, get) => ({
  buscador: "",
  setBuscador: (p) => {
    set({ buscador: p });
  },
  dataproductos: [],
  productosItemSelect: [],
  parametros: {},

  mostrarproductos: async (p) => {
    const response = await MostrarProductos(p);
    set({ parametros: p });
    set({ dataproductos: response });
    set({ productosItemSelect: response[0] });
    return response;
  },
  selectproductos: (p) => {
    set({ productosItemSelect: p });
  },
  insertarproductos: async (p) => {
    await InsertarProductos(p);
    const { mostrarproductos } = get();
    const { parametros } = get();
    set(mostrarproductos(parametros));
    0;
  },
  eliminarproductos: async (p) => {
    await EliminarProductos(p);
    const { mostrarproductos } = get();
    const { parametros } = get();
    set(mostrarproductos(parametros));
  },
  editarproductos: async (p) => {
    await EditarProductos(p);
    const { mostrarproductos } = get();
    const { parametros } = get();
    set(mostrarproductos(parametros));
  },
  buscarproductos: async (p) => {
    const response = await BuscarProductos(p);
    set({ dataproductos: response });
    return response;
  },
  reportstockproductostodos: async (p) => {
    const response = await ReportStockProductosTodos(p);
    return response;
  },
  reportstockporproductos: async (p) => {
    const response = await ReportStockPorProductos(p);
    return response;
  },

  reportstockbajominimo: async (p) => {
    const response = await ReportStockBajoMinimo(p);
    return response;
  },
  reportkardexentradasalida: async (p) => {
    const response = await ReportKardexEntradaSalida(p);
    return response;
  },
  reportinventariovalorado: async (p) => {
    const response = await ReportInventarioValorado(p);
    return response;
  },
}));