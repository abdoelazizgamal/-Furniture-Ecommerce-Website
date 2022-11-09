import { motion } from "framer-motion";
import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Col, Container, Row } from "reactstrap";
import products from "../assets/data/products";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import ProductCard from "../components/UI/ProductCard";
import { addItem } from "../redux/slices/cartSlice";
import "../styles/product-details.css";
const ProductDetails = () => {
  const state = useSelector((state) => state.cart.cartItems);

  const [tab, setTab] = useState("desc");
  const [rating, setRating] = useState(null);
  const reviewUser = useRef("");
  const reviewMsg = useRef("");
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = products.find((prod) => prod.id === id);

  const {
    productName,
    description,
    avgRating,
    imgUrl,
    price,
    reviews,
    shortDesc,
    category,
  } = product;
  const handleTab = (e) => {
    setTab(e.target.dataset.target);
  };
  const addToCart = () => {
    dispatch(
      addItem({
        id,
        image: imgUrl,
        productName,
        price,
      })
    );

    toast.success("Wow so easy! , product added", {
      theme: "dark",
      autoClose: 2000,
      position: "top-right",
      closeOnClick: true,
      pauseOnHover: true,
    });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const reviewUserName = reviewUser.current.value;
    const reviewUserMsg = reviewMsg.current.value;
    const reviewObj = {
      userName: reviewUserName,
      text: reviewUserMsg,
      rating,
    };
    toast.success("Wow so easy! , Review Submitted", {
      theme: "dark",
      autoClose: 2000,
      position: "top-right",
      closeOnClick: true,
      pauseOnHover: true,
    });
  };
  const relatedProducts = products.filter((item) => item.category === category);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product]);
  return (
    <>
      <Helmet title={productName}>
        <CommonSection title={productName} />

        <section className="pt-0">
          <Container>
            <Row>
              <Col lg="6">
                <img src={imgUrl} alt="" />
              </Col>
              <Col lg="6">
                <div className="product__details">
                  <h2>{productName}</h2>
                  <div className="product__rating d-flex align-items-center gap-5 mb-3">
                    <div>
                      <span className="ri-star-s-fill"></span>
                      <span className="ri-star-s-fill"></span>
                      <span className="ri-star-s-fill"></span>
                      <span className="ri-star-s-fill"></span>
                      <span className="ri-star-half-s-fill"></span>
                    </div>
                    <p>
                      <span>{avgRating}</span> ratings
                    </p>
                  </div>
                  <div className="d-flex align-items-center gap-5">
                    <span className="product__price">${price}</span>
                    <span>Category : {category.toUpperCase()}</span>
                  </div>
                  <p className="mt-3">{shortDesc}</p>
                  <motion.button
                    whileTap={{ scale: 1.2 }}
                    className="shop__btn"
                    onClick={addToCart}
                  >
                    Add To Cart
                  </motion.button>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <section>
          <Container>
            <Row>
              <Col lg="12">
                <div className="tab__wrapper d-flex align-items-center gap-5">
                  <h6
                    onClick={handleTab}
                    data-target="desc"
                    className={tab === "desc" ? "active__tab" : ""}
                  >
                    Description
                  </h6>
                  <h6
                    onClick={handleTab}
                    className={tab === "rev" ? "active__tab" : ""}
                    data-target="rev"
                  >
                    Reviwes ({reviews.length})
                  </h6>
                </div>
                {tab === "desc" ? (
                  <div className="tab__content mt-5" data-tab="desc">
                    <p>{description}</p>
                  </div>
                ) : (
                  <div className="product__review mt-5" data-tab="rev">
                    <div className="review__wrapper">
                      <ul>
                        {reviews?.map((item, index) => (
                          <li key={index} className="mb-4">
                            <h4>Jhon Doe</h4>
                            <span>{item?.rating} (rating)</span>
                            <p>{item?.text}</p>
                          </li>
                        ))}
                      </ul>
                      <div className="review__form">
                        <h4>Leave Your Experience</h4>
                        <form action="" onSubmit={submitHandler}>
                          <div className=" form_group">
                            <input
                              type="text"
                              placeholder="Enter name"
                              ref={reviewUser}
                              required
                            />
                          </div>
                          <div className="form_group d-flex align-items-center gap-5 rating__group">
                            {[1, 2, 3, 4, 5].map((item, index) => (
                              <motion.span
                                whileTap={{ scale: 1.2 }}
                                key={index}
                                onClick={() => setRating(item)}
                              >
                                {item}
                                <i className="ri-star-s-fill"></i>
                              </motion.span>
                            ))}
                          </div>
                          <div className="form_group">
                            <textarea
                              rows={4}
                              placeholder="Review Message"
                              ref={reviewMsg}
                              required
                            />
                          </div>
                          <button
                            type="submit"
                            className="shop__btn"
                            onClick={submitHandler}
                          >
                            Submit
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                )}
              </Col>
              <Col lg="12" className="mt-5">
                <h2 className="related__title">You might also like</h2>
              </Col>
              {relatedProducts.map((item, index) => (
                <ProductCard item={item} key={index} />
              ))}
            </Row>
          </Container>
        </section>
      </Helmet>
    </>
  );
};

export default ProductDetails;
