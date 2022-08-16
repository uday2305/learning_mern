import React, { useEffect } from "react";
import { productActions, alertActions } from "../../redux/actions";
import { connect } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import ProductForm from "./ProductForm";

const EditProduct = (props) => {
  const { alert, redirectTo } = props;
  const usePathname = () => {
    const location = useLocation();
    return location.pathname;
  };
  let pathName = usePathname();
  let productId = pathName.substring(
    "/admin/products/".length,
    pathName.indexOf("/edit")
  );
  useEffect(() => {
    props.clearAlerts();
    props.getProductDetails(productId);
  }, []);

  const handleSubmit = (formValues) => {
    props.editProduct(formValues, productId);
  };
  if (redirectTo) {
    return <Navigate to={redirectTo} />;
  }

  return (
    <div>
      {alert.message && (
        <div className={`alert ${alert.type}`}>{alert.message}</div>
      )}
      {props.productDetails ? (
        <ProductForm
          handleSubmit={handleSubmit}
          productDetails={props.productDetails}
        />
      ) : (
        ""
      )}
    </div>
  );
};

function mapState(state) {
  const { loading } = state.productUpdate;
  const productDetails = state.productDetails.product;
  const { alert } = state;
  const { redirectTo } = state.redirect;
  return { alert, loading, redirectTo, productDetails };
}

const actionCreators = {
  editProduct: productActions.editProduct,
  getProductDetails: productActions.getProductDetails,
  clearAlerts: alertActions.clear,
};

const connectedEditProduct = connect(mapState, actionCreators)(EditProduct);
export { connectedEditProduct as EditProduct };
