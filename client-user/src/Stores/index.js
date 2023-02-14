import { applyMiddleware, legacy_createStore as createStore, combineReducers} from "redux"
import thunk from "redux-thunk"
import productReducer from "./Reducers/productReducer"

const  rootReducer = combineReducers({
    products : productReducer,
    productDetail: productReducer,
    newArrivals: productReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store