import {LOGIN, LOGOUT, REGISTER} from "../actionTypes/authorizationTypes";

export type userType = {
    username: string;
    password: string;
}

export const logoutAction = () => {
    return {
        type: LOGOUT,
    }
}
export const registerAction = (payload: userType) => {
    return {
        type: REGISTER,
        payload
    }
}

export const loginAction = (payload: userType) => {
    return {
        type: LOGIN,
        payload
    }
}