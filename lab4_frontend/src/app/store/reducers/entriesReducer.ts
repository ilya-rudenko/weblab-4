import {ADD_ENTRY, CLEAR_ENTRIES,  LOAD_ENTRIES} from "../actionTypes/entriesTypes";
import {entryServerType} from "../actions/entriesActions";

const initial_state = {
    entries: [],
}

const reducer = (state = initial_state, action: {type: string, payload?: entryServerType | entryServerType[] }) => {

    switch (action.type) {

        case ADD_ENTRY:
            return {
                ...state,
                entries: [{
                    // @ts-ignore
                    date: action.payload.date,
                    // @ts-ignore
                    executionTime: action.payload.executionTime,
                    // @ts-ignore
                    x: action.payload.x,
                    // @ts-ignore
                    y: action.payload.y,
                    // @ts-ignore
                    r: action.payload.r,
                    // @ts-ignore
                    result: action.payload.result,

                },...state.entries],
            };

        case LOAD_ENTRIES:
            return {
                ...state,
                entries: action.payload,
            };

        case CLEAR_ENTRIES:
            return {
                ...state,
                entries: [],
            }


        default: return state;

    }

}

export default reducer;