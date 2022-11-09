import products from "../../assets/data/products";
import ProductCard from "./ProductCard";

const ProductList = ({ category }) => {
  let filterdProducts = products.filter((item) => item.category === category);
  if (category === "all") {
    filterdProducts = products;
  }
  return (
    <>
      {filterdProducts.length > 0 ? (
        filterdProducts?.map((item, index) => (
          <ProductCard item={item} key={index} />
        ))
      ) : (
        <h1>No Products Are Found.</h1>
      )}
    </>
  );
};

export default ProductList;
