import { FBLOGIN, FBLOGOUT, FBPROFILE } from "../actionTypes"

const initialState = {
    user:null
}

let authReducer= (state = initialState, { type, payload }) => {
    switch (type) {

    case FBLOGIN:
        return { ...state, user:payload }

    case FBLOGOUT:
        return { ...state, user:null }

    case FBPROFILE:
        return { ...state, user:payload }

    default:
        return state
    }
}
export default authReducer
