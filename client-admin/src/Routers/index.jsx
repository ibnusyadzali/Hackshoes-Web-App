import { createBrowserRouter } from "react-router-dom";
import { redirect } from "react-router-dom";
import BaseLayout from "../Layouts/BaseLayout";
import Login from "../Views/Login";
import AllProductTable from "../Views/AllProductTable";
import AllCategoriesTable from "../Views/AllCategoriesTable";
import AddProductForm from "../Views/AddProductForm";
import AddCategoryForm from "../Views/AddCategoryForm";
import Register from "../Views/Register";
import ProductDetail from "../Views/ProductDetail";
import EditProductForm from "../Views/EditProductForm";

const router = createBrowserRouter([
  {
    element: <BaseLayout />,
    loader: () => {
      const guarder = localStorage.getItem("access_token");
      if (guarder) {
        redirect("/products");
      }
      return null;
    },
    children: [
      {
        path: "/",
        element: <Login />,
      },
    ],
  },
  {
    element: <BaseLayout />,
    loader: () => {
      const guarder = localStorage.getItem("access_token");
      if (!guarder) {
        redirect("/");
      }
      return null;
    },
    children: [
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/products",
        element: <AllProductTable />,
      },
      {
        path: "/categories",
        element: <AllCategoriesTable />,
      },
      {
        path: "/add-category",
        element: <AddCategoryForm />,
      },
      {
        path: "/productDetail/:slug/:id",
        element: <ProductDetail />,
      },
      {
        path: "/add-product",
        element: <AddProductForm />,
      },
      {
        path: "/edit/:slug/:id",
        element: <EditProductForm />,
      },
    ],
  },
]);

export default router;
