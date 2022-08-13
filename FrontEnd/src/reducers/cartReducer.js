import { cartConstants } from '../constants';
let cart = JSON.parse(localStorage.getItem('cart'));

const initialState = cart ? cart : {};
export const getCartItemsReducer  = (state = initialState, action) => {
    switch (action.type) {
        case cartConstants.GET_CART_ITEMS_REQUEST:
          return { loading: true };
        case cartConstants.GET_CART_ITEMS_SUCCESS:
          return { items: action.cartItems };
        case cartConstants.GET_CART_ITEMS_FAILURE:
          return {};
        default:
          return state
      };
  };
  