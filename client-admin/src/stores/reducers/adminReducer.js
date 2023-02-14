import {CATEGORIES_GET_ALLCATEGORIES, ALLPRODUCTTABLE_GET_ALLPRODUCTS, ALLPRODUCTTABLE_GET_PRODUCT_DETAIL} from "../actionType"

const initialState = {
    allProducts: [],
    productDetail: {},
    allCategories: []
}

const adminReducers = (state = initialState, action) => {
    switch (action.type) {
        case ALLPRODUCTTABLE_GET_ALLPRODUCTS:
            return {
                ...state,
                allProducts: action.payload
            }
        case ALLPRODUCTTABLE_GET_PRODUCT_DETAIL:
            return {
                ...state,
                productDetail: action.payload
            }
        case CATEGORIES_GET_ALLCATEGORIES:
            return {
                ...state,
                allCategories: action.payload
            }
    
        default:
            return state
    }
}

export default adminReducers