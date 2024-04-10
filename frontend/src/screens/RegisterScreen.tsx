import React, { useEffect, useState } from "react";
import { RegisterData } from "../types";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, Link } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import FormInput from "../components/FormInput";
import Loader from "../components/Loader";
import { getUserInfo, setCredentials } from "../store/slices/authSlice";
import { useRegisterMutation } from "../store/slices/usersApiSlice";
import { useAppDispatch } from "../store/store";
import { toast } from "react-toastify";
const RegisterScreen = () => {
  const [data, setData] = useState<RegisterData>({
    email: "",
    password: "",
    name: "",
  });
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();
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
    if (data.password !== confirmPassword) {
      toast.error("Password do not match");
      return;
    }
    try {
      const res = await register(data).unwrap();
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
      <h1>Sign Up</h1>
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
          id="name"
          label="Your Name"
          type="text"
          placeholder="Enter name"
          value={data.name}
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
        <FormInput
          id="confirPassword"
          label="Repeat Password"
          type="password"
          placeholder="Repeat password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button
          disabled={isLoading}
          type="submit"
          variant="primary"
          className="mt-3"
        >
          Register
        </Button>
        {isLoading && <Loader />}
        <Row className="py-3">
          <Col>
            Already have an account? <Link to={"/login"}>Login</Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
};

export default RegisterScreen;
