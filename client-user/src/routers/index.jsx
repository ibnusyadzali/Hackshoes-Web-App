import {createBrowserRouter} from "react-router-dom"
import BaseLayout from "../Layouts/BaseLayout"
import Home from "../Views/Home"
import AllProducts from "../Views/AllProducts"
import ProductDetail from "../Views/ProductDetail"

const router = createBrowserRouter([
    {
        element: <BaseLayout/>,
        children: [
            {
                path: "/",
                element: <Home/>
            },
            {
                path: "/allProducts",
                element: <AllProducts/>
            },
            {
                path: "/productDetail/:released/:slug/:id",
                element: <ProductDetail/>
            }
        ]
    }
])

export default router