import { useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import {useSelector, useDispatch } from "react-redux"
import {fetchProductsAction} from "../Stores/actionCreator"

function ProductsCard() {
  const {products} = useSelector(state => state.products)
  const dispatcher = useDispatch()

  const fetchProducts = async () => {
    try {
      await dispatcher(fetchProductsAction())
    } catch (error) {
      console.log(error)
    }
  }

  useEffect (() => {
    fetchProducts()
  },[])

  return (
    <div className="container d-flex justify-content-around">
      <div className="col-10 mt-2">
        <div className="text-center">
          <h2 className="text-center fontstyle mb-5">All Products</h2>
          <div className="row d-flex justify-content-around">
            {products.map((el) => {
              return (
                <Card key={el.id} style={{ width: "18rem" }} className="mb-4 mx-4">
                  <Card.Img variant="top" src={el.mainImg} className="pt-3 img" />
                  <Card.Body>
                    <Card.Title className="fs-6 fw-bold">{el.name}</Card.Title>
                    <Card.Text className="text-muted">Price: Rp {el.price.toLocaleString()}</Card.Text>
                    <Link to={`/productDetail/products/${el.slug}/${el.id}`} variant="primary" className="btn btn-primary">
                      Check
                    </Link>
                  </Card.Body>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductsCard;
