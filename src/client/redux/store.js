
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import combineReducers from './reducers';

let composeEnhancers;
try {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
} catch (err) {
    composeEnhancers = compose;
}

const middleware = applyMiddleware(thunk);

const composer = composeEnhancers(middleware);
const store = createStore(combineReducers, composer);

export default store;
