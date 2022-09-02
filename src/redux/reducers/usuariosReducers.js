const initialState = {
    //type:signUp
    mensajeSignUp: null,
    //type:signIn
    mensajeSignIn: null,
    usuario: null,
    mensaje: null,
    token: null,
    foto: [],
}

const usuariosReducers = (state = initialState, action)=> {

    switch (action.type) {
        case "signUp":
            return {
                ...state,
                mensajeSignUp: action.payload
            }
        case "signIn":
            return {
                ...state,
                mensajeSignIn: action.payload,
                usuario: action.usuario,
                token: action.token
            }   
        case "desconectar":
            return {
                ...state,
                usuario: action.payload
            }
        case "usuario":
            return {
                ...state,
                usuario: action.payload
            }
        case "mensaje":
            return {
                ...state,
                mensaje: action.payload
            }
        // case "cargarFoto":
        //     return {
        //         ...state,
        //         foto: action.payload
        //     }
    
        default:
            return state
    }

}

export default usuariosReducers