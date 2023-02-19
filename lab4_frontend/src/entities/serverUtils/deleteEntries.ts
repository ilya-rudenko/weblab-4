import axios from 'axios';
import {UserType} from "./types";


export const deleteEntries = async (user: UserType) => {
    return axios('/api',{
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        },
        data: user,
    });
}