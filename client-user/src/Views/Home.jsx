import { useEffect } from "react";
import { Link } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import Card from "react-bootstrap/Card";
import { useSelector, useDispatch } from "react-redux";
import { fetchNewArrivalsAction } from "../Stores/actionCreator";

function Home() {
  const { newArrivals } = useSelector((state) => state.newArrivals);
  const dispatcher = useDispatch();

  const fetchNewArrivals = async () => {
    try {
      await dispatcher(fetchNewArrivalsAction());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNewArrivals();
  }, []);

  return (
    <div>
      <div className="d-flext justify-content-center">
        <Carousel fade>
          <Carousel.Item>
            <img className="d-block w-100 carouselImg" src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="First slide" />
            <Carousel.Caption>
              <h3>Push Your Limit</h3>
              <p>Wearing awesome shoes to give you more success opportunities.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100 carouselImg" src="https://images.unsplash.com/photo-1460353581641-37baddab0fa2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80" alt="Second slide" />

            <Carousel.Caption>
              <h3>Swoosh</h3>
              <p>Fit it on your foot</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100 carouselImg" src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1450&q=80" alt="Third slide" />

            <Carousel.Caption>
              <h3>Just Do It</h3>
              <p>You only life once</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
      <div className="d-flex justify-content-center text-center mb-5">
        <div className="row col-9 mt-5">
          <h2 className="text-center fontstyle mb-5 text-light fw-bold">New Arrivals</h2>
          <Carousel slide={false} className="pb-5" interval={1000*60*60*24}>
            {newArrivals.slice(0, Math.ceil(newArrivals.length / 3))?.map((el1, i) => {
              return (
                <Carousel.Item>
                  <div className="row d-flex justify-content-around">
                    {newArrivals.slice(i * 3, i * 3 + 3)?.map((el2, i) => {
                      return (
                        <Card style={{ width: "18rem" }}>
                          <Card.Img variant="top" src={el2?.mainImg} className="pt-3 img" />
                          <Card.Body>
                            <Card.Title className="fs-6 fw-bold">{el2?.name}</Card.Title>
                            <Card.Text className="text-muted">Price: Rp {el2?.price.toLocaleString()}</Card.Text>
                            <Link className="btn btn1 btn-primary" to={`/productDetail/newArrivals/${el2?.slug}/${el2?.id}`} variant="primary">
                              Check
                            </Link>
                          </Card.Body>
                        </Card>
                      );
                    })}
                  </div>
                </Carousel.Item>
              );
            })}
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export default Home;
