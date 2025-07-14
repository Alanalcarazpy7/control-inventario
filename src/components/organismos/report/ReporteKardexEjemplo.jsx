import styled from "styled-components";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

export function ReporteKardexEjemplo({ data }) {
  const currentDate = new Date();
  const formattedDate = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;
  const renderTableRow = (rowData, isHeader) => (
    <View key={rowData.id}>
      <Text>{rowData.fecha}</Text>
    </View>
  );
  return (
    <Document>
      <Page size="A4" style={styles.page} orientation="landscape">
        <View style={styles.section}>
          <View>
            <Text>Movimiento de Kardex</Text>
            <Text>Fecha y Hora de Impresion: {formattedDate}</Text>
            <View>
              {renderTableRow(
                { fecha: "Fecha", descripcion: "Producto" },
                true
              )}
              {data?.map((item) => renderTableRow(item))}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
