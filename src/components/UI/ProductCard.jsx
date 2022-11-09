import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Col } from "reactstrap";
import { addItem } from "../../redux/slices/cartSlice";
import "../../styles/product-card.css";
import { toast } from "react-toastify";
const ProductCard = ({ item }) => {
  const dispatch = useDispatch();
  const addToCart = () => {
    dispatch(
      addItem({
        id: item.id,
        productName: item.productName,
        image: item.imgUrl,
        price: item.price,
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
  const { imgUrl, productName, price, category, id } = item;
  return (
    <Col lg="3" md="4" className="mb-2">
      <div className="product__item">
        <div className="product__img">
          <motion.img src={imgUrl} alt="" whileHover={{ scale: 0.9 }} />
        </div>
        <div className="p-2 product__info">
          <h3 className="product__name">
            <Link to={`/shop/${id}`}>{productName}</Link>
          </h3>
          <span>{category}</span>
        </div>
        <div className="product__card-bottom d-flex align-items-center justify-content-between p-2">
          <span className="price">{price}</span>
          <motion.span whileTap={{ scale: 1.2 }} onClick={addToCart}>
            <i className="ri-add-line"></i>
          </motion.span>
        </div>
      </div>
    </Col>
  );
};

export default ProductCard;
