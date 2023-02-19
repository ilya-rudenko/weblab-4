import {ADD_ENTRY, CLEAR_ENTRIES,  LOAD_ENTRIES} from "../actionTypes/entriesTypes";

export type entryServerType = {
    date: string,
    executionTime: number,
    id: number,
    result:boolean,
    x: number,
    y: number,
    r: number,
}


export const addEntryAction = (payload: entryServerType) => {
    return {
        type: ADD_ENTRY,
        payload
    }
}

export const setEntriesAction = (payload: entryServerType[]) => {

    return {
        type: LOAD_ENTRIES,
        payload
    }
}

export const clearEntriesAction = () => {
    return {
        type: CLEAR_ENTRIES,
    }
}