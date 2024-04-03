import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
  const curentYear = new Date().getFullYear();
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3">
            <p>My-Shop Yaroslav &copy; {curentYear}</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
