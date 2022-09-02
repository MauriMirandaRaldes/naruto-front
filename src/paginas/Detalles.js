import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../estilos/detalles.css";
import {Link as LinkRouter} from "react-router-dom"
// Redux
import { useSelector, useDispatch } from "react-redux";
import personajesActions from "../redux/actions/personajesActions";
// Mui
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

function Detalles() {
  
  const { id } = useParams();
  const dispatch = useDispatch()
  const [alerta, setAlerta] = useState()

  const usuario = useSelector(store => store.usuariosReducers.usuario) // la constante usuario tengo que usarla para que solamente pueda dar like un usuario que esté logeado
  const unPersonaje = useSelector(store => store.personajesReducers.lista.filter(elemento => elemento._id === id))

  const [likes, setLikes] = useState(unPersonaje[0].likes) // Como estado inicial le paso el estado de los likes que estan en la base de datos del personaje en cuestión

  useEffect(()=>{ // TENGO QUE AVERIGUAR UNA MANERA DE QUE SE ACTUALICE EL ESTADO DE unPersonaje CUANDO HAGO CLICK EN EL BOTÓN PARA DAR LIKE, CUANDO EL RELOAD CAMBIA DE ESTADO LO QUE ESTÁ DENTRO DEL useEffect SE ACTUALIZA, PERO NO PUEDO METER LA CONST unPersonaje AHÍ YA QUE ME TIRA ERROR, Y TAMPOCO PUEDO USAR EL useSelector DENTRO DEL useEffect
    window.scroll(0,0)
  },[])
  
  async function darLike(){ // Nota mental: tengo que aprender más a profundidad sobre el async await, ya que en éste caso me funcionó solamente usando async await. Usando una functio normal no me funcionaba
    
    if (usuario !== undefined && usuario !== null){
      const despachando = await dispatch(personajesActions.likeDislike(unPersonaje[0]._id)) // para que funcione hay que pasar el id despues de hacer el click. Antes estaba pasandole el id al mismo tiempo que hacía click por parámetro, pero no estaba funcionando como quería
      setLikes(despachando.data.respuesta)
    }

  }

  function crearAlerta(){

    setTimeout(() => {
      setAlerta("Your must login for send your like")
    }, 0);
    setTimeout(() => {
      setAlerta("")
    }, 3000);

  }

  return (
    <div>

      {alerta? <p className="custom-alerta-detalles">{alerta}</p> : null}
    
      <div className="div1-detallesPj">
        <div className="div1-chiquito-detallesPj">
          <h1>{unPersonaje ? unPersonaje[0].nombre : "cargando"}</h1>
          <h2>{unPersonaje ? unPersonaje[0].aldea : "cargando"}</h2>
          <p>{unPersonaje ? unPersonaje[0].historia : "cargando"}</p>

          <div className="container-likes-y-habilidades">
          <div className="custom-container-likes" onClick={darLike}>
            {usuario? unPersonaje? likes? likes.includes(usuario.id)? <FavoriteIcon className="custom-like"/> : <FavoriteBorderIcon className="custom-like"/> : null : null : <FavoriteBorderIcon className="custom-like" onClick={crearAlerta} />}
            <p className="customLike">{likes !== undefined? likes.length : 0}</p>
          </div>
          <div className="container-linkrouters-detalles">
            <LinkRouter to={`/habilidades/${unPersonaje[0]._id}`} >
              <button>Habilities</button>
            </LinkRouter>
            <LinkRouter to={`/cards`} >
              <button>Back</button>
            </LinkRouter>
          </div>
          </div>

        </div>
        {/* <div className="div2-chiquito-detallesPj">
          <img
            alt={unPersonaje[0].imagen}
            src={unPersonaje ? unPersonaje[0].imagen : "cargando"}
          />
        </div> */}
      </div>
    </div>
  );
}

export default Detalles;
