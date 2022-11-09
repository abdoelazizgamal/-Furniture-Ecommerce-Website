import React from "react";
import { Col, Container, Row } from "reactstrap";
import ProductList from "./ProductList";

const SectionWrapper = ({ sectionClass, title, categories }) => {
  return (
    <>
      <section className={sectionClass}>
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section__title">{title}</h2>
            </Col>
            {categories?.map((cat, index) => (
              <ProductList category={cat} key={index} />
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default SectionWrapper;
