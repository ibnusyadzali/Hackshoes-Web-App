import { applyMiddleware, legacy_createStore as createStore, combineReducers} from "redux"
import thunk from "redux-thunk"
import adminReducer from "./reducers/adminReducer"

const  rootReducer = combineReducers({
    allProducts: adminReducer,
    productDetail: adminReducer,
    allCategories: adminReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store