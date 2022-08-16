import React, { useEffect } from 'react';
import { productActions,alertActions } from '../../redux/actions';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import ProductForm from './ProductForm';

const AddProduct = (props) => {
  const { alert,redirectTo } = props;

  useEffect(()=>{
    props.clearAlerts();
  },[]);

  const handleSubmit = formValues => {
    props.addProduct(formValues);
  };
  if (redirectTo) {
    return <Navigate to={redirectTo} />;
   }
  
  return (<div>
    {alert.message &&
      <div className={`alert ${alert.type}`}>{alert.message}</div>
    }
    <ProductForm handleSubmit={handleSubmit} />
  </div>)
};

function mapState(state) {
  const { loading } = state.productAdd;
  const { alert } = state;
  const {redirectTo} = state.redirect;
 return { alert,loading,redirectTo};
}

const actionCreators = {
  addProduct:productActions.addProduct,
  clearAlerts: alertActions.clear
};

const connectedAddProduct = connect(mapState, actionCreators)(AddProduct);
export { connectedAddProduct as AddProduct };
