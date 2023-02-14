import { useEffect } from "react";
import { BsFillPlusSquareFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllProductsAction, deleteProductAction } from "../stores/actionCreator";
import Table from "react-bootstrap/Table";

function ProductsTable() {
  const dispatcher = useDispatch();
  const { allProducts } = useSelector((state) => state.allProducts);
  const fetctAllProducts = async () => {
    try {
      await dispatcher(fetchAllProductsAction());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetctAllProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await dispatcher(deleteProductAction(id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center">
      <div className="col-11">
        <h2 className="text-center text-light fontstyle mt-5 mb-3">All Products</h2>
        <div className="d-flex flex-row-reverse">
          <Link to={"/add-product"} className="btn btn-primary btn-md mb-2">
            <BsFillPlusSquareFill />
            <span className="ms-2">Add Product</span>
          </Link>
        </div>
        <div className="blurTable rounded p-3 text-center">
          <Table striped borderless hover size="md" className="scroll">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>CategoryId</th>
                <th>AuthorId</th>
                <th>CreatedAt</th>
                <th>Main Image</th>
                <th>Images</th>
                <th>Stock Status</th>
                <th className="">Action</th>
              </tr>
            </thead>
            <tbody>
              {allProducts?.map((el, i) => {
                return (
                  <tr key={el.id}>
                    <td>{i + 1}</td>
                    <td>{el.name}</td>
                    <td>{el.description}</td>
                    <td>{el.price.toLocaleString()}</td>
                    <td>{el.Category.name}</td>
                    <td>{el.User.username}</td>
                    <td>{new Date(el.createdAt).toLocaleString().split(",")[0]}</td>
                    <td>
                      <img className="tableImg" src={el.mainImg} alt="" />
                    </td>
                    <td>
                      <Link to={`/productDetail/${el.slug}/${el.id}`} className="btn btn-success btn-sm mt-2">
                        Show
                      </Link>
                    </td>
                    <td>{el.stockStatus}</td>
                    <td className="d-flex flex-row pt-3 pb-4">
                      <Link to={`/edit/${el.slug}/${el.id}`} className="btn btn-warning btn-sm me-3">
                        Edit
                      </Link>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(el.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default ProductsTable;
