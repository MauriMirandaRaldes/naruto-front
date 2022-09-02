import React,{useState, useEffect} from "react";
import { Link as LinkRouter } from "react-router-dom";
import "../estilos/signUp.css";
import konoha from "../assets/konoha.png"
// Mui Material Ui
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
// Redux
import usuariosActions from "../redux/actions/usuariosActions";
import { useDispatch, useSelector } from "react-redux";
// Snackbar
import MiSnackbar from "../componentes/snackbar"

function SignUp() {

  const dispatch = useDispatch();
  const [alerta, setAlerta] = useState()
  const [alerta2, setAlerta2]=useState()

  // const [files, setFiles] = useState([])

  var formulario = document.getElementById("formulario");

  async function enviandoDatos(e) {
    
    e.preventDefault();

    if (e.target[0].value === "" || e.target[2].value === "" || e.target[4].value === "" || e.target[6].value === "" || e.target[8].value === ""){

    const nuevaAlerta = "You must complete all the fields"

    setTimeout(() => {
      setAlerta(nuevaAlerta)
    }, 0);
    setTimeout(() => {
      setAlerta("")
    }, 3000);

    } else { // Si todos los campos fueron llenados capturo los datos y los envío a mis usuariosActions

      // const foto = await files[0]
      // const formData = new FormData()
      // formData.append("foto", foto)

      const misDatos = {
        nombre: e.target[0].value,
        apellido: e.target[2].value,
        email: e.target[4].value,
        contraseña: e.target[6].value,
        foto: e.target[8].value,
        from: "signUp",
      };
  
      dispatch(usuariosActions.agregarUsuario(misDatos)); // Le paso el objeto misDatos por parámetro a usuariosActions
      // dispatch(usuariosActions.cargarFoto(formData))
    }
  }

  var mensajeSignUp = useSelector(
    (store) => store.usuariosReducers.mensajeSignUp
  );

  if (mensajeSignUp !== null && typeof mensajeSignUp !== "string") { // Si mensajeSignUp es un array

    if (mensajeSignUp.length > 0){

      formulario.classList.add("custom-formulario2");

    }

  } else if (typeof mensajeSignUp === "string" && mensajeSignUp ==="We sent you an email to validate it, please check your mailbox" || mensajeSignUp === "You have already made your sign up by this means, please sign in"){

    formulario.classList.remove("custom-formulario2") // si al usuario le salta algun error de validacion, a formulario se le coloca la clase "custom-formulario2", si el usuario arregla esos errores y realiza correctamente el registro borramos la clase "custom-formulario2" y le colocamos la clase "custom-formulario", que es la que hace que el formulario se traslade hacia la derecha

    formulario.classList.add("custom-formulario");

    // console.log(formulario)

  }

  if (mensajeSignUp){
    if (typeof mensajeSignUp === "string"){

      const time = setTimeout(() => {
        setAlerta2(mensajeSignUp)
      },0);
      const time2 = setTimeout(() => {
        setAlerta2("")
      },4000);
  
      if (alerta2 === ""){
        clearTimeout(time)
        clearTimeout(time2)
      }

    }
  }

  return (
    <div>
      <div className="div-container-form-signUp">
        <div className="container-box-signUp">
          {mensajeSignUp ===
            "We sent you an email to validate it, please check your mailbox" ||
          (mensajeSignUp ===
            "You have already made your sign up by this means, please sign in" &&
            mensajeSignUp !== "Something went wrong, please try again") ? (
            <Box
              id = "miBox"
              onSubmit={enviandoDatos}
              className="custom-box"
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <div id="formulario" className="container-inputs">
                <TextField
                  disabled
                  required
                  id="outlined-required"
                  label="Name"
                  type="text"
                />
                <TextField
                  disabled
                  required
                  id="outlined-required"
                  label="Last Name"
                  type="text"
                />
                <TextField
                  disabled
                  required
                  id="outlined-required"
                  label="Email"
                  type="email"
                />
                <TextField
                  disabled
                  required
                  id="outlined-password-input"
                  label="Password"
                  type="password"
                />
                   <TextField
                  disabled
                  required
                  id="outlined-password-input"
                  label="Photo URL"
                  type="text"
                />
              </div>
              <div className="div-nuevo-signUp">
              {/* {fotoPerfil? <img src={`../../backend/storage/${fotoPerfil}`} /> : <p>no hay foto</p>} */}
                <LinkRouter className="none" to={"/signIn"}>
                  <button>Click here
                    <img className="custom-konoha2" src={konoha} />
                    to go Sign in
                  </button>
                </LinkRouter>
                {/* {mensajeSignUp? typeof mensajeSignUp === "string"? <p className="custom-alerta">{mensajeSignUp}</p> :null :null} */}
                {alerta2? <p className="custom-alerta">{alerta2}</p> : null}
                {/* {alerta2? <p className="custom-alerta">{alerta2}</p> : null} */}
              </div>
            </Box>
          ) : (
            <Box
              onSubmit={enviandoDatos}
              id = "miBox"
              className="custom-box"
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
                <div id = "titulo-signUp" className="div1-signUp">
          <h2>Sign Up</h2>
        </div>
              <div id="formulario" className="container-inputs">
                <TextField
                  className="custom-textField"
                  required
                  id="outlined-required"
                  label="Name"
                  type="text"
                />
                <TextField
                className="custom-textField"
                  required
                  id="outlined-required"
                  label="Last Name"
                  type="text"
                />
                <TextField
                className="custom-textField"
                  required
                  id="outlined-required"
                  label="Email"
                  type="email"
                />
                <TextField
                className="custom-textField"
                  required
                  id="outlined-password-input"
                  label="Password"
                  type="password"
                />
                   <TextField
                   className="custom-textField"
                  required
                  id="outlined-required"
                  label="Photo URL"
                  type="text"
                />
                  {/* <TextField
                  required
                  id="outlined-password-input"
                  type="file"
                  onChange={(e)=> setFiles(e.target.files)}
                /> */}
                <div className="container-button-submit-signUp">
                  <button className="custom-button-submit-signUp" type="submit">
                    Submit
                  </button>
                  <LinkRouter to="/signUpYsignIn" >
                    <button className="custom-button-submit-signUp">
                      Back
                    </button>
                  </LinkRouter>
                </div>
                {/*El boton tipo submit refrescar la pagina porque envia los datos del formulario, en este caso de todoo el componente Box */}
              </div>
            </Box>
          )}

          <div className="container-img-signUp">
          {mensajeSignUp? typeof mensajeSignUp !== "string"? mensajeSignUp.length > 0? mensajeSignUp.map(elemento =><p key={elemento.path[0]}>{elemento.message}</p>):null:null:null}
          {alerta? <p>{alerta}</p> : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
