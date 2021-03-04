import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  Font,
  Document,
  Page,
  Image,
  View,
} from "@react-pdf/renderer";
import moment from "moment";

const PdfVista = ({ driverPayments: { driver, payment } }) => {
  const [dataDriver, setDataDriver] = useState();
  const [extraCounter, setExtraCounter] = useState(0);
  const [bonoCounter, setBonoCounter] = useState(0);
  const [timeWorkTotal, setTimeWorkTotal] = useState(0);
  const [payHourlyTotalAmount, setpayHourlyTotalAmount] = useState(0);
  const [payRequestTotalAmount, setpayRequestTotalAmount] = useState(0);
  


  const { first_name } = driver;

  useEffect(() => {
    let workTimeData = [];
    let extraCount = 0;
    let bonoCount = 0;
    let payHourlyTotal = 0;
    let payRequestTotal = 0;
    for (const paymentdriver of payment) {
      // extraer el amount
      let amount = Math.ceil(paymentdriver.amount);
      // formatear fecha
      let date = paymentdriver.date;
      let fechaNormalizada =
        date.substring(0, date.indexOf(".")) + moment().format("Z");
      let dateOk = moment(fechaNormalizada).format("DD/MM/YYYY");
      // muestra el turno
      let turno = paymentdriver.driverZoneDateName;
      let zone = paymentdriver.zone;
      let payType = paymentdriver.payType;
      let totalRequest = paymentdriver.totalRequests;
      let workTimeMinute = (paymentdriver.totalTimeActive = `${(
        (paymentdriver.totalTimeActive - (paymentdriver.totalTimeActive % 60)) /
        60
      ).toString()}:${paymentdriver.totalTimeActive % 60 < 10 ? "0" : ""}${(
        paymentdriver.totalTimeActive % 60
      ).toFixed(0)}`);

      if (payType === "extraRequest") {
        extraCount++;
      }
      if (payType === "extraDriver") {
        bonoCount++;
      }

      if (payType === "payHourly") {
        payHourlyTotal += amount
      }

      if(payType === "payRequest") {
        payRequestTotal += amount
      }

      workTimeData.push({
        amount,
        dateOk,
        turno,
        zone,
        payType,
        totalRequest,
        workTimeMinute,
      });
    }
    setpayHourlyTotalAmount(payHourlyTotal);
    setpayRequestTotalAmount(payRequestTotal);
    setTimeWorkTotal(payHourlyTotal);
    setExtraCounter(extraCount);
    setBonoCounter(bonoCount);
    setDataDriver([...workTimeData]);
  }, []);
  console.log(payHourlyTotalAmount);
  console.log(payRequestTotalAmount);
  console.log(extraCounter);
  console.log(bonoCounter);

  const formatoGuaranies = new Intl.NumberFormat("es-PY", {
    style: "currency",
    currency: "PYG",
    minimumFractionDigits: 0,
  });

  return (
    <Document>
      <Page wrap orientation="landscape" size="A4" style={styles.body}>
        <View style={styles.cabezera}>
          <View style={styles.rectangulo}>
            <Text style={styles.texto}>Monchis Express</Text>
          </View>
          <View style={styles.rectangulo2}>
            <View style={{ lineHeight: 1.4 }}>
              <Text style={styles.texto2}>
                Resumen correspondiente al periodo Enero 2021{" "}
              </Text>
              <Text style={styles.texto2}>
                {" "}
                Rango de fechas 01/01/1990 al 01/01/2020
              </Text>
            </View>
          </View>
        </View>

        <View style={{ alignItems: "center", flexDirection: "row" }}>
          <View style={styles.rectangulo3}>
            <View style={styles.rectanguloDriver}>
              <Text style={styles.textoDriver}>Driver:</Text>
            </View>
          </View>
          <View style={{ marginLeft: 80 }}>
            <Text style={{ fontSize: 11 }}>{first_name}</Text>
          </View>
        </View>

        <View>
          <View style={{justifyContent: 'center'}}>
            <View style={styles.rectangulohoras}>
              <Text style={styles.textoDriverHoras}>Horas Trabajadas</Text>
            </View>
            <View style={styles.rectangulohoras2}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.textoDriverHoras2}>Fecha</Text>
                <Text style={styles.textoDriverHoras2}>Turno</Text>
                <Text style={styles.textoDriverHoras2}>Zona</Text>
                <Text style={styles.textoDriverHoras2}>Tipo de Pago</Text>
                <Text style={styles.textoDriverHoras2}>
                  Cantidad de pedidos
                </Text>
                <Text style={styles.textoDriverHoras2}>
                  Cantidad de horas trabajadas
                </Text>
                <Text style={styles.textoDriverHoras2}>Monto</Text>
              </View>
            </View>
            <View>
              {dataDriver?.length > 0 ? (
                dataDriver.map((element) =>
                  element.payType === "payRequest" ? (
                    <View
                      style={{
                        flexDirection: "row",
                        width: "90%",
                        left: 60,
                        fontSize: 10,
                      }}
                    >
                      <Text style={{ left: 30 }}>{element.dateOk}</Text>
                      <Text style={{ left: 40 }}>
                        {element.turno ? (
                          <Text>{element.turno}</Text>
                        ) : (
                          <></>
                        )}
                      </Text>
                      <Text style={{ left: 50 }}>
                        {element.zone ? (
                          <Text>{element.zone}</Text>
                        ) : (
                          <></>
                        )}
                      </Text>
                      <Text style={{ left: 95 }}>{element.payType}</Text>
                      <Text style={{ left: 200 }}>{element.totalRequest}</Text>
                      <Text style={{ left: 350 }}>
                        {element.workTimeMinute}
                      </Text>
                      <Text style={{ left: 465 }}>
                        {formatoGuaranies.format(element.amount)}
                      </Text>
                    </View>
                  ) : null
                )
              ) : (
                <></>
              )}
            </View>
          </View>
        </View>

        <View style={styles.lineaResumen}></View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            fontSize: 11,
            fontWeight: "bold",
            marginBottom: 20,
          }}
        >
          <Text style={{ left: 2 }}>Sub Total</Text>
          <Text style={{ left: 83 }}>10</Text>
          <Text style={{ right: 2 }}>{formatoGuaranies.format(payRequestTotalAmount)}</Text>
        </View>
        <View style={{ width: '100%vw' }}>
          {dataDriver?.length > 0 ? (
            dataDriver.map((element) =>
              element.payType === "payHourly" ? (
                <View
                  style={{
                    flexDirection: "row",
                    fontSize: 11,
                    marginLeft: 90,
                  }}
                >
                  <Text>{element.dateOk}</Text>
                  <Text>
                    {element.turno ? (
                      <Text>{element.turno}</Text>
                    ) : (
                      <></>
                    )}
                  </Text>
                  <Text>
                    {element.zone ? (
                      <Text>{element.zone}</Text>
                    ) : (
                      <></>
                    )}
                  </Text>
                  <Text>
                    {element.payType ? (
                      <Text>{element.payType}</Text>
                    ) : (
                      <></>
                    )}
                  </Text>
                  <Text>
                    {element.totalRequest ? (
                      <Text>{element.totalRequest}</Text>
                    ) : (
                      <></>
                    )}
                  </Text>
                  <Text>{element.workTimeMinute}</Text>
                  <Text>
                    {formatoGuaranies.format(element.amount)}
                  </Text>
                </View>
              ) : null
            )
          ) : (
            <></>
          )}
        </View>

        <View style={styles.lineaResumen}></View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            fontSize: 11,
            fontWeight: "black",
            marginBottom: 20,
          }}
        >
          <Text style={{ left: 2, color: "Black" }}>Sub Total</Text>
          <Text style={{ left: 250 }}>17 hs</Text>
          <Text style={{ right: 2 }}>{formatoGuaranies.format(payHourlyTotalAmount)}</Text>
        </View>

        {extraCounter ? (
          <View>
            <View style={styles.rectangulohoras}>
              <Text style={styles.textoDriverHoras}>Extras</Text>
            </View>
            <View style={styles.rectangulohoras2}>
              <View style={{ flexDirection: "row" }}>
                <View style={{ marginRight: 55 }}>
                  <Text style={styles.textoDriverHoras2}>Fecha</Text>
                </View>
                <View style={{ marginRight: 50 }}>
                  <Text style={styles.textoDriverHoras2}>Turno</Text>
                </View>
                <View style={{ marginRight: 50 }}>
                  <Text style={styles.textoDriverHoras2}>Zona</Text>
                </View>
                <View style={{ marginRight: 68 }}>
                  <Text style={styles.textoDriverHoras2}>Concepto</Text>
                </View>
                <View style={{ marginRight: 100 }}>
                  <Text style={styles.textoDriverHoras2}>
                    Cantidad de pedidos
                  </Text>
                </View>
                <View style={{ marginRight: 125 }}>
                  <Text style={styles.textoDriverHoras2}>Costo</Text>
                </View>
                <View>
                  <Text style={styles.textoDriverHoras2}>Total</Text>
                </View>
              </View>
            </View>
          </View>
        ) : (
          <>
            <Text>Ni idea que pasa</Text>
          </>
        )}

        {dataDriver?.length > 0
          ? dataDriver.map((element) =>
              element.payType === "extraRequest" ? (
                <View>
                  <View>
                    <View
                      style={{
                        flexDirection: "row",
                        width: "90%",
                        left: 60,
                        fontSize: 11,
                      }}
                    >
                      <Text style={{ left: 30 }}>{element.dateOk}</Text>
                      <Text style={{ left: 40 }}>{element.turno}</Text>
                      <Text style={{ left: 50 }}>{element.zone}</Text>
                      <Text style={{ left: 95 }}>{element.payType}</Text>
                      <Text style={{ left: 200 }}>{element.totalRequest}</Text>
                      <Text style={{ left: 350 }}>
                        {element.workTimeMinute}
                      </Text>
                      <Text style={{ left: 465 }}>
                        {formatoGuaranies.format(element.amount)}
                      </Text>
                    </View>
                  </View>
                </View>
              ) : null
            )
          : null}

        <View style={styles.lineaResumen}></View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            fontSize: 11,
            fontWeight: "black",
            marginBottom: 20,
          }}
        >
          <Text style={{ left: 2, color: "Black" }}>Sub Total</Text>
          <Text style={{ right: 2 }}>250.000</Text>
        </View>

        {bonoCounter ? (
          <>
            <View>
              <View style={styles.rectangulohoras3}>
                <Text style={styles.textoDriverHoras}>Bonos</Text>
              </View>
              <View style={styles.rectangulohoras3}>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ marginRight: 50 }}>
                    <Text style={styles.textoDriverHoras2}>Zona</Text>
                  </View>
                  <View style={{ marginRight: 68 }}>
                    <Text style={styles.textoDriverHoras2}>Concepto</Text>
                  </View>
                  <View style={{ marginRight: 100 }}>
                    <Text style={styles.textoDriverHoras2}>
                      Cantidad de pedidos
                    </Text>
                  </View>
                  <View style={{ marginRight: 125 }}>
                    <Text style={styles.textoDriverHoras2}>Costo</Text>
                  </View>
                  <View>
                    <Text style={styles.textoDriverHoras2}>Total</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.lineaResumen}></View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                fontSize: 11,
                fontWeight: "black",
                marginBottom: 20,
              }}
            >
              <Text style={{ left: 2, color: "Black" }}>Sub Total</Text>
              <Text style={{ right: 2 }}>250.000</Text>
            </View>
          </>
        ) : (
          <></>
        )}

        {dataDriver?.length > 0
          ? dataDriver.map((element) =>
              element.payType === "extraDriver" ? (
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      width: "90%",
                      left: 60,
                      fontSize: 11,
                      marginLeft: 145,
                    }}
                  >
                    <Text style={{ left: 50 }}>{element.zone}</Text>
                    <Text style={{ left: 95 }}>{element.payType}</Text>
                    <Text style={{ left: 200 }}>{element.totalRequest}</Text>
                    <Text style={{ left: 350 }}>{element.workTimeMinute}</Text>
                    <Text style={{ left: 465 }}>
                      {formatoGuaranies.format(element.amount)}
                    </Text>
                  </View>
                </View>
              ) : null
            )
          : null}

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            fontSize: 11,
            fontWeight: "black",
            marginBottom: 20,
            borderBottomColor: "#3fc05f",
            borderBottomWidth: 1,
          }}
        >
          <Text style={{ left: 2, color: "Black" }}>Total a Cobrar</Text>
          <Text style={{ right: 2 }}>550.000</Text>
        </View>
        <View
          style={{
            borderBottomColor: "#3fc05f",
            borderBottomWidth: 1,
            bottom: 19,
          }}
        ></View>

        {/*   <Text
              style={styles.pageNumber}
              render={({ pageNumber, totalPages }) =>
                `${pageNumber} / ${totalPages}`
              }
              fixed
            /> */}
      </Page>
    </Document>
  );
};

