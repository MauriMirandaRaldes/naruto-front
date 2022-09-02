import axios from "axios"

const usuariosActions = {

    agregarUsuario: (recibiendoObjeto)=> {

        console.log(recibiendoObjeto)

        return async (dispatch, getState)=> {
            try {
              var miData = await axios.post("http://localhost:4000/api/auth/misUsuarios", recibiendoObjeto )
              // console.log(miData) coloco este console log para que las res.json de los controladores me tiren la info en pantalla, en la consola

              dispatch(
                {
                    type: "signUp",
                    payload: miData.data.mensaje
                }
              )

            } catch(error){
                console.log(error)
            }
        }
    },

    // cargarFoto: (recibiendoFoto)=> {
    //     return async (dispatch, getState)=> {
    //         try {
    //             var miData = await axios.post("http://localhost:4000/api/auth/misUsuarios/cargarFoto", recibiendoFoto)
    //             console.log(miData)
    //             dispatch({
    //                 type: "cargarFoto",
    //                 payload: miData.data.respuesta
    //             })
    //         } catch(error){
    //             console.log(error)
    //         }
    //     }
    // },

    ingresarUsuario: (recibiendoObjeto)=> {

        return async (dispatch, getState)=> {
            try {
                var miData = await axios.post("http://localhost:4000/api/auth/misUsuarios/signIn", recibiendoObjeto)
                console.log(miData)

                if (miData.data.suceso){ // si el usuario se pudo logear correctamente va a generar el token

                    localStorage.setItem("token", miData.data.respuesta.token)

                    dispatch(
                        {
                            type: "signIn",
                            usuario: miData.data.respuesta.dataUsuario,
                            token: localStorage.token,
                            payload: miData.data.mensaje
                        }
                    )

                } else {

                    dispatch(
                        {
                            type: "signIn",
                            payload: miData.data.mensaje
                        }
                    )

                }


            } catch(error){
                console.log(error)
            }
        }
    },

    salirUsuario: (emailRecibido)=> {

        console.log(emailRecibido)

        return async (dispatch, getState)=> {
   
            await axios.post("http://localhost:4000/api/auth/misUsuarios/signOut", {emailRecibido})

            localStorage.removeItem("token")

            dispatch(
                {
                    type: "desconectar",
                    payload: null
                }
            )
                
        }
    },

    verificarToken: (token)=> {

        return async (dispatch, getState)=> {

            try {

                var miData = await axios.get("http://localhost:4000/api/auth/signInToken",{headers: {"Authorization": "Bearer " + token}})

                console.log(miData)

                if (miData.data.suceso === true){

                    dispatch(
                        {
                            type: "usuario",
                            payload: miData.data.respuesta
                        }
                    )

                    dispatch(
                        {
                            type: "mensaje",
                            payload: miData.data.mensaje
                        }
                    )

                }

            } catch (error){

                if (error.response.status === 401){

                    dispatch(
                        {
                            type: "mensaje",
                            payload: "Su sesión ha expirado, por favor realice nuevamente su Sign in"
                        }
                    )

                    localStorage.removeItem("token")

                }

            }
         
        }

    }

}

export default usuariosActions