import axios from "axios"

const personajesActions = {

    obtenerPersonajes: ()=> {
        return async (dispatch, getState)=> {
            try {
                var miData = await axios.get("https://naruto-back-6kyel9ibi-maurimirandaraldes.vercel.app//api/misPersonajes")
                console.log(miData.data.respuesta)
                dispatch(
                    {
                        type: "todos",
                        payload: miData.data.respuesta
                    }
                )
            } catch (error){
                console.log(error)
            }
        }
    },

    obtenerUnPersonaje: (recibiendoId)=> {
        return async (dispatch, getState)=> {
            try {
                var miData = await axios.get(`https://naruto-back-6kyel9ibi-maurimirandaraldes.vercel.app//misPersonajes/${recibiendoId}`)

                dispatch(
                    {
                        type: "unoSolo",
                        payload: miData.data.respuesta
                    }
                )
            } catch(error){
                console.log(error)
            }
        }
    },

    likeDislike: (recibiendoId)=> {

        const token = localStorage.token

        return async (dispatch, getState)=> {

            try {
                var miData = await axios.put(`https://naruto-back-6kyel9ibi-maurimirandaraldes.vercel.app//api/misPersonajes/${recibiendoId}`,{}, {headers: {"Authorization": "Bearer " + token}})
                // console.log(miData.data)
                return miData
            } catch (error){
                console.log(error)
            }

        }

    }

}

export default personajesActions