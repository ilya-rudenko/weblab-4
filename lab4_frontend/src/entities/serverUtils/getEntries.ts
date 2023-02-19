import axios from 'axios';
import {UserType} from "./types";


export const getEntries = async (user: UserType) => {
    return axios('/api/entries',{
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            username: user.username,
            password: user.password
        },
    });
}