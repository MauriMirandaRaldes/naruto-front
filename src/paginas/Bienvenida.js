import React from "react";
import "../estilos/bienvenida.css";
import {Link as LinkRouter} from "react-router-dom"
import ranaNaruto from "../assets/rana-naruto.png"

function Bienvenida() {
  return (
    <div className="div-container-bienvenida">

        <div className="div1-bienvenida">
        <div className = "container-titulo-bienvenida">
        <h1>
          Bienvenido a la comunidad
        </h1>
      </div>
        </div>
        <div className="div2-supremo-bienvenida">
        <div className="div2-bienvenida">
            <img src = {ranaNaruto}/>
        </div>
        </div>
      <div className="container-button-bienvenida">
        <LinkRouter to = {"/signIn"}>
        <button>
            Viajar a Sign in
        </button>
        </LinkRouter>
      </div>

    </div>
  );
}

export default Bienvenida;
