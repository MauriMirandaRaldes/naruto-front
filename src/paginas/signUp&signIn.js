import React, {useState} from "react";
import "../estilos/signUpYsignIn.css";
import { Link as LinkRouter } from "react-router-dom";
import konoha from "../assets/konoha.png"

function SignUpYSignIn() {

  return (
    <div className="div-container-supremo-registro">

      <div className="div-container-registro">
        <div className="div1-registro">
          <h2>
            Sign up and become a real ninja
          </h2>
          <img className="custom-konoha" src={konoha} />
          <LinkRouter to = {"/signUp"}>
          <button className="custom-button">Sign Up</button>
          </LinkRouter>
        </div>
        <div className="div1-registro">
          <h2>Are you already a ninja? then Sign in</h2>
          <img className="custom-konoha" src={konoha} />
          <div className="container-linkrouters-signIn">
          <LinkRouter to = {"/signIn"}>
            <button className="custom-button">Sign In</button>
          </LinkRouter>
          <div>
          <LinkRouter to={"/cards"}>
          <button className="custom-button-volver">Back</button>
          </LinkRouter>
          </div>
          </div>
        </div>
      </div>

    </div>

  );
}

export default SignUpYSignIn;
