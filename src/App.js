import { Pdf } from "./componentes/Pdf";
import "./App.css";
import axios from "axios";

import {  PDFViewer } from "@react-pdf/renderer";
import PdfVista from "./componentes/PdfVista";
import { useEffect, useState } from "react";

function App() {

  const url =
  "https://api-develop.monchis-drivers.com/dashboard/get_driver_payment_by_id?start_date=2021-02-01+00:00:00&end_date=2021-02-15+23:59:59&driver_id=5f8d7f40c1c4520008ecc6b9";
  const sessionToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYmU4ZjI0YzAzOTg1MDAwODE3MjYyNiIsImlhdCI6MTYxMzU4ODM3NiwiZXhwIjoxOTI4OTQ4Mzc2fQ.Hq9mqWAUf1m1DBQCBkK4yktBWYNqclRwJzJRlF6o3z8"
  axios.defaults.headers.common["Authorization"] = sessionToken;
  const [driverPayments, setDriverPayments] = useState();

  useEffect(  () => {
  const consultarApi = async () => {
    try {
      const respuesta = await axios.get(url);
      setDriverPayments(respuesta.data.data[0]);
      console.log(respuesta.data.data[0]);
    } catch (error) {
      console.log(error);
    }
  };
     consultarApi();
  }, []); 



  return (
    <>
       { driverPayments ? <PDFViewer width="100%" height="700">
         <PdfVista
            driverPayments={driverPayments}
         />
     </PDFViewer> : "Espera un Momento generando PDF" }
   </>
     
  );
}

export default App;
