import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { addProductAction, fetchAllCategoriesAction } from "../stores/actionCreator";

function AddOrEditProduct() {
  const navigate = useNavigate();
  const dispatcher = useDispatch();

  const input = {
    name: "",
    description: "",
    price: 0,
    categoryId: 0,
    mainImg: "",
    additionalImages1: "",
    additionalImages2: "",
    additionalImages3: ""
  };
  const [values, setValues] = useState(input);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await dispatcher(addProductAction(values));
      navigate("/products");
    } catch (error) {
      console.log(error);
    }
  };

  const { allCategories } = useSelector((state) => state.allCategories);

  useEffect(() => {
    dispatcher(fetchAllCategoriesAction());
  }, []);

  return (
    <div className="container d-flex justify-content-center mt-5 pt-5">
      <div className="text-white blur rounded p-3 col-9">
        <h3 className="text-center"> Add New Product</h3>
        <hr />
        <Card.Body className="rounded-3">
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col className="d-flex flex-column col-2 me-1 text-end justify-content-around fw-bold">
                <Form.Label>Name:</Form.Label>
                <Form.Label>Description:</Form.Label>
                <Form.Label>Price:</Form.Label>
                <Form.Label>Category:</Form.Label>
                <Form.Label>Main Image:</Form.Label>
                <Form.Label>Additional Image:</Form.Label>
                <br />
                <br />
                <br />
              </Col>
              <Col className="col-9">
                <Form.Control className="mb-1" placeholder="Name" name="name" onChange={handleInputChange} value={values.name} />
                <Form.Control className="mb-1" placeholder="Description" name="description" onChange={handleInputChange} value={values.description} />
                <input type="number" className="form-control mb-1" placeholder="Price" name="price" onChange={handleInputChange} value={values.price} />
                <select name="categoryId" className="form-control mb-1" onChange={handleInputChange} defaultValue={values.categoryId}>
                  <option selected>--- SELECT ONE ---</option>
                  {allCategories.map((el) => {
                    return (
                      <option key={el.id} value={el.id}>
                        {el.name}
                      </option>
                    );
                  })}
                </select>
                <Form.Control className="mb-1" placeholder="Image Url" name="mainImg" onChange={handleInputChange} value={values.mainImg} />
                <Form.Control className="mb-1" placeholder="Additional Image 1" name="additionalImages1" onChange={handleInputChange} value={values.additionalImages1}/>
                <Form.Control className="mb-1" placeholder="Additional Image 2" name="additionalImages2" onChange={handleInputChange} value={values.additionalImages2}/>
                <Form.Control className="mb-1" placeholder="Additional Image 3" name="additionalImages3" onChange={handleInputChange} value={values.additionalImages3}/>
              </Col>
            </Row>
            <div className="d-flex justify-content-center">
              <Button variant="outline-success text-light me-3" type="submit">
                Submit
              </Button>
              <Link to={"/products"} className="btn btn-outline-warning text-light">
                Cancel
              </Link>
            </div>
          </Form>
        </Card.Body>
      </div>
    </div>
  );
}

export default AddOrEditProduct;
