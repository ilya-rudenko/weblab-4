import axios from 'axios';
import {UserType} from "./types";


export const login = async (user: UserType) => {
    return axios('/api/login',{
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            username: user.username,
            password: user.password
        }
    });
}