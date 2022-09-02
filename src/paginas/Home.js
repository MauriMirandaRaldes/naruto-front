import React from "react";
import "../estilos/home.css";
import { Link as LinkRouter } from "react-router-dom";
// assets
import videoNaruto from "../assets/naruto-video.mp4";

function Home() {
  return (
    <div className="div-contenedor-home">
      <div className="div1-home">
        <div className="container-linkrouter">
          <LinkRouter className="decoration-none" to={"/cards"}>
            <h1>NARUTO</h1>
          </LinkRouter>
        </div>
        <video className="custom-video" autoPlay loop muted>
          <source src={videoNaruto} type="video/mp4"></source>
        </video>
      </div>
    </div>
  );
}

export default Home;
