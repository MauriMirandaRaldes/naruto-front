import React,{useEffect, useState} from "react";
import { Link as LinkRouter } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../estilos/signIn.css";
// Mui Material Ui
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
// Redux
import { useDispatch, useSelector } from "react-redux";
import usuariosActions from "../redux/actions/usuariosActions";
// assets
import protagonistas from "../assets/protagonistas.png"

function SignIn() {

  const dispatch = useDispatch();
  const navigate = useNavigate()

  function enviandoDatos(e) {
    e.preventDefault();
    const misDatos = {
      email: e.target[0].value,
      contraseña: e.target[2].value,
      from: "signIn",
    };
    dispatch(usuariosActions.ingresarUsuario(misDatos));
  }

  const mensajeSignIn = useSelector(store => store.usuariosReducers.mensajeSignIn)
  const usuario = useSelector(store => store.usuariosReducers)

  if (usuario.usuario){
    navigate("/cards", { replace: true })
  }

  return (
    <div>
      <div className="div-container-form-signIn">
        <div className="div1-signIn">
          <h2>Your ninja path begins here!</h2>
          <img src={protagonistas} />
        </div>

        <Box
          onSubmit={enviandoDatos}
          className="custom-box-signIn"
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
            {usuario.usuario? null : mensajeSignIn? mensajeSignIn.includes("Welcome")? null : <p className="custom-alerta-signIn">{mensajeSignIn}</p> : null}
            <div className="custom-titulo-signIn">
            <h2>Sign in</h2>
          </div>

          <div className="container-inputs-signIn">
            <TextField
              className="custom-textField-signIn"
              required
              id="outlined-required"
              label="Email"
              type="email"
            />
            <TextField
              className="custom-textField-signIn"
              required
              id="outlined-password-input"
              label="Password"
              type="password"
            />
            <div className="container-button-submit-signIn">
              <button className="custom-button-submit-signIn" type="submit">
                Submit
              </button>
              <LinkRouter to="/signUpYsignIn" >
                    <button className="custom-button-submit-signIn">
                      Back
                    </button>
              </LinkRouter>
            </div>
            <div className = "custom-container-linkrouter-signIn">
              <p>
                You dont have an account? <br/>
                <LinkRouter to={"/signUp"}> Go Sign up</LinkRouter>
              </p>
            </div>
          </div>
        </Box>
      </div>
    </div>
  );
}

export default SignIn;
