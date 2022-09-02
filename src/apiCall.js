import axios from "axios";

export const obtenerPersonajes = async function () {

  try {
    var misDatos = await axios.get("http://localhost:4000/api/misPersonajes");
    return misDatos;
  } catch (error) {
    throw error;
  }
  
};
