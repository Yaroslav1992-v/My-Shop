import React from "react";
import { Badge, Nav } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { getCartCount } from "../store/slices/cartSlice";

const СartHeaderComponent = () => {
  const cartItems = useSelector(getCartCount());
  return (
    <LinkContainer to="cart">
      <Nav.Link href="/cart">
        <FaShoppingCart /> Cart
        {cartItems > 0 && (
          <Badge pill bg="success" style={{ marginLeft: "5px" }}>
            {cartItems}
          </Badge>
        )}
      </Nav.Link>
    </LinkContainer>
  );
};

export default СartHeaderComponent;
