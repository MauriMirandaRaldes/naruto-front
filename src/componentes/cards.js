import React, { useEffect, useState } from "react";
import { Link as LinkRouter } from "react-router-dom";
import "../estilos/cards.css"
// assets
import naruto_dibujo from "../assets/naruto-dibujo.png"
import jiraiya from "../assets/jiraiya.png"
// Redux
import personajesActions from "../redux/actions/personajesActions";
import { useDispatch, useSelector } from "react-redux";
// mui material ui
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function Cards() {

  const dispatch = useDispatch();
  const usuario = useSelector(store => store.usuariosReducers.usuario)

  useEffect(() => {
    dispatch(personajesActions.obtenerPersonajes());
  }, []);

  const personajes = useSelector(
    (elemento) => elemento.personajesReducers.lista
  );

  //-----obtenerUnPersonaje------

  function detalles(id) {
    dispatch(personajesActions.obtenerUnPersonaje(id));
  }

  return (
    <div className="container-general-cards">

      <div className="container-info-cards">
        <div className="container-p-cards">
        <p>
        Naruto is a Japanese animated series based on the manga of the same name, written and illustrated by Masashi Kishimoto. The work tells the story of a teenage orphan ninja named Naruto Uzumaki, whose parents died in the attack of the Nine-Tailed Demon Fox, and who aspires to become Hokage (leader of his village) in order to be recognized as someone important within. of the village and among their peers.
        The series is based on a one-shot that Kishimoto made in August 1996 for the Akamaru Jump magazine. As of November 1999, Naruto is published by Shūeisha in the Japanese weekly magazine Shōnen Jump and has been collected since then. in seventy-two volumes. The success of the manga led its plot to be adapted into an anime produced by Pierrot and distributed by Aniplex, which was broadcast on the TV Tokyo television network on October 3, 2002. The first season lasted 220 episodes, and shortly after it was created a sequel, Naruto: Shippūden, which began broadcasting on February 15, 2007. In addition, Pierrot has produced nine films based on the series, both the first and second seasons, as well as several original animations. Other pieces of merchandise include a set of light novels, artbooks, video games and collector's cards developed by different companies. On October 6, 2014, with only five publications to go, the end for the manga was announced, which concluded on November 10, 2014.
        Both the manga and the anime have reached notable distribution in other countries: the manga is published in more than thirty-five countries and the anime is broadcast in more than sixty. The Spanish versions are published by the publishing house Ediciones Glénat in Spain, Larp Editores in Argentina, and Grupo Editorial Vid in Mexico and the rest of Latin America. Currently and after the closure of Glénat in Spain, the distribution of the manga became part of Planeta de Agostini Cómics. While VIZ Media handles English distribution, where it has become one of the company's most successful publications. The delay involved in translation and adaptation has encouraged its distribution on the Internet (through scanlation and fansub) shortly after appearing in Japan, with which the work is spread long before it is officially translated in other countries.
        </p>
        </div>
        <div className="container-button-cards">
          <div className="container-button-go">

            {usuario?    <LinkRouter className="custom-linkrouter-cards" to = "/cards">
              <button>Be a ninja!
                <img className="custom-naruto-dibujo" src={naruto_dibujo} />
              </button>
            </LinkRouter> :    <LinkRouter className="custom-linkrouter-cards" to = "/signUpYsignIn">
              <button>Be a ninja!
                <img className="custom-naruto-dibujo" src={naruto_dibujo} />
              </button>
            </LinkRouter>}

          </div>
        </div>
      </div>

      <div className="container-cards">

        <div className="container-h2-cards">
          <h2>TEAM 7<span className="custom-span">Team 7 was a Konohagakure team formed under the leadership of Kakashi Hatake. Two-and-a-half years after Sasuke Uchiha left the village, Kakashi filled out paperwork to form Team Kakashi, with his former pupils Naruto Uzumaki and Sakura Haruno now being treated as equals alongside their teacher.</span></h2>
        </div>

        <div className="sub-container-cards">

        {personajes.map((elemento) => {

var render = (

<Card className="card" key={elemento._id}>
  <CardMedia
    className="custom-media"
    component="img"
    height="200"
    image={elemento.imagen}
    alt={elemento.imagen}
  />
  <CardContent className = "cardContent">
    <Typography className="custom-content" gutterBottom variant="h5" component="div">
      {elemento.nombre}
    </Typography>
    <Typography className="custom-content" gutterBottom variant="h6" component="div">
      {elemento.aldea}
    </Typography>
  </CardContent>
  <CardActions className="cardActions">
    <LinkRouter to={`/${elemento._id}`}>
      <button className="buttonDetalles" onClick={() => detalles(elemento._id)}>Details</button>
    </LinkRouter>
  </CardActions>
</Card>

);

return render;
})}

        </div>

      </div>

      <div className="div2-home">
        <div className="div-container-button-comments">
          <LinkRouter className="none" to="/comentarios">
          <button>Leave your <br/> comment
            <img className="custom-jiraiya" src={jiraiya} />
          </button>
          </LinkRouter>
        </div>
      </div>


    </div>
  );
}

export default Cards;
