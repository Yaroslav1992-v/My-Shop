import React, { useEffect, useState } from "react";

import { Col, Row } from "react-bootstrap";
import Product from "../components/product/Product";
import { ProductI } from "../types";
import productsService from "../services/productService";

const HomeScreen = () => {
  const [products, setProducts] = useState<ProductI[]>([]);
  useEffect(() => {
    const fetchPoducts = async () => {
      try {
        const data = await productsService.fetchProducts();
        if (data) {
          setProducts(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchPoducts();
  }, []);
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
