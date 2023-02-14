import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { registerAction } from "../stores/actionCreator";

function RegisterForm() {
  const navigate = useNavigate();
  const input = {
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",

  };

  const [values, setValues] = useState(input);
  const dispatcher = useDispatch();

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
      await dispatcher(registerAction(values));
      navigate("/products");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container d-flex justify-content-center mt-5 pt-5">
      <div className="text-white blur rounded p-3 text-center">
        <h3> Register New Admin</h3>
        <hr />
        <Card.Body className="rounded-3">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Username</Form.Label>
              <Form.Control type="text" placeholder="Enter Name" name="username" onChange={handleInputChange} value={values.username} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Password</Form.Label>
              <Form.Control className="blur" type="password" placeholder="Password" name="password" onChange={handleInputChange} value={values.password} />
              <Form.Text className="text-light">We'll never share your email and password with anyone else.</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" name="email" onChange={handleInputChange} value={values.email} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Phone Number</Form.Label>
              <Form.Control type="text" placeholder="Enter phone number" name="phoneNumber" onChange={handleInputChange} value={values.phoneNumber} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Address</Form.Label>
              <Form.Control type="text" placeholder="Enter address" name="address" onChange={handleInputChange} value={values.address} />
            </Form.Group>

            <Button variant="outline-secondary text-light" type="submit">
              Log in
            </Button>
          </Form>
        </Card.Body>
      </div>
    </div>
  );
}
export default RegisterForm;