// // Agrega las fuentes asi pdf-react
// Font.register({
//   family: "Muli",
//   source: "../assets/font/Muli-bold.ttf",
// });

// los estilos css
const styles = StyleSheet.create({
  body: {
     paddingRight: 5
  },

  lineaResumen: {
    marginTop: 20,
    marginBottom: 5,
    borderBottomColor: "#3fc05f",
    borderBottomWidth: 1,
  },

  texto: {
    color: "#3fc05f",
    fontWeight: "black",
    fontSize: "13",
    textAlign: "center",
  },
  texto2: {
    fontWeight: "black",
    fontSize: "10",
    textAlign: "center",
  },
  textoDriver: {
    color: "#3fc05f",
    fontSize: "11",
    textAlign: "left",
    marginLeft: 3,
  },
  textoDriverHoras: {
    color: "#3fc05f",
    fontSize: "11",
    textAlign: "center",
    marginLeft: 3,
    left: 48,
  },
  textoDriverHoras2: {
    color: "#3fc05f",
    fontSize: "11",
    marginLeft: 2,
  },

  cabezera: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  rectangulo: {
    width: 160,
    height: 40,
    fontSize: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderWidth: 1,
    backgroundColor: "#162329",
  },
  rectangulo2: {
    width: 247,
    height: 40,
    fontSize: 10,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 80,
    borderWidth: 2,
    borderLeftColor: "#3fc05f",
    borderBottomColor: "#3fc05f",
    borderRightColor: "#3fc05f",
    borderTopColor: "white",
  },
  rectangulo3: {
    width: 90,
    height: 15,
    fontSize: 10,
    marginVertical: 20,
    borderWidth: 1,
    backgroundColor: "#162329",
  },
  rectanguloDriver: {
    backgroundColor: "#162329",
  },
  rectangulohoras: {
    backgroundColor: "#162329",
    width: "26.5cm",
    left: 90,
    height: 15,
    borderTopColor: "#3fc05f",
    borderLeftColor: "#3fc05f",
    borderRightColor: "#3fc05f",
    borderWidth: 1,
  },
  rectangulohoras2: {
    backgroundColor: "#162329",
    width: "26.5cm",
    left: 90,
    height: 15,
    borderColor: "#3fc05f",
    borderWidth: 1,
  },
  rectangulohoras3: {
    backgroundColor: "#162329",
    width: "70%",
    marginLeft: 250,
    paddingLeft: 8,
    height: 15,
    borderColor: "#3fc05f",
    borderWidth: 1,
  },

  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});

export default PdfVista;

// ReactPDF.render(<Pdf />)
