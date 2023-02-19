import axios from 'axios';
import {EntryRequestType} from "./types";


export const addEntry = async (entry: EntryRequestType) => {
    return axios('/api',{
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        data: entry
    });
}