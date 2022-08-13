import React, { useEffect } from "react";
import { cartActions, alertActions } from "../actions";
import { useNavigate, Link } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { displayAsCurrency } from "../helpers";
const Cart = (props) => {
  let navigate = useNavigate();
  const cartItems = useSelector((state) => state.getCartItems);
  const grandTotal = cartItems?.items?.reduce((accumulator, product) => {
    return accumulator + product.discountPrice;
  }, 0);
  const handleDeleteProduct = (e) => {
    let productId = e.currentTarget.attributes["data-productid"]?.nodeValue;
    if (productId) {
      props.removeItemFromCart(productId);
    }
  };
  const handlePageDetailsRedirect = (e) => {
    let productId = e.currentTarget.attributes["data-productid"]?.nodeValue;
    if (productId) {
      navigate(`/products/${productId}`);
    }
  };
  useEffect(() => {
    // code to run on component mount
    props.clearAlerts();
  }, []);
  return (
    <div className="container">
      {props.alert.message && (
        <div className={`alert ${props.alert.type}`}>{props.alert.message}</div>
      )}
      <div className="my-5 d-flex">
        <h1> Cart</h1>
      </div>
      {cartItems && cartItems.items && cartItems?.items?.length !== 0 ? (
        <div>
          <ul className="list-group">
            {cartItems?.items?.map((product, index) => (
              <li className="list-group-item" key={`${product._id}_${index}`}>
                <div className="d-flex">
                  <div
                    role="button"
                    className="w-50"
                    data-productid={product._id}
                    onClick={handlePageDetailsRedirect}
                  >
                    <h5 className="card-title">
                      <span>{product.quantity} x</span>
                      <span className="ms-1">{product.name}</span>
                    </h5>

                    <div>
                      <span className="card-text">Discount Price:</span>
                      <span className="card-text">
                        {displayAsCurrency(product.discountPrice)}
                      </span>
                    </div>
                    <div>
                      <span className="card-text">Price:</span>
                      <span className="card-text">
                        {displayAsCurrency(product.price)}
                      </span>
                    </div>
                  </div>
                  <div className="w-50">
                    <div className="float-end">
                      <h4 className="card-title">
                        {displayAsCurrency(product.discountPrice)}
                      </h4>
                    </div>
                  </div>
                </div>
                <div>
                  <button
                    onClick={handleDeleteProduct}
                    data-productid={product._id}
                    className="btn card-text text-danger"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-3 float-end">
            <h2>{`Grand Total ${displayAsCurrency(grandTotal)}`}</h2>
            <Link
              to="/checkout"
              type="button"
              className="btn btn-primary btn-lg float-end"
            >
              Checkout
            </Link>
          </div>
        </div>
      ) : (
        <h2> Your cart is empty</h2>
      )}
    </div>
  );
};

function mapState(state) {
  const { alert } = state;
  return { alert };
}

const actionCreators = {
  removeItemFromCart: cartActions.removeItemFromCart,
  clearAlerts: alertActions.clear,
};

const connectedCart = connect(mapState, actionCreators)(Cart);
export { connectedCart as Cart };
