import { orderConstants } from "../constants";

export const createOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case orderConstants.CREATE_ORDER_REQUEST:
      return { loading: true };
    case orderConstants.CREATE_ORDER_SUCCESS:
      return { res: action.payload };
    case orderConstants.CREATE_ORDER_FAILURE:
      return {};
    default:
      return state;
  }
};

export const orderListReducer = (state = {}, action) => {
  switch (action.type) {
    case orderConstants.ORDER_LIST_REFETCH_REQUEST:
      return { orderListUpdateRequired: true };
    case orderConstants.ORDERS_LIST_REQUEST:
      return { loading: true };
    case orderConstants.ORDERS_LIST_SUCCESS:
      return { orderList: action.orderList };
    case orderConstants.ORDERS_LIST_FAILURE:
      return {};
    default:
      return state;
  }
};
