import React from "react";
import {
  CartState,
  addToCart,
  removefromCart,
} from "../store/slices/cartSlice";
import { Button, Col, Form, Image, ListGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { turnToArray } from "../utils/helpers";
import { FaTrash } from "react-icons/fa";
import { Cart } from "../types";
import { useAppDispatch } from "../store/store";

const ShoppingCart: React.FC<CartState> = ({ cartItems }) => {
  const dispatch = useAppDispatch();
  const handleCart = async (product: Cart, qty: number) => {
    dispatch(addToCart({ ...product, qty }));
  };
  const handleRemoveFromCart = async (id: string) => {
    dispatch(removefromCart(id));
  };
  return (
    <>
      <ListGroup variant="flush">
        {cartItems.map((item, i) => (
          <ListGroup.Item key={item._id + i}>
            <Row>
              <Col md={2}>
                <Image src={item.image} alt={item.name} fluid rounded />
              </Col>
              <Col md={3}>
                <Link to={`/product/${item._id}`}>{item.name}</Link>
              </Col>
              <Col md={2}>${item.price}</Col>
              <Col md={2}>
                <Form.Control
                  onChange={(e) => handleCart(item, Number(e.target.value))}
                  as="select"
                  value={item.qty}
                >
                  {turnToArray(item.countInStock).map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </Form.Control>
              </Col>
              <Col md={2}>
                <Button
                  onClick={() => handleRemoveFromCart(item._id)}
                  type="button"
                  variant="light"
                >
                  <FaTrash />
                </Button>
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};

export default ShoppingCart;
