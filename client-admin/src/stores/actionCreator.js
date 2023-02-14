import { CATEGORIES_GET_ALLCATEGORIES, ALLPRODUCTTABLE_GET_PRODUCT_DETAIL, ALLPRODUCTTABLE_GET_ALLPRODUCTS } from "./actionType";
const url = ''


export const loginAction = (values) => {
  return async () => {
    try {
      const res = await fetch("http://localhost:4000/admins/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await res.json();
      localStorage.setItem("access_token", data.access_token);
    } catch (error) {
      throw error;
    }
  };
};

export const logoutAction = () => {
  return () => {
    localStorage.clear();
  };
};

export const registerAction = (values) => {
  return async () => {
    try {
      await fetch("http://localhost:4000/admins/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
        body: JSON.stringify(values),
      });
    } catch (error) {
      throw error;
    }
  };
};

export const getAllProducts = (payload) => {
  return {
    type: ALLPRODUCTTABLE_GET_ALLPRODUCTS,
    payload,
  };
};

export const fetchAllProductsAction = () => {
  return async (dispatcher) => {
    try {
      const res = await fetch("http://localhost:4000/admins/products", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
      });
      const data = await res.json();
      dispatcher(getAllProducts(data));
    } catch (error) {
      throw error;
    }
  };
};

export const getProductDetail = (payload) => {
  return {
    type: ALLPRODUCTTABLE_GET_PRODUCT_DETAIL,
    payload,
  };
};

export const fetchProductDetailAction = (id) => {
  return async (dispatcher) => {
    try {
      const res = await fetch(`http://localhost:4000/admins/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
      });
      const data = await res.json();

      dispatcher(getProductDetail(data));
    } catch (error) {
      throw error;
    }
  };
};

export const deleteProductAction = (id) => {
  return async (dispatcher) => {
    try {
      await fetch(`http://localhost:4000/admins/product/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
      });

      dispatcher(fetchAllProductsAction());
    } catch (error) {
      throw error;
    }
  };
};
export const addProductAction = (values) => {
  return async () => {
    let additionalImages = [];
    additionalImages.push(values.additionalImages1, values.additionalImages2, values.additionalImages3);
    
    delete values.additionalImages1;
    delete values.additionalImages2;
    delete values.additionalImages3;
    values.additionalImages = additionalImages;
    try {
      await fetch(`http://localhost:4000/admins/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
        body: JSON.stringify(values),
      });
    } catch (error) {
      throw error;
    }
  };
};

export const updateProductAction = (values,id) => {
  return async (dispatcher) => {
    let additionalImages = [];
    additionalImages.push(values.additionalImages1, values.additionalImages2, values.additionalImages3);

    delete values.additionalImages1;
    delete values.additionalImages2;
    delete values.additionalImages3;
    values.additionalImages = additionalImages;
    try {
      await fetch(`http://localhost:4000/admins/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
        body: JSON.stringify(values),
      });
      dispatcher(fetchProductDetailAction(id))
    } catch (error) {
      throw error;
    }
  };
};

export const getAllCategories = (payload) => {
  return {
    type: CATEGORIES_GET_ALLCATEGORIES,
    payload,
  };
};

export const fetchAllCategoriesAction = () => {
  return async (dispatcher) => {
    try {
      const res = await fetch(`http://localhost:4000/admins/categories`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
      });
      const data = await res.json();
      dispatcher(getAllCategories(data));
    } catch (error) {
      throw error;
    }
  };
};

export const deleteCategoryAction = (id) => {
  return async (dispatcher) => {
    try {
      await fetch(`http://localhost:4000/admins/category/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
      });

      dispatcher(fetchAllCategoriesAction());
    } catch (error) {
      throw error;
    }
  };
};

export const addCategoryAction = (values) => {
  return async (dispatcher) => {
    try {
      await fetch(`http://localhost:4000/admins/addCategory`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
        body: JSON.stringify(values),
      });
      dispatcher(fetchAllCategoriesAction())
    } catch (error) {
      throw error;
    }
  };
};
