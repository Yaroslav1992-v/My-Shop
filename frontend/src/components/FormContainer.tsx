import React, { ReactNode } from "react";
import { Col, Container, Row } from "react-bootstrap";

const FormContainer: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
