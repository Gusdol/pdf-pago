/* import React, { useEffect, useState } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import axios from "axios";
import PdfVista from './PdfVista';

export const Pdf = () => {
  const url =
    "https://api-develop.monchis-drivers.com/dashboard/get_driver_payment_by_id?start_date=2021-02-08+00:00:00&end_date=2021-02-11+23:59:59&driver_id=5f887770f68a150007376919";
 const sessionToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYmU4ZjI0YzAzOTg1MDAwODE3MjYyNiIsImlhdCI6MTYxMzU4ODM3NiwiZXhwIjoxOTI4OTQ4Mzc2fQ.Hq9mqWAUf1m1DBQCBkK4yktBWYNqclRwJzJRlF6o3z8"
 axios.defaults.headers.common["Authorization"] = sessionToken;
  const [driver, setDriver] = useState([]);


     useEffect(  () => {
    const consultarApi = async () => {
      try {
        const respuesta = await axios.get(url);
        setDriver(respuesta.data.data[0].driver);
        console.log(respuesta.data.data[0].driver);
      } catch (error) {
        console.log(error);
      }
    };
       consultarApi();
  }, []); 

  const { first_name } = driver;
  console.log(first_name)
 
  return (
    <>
  
    { driver ? <PDFViewer width="100%" height="700">
         <PdfVista 
            driver={driver}
         />
     </PDFViewer> : "Espera un Momento generando PDF" }
   </>
  );
}

// ReactPDF.render(<Pdf />)
 */