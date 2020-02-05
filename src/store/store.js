import { createStore, combineReducers, applyMiddleware } from 'redux';
import events  from './events';
import thunk from "redux-thunk"
import auth from "./auth"

export default function createAndConfigStore() {


    return createStore(combineReducers({
        events,
        auth,
    }), applyMiddleware(thunk));
}