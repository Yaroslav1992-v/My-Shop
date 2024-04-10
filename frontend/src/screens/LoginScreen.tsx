import React, { useEffect, useState } from "react";
import { LoginData } from "../types";
import FormContainer from "../components/FormContainer";
import { Button, Col, Form, Row } from "react-bootstrap";
import FormInput from "../components/FormInput";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/store";
import { useLoginMutation } from "../store/slices/usersApiSlice";
import { useSelector } from "react-redux";
import { getUserInfo, setCredentials } from "../store/slices/authSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
const LoginScreen = () => {
  const [data, setData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const userInfo = useSelector(getUserInfo());
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    setData((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await login(data).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (error: any) {
      toast.error(
        error?.data?.message || error?.error || "Something went wrong"
      );
    }
  };
  return (
    <FormContainer>
      <h1>Sign In</h1>
      <Form onSubmit={handleSubmit}>
        <FormInput
          id="email"
          label="Email Address"
          type="email"
          placeholder="Enter email"
          value={data.email}
          onChange={handleChange}
        />
        <FormInput
          id="password"
          label="Password"
          type="password"
          placeholder="Enter password"
          value={data.password}
          onChange={handleChange}
        />

        <Button
          disabled={isLoading}
          type="submit"
          variant="primary"
          className="mt-3"
        >
          Sign In
        </Button>
        {isLoading && <Loader />}
        <Row className="py-3">
          <Col>
            New Customer? <Link to={"/register"}>Register</Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
};

export default LoginScreen;
