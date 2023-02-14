import { useEffect } from "react";
import { Card, Carousel } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductDetailAction } from "../Stores/actionCreator";

function DetailProduct() {
  const { id } = useParams();

  const { productDetail } = useSelector((state) => state.productDetail);
  const dispatcher = useDispatch();

  const fetchProductDetail = async () => {
    try {
      await dispatcher(fetchProductDetailAction(id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProductDetail();
  }, [id]);

  return (
    <div className="container d-flex justify-content-center imgContainer">
      <div className="col-9 my-5">
        <Carousel slide={false}>
          <Carousel.Item>
            <Card className="bg-dark text-white">
              <Card.Img src={productDetail.mainImg} alt="Card image" className="DetailImg" />
              <Card.ImgOverlay className="text-dark p-2 col-3">
                <Card.Body className="rounded blur">
                  <Card.Title>{productDetail.name}</Card.Title>
                  <Card.Text className="text-dark">Rp {productDetail.price}</Card.Text>
                  <Card.Text className="text-dark">{productDetail.description}</Card.Text>
                </Card.Body>
              </Card.ImgOverlay>
            </Card>
          </Carousel.Item>
          {productDetail.Images?.map(el => {
            return (
              <Carousel.Item key={el.id}>
                <Card className="bg-dark text-white">
                  <Card.Img src={el?.imgUrl} alt="Card image" className="DetailImg" />
                  <Card.ImgOverlay className="text-dark p-2 col-3">
                    <Card.Body className="rounded blur">
                      <Card.Title>{productDetail?.name}</Card.Title>
                      <Card.Text className="text-dark">Rp {productDetail?.price.toLocaleString()}</Card.Text>
                      <Card.Text className="text-dark">{productDetail?.description}</Card.Text>
                    </Card.Body>
                  </Card.ImgOverlay>
                </Card>
              </Carousel.Item>
            );
          })}
        </Carousel>
      </div>
    </div>
  );
}

export default DetailProduct;
