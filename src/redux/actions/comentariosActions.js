import axios from "axios"

const comentariosActions = {

    postearComentario: (recibiendoComentario)=> {

        const token = localStorage.token
        
        return async (dispatch, getState)=> {
            try {
                var miData = await axios.post("http://localhost:4000/api/misComentarios", recibiendoComentario, {headers: {"Authorization": "Bearer " + token}})
                console.log(miData)
                
                dispatch(
                    {
                        type: "posteandoComentario",
                        payload: {
                            texto: miData.data.respuesta.texto,
                        }
                    }
                )

            } catch(error){
                console.log(error)
            }
        }
    },

    obtenerComentarios: ()=> {

        return async (dispatch, getState)=> {
            var miData = await axios.get("http://localhost:4000/api/misComentarios")
            // console.log(miData)
            dispatch(
                {
                    type: "todos",
                    payload: miData.data.respuesta
                }
            )
        }
    },

    eliminarComentario: (recibiendoId)=> {

        const token = localStorage.token

        return async (dispatch, getState)=> {
            try {
                var miData = await axios.delete(`http://localhost:4000/api/misComentarios/${recibiendoId}`, {headers: {"Authorization": "Bearer " + token}})
                console.log(miData)
            } catch(error){
                console.log(error)
            }
        }
    },

    modificarComentario: (recibiendoInfo)=> {
        const idRecibido = recibiendoInfo.id
        const textoRecibido = recibiendoInfo.texto
        const token = localStorage.token // Si la información no llega a los controladores, es decir, si no pasa passport es porque no detectó ningún token

        return async (dispatch, getState)=> {
            try {
                var miData = await axios.put(`http://localhost:4000/api/misComentarios/${idRecibido}`, {textoRecibido}, {headers: {"Authorization":"Bearer " + token} })
                console.log(miData)
                
            } catch (error){
                console.log(error)
            }
        }
    }

}

export default comentariosActions