import { useEffect } from "react";
import Table from "react-bootstrap/Table";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllCategoriesAction, deleteCategoryAction } from "../stores/actionCreator";
import { BsFillPlusSquareFill } from "react-icons/bs";
import { Link } from "react-router-dom";

function ProductsTable() {
  const dispatcher = useDispatch();
  const { allCategories } = useSelector((state) => state.allCategories);
  const fetctAllCategories = async () => {
    try {
      await dispatcher(fetchAllCategoriesAction());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetctAllCategories();
  }, []);

  const handleDelete = async (id) => {
    try {
      await dispatcher(deleteCategoryAction(id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container d-flex justify-content-center">
      <div className="col-8">
        <h2 className="text-center text-light fontstyle mt-5 mb-3">All Categories</h2>
        <div className="d-flex flex-row-reverse">
          <Link to={"/add-category"} className="btn btn-primary btn-md mb-2">
            <BsFillPlusSquareFill />
            <span className="ms-2">Add New Category</span>
          </Link>
        </div>
        <div className="blurTable rounded p-3 text-center">
          <Table striped borderless hover size="md" className="scrollCategory">
            <thead>
              <tr>
                <th>#</th>
                <th className="col-5">Name</th>
                <th className="col-12">Created At</th>
                <th className="col-12">Action</th>
              </tr>
            </thead>
            <tbody>
              {allCategories?.map((el, i) => {
                return (
                  <tr key={el.id}>
                    <td>{i + 1}</td>
                    <td className="col-5">{el.name}</td>
                    <td className="col-12">{new Date(el.createdAt).toLocaleString().split(",")[0]}</td>
                    <td className="col-12">
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
