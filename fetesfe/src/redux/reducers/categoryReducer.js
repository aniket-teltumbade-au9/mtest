import { GETPRODUCTS } from '../actionTypes'
const initialState = {
products:null
}

let categoryReducer= (state = initialState, { type, payload }) => {
    switch (type) {

    case GETPRODUCTS:
        return { ...state, products:payload }

    default:
        return state
    }
}
export default categoryReducer
