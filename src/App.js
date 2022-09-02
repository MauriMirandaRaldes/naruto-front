import React, { useEffect, useState } from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom"
// Paginas
import Home from "./paginas/Home"
import Detalles from "./paginas/Detalles"
import Comentarios from "./paginas/Comentarios";
import SignUpYSignIn from "./paginas/signUp&signIn";
import SignUp from "./paginas/SignUp"
import SignIn from "./paginas/SignIn"
import Bienvenida from "./paginas/Bienvenida";
import Habilidades from "./paginas/Habilidades";
import Practica from "./paginas/Detalles2";
import Cards from "./componentes/cards"
// Redux
import usuariosActions from "./redux/actions/usuariosActions";
import {useDispatch, useSelector} from "react-redux"
// Mui
import SwipeUpAltIcon from '@mui/icons-material/SwipeUpAlt';
import SwipeDownAltIcon from '@mui/icons-material/SwipeDownAlt';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import RamenDiningIcon from '@mui/icons-material/RamenDining';

function App() {

  const dispatch = useDispatch()
  const usuario = useSelector(store => store.usuariosReducers.usuario)
  const mensaje = useSelector(store => store.usuariosReducers.mensajeSignIn)
  const [alerta, setAlerta] = useState()
  const [alerta2, setAlerta2] = useState()
  const [reload, setReload] = useState(false)

  useEffect(()=> {

    if (localStorage.token !== null){
      const token = localStorage.token
      dispatch(usuariosActions.verificarToken(token)) // si cuando se carga la pagina hay un token en el storage, se lo pasamos a las actions, más especificamente, se lo pasamos por parámetro a la funcion verificarToken
    }

  },[])

  //-----------boton para deslogearse---------------

  function enviarEmail(){

    const email = usuario.email

    dispatch(usuariosActions.salirUsuario(email))

    setTimeout(() => {
      setAlerta2("Account disconected")
    }, 0);
    setTimeout(() => {
      setAlerta2("")
    }, 4000);

  }

  if(usuario){
    if(mensaje){
      const time = setTimeout(() => {
        setAlerta(mensaje)
      }, 0);
      const time2 = setTimeout(() => {
        setAlerta("")
      }, 5000);
      if(alerta === ""){
        clearTimeout(time)
        clearTimeout(time2)
      }
    }
  }

  function ocultarDiv (){
    let divConected = document.getElementById("div-userConected")

    if (divConected.classList.length > 1){

      console.log("No es lo que buscamos")

    } else {

      if (divConected.classList[0] === "div-usuarioConectado"){
        divConected.classList.remove("div-usuarioConectado")
        divConected.classList.add("nuevaClase")
      } else {
        divConected.classList.remove("nuevaClase")
        divConected.classList.add("div-usuarioConectado")
      }

    }

    setReload(!reload)

  }

  return (

    <div>

    {usuario? !reload? <SwipeUpAltIcon className="button-hidden" onClick={ocultarDiv}></SwipeUpAltIcon> : <SwipeDownAltIcon className="button-hidden2" onClick={ocultarDiv}></SwipeDownAltIcon> : null}

    {usuario? <div id="div-userConected" className="div-usuarioConectado">
                       <img src={usuario.foto} />
                       <div className="div-container-nombre-y-button">
                       <h4>{usuario.nombre} <RamenDiningIcon className="custom-ramen" /> </h4>
                       <button onClick={enviarEmail}>DISCONECT <ExitToAppIcon className="custom-exit" /></button>
                       </div>
                       </div>
                       :
                       null}

    {alerta? <p className="custom-mensaje-usuarioConectado">{alerta}</p> : null}
    {alerta2? <p className="custom-mensaje-usuarioDesconectado">{alerta2}</p> : null}
                 
    <Routes>
      <Route path="*" element={<Home/>}/>
      <Route path="/cards" element={<Cards/>}/>
      <Route path="/practica" element={<Practica/>}/>
      <Route path="/:id" element={<Detalles/>}/>
      <Route path="/habilidades/:id" element={<Habilidades/>}/>
      {/* <Route path="/:id" element={<Detalles2/>}/> */}
      <Route path="/comentarios" element={<Comentarios/>}/>
      {usuario? null : <Route path="/signUpYsignIn" element={<SignUpYSignIn/>}/>}
      {/* -------sign in y sign up--------- */}
      {usuario? null : <Route path="/signUp" element={<SignUp/>}/>}
      <Route path="/signIn" element={<SignIn/>}/>
      {/* -------Redireccionamiento al confirmar email------ */}
      <Route path="/bienvenida" element={<Bienvenida/>}/>
    </Routes>

    </div>
  
  );
  
}

export default App;
