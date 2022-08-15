import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, connect } from "react-redux";
import { displayAsCurrency } from "../helpers";
import { cartActions, productActions, alertActions } from "../actions";
const ProductCategories = (props) => {
  useEffect(() => {
    // code to run on component mount
    props.clearAlerts();
    props.getProducts();
  }, []);

  const usePathname = () => {
    const location = useLocation();
    return location.pathname;
  };
  let pathName = usePathname();
  let categoryName = pathName.substring("/categories/".length);

  const storedProducts = useSelector((state) => state.productList);
  let filteredProducts = storedProducts?.productList?.products?.filter(
    (product) => product.category.toLowerCase() === categoryName.toLowerCase()
  );
  const handleAddToCart = (e) => {
    let productId = e.currentTarget.attributes["data-productid"]?.nodeValue;
    if (productId) {
      let cartItem = props.productList.products.find(function (obj) {
        return obj._id === productId;
      });
      props.addItemToCart(cartItem);
    }
  };
  return (
    <div className="container">
      {props.alert.message && (
        <div className={`alert ${props.alert.type}`}>{props.alert.message}</div>
      )}
      <div className="row g-3">
        <div className="col-3">
          <div className="card fw-bold border-0">
            <div className="card-body">
              Price Range
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <button className="btn text-primary btn-link-dark p-0 fw-bold">
                    $5 - $50
                  </button>
                </li>
                <li className="list-group-item">
                  <button className="btn text-primary btn-link-dark p-0 fw-bold">
                    $50 - $150
                  </button>
                </li>
                <li className="list-group-item">
                  <button className="btn text-primary btn-link-dark p-0 fw-bold">
                    $150 - $500
                  </button>
                </li>
                <li className="list-group-item">
                  <button className="btn text-primary btn-link-dark p-0 fw-bold">
                    $500 - $1000
                  </button>
                </li>
                <li className="list-group-item">
                  <button className="btn text-primary btn-link-dark p-0 fw-bold">
                    $1000 - $5000
                  </button>
                </li>
                <li className="list-group-item">
                  <button className="btn text-primary btn-link-dark p-0 fw-bold">
                    Reset
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {props.productList ? (
          <div className="col">
            <div className="row row-cols-4 mb-3">
              {filteredProducts.slice(0, 8).map((product, index) => (
                <div className="col mb-3" key={`${product._id}_${index}`}>
                  <div className="card shadow-sm">
                    <Link to={`/products/${product._id}`} className="border-0">
                      {" "}
                      <img
                        src={product.image}
                        alt={product.name}
                        width="100%"
                        height="300"
                        className="home-top-products-image"
                      />
                      {product.isTopProduct ? (
                        <div className="home-top-selling p-1 bg-warning">
                          <span className="ms-2 text-secondary">
                            Top Selling Product
                          </span>
                        </div>
                      ) : (
                        ""
                      )}
                    </Link>
                    <div className="d-flex py-2">
                      <div className="w-50">
                        <h6 className="ms-1 float-start">
                          {displayAsCurrency(product.discountPrice)}
                        </h6>
                      </div>
                      <div className="w-50">
                        <button
                          type="button"
                          onClick={handleAddToCart}
                          data-productid={product._id}
                          className="me-1 float-end btn btn-primary btn-sm"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
function mapState(state) {
  const { loading, productList } = state.productList;
  const { alert } = state;
  return { alert, loading, productList };
}

const actionCreators = {
  getProducts: productActions.getProducts,
  getHomePageBanner: productActions.getHomePageBanners,
  addItemToCart: cartActions.addItemToCart,
  clearAlerts: alertActions.clear,
};

const connectedProductCategories = connect(
  mapState,
  actionCreators
)(ProductCategories);
export { connectedProductCategories as ProductCategories };
