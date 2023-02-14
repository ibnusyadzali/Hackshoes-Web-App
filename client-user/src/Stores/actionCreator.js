import {PRODUCT_GET_PRODUCT, PRODUCT_GET_PRODUCT_DETAIL, PRODUCT_GET_NEW_ARRIVALS} from "./actionType"

export const getProducts = (payload) => {
    return {
        type: PRODUCT_GET_PRODUCT,
        payload
    }
}
export const getProductDetail = (payload) => {
    return {
        type: PRODUCT_GET_PRODUCT_DETAIL,
        payload
    }
}
export const getNewArrivals = (payload) => {
    return {
        type: PRODUCT_GET_NEW_ARRIVALS,
        payload
    }
}

export const fetchProductsAction = () => {
    return async (dispatcher) => {
        try {
            const res = await fetch("http://localhost:4000/users/products")
            const data = await res.json()

            dispatcher(getProducts(data))
        } catch (error) {
            throw error
        }
    }
}

export const fetchProductDetailAction = (id) => {
    return async (dispatcher) => {
        try {
            const res = await fetch(`http://localhost:4000/users/${id}`)
            const data = await res.json()

            dispatcher(getProductDetail(data))
        } catch (error) {
            throw error
        }
    }
}

export const fetchNewArrivalsAction = (released, id) => {
    return async (dispatcher) => {
        try {
            const res = await fetch("http://localhost:4000/users/new")
            const data = await res.json()

            dispatcher(getNewArrivals(data))
        } catch (error) {
            throw error
        }
    }
}