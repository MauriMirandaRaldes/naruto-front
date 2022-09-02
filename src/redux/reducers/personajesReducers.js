const initialState = {
    lista: [],
    unPersonaje: null,
}

const personajesReducers = (state = initialState, action)=> {

    switch (action.type) {
        case "todos":
            return {
                ...state,
                lista: action.payload
            }
        case "unoSolo":
            return {
                ...state,
                unPersonaje: action.payload
            }
        default:
            return state
    }

}

export default personajesReducers