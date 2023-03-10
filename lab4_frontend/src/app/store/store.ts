import { createStore } from 'redux';

import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './reducers/rootReducer';


const store = createStore(

    rootReducer,

    composeWithDevTools(),

);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;