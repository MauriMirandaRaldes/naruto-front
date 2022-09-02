import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {Link as LinkRouter} from "react-router-dom"
import "../estilos/detalles.css"
// Redux
import {useSelector} from "react-redux"

function Habilidades() {

  const { id } = useParams();
  const unPersonaje = useSelector((store) => store.personajesReducers.lista.filter((elemento) => elemento._id === id));
  console.log(unPersonaje)

  return(
    <div className="container-habilidades">

        <div className="sub-container-habilidades-2">
            <h1>{unPersonaje? unPersonaje[0].nombre : "cargando"}</h1>
            <img className="custom-img2-habilidades" src={unPersonaje? unPersonaje[0].imagen2 : null} />
            <div className="container-linkrouters">
                <LinkRouter to={`/${unPersonaje[0]._id}`} >
                  <button>Back</button>
                </LinkRouter>
                <LinkRouter to="/cards" >
                  <button>Back Home</button>
                </LinkRouter>
            </div>
        </div>

        <div className="sub-container-habilidades">
            <div className="div1-habilidades">
                <p>{unPersonaje? unPersonaje[0].detallesPj[0].habilidades.habilidad1 : "cargando"}</p>
                <img className="custom-img-habilidades" src={unPersonaje? unPersonaje[0].detallesPj[0].habilidades.imagen1 : "cargando"} />
            </div>
            <div className="div1-habilidades">
                <p>{unPersonaje? unPersonaje[0].detallesPj[0].habilidades.habilidad2 : "cargando"}</p>
                <img className="custom-img-habilidades" src={unPersonaje? unPersonaje[0].detallesPj[0].habilidades.imagen2 : "cargando"} />
            </div>
            <div className="div1-habilidades">
                <p>{unPersonaje? unPersonaje[0].detallesPj[0].habilidades.habilidad3 : "cargando"}</p>
                <img className="custom-img-habilidades" src={unPersonaje? unPersonaje[0].detallesPj[0].habilidades.imagen3 : "cargando"} />
            </div>
        </div>

    </div>
  )
}

export default Habilidades;
