import {PRODUCT_GET_PRODUCT, PRODUCT_GET_PRODUCT_DETAIL, PRODUCT_GET_NEW_ARRIVALS}  from "../actionType"

const initialState = {
    products: [],
    productDetail: {},
    newArrivals: []
}

const productReducers = (state = initialState, action) => {
    switch (action.type) {
        case PRODUCT_GET_PRODUCT:
            return {
                ...state,
                products: action.payload
            }
        case PRODUCT_GET_PRODUCT_DETAIL:
            return {
                ...state,
                productDetail: action.payload
            }
        case PRODUCT_GET_NEW_ARRIVALS:
            return {
                ...state,
                newArrivals: action.payload
            }
        default:
            return state
    }
}

export default productReducers