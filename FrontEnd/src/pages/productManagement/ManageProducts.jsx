import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { productActions, alertActions } from "../../redux/actions";
import { connect } from "react-redux";
import { displayAsCurrency } from "../../helpers";
const ManageProducts = (props) => {
  const { alert, productListUpdateRequired } = props;
  let navigate = useNavigate();
  useEffect(() => {
    // code to run on component mount
    props.getProducts();
  }, []);
  const handleDeleteProduct = (e) => {
    let productId = e.target.attributes["data-productid"]?.nodeValue;
    if (productId) {
      props.deleteProduct(productId);
    }
  };
  if (productListUpdateRequired) {
    props.getProducts();
  }
  const handlePageDetailsRedirect = (e) => {
    let productId =
      e.target.parentElement.attributes["data-productid"]?.nodeValue;
    if (productId) {
      navigate(`/products/${productId}`);
    }
  };
  return (
    <div className="container">
      <div className="my-5 d-flex">
        <h1> Manage Products</h1>
        <Link
          to="/admin/add-new-product"
          className="btn btn-primary ms-5"
          role="button"
        >
          Add New Product
        </Link>
      </div>
      {alert.message && (
        <div className={`alert ${alert.type}`}>{alert.message}</div>
      )}
      <ul>
        {props.productList?.products.map((product, index) => (
          <li
            className="mt-3 d-flex border-bottom pb-3 border-dark"
            key={product._id}
          >
            <div
              role="button"
              className="w-50"
              data-productid={product._id}
              onClick={handlePageDetailsRedirect}
            >
              <h5 className="card-title">{product.name}</h5>
              <span className="card-text">Price: </span>
              <span className="card-text">
                {" "}
                {displayAsCurrency(product.discountPrice)}
              </span>
            </div>
            <div className="w-50">
              <div className="float-end">
                <Link
                  role="button"
                  to={`/admin/products/${product._id}/edit`}
                  className="btn card-text"
                >
                  Edit
                </Link>
                <span className="card-text mx-2">|</span>
                <button
                  onClick={handleDeleteProduct}
                  data-productid={product._id}
                  className="btn card-text text-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

function mapState(state) {
  const { loading, productList, productListUpdateRequired } = state.productList;
  const { alert } = state;
  return { alert, loading, productList, productListUpdateRequired };
}

const actionCreators = {
  getProducts: productActions.getProducts,
  deleteProduct: productActions.deleteProduct,
  clearAlerts: alertActions.clear,
};

const connectedManageProducts = connect(
  mapState,
  actionCreators
)(ManageProducts);
export { connectedManageProducts as ManageProducts };
