import { Col, Container, Row } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import heroImg from "../assets/images/hero-img.png";
import { motion } from "framer-motion";
import "../styles/home.css";
import { Link } from "react-router-dom";
import Services from "../services/Services";

import counterImage from "../assets/images/counter-timer-img.png";
import Clock from "../components/UI/Clock";
import SectionWrapper from "../components/UI/SectionWrapper";
const Home = () => {
  const year = new Date().getFullYear();
  return (
    <Helmet title="Home">
      <section className="hero__section">
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="hero__content">
                <p className="hero__subtitle">Trending product in {year}</p>
                <h2>Make Your Interior More Minimalistic & Modern</h2>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Culpa fuga quaerat quam totam vitae eius atque fugit illum
                  doloribus rerum!
                </p>
                <motion.button whileTap={{ scale: 1.2 }} className="shop__btn">
                  <Link to="/shop">SHOP NOW</Link>
                </motion.button>
              </div>
            </Col>
            <Col lg="6" md="6">
              <div className="hero__img">
                <img src={heroImg} alt="" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Services />

      <SectionWrapper
        sectionClass="trending__products"
        title="Trending Products"
        categories={["chair"]}
      />
      <SectionWrapper
        sectionClass="best__sales"
        title="Best Sales"
        categories={["sofa"]}
      />
      <section className="timer__count">
        <Container>
          <Row>
            <Col lg="6" md="12">
              <div className="clock_top-content text-white ">
                <h3 className="fs-6 mb-2">Limited offers</h3>
                <h4 className="fs-5 mb-2">Quality Armchair</h4>
              </div>
              <Clock />
              <motion.button
                whileTap={{ scale: 1.1 }}
                className="shop__btn store__btn "
              >
                <Link to="/shop">Visit Store</Link>
              </motion.button>
            </Col>
            <Col lg="6" md="12" className="lg-text-end counter__img">
              <img src={counterImage} alt="" />
            </Col>
          </Row>
        </Container>
      </section>
      <SectionWrapper
        sectionClass="new__arrivals"
        title="New Arrivals"
        categories={["mobile", "wireless"]}
      />
      <SectionWrapper
        sectionClass="popular__category"
        title="Popular in Categorty"
        categories={["watch"]}
      />
    </Helmet>
  );
};

export default Home;
