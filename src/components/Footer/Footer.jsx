import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import FooterLinks from "../UI/FooterLinks";
import "./footer.css";
const Footer = () => {
  return (
    <>
      <footer className="footer">
        <Container>
          <Row>
            <Col lg="4" md="6" className="mb-4">
              <div>
                <h1 className="text-white mb-4">Multimart</h1>
                <p className="footer__text mt-4">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
                  consequuntur dolores asperiores officia rerum nostrum. Fugit
                  eos deleniti eligendi dolores!
                </p>
              </div>
            </Col>
            <Col lg="3" md="3" className="mb-4">
              <FooterLinks
                title="Top Categories"
                list={[
                  "Mobile Phones",
                  "Modern sofa",
                  "Arm Chair",
                  "Smart watches",
                ]}
              />
            </Col>
            <Col lg="2" md="3" className="mb-4">
              <FooterLinks
                title="Useful Links"
                list={["Shop", "Cart", "Login", "Privacy Policy"]}
                paths={["/shop", "/cart", "/login", "#"]}
              />
            </Col>
            <Col lg="3" md="6">
              <div className="footer__quick-links">
                <div className="quick__links-title">Contact</div>
                <ListGroup className="mb-3 footer__contact">
                  <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                    <span>
                      <i className="ri-map-pin-line"></i>
                    </span>
                    <p>123 Mansoura ElDakhlia Egypt</p>
                  </ListGroupItem>
                  <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                    <span>
                      <i className="ri-phone-line"></i>
                    </span>
                    <p>01090654552</p>
                  </ListGroupItem>
                  <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                    <span>
                      <i className="ri-map-pin-line"></i>
                    </span>
                    <p>abdoelaziz.gamal010@gmail.com</p>
                  </ListGroupItem>
                </ListGroup>
              </div>
            </Col>
            <Col lg="12">
              <p className="footer__copyright">
                copyright {new Date().getFullYear()} &copy; developed by Ag
                Coding All Rights Reserved.
              </p>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default Footer;
