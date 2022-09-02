import React, { useState, useEffect } from "react";
import "../estilos/comentarios2.css";
import { Link as LinkRouter } from "react-router-dom";
// Redux
import comentariosActions from "../redux/actions/comentariosActions";
import { useDispatch, useSelector } from "react-redux";
// Mui
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function Comentarios() {
  const dispatch = useDispatch();
  const [reload, setReload] = useState(false);
  const usuario = useSelector((store) => store.usuariosReducers.usuario);
  const todos = useSelector((store) => store.comentariosReducers.todos);
  const [alerta, setAlerta] = useState()
  const [alerta2, setAlerta2] = useState()

  useEffect(() => {
    dispatch(comentariosActions.obtenerComentarios());
    window.scroll(0,0)
  }, [reload]);

  // Post
  async function enviarDatos(e) {
    // importantisimo que éstas funciones sea asyncronas, que espere a que haga el dispatch para ejecutarse
    e.preventDefault();

    if (usuario){
      if (e.target[0].value !== "") {
        var nuevoTexto = e.target[0].value;
        var nuevoObjeto = { texto: nuevoTexto };
        await dispatch(comentariosActions.postearComentario(nuevoObjeto));
        e.target[0].value = "";
        setReload(!reload);
      } else {

        setTimeout(() => {
          setAlerta2("Your must write something for send your comment")
        }, 0);
        setTimeout(() => {
          setAlerta2("")
        }, 3000);

      }
    } else {

      setTimeout(() => {
        setAlerta("Your must log in for send your comment")
      }, 0);
      setTimeout(() => {
        setAlerta("")
      }, 3000);

    }

  }

  // Delete
  async function enviarId(id) {
    let idComentario = id;
    await dispatch(comentariosActions.eliminarComentario(idComentario));
    setReload(!reload);
  }

  // Modificar
  async function modificarComentario(id) {
    // capturamos el id del comentarios que viene por parametro
    let idComentario = id;

    // hago un mapeo a todos y creo el input donde el usuario va a escribir su nuevo comentario, para modificar el anterior
    let mapeo = todos.map((elemento) => {
      if (elemento.creador === usuario.nombre) {
        if (elemento._id === idComentario) {
          // div contenedor
          let divTexto = document.getElementById(`${elemento._id}`);
          let containerButtons = divTexto.querySelectorAll(".divInput"); // lo que traemos de una querySelectorAll se convierte en nodeList

          let filtrado = containerButtons.forEach((elemento) => {
            // Uso forEach porque es una NodeList, el map no funciona
            let buttonModificar = elemento.querySelectorAll("#buttonModificar");
            let buttonEliminar = elemento.querySelectorAll("#buttonEliminar");
            buttonModificar[0].remove();
            buttonEliminar[0].remove();
          });

          // nuevos elementos
          let nuevoDiv = document.createElement("div");
          let input = document.createElement("input");
          let enviar = document.createElement("button");

          // pasandole valores a los nuevos elementos
          input.setAttribute("placeholder", "Modify comment");
          enviar.innerText = "Submit";
          enviar.classList.add("customEnviar");
          input.classList.add("customInput");
          nuevoDiv.classList.add("customNuevoDiv");

          // pasandole hijos al div contenedor
          nuevoDiv.appendChild(input);
          nuevoDiv.appendChild(enviar);
          divTexto.appendChild(nuevoDiv);

          // capturamos lo que el usuario escribe en el input y lo enviamos a comentariosActions
          input.addEventListener("change", function (e) {
            let nuevoTexto = e.target.value;
            dispatch(
              comentariosActions.modificarComentario({
                texto: nuevoTexto,
                id: idComentario,
              })
            );
            input.remove();
            enviar.remove();
            window.location.href = "http://localhost:3000/comentarios";
          });
        }
      }
    });
  }

  console.log(alerta)

  return (
    <div>

      <div className="div-container-comentarios">
      {alerta? <p className="custom-alerta-comentarios">{alerta}</p> : null}
      {alerta2? <p className="custom-alerta-comentarios">{alerta2}</p> : null}
        <div className="container-form-comentarios">
            <form onSubmit={enviarDatos} className="custom-form-comentarios">
              <div className="container-input-comentarios">

              <input placeholder="Write a comment" />
              <button className="custom-button-comentarios" type="submit">Submit</button>

              </div>
            <div className="container-2buttons">
            <LinkRouter to="/cards">
              <button className="botonVolver">Back</button>
            </LinkRouter>
            </div>
            </form>
        </div>

        <div className="container-comentarios">
          {usuario
            ? todos.length > 0
              ? todos.map((elemento) => {
                  if (usuario.nombre === elemento.creador) {
                    var render = (
                      <div
                        id={`${elemento._id}`}
                        key={elemento._id}
                        className="div-nuevoComentario"
                      >
                        <div className="divInfo2">
                          <div className="subDivInfo1">
                            <img src={elemento.foto} />
                          </div>
                          <div className="subDivInfo2">
                            <p className="custom-p-creador">{elemento.creador}</p>
                            <p className="customFecha">{elemento.fecha}</p>
                          </div>
                        </div>
                        <div className="divTexto">
                          <p id="parrafoComentario">{elemento.texto}</p>
                        </div>
                        <div className="divInput">
                          <button
                            id="buttonModificar"
                            onClick={() => modificarComentario(elemento._id)}
                          >
                            Edit <EditIcon className="custom-icon"/>
                          </button>
                          <button
                            id="buttonEliminar"
                            onClick={() => enviarId(elemento._id)}
                          >
                            Delete <DeleteIcon className="custom-icon"/>
                          </button>
                        </div>
                      </div>
                    );
                    return render;
                  } else {
                    var render = (
                      <div key={elemento._id} className="div-nuevoComentario2">
                        <div className="divInfo2">
                          <div className="subDivInfo1">
                            <img src={elemento.foto} />
                          </div>
                          <div className="subDivInfo2">
                            <p className="custom-p-creador">{elemento.creador}</p>
                            <p className="customFecha">{elemento.fecha}</p>
                          </div>
                        </div>
                        <div className="divTexto2" id="divTexto">
                          <p id="parrafoComentario">{elemento.texto}</p>
                        </div>
                      </div>
                    );
                    return render;
                  }
                })
              : null
            : todos.map((elemento) => {
                var render = (
                  <div key={elemento._id} className="div-nuevoComentario2">
                    <div className="divInfo2">
                      <div className="subDivInfo1">
                        <img src={elemento.foto} />
                      </div>
                      <div className="subDivInfo2">
                        <p className="custom-p-creador">{elemento.creador}</p>
                        <p className="customFecha">{elemento.fecha}</p>
                      </div>
                    </div>
                    <div className="divTexto2" id="divTexto">
                      <p id="parrafoComentario">{elemento.texto}</p>
                    </div>
                  </div>
                );
                return render;
              })}
        </div>
      </div>
    </div>
  );
}

export default Comentarios;
