import { combineReducers } from 'redux';

import entriesReducer from './entriesReducer';
import authorizationReducer from './authorizationReducer';



const rootReducer = combineReducers({
    entries: entriesReducer,
    authorization: authorizationReducer,
});

export default rootReducer;