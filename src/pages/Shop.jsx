import React from "react";
import { Col, Container, Row } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import "../styles/shop.css";
import { useState } from "react";
import ProductList from "../components/UI/ProductList";
import products from "../assets/data/products";
import ProductCard from "../components/UI/ProductCard";
const Shop = () => {
  const [productsFilter, setproductsFilter] = useState("all");
  const [searchFilter, setSearchFilter] = useState("");
  const handleFilter = (e) => {
    const filterValue = e.target.value;
    console.log(filterValue);
    setproductsFilter(filterValue);
  };
  const handleSearch = (e) => {
    const searchFilter = e.target.value;
    setSearchFilter(searchFilter);
    console.log(products);
  };
  return (
    <>
      <Helmet title="shop">
        <CommonSection title="products"></CommonSection>
        <section>
          <Container>
            <Row>
              <Col lg="3" md="6">
                <div className="filter__widget">
                  <select name="" id="" onChange={handleFilter}>
                    <option value="all">Filter By Category</option>
                    <option value="all">All</option>
                    <option value="sofa">Sofa</option>
                    <option value="mobile">Mobile</option>
                    <option value="chair">Chair</option>
                    <option value="watch">Watch</option>
                    <option value="wireless">Wireless</option>
                  </select>
                </div>
              </Col>
              <Col lg="3" md="6" className="text-end">
                <div className="filter__widget">
                  <select name="" id="">
                    <option>Sort By</option>
                    <option value="ascending">Ascending</option>
                    <option value="descending">Descending</option>
                  </select>
                </div>
              </Col>
              <Col lg="6" md="12">
                <div className="search__box">
                  <input
                    type="text"
                    placeholder="search.."
                    onChange={handleSearch}
                  />
                  <span>
                    <i className="ri-search-line"></i>
                  </span>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="pt-0">
          <Container>
            <Row>
              {!searchFilter && <ProductList category={productsFilter} />}
              {searchFilter &&
                products
                  .filter((item) =>
                    item.productName.toLowerCase().includes(searchFilter)
                  )
                  .map((item, index) => (
                    <ProductCard item={item} key={index} />
                  ))}
            </Row>
          </Container>
        </section>
      </Helmet>
    </>
  );
};

export default Shop;
