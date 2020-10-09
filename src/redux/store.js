import {createStore, combineReducers, applyMiddleware} from "redux";
import * as pages from 'redux/pages/reducer';
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const middleware = [thunk];
const persistConfig = {
    key: 'root',
    storage,
};
const persistedReducer = persistReducer(persistConfig, combineReducers({
    ...pages,
}));
let store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(...middleware)));
let persistor = persistStore(store);
export default store;
export {persistor};
