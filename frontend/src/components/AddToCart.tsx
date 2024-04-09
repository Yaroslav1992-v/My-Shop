import React, { useState } from "react";
import { Col, Card, ListGroup, Row, Form, Button } from "react-bootstrap";
import { turnToArray } from "../utils/helpers";
import { addToCart } from "../store/slices/cartSlice";
import { useAppDispatch } from "../store/store";
import { useNavigate } from "react-router-dom";
import { ProductI } from "../types";

const AddToCart: React.FC<{ product: ProductI }> = ({ product }) => {
  const { price, countInStock } = product;
  const [qty, setQty] = useState<number>(1);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleCart = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };
  return (
    <Col md={3}>
      <Card>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <Row>
              <Col>Price:</Col>
              <Col>
                <strong>${price}</strong>
              </Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col>Status:</Col>
              <Col>
                <strong>
                  {countInStock > 0 ? "In Stock" : "Out Of Stock"}
                </strong>
              </Col>
            </Row>
          </ListGroup.Item>
          {countInStock > 0 && (
            <ListGroup.Item>
              <Row>
                <Col>Qty</Col>
                <Col>
                  <Form.Control
                    as="select"
                    value={qty}
                    onChange={(e) => setQty(Number(e.target.value))}
                  >
                    {turnToArray(countInStock).map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
              </Row>
            </ListGroup.Item>
          )}
          <ListGroup.Item>
            <Button
              onClick={handleCart}
              className="btn-block"
              type="button"
              disabled={countInStock === 0}
            >
              Add To Cart
            </Button>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </Col>
  );
};

export default AddToCart;
