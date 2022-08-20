import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunkMiddleware from "redux-thunk"
import categoriesReducer from "./reducers/categoriesReducer";
import productReducer from "./reducers/productReducer";
import cartReducer from "./reducers/cartReducer";


let reducers = combineReducers({
    categoriesPage: categoriesReducer,
    productPage: productReducer,
    cartPage: cartReducer
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)))

export default store