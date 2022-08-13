import { combineReducers } from 'redux';

import { alert } from './alertReducer';
import {
    productAddReducer,
    productDeleteReducer,
    productDetailsReducer,
    productListReducer,
    productUpdateReducer,
    homePageBannerReducer,
  } from './productReducer';
 /* import {
    orderListReducer,
    orderDetailsReducer,
    orderUpdateReducer,
    orderDeleteReducer,
  } from './reducers/orderReducers';*/

  import{
    getCartItemsReducer,
  }from './cartReducer'
  import {
    userAuthenticationReducer,
    userRegisterReducer,
    userProfileDetailsReducer,
    userProfileImageUpdateReducer,
    userProfileImageDeleteReducer,
    userProfileAddressUpdateReducer,
  } from './userReducers';
  import { redirect } from './redirectReducer';
const rootReducer = combineReducers({
  alert,
  redirect,
  // User
  userAuthentication: userAuthenticationReducer,
  userRegister: userRegisterReducer,
  userProfileDetails: userProfileDetailsReducer,
  userProfileImageUpdate: userProfileImageUpdateReducer,
  userProfileImageDelete: userProfileImageDeleteReducer,
  userProfileAddressUpdate: userProfileAddressUpdateReducer,
  // Product
  productAdd: productAddReducer,
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productUpdate: productUpdateReducer,
  productDelete: productDeleteReducer,
  homePageBanner: homePageBannerReducer,
  // Orders
  // orderList: orderListReducer,
  // orderDetails: orderDetailsReducer,
  // orderUpdate: orderUpdateReducer,
  // orderDelete: orderDeleteReducer,

  //Cart
  getCartItems:getCartItemsReducer,
})

export default rootReducer;