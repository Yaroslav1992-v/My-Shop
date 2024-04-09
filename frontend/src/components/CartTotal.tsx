import React from "react";
import { Col, Card, ListGroup, Button } from "react-bootstrap";
import { Cart } from "../types";
import { useNavigate } from "react-router-dom";

const CartTotal: React.FC<{ cartItems: Cart[] }> = ({ cartItems }) => {
  const navigate = useNavigate();
  const checkoutHandler = () => {
    navigate("/login?redirected=/shipping");
  };
  return (
    <Col md={4}>
      <Card>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <h2>
              Subtotal{" "}
              {`(${cartItems.reduce((acc, item) => acc + item.qty, 0)})`}
              items
            </h2>
            $
            {`(${cartItems
              .reduce((acc, item) => acc + item.qty * item.price, 0)
              .toFixed(2)})`}
          </ListGroup.Item>
          <ListGroup.Item
            type="button"
            className="btn-block"
            disabled={cartItems.length === 0}
          >
            <Button onClick={checkoutHandler}>Proceed To Checkout</Button>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </Col>
  );
};

export default CartTotal;
