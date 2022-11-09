import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Col, Container, Form, FormGroup, Row } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import "../styles/login.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.config";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate("/checkout");
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("please sure you enter correct data", {
        theme: "dark",
        autoClose: 2000,
        position: "top-right",
        closeOnClick: true,
        pauseOnHover: true,
      });
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      setLoading(false);
      toast.success("Successfully Logged in", {
        theme: "dark",
        autoClose: 2000,
        position: "top-right",
        closeOnClick: true,
        pauseOnHover: true,
      });
      navigate("/checkout");
    } catch (error) {
      setLoading(false);
      toast.error(error.message, {
        theme: "dark",
        autoClose: 2000,
        position: "top-right",
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  };
  return (
    <Helmet title="Login">
      <section>
        <Container>
          <Row>
            {loading ? (
              <Col>Loading ...</Col>
            ) : (
              <Col lg="6" className="m-auto text-center">
                <h3 className="fw-bold fs-4 mb-4">Login</h3>
                <Form className="auth__form" onSubmit={submitHandler}>
                  <FormGroup className="form_group">
                    <input
                      type="email"
                      placeholder="Enter Your Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup className="form_group">
                    <input
                      type="password"
                      placeholder="Enter Your Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </FormGroup>
                  <button
                    className="shop__btn login__btn"
                    type="submit"
                    onClick={submitHandler}
                  >
                    Login
                  </button>
                  <p>
                    Don't Have an Account ?
                    <Link to="/signup"> Create an account</Link>
                  </p>
                </Form>
              </Col>
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Login;
