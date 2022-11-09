import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Col, Container, Form, FormGroup, Row } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import "../styles/login.css";
import { auth, db, storage } from "../firebase.config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useRef } from "react";
const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState();
  const fileRef = useRef();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const fileHandler = () => setFile(fileRef.current.files[0]);
  const submitHandler = async (e) => {
    e.preventDefault();

    if (!username || username.length < 5 || !password || !file) {
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
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const storageRef = ref(storage, `images/${Date.now() + username}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        (error) => {
          toast.error(error.message, {
            theme: "dark",
            autoClose: 2000,
            position: "top-right",
            closeOnClick: true,
            pauseOnHover: true,
          });
        },
        async () => {
          await getDownloadURL(uploadTask.snapshot.ref).then(
            async (downloadURL) => {
              //update user profile
              console.log(downloadURL);
              await updateProfile(user, {
                displayName: username,
                photoURL: downloadURL,
              });
              //store user data in firestore database
              await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                displayName: username,
                email,
                photoURL: downloadURL,
              });
            }
          );
        }
      );
      setLoading(false);
      toast.success("Account Created", {
        theme: "dark",
        autoClose: 2000,
        position: "top-right",
        closeOnClick: true,
        pauseOnHover: true,
      });
      navigate("/login");
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
    <Helmet title="Signup">
      <section>
        <Container>
          <Row>
            {loading ? (
              <Col lg="12" className="text-center fw-bold">
                <h5>Loading...</h5>
              </Col>
            ) : (
              <Col lg="6" className="m-auto text-center">
                <h3 className="fw-bold fs-4 mb-4">Signup</h3>
                <Form className="auth__form" onSubmit={submitHandler}>
                  <FormGroup className="form_group">
                    <input
                      type="text"
                      placeholder="Enter Your UserName"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </FormGroup>
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
                  <FormGroup className="form_group">
                    <input type="file" onChange={fileHandler} ref={fileRef} />
                  </FormGroup>
                  <button
                    className="shop__btn login__btn"
                    type="submit"
                    onClick={submitHandler}
                  >
                    Create an account
                  </button>
                  <p>
                    Already Have an Account ?<Link to="/login"> Login</Link>
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

export default Signup;
