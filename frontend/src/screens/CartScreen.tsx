import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCart } from "../store/slices/cartSlice";
import { Col, Row } from "react-bootstrap";
import Message from "../components/Message";
import ShoppingCart from "../components/ShoppingCart";
import CartTotal from "../components/CartTotal";

const CartScreen = () => {
  const cart = useSelector(getCart());
  const { cartItems } = cart;

  return (
    <Row>
      <Col md={8}>
        <h1 style={{ marginBottom: "20px" }}>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            You cart is empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ShoppingCart
            shippingPrice={cart.shippingPrice}
            itemsPrice={cart.itemsPrice}
            cartItems={cart.cartItems}
            taxPrice={cart.taxPrice}
            totalPrice={cart.totalPrice}
          />
        )}
      </Col>
      <CartTotal cartItems={cartItems} />
    </Row>
  );
};

export default CartScreen;
