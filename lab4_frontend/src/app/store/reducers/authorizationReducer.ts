import {LOGOUT, LOGIN, REGISTER} from "../actionTypes/authorizationTypes";
import {userType} from "../actions/authorizationActions";

const initial_state = {
    username: "",
    password: "",
    authFlag: false,
}

const reducer = (state = initial_state, action: {type: string, payload: userType}) => {

    switch (action.type) {

        case LOGOUT:
            return {
                ...state,
                username: "",
                password: "",
                authFlag: false,
            };

        case LOGIN:
            return {
                ...state,
                username: action.payload.username,
                password: action.payload.password,
                authFlag: true,
            };

        case REGISTER:
            return {
                ...state,
                username: action.payload.username,
                password: action.payload.password,
                authFlag: true,
            };


        default: return state;

    }

}

export default reducer;