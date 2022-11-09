import "../styles/cart.css";
import Helmet from "../components/Helmet/Helmet";
import Commonsection from "../components/UI/CommonSection";
import { motion } from "framer-motion";
import { Col, Container, Row } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteItem } from "../redux/slices/cartSlice";
import { Link } from "react-router-dom";
const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  const HandleDelete = (id) => dispatch(deleteItem(id));
  return (
    <>
      <Helmet title="Cart">
        <Commonsection title="Shopping Cart"></Commonsection>
        <section>
          <Container>
            <Row>
              <Col lg="9" className="shadow">
                {cartItems.length > 0 ? (
                  <table className="table bordered">
                    <thead>
                      <tr>
                        <th>Images</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems?.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <img src={item.image} alt="" />
                          </td>
                          <td>{item.productName}</td>
                          <td>{item.price}</td>
                          <td>{item.quantity}</td>
                          <td>
                            <motion.span
                              onClick={() => HandleDelete(item.id)}
                              whileTap={{ scale: 1.2 }}
                              className="p-2 bg-danger text-white ri-delete-bin-line"
                            ></motion.span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <h2>No items Added To Cart</h2>
                )}
              </Col>
              <Col lg="3" className="py-2 shadow-sm">
                <div>
                  <h6 className="d-flex align-items-center justify-content-between">
                    subtotal
                    <span className="fs-4 fw-bold">${totalAmount}</span>
                  </h6>

                  <p className="fs-6 mt-2 ">
                    taxes and shipping will calculate in checkout
                  </p>
                </div>

                <button className="shop__btn w-100">
                  <Link to="/checkout">Checkout</Link>
                </button>
                <button className="shop__btn w-100 mt-3">
                  <Link to="/shop">Continue Shopping</Link>
                </button>
              </Col>
            </Row>
          </Container>
        </section>
      </Helmet>
    </>
  );
};

export default Cart;
