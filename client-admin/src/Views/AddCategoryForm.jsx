import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch} from "react-redux";
import { useState } from "react";
import { addCategoryAction } from "../stores/actionCreator";

function AddOrEditProduct() {
  const navigate = useNavigate();
  const dispatcher = useDispatch();

  const input = {
    name: ""
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
      await dispatcher(addCategoryAction(values));
      navigate("/categories");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container d-flex justify-content-center mt-5 pt-5">
      <div className="text-white blur rounded p-3 col-9">
        <h3 className="text-center"> Add New Category</h3>
        <hr />
        <Card.Body className="rounded-3">
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col className="d-flex flex-column col-2 me-1 text-end justify-content-around fw-bold">
                <Form.Label>Name:</Form.Label>
                </Col>
              <Col className="col-9">
                <Form.Control className="mb-1" placeholder="Name" name="name" onChange={handleInputChange} value={values.name} />
                </Col>
            </Row>
            <div className="d-flex justify-content-center">
              <Button variant="outline-success text-light me-3" type="submit">
                Submit
              </Button>
              <Link to={"/categories"} className="btn btn-outline-warning text-light">
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
