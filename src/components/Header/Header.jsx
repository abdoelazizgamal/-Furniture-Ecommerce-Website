import { Container, Row } from "reactstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../../assets/images/eco-logo.png";
import userIcon from "../../assets/images/user-icon.png";
import "./header.css";
import { useRef } from "react";
import { useSelector } from "react-redux";
import useAuth from "../../custom-hooks/useAuth";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../../firebase.config";

const nav__Links = [
  {
    path: "home",
    display: "Home",
  },
  {
    path: "shop",
    display: "Shop",
  },
  {
    path: "cart",
    display: "Cart",
  },
];
const Header = () => {
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const profileActionRef = useRef(null);
  const menuToggle = () => menuRef.current.classList.toggle("active__menu");
  const navigateToCart = () => navigate("/cart");
  const toggleProfileActions = () =>
    profileActionRef.current.classList.toggle("show__profileActions");
  const logout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logged Out");
        navigate("/home");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <header className="header">
      <Container>
        <Row>
          <div className="nav__wrapper">
            <div className="logo">
              <img src={logo} alt="logo" />
              <div>
                <h1>Multimart</h1>
                {/* <p>since 1995</p> */}
              </div>
            </div>
            <div className="navigation" ref={menuRef} onClick={menuToggle}>
              <ul className="menu">
                {nav__Links.map((link, index) => (
                  <li className="nav__item" key={index}>
                    <NavLink to={link.path}>{link.display}</NavLink>
                  </li>
                ))}
              </ul>
            </div>
            <div className="nav__icons">
              <span className="fav__icon">
                <i className="ri-heart-line"></i>
                <div className="badge">1</div>
              </span>
              <span className="cart__icon" onClick={navigateToCart}>
                <i className="ri-shopping-bag-line"></i>
                <div className="badge">{totalQuantity}</div>
              </span>
              <div className="profile">
                <motion.img
                  whileTap={{ scale: 1.2 }}
                  src={currentUser ? currentUser.photoURL : userIcon}
                  alt=""
                  onClick={toggleProfileActions}
                />
                <div className="profile__actions" ref={profileActionRef}>
                  {currentUser ? (
                    <span onClick={logout}>Logout</span>
                  ) : (
                    <>
                      <Link to="/signup">Signup</Link>
                      <Link to="/login">Login</Link>
                    </>
                  )}
                </div>
              </div>
              <div className="mobile__menu " onClick={menuToggle}>
                <span>
                  <i className="ri-menu-line"></i>
                </span>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
