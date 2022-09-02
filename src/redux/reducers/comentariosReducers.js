const initialState = {
    comentario: [],
    todos: []
}

const comentariosReducers = (state = initialState, action)=> {

    switch (action.type) {
        case "posteandoComentario":
            return {
                ...state,
                comentario: action.payload.texto,
            }
            
        case "todos":
            return {
                ...state,
                todos: action.payload
            }    

        // case "eliminarComentario":
        //     return {
        //         ...state,
        //         comentario: action.payload
        //     }

        default:
            return state
    }

}

export default comentariosReducers