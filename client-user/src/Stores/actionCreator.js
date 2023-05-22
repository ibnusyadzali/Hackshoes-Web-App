import {PRODUCT_GET_PRODUCT, PRODUCT_GET_PRODUCT_DETAIL, PRODUCT_GET_NEW_ARRIVALS} from "./actionType"
const url = 'https://hackshoesbackend.habibiefaried.com/'

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
            const res = await fetch(url + "users/products")
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
            const res = await fetch(url + `users/${id}`)
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
            const res = await fetch(url + "users/new")
            const data = await res.json()

            dispatcher(getNewArrivals(data))
        } catch (error) {
            throw error
        }
    }
}