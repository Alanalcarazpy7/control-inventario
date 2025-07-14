import styled from "styled-components";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  PDFViewer,
} from "@react-pdf/renderer";
import { useProductosStore } from "../../../store/ProductosStore";
import { useQuery } from "@tanstack/react-query";
import { useEmpresaStore } from "../../../store/EmpresaStore";
import { Buscador } from "../Buscador";
import { ListaGenerica } from "../ListaGenerica";
import { useState } from "react";

export default function StockActualPorProducto() {
  const {
    reportstockporproductos,
    buscarproductos,
    buscador,
    setBuscador,
    selectproductos,
    productosItemSelect,
  } = useProductosStore();
  const [stateListaproductos, setstataeListaProductos] = useState(false);
  const { dataEmpresa } = useEmpresaStore();

  const { data } = useQuery({
    queryKey: [
      "reporte por producto",
      { id_empresa: dataEmpresa?.id, id_producto: productosItemSelect?.id },
    ],
    queryFn: () =>
      reportstockporproductos({
        id_empresa: dataEmpresa?.id,
        id_producto: productosItemSelect?.id,
      }),
    enabled: dataEmpresa?.id != null,
  });

  const {
    data: dataproductosbuscador,
    isLoadingProductosBuscados,
    error: errorBuscador,
  } = useQuery({
    queryKey: [
      "buscar reporte productos ",
      { _id_empresa: dataEmpresa?.id, descripcion: buscador },
    ],
    queryFn: () =>
      buscarproductos({
        _id_empresa: dataEmpresa?.id,
        buscador: buscador,
      }),
    enabled: dataEmpresa?.id != null,
  });

  // Create styles
  const styles = StyleSheet.create({
    page: {
      flexDirection: "row",
      position: "relative",
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
    table: {
      width: "100%",
      margin: "auto",
      marginTop: 10,
    },
    row: {
      flexDirection: "row",
      borderBottom: 1,
      borderBottomColor: "#121212",
      alignItems: "stretch",
      height: 24,
      borderLeftColor: "#000",
      borderLeft: 1,
      textAlign: "left",
      justifyContent: "flex-start",
      alignItems: "center",
    },
    cell: {
      flex: 1,
      textAlign: "center",

      /*fontFamily: "Inconsolata",*/
      borderLeftColor: "#000",
      justifyContent: "flex-start",
      alignItems: "center",
    },
    headerCell: {
      flex: 1,
      backgroundColor: "#dcdcdc",
      fontWeight: "bold",
      /*fontFamily: "Inconsolata",*/
      textAlign: "left",
      justifyContent: "flex-start",
      alignItems: "center",
      textAlign: "center",
    },
  });

  const currentDate = new Date();
  const formattedDate = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;
  const renderTableRow = (rowData, isHeader = false) => (
    <View key={rowData.id} style={styles.row}>
      <Text style={[styles.cell, isHeader && styles.headerCell]}>
        {rowData.descripcion}
      </Text>
      <Text style={[styles.cell, isHeader && styles.headerCell]}>
        {rowData.stock}
      </Text>
    </View>
  );

  return (
    <Container>
      <Buscador
        setBuscador={setBuscador}
        funcion={() => setstataeListaProductos(!stateListaproductos)}
      />
      {stateListaproductos && (
        <ListaGenerica
          funcion={(p) => {
            selectproductos(p);
            setBuscador("");
          }}
          data={dataproductosbuscador}
          setState={() => setstataeListaProductos(!stateListaproductos)}
          scroll="scroll"
        />
      )}
      <PDFViewer className="pdfviewer">
        <Document title="Reporte de stock todos">
          <Page size="A4" orientation="portrait">
            <View style={styles.page}>
              <View style={styles.section}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "ultrabold",
                    marginBottom: 10,
                  }}
                >
                  Stock Actual Por Producto
                </Text>
                <Text>Fecha y Hora del reporte: {formattedDate}</Text>
                <View>
                  {renderTableRow(
                    { descripcion: "Producto", stock: "Stock" },
                    true
                  )}
                  {data?.map((item, index) => renderTableRow(item))}
                </View>
              </View>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 80vh;
  display:flex;
  flex-direction:column;
  gap:15px;
  .pdfviewer {
    width: 100%;
    height: 100%;
  }
`;
