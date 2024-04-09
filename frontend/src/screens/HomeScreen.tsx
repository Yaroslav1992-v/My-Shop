import { Col, Row } from "react-bootstrap";
import Product from "../components/product/Product";
import { useGetProductsQuery } from "../store/slices/productApiSlice";
import { FetchQueryData, ProductI } from "../types";
import Loader from "../components/Loader";
import Message from "../components/Message";

const HomeScreen = () => {
  const {
    data: products,
    isLoading,
    error,
  } = useGetProductsQuery<FetchQueryData<ProductI[]>>();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          <div>{error?.data?.message || "something went wrong"}</div>
        </Message>
      ) : (
        <>
          <h1>Latest Products</h1>
          {products && (
            <Row>
              {products.map((p) => (
                <Col key={p._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={p} />
                </Col>
              ))}
            </Row>
          )}
        </>
      )}
    </>
  );
};

export default HomeScreen;
