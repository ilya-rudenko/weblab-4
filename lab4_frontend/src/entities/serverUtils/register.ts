import axios from 'axios';
import {UserType} from "./types";


export const register = async (user: UserType) => {
    return axios('/api/register',{
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        data: user
    });
}