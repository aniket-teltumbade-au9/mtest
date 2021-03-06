import axios from "axios";
import { GETPRODUCTS } from "../actionTypes";

export const productList = (name) => async (dispatch) => {
    var config = {
        method: 'get',
        url: 'http://localhost:8000/'
    };

    let res = await axios(config)
    let prod=res.data.filter(el=>el.Category===name)
    dispatch({
        type: GETPRODUCTS,
        payload: prod
    })
}
