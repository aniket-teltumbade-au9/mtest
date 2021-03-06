import { FBLOGIN, FBLOGOUT, FBPROFILE } from "../actionTypes"

export const fbLogin = (body) => (dispatch) => {
    localStorage.setItem('user', JSON.stringify(body))
    dispatch({
        type: FBLOGIN,
        payload: body
    })
}
export const fbLogout = () => (dispatch) => {
    localStorage.removeItem('user')
    dispatch({
        type: FBLOGOUT,
        payload: null
    })
}

export const fbProfile = () => (dispatch) => {
    if (localStorage.getItem('user')) {
        const user = JSON.parse(localStorage.getItem('user'))
        dispatch({
            type: FBPROFILE,
            payload: user
        })
    }
    else{
        dispatch({
            type: FBPROFILE,
            payload: null
        })
    }
}
