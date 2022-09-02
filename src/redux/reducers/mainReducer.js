//importo los componentes de REDUX:
import {combineReducers} from 'redux'

//importo los redutores de REDUX que se van a combinar:
import personajesReducers from './personajesReducers'
import comentariosReducers from './comentariosReducers'
import usuariosReducers from './usuariosReducers'


const mainReducer = combineReducers(
    {
        personajesReducers,
        comentariosReducers,
        usuariosReducers
    }
)

export default mainReducer
