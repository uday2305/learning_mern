import React, { useEffect } from "react";
import { productActions, cartActions } from "../actions";
import { connect } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { displayAsCurrency } from "../helpers";

const ProductDetails = (props) => {
  let navigate = useNavigate();

  const usePathname = () => {
    const location = useLocation();
    return location.pathname;
  };
  let pathName = usePathname();
  let productId = pathName.substring("/products/".length);
  useEffect(() => {
    // code to run on component mount
    props.getProducts();
    props.getProductDetails(productId);
  }, []);
  const handleRedirect = (e) => {
    let productId = e.currentTarget.attributes["data-productid"]?.nodeValue;
    if (productId) {
      props.getProducts();
      props.getProductDetails(productId);
    }
  };
  const handleAddToCart = (e) => {
    let productId = e.currentTarget.attributes["data-productid"]?.nodeValue;
    if (productId) {
      let cartItem = props.productList.products.find(function (obj) {
        return obj._id === productId;
      });
      props.addItemToCart(cartItem);
    }
  };
  const handleBuyNow = (e) => {
    let productId = e.currentTarget.attributes["data-productid"]?.nodeValue;
    if (productId) {
      let cartItem = props.productList.products.find(function (obj) {
        return obj._id === productId;
      });
      props.addItemToCart(cartItem);
      navigate("/checkout");
    }
  };

  return (
    <div className="mt-3 container">
      {props.productDetails ? (
        <div>
          <h2> {props.productDetails.name}</h2>
          <div className="row mb-3">
            <div className="col">
              <div className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img
                      src={props.productDetails.image}
                      className="d-block rounded-3"
                      height="600"
                      width="100%"
                      alt="..."
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mb-5">
            <div className="col-4">
              <h3 className="d-inline text-info me-3">
                {displayAsCurrency(props.productDetails.discountPrice)}
              </h3>
              <h3 className="text-decoration-line-through d-inline text-danger">
                {displayAsCurrency(props.productDetails.price)}
              </h3>
              <div className="my-3">
                <button
                  className="btn text-white btn-warning me-3"
                  onClick={handleBuyNow}
                  data-productid={props.productDetails._id}
                >
                  Buy Now
                </button>
                <button
                  onClick={handleAddToCart}
                  data-productid={props.productDetails._id}
                  className="btn btn-primary"
                >
                  Add to Cart
                </button>
              </div>
            </div>
            <div className="col-8">
              <p>{props.productDetails.description}</p>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {props.productList ? (
        <div>
          <h2>Recommended Products</h2>
          <div className="row row-cols-3">
            {props.productList?.products.slice(0, 6).map((product, index) => (
              <div className="col mb-3" key={product._id}>
                <div className="card shadow-sm">
                  <button
                    onClick={handleRedirect}
                    data-productid={product._id}
                    className="border-0"
                  >
                    {" "}
                    <img
                      src={product.image}
                      alt={product.name}
                      width="100%"
                      height="225"
                    />
                  </button>
                  <h6>
                    {product.name}
                    <span className="float-end">
                      {displayAsCurrency(product.discountPrice)}
                    </span>
                  </h6>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
function mapState(state) {
  const { loading, productList } = state.productList;
  const productDetails = state.productDetails.product;
  return { productDetails, loading, productList };
}

const actionCreators = {
  getProducts: productActions.getProducts,
  getProductDetails: productActions.getProductDetails,
  addItemToCart: cartActions.addItemToCart,
};

const connectedProductDetails = connect(
  mapState,
  actionCreators
)(ProductDetails);
export { connectedProductDetails as ProductDetails };
