import {
    SET_DATA, SET_TOKEN,
} from "./action-types";

export const setData=data=>({
    type:SET_DATA,
    payload:data
})
export const setUserToken=token=>({
    type:SET_TOKEN,
    payload:token
})
// export const logOut = () => ({
//     type: LOG_OUT
// })
