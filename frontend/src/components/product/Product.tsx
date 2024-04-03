import React from "react";
import { Product as ProductProps } from "../../types";
import { Card, CardBody } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "../Rating";
const Product: React.FC<{ product: ProductProps }> = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} alt="product image" variant="top" />
      </Link>
      <CardBody>
        <Link to={`/product/${product._id}`}>
          <Card.Title className="product-title" as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as={"div"}>
          <Rating
            value={product.rating}
            text={product.numReviews?.toString() || ""}
          />
        </Card.Text>
        <Card.Text as={"h3"}>${product.price}</Card.Text>
      </CardBody>
    </Card>
  );
};

export default Product;
