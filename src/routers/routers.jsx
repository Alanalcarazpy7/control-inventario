import { Routes, Route } from "react-router-dom";

import {
  Home,
  Login,
  Configuracion,
  ProtectedRoute,
  Marca,
  Categorias,
  Productos,
  Usuarios,
  Kardex,
  Reportes,
  Layaout,
  Empresa,
} from "../index";
import StockActualTodos from "../components/organismos/report/StockActualTodos";
import StockActualPorProducto from "../components/organismos/report/StockActualPorProducto";
import StockBajoMinimo from "../components/organismos/report/StockBajoMinimo";
import KardexEntradaSalida from "../components/organismos/report/KardexEntradaSalida";
import StockInventarioValorado from "../components/organismos/report/StockInventarioValorado";

export function MyRoutes() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <ProtectedRoute accesBy={"non-authenticated"}>
            <Login />
          </ProtectedRoute>
        }
      ></Route>

      {/* Rutas protegidas dentro del layout */}

      <Route
        path="/"
        element={
          <ProtectedRoute accesBy={"authenticated"}>
            <Layaout>
              <Home />
            </Layaout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/configurar"
        element={
          <ProtectedRoute accesBy={"authenticated"}>
            <Layaout>
              <Configuracion />
            </Layaout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/configurar/marca"
        element={
          <ProtectedRoute accesBy={"authenticated"}>
            <Layaout>
              <Marca />
            </Layaout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/configurar/categorias"
        element={
          <ProtectedRoute accesBy={"authenticated"}>
            <Layaout>
              <Categorias />
            </Layaout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/configurar/productos"
        element={
          <ProtectedRoute accesBy={"authenticated"}>
            <Layaout>
              <Productos />
            </Layaout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/configurar/personal"
        element={
          <ProtectedRoute accesBy={"authenticated"}>
            <Layaout>
              <Usuarios />
            </Layaout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/configurar/empresa"
        element={
          <ProtectedRoute accesBy={"authenticated"}>
            <Layaout>
              <Empresa />
            </Layaout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/kardex"
        element={
          <ProtectedRoute accesBy={"authenticated"}>
            <Layaout>
              <Kardex />
            </Layaout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/reportes"
        element={
          <ProtectedRoute accesBy={"authenticated"}>
            <Layaout>
              <Reportes />
            </Layaout>
          </ProtectedRoute>
        }
      >
        <Route path="stock-actual-todos" element={<StockActualTodos />}></Route>
        <Route
          path="stock-actual-por-producto"
          element={<StockActualPorProducto />}
        ></Route>
        <Route path="stock-bajo-minimo" element={<StockBajoMinimo />}></Route>
        <Route
          path="kardez-entradas-salidas"
          element={<KardexEntradaSalida />}
        ></Route>
        <Route
          path="inventario-valorado"
          element={<StockInventarioValorado />}
        ></Route>
      </Route>

      {/*Este es subruta de reportes,por eso no se coloca la barra /*/}
    </Routes>
  );
}
