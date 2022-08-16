import { cartConstants } from "../constants";
import { cartService } from "../../services";
import { alertActions } from "./";
export const cartActions = {
  addItemToCart,
  getCartItems,
  removeItemFromCart,
  clearCartItems,
};
function addItemToCart(payload) {
  payload.quantity = 1;
  return (dispatch) => {
    //dispatch(request(payload));

    cartService.addItemToCart(payload).then(
      (cartItems) => {
        dispatch(success(cartItems));
        dispatch(alertActions.success("Item added to cart successfully"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(payload) {
    return { type: cartConstants.GET_CART_ITEMS_REQUEST, payload };
  }
  function success(cartItems) {
    return { type: cartConstants.GET_CART_ITEMS_SUCCESS, cartItems };
  }
  function failure(error) {
    return { type: cartConstants.GET_CART_ITEMS_FAILURE, error };
  }
}

function removeItemFromCart(productId) {
  return (dispatch) => {
    //dispatch(request(productId));

    cartService.removeItemFromCart(productId).then(
      (cartItems) => {
        dispatch(success(cartItems));
        dispatch(alertActions.success("Item removed from cart successfully"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  //function request(productId) { return { type: cartConstants.GET_CART_ITEMS_REQUEST, productId } }
  function success(cartItems) {
    return { type: cartConstants.GET_CART_ITEMS_SUCCESS, cartItems };
  }
  function failure(error) {
    return { type: cartConstants.GET_CART_ITEMS_FAILURE, error };
  }
}

function getCartItems() {
  return (dispatch) => {
    //dispatch(request());

    cartService.getCartItems().then(
      (cartItems) => {
        dispatch(success(cartItems));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  //function request() { return { type: cartConstants.GET_CART_ITEMS_REQUEST } }
  function success(cartItems) {
    return { type: cartConstants.GET_CART_ITEMS_SUCCESS, cartItems };
  }
  function failure(error) {
    return { type: cartConstants.GET_CART_ITEMS_FAILURE, error };
  }
}

function clearCartItems() {
  return (dispatch) => {
    //dispatch(request());

    cartService.clearCartItems().then(
      (cartItems) => {
        dispatch(success(cartItems));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  //function request() { return { type: cartConstants.CLEAR_CART_ITEMS_REQUEST } }
  function success(cartItems) {
    return { type: cartConstants.GET_CART_ITEMS_SUCCESS, cartItems };
  }
  function failure(error) {
    return { type: cartConstants.GET_CART_ITEMS_FAILURE, error };
  }
}
