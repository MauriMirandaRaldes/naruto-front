import React, { useState } from "react";
// Mui material
import {Snackbar} from "@mui/material"
// Redux
import { useSelector, useDispatch } from "react-redux";

function MiSnackbar(objetoRecibido) { 

  var openTrue = objetoRecibido.objeto.open // se recibe como true, cuando clickeo cambia a false
  const mensaje = objetoRecibido.objeto.mensaje
  const [openFinal, setOpenFinal] = useState(openTrue)

  console.log(openFinal) // CUANDO VUELVO A CASA TENGO QUE TRABAJAR ACA, NECESITO QUE DESPUES DE VOLVERSE FALSE, CUANDO HAGO CLICK SE VUELVA TRUE NUEVAMENTE, PORQUE SI SE QUEDA EN FALSE EL SNACKBAR NO VUELVE A APARECER POR MÁS QUE HAGA CLICK

  function cerrarSnackbar(event: React.SyntheticEvent | Event, reason?: string){
    if (reason === 'clickaway') {
        return;
      }
    setOpenFinal(false)
  }

  return (
    <div>
      <Snackbar
        className="custom-snackbar"
        open={openFinal}
        message={mensaje}
        autoHideDuration={3000}
        onClose={cerrarSnackbar}
      />
    </div>
  );
}

export default MiSnackbar
