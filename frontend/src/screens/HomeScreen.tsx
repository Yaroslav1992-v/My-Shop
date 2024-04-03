import React from "react";
import products from "../products";
import { Col, Row } from "react-bootstrap";
import Product from "../components/product/Product";
const HomeScreen = () => {
  return (
    <>
      <h1>Latest Poducts</h1>
      <Row>
        {products.map((p) => (
          <Col key={p._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={p} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
