import { Link, useParams } from "react-router-dom";
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  ListGroup,
  Row,
} from "react-bootstrap";
import Rating from "../components/Rating";
import { FetchQueryData, ProductI } from "../types";
import { useGetProductDetailsQuery } from "../store/slices/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import AddToCart from "../components/AddToCart";

const ProductScreen = () => {
  const { id: productId } = useParams();

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery<FetchQueryData<ProductI>>(productId || "");

  return (
    <>
      <Link className="btn btn-light my-3" to={"/"}>
        Go Back
      </Link>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          <div>{error?.data?.message || "something went wrong"}</div>
        </Message>
      ) : (
        <>
          {product && (
            <Row>
              <Col md={5}>
                <Image src={product.image} alt={product.name} fluid />
              </Col>
              <Col md={3}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h3>{product.name}</h3>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Rating
                      value={product.rating}
                      text={`${product.numReviews}`}
                    />
                  </ListGroup.Item>
                  <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                  <ListGroup.Item>
                    Description: ${product.description}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <AddToCart product={product} />
            </Row>
          )}
        </>
      )}
    </>
  );
};

export default ProductScreen;
