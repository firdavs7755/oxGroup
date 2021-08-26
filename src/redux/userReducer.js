import {
    SET_DATA,
    SET_TOKEN
} from "./actions/action-types";

const INITIAL_STATE = {
    data:[],
    token:'',
}

const userReducer = (state = INITIAL_STATE,action) => {
    switch (action.type) {
        case SET_TOKEN:
            return {...state,token:action.payload}

        case SET_DATA:
            return {...state,data: action.payload}

        default:
            return state
    }
}

export default userReducer;
