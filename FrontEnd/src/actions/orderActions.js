import { orderService } from "../services";
import { redirectActions, alertActions, cartActions } from "./";
import { orderConstants } from "../constants";

export const orderActions = {
  createOrder,
  getOrders,
  updateOrder,
  deleteOrder,
};

function createOrder(payload) {
  return (dispatch) => {
    dispatch(request(payload));

    orderService.createOrder(payload).then(
      (order) => {
        dispatch(success(order));
        dispatch(alertActions.success("Order Placed successfully"));
        dispatch(cartActions.clearCartItems());
        dispatch(redirectActions.initRedirect("/orders"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(payload) {
    return { type: orderConstants.CREATE_ORDER_REQUEST, payload };
  }
  function success(order) {
    return { type: orderConstants.CREATE_ORDER_SUCCESS, order };
  }
  function failure(error) {
    return { type: orderConstants.CREATE_ORDER_FAILURE, error };
  }
}

function updateOrder(payload, orderId) {
  return (dispatch) => {
    dispatch(request(payload));

    orderService.updateOrder(payload, orderId).then(
      (order) => {
        dispatch(success(order));
        dispatch(alertActions.success("Order Updated successfully"));
        dispatch(refetch());
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(payload) {
    return { type: orderConstants.UPDATE_ORDER_REQUEST, payload };
  }
  function success(order) {
    return { type: orderConstants.UPDATE_ORDER_SUCCESS, order };
  }
  function failure(error) {
    return { type: orderConstants.UPDATE_ORDER_FAILURE, error };
  }
  function refetch() {
    return { type: orderConstants.ORDER_LIST_REFETCH_REQUEST };
  }
}

function deleteOrder(orderId) {
  return (dispatch) => {
    dispatch(request());

    orderService.deleteOrder(orderId).then(
      (order) => {
        dispatch(success(order));
        dispatch(alertActions.success("Order Deleted successfully"));
        dispatch(refetch());
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request() {
    return { type: orderConstants.DELETE_ORDER_REQUEST };
  }
  function success(order) {
    return { type: orderConstants.DELETE_ORDER_SUCCESS, order };
  }
  function failure(error) {
    return { type: orderConstants.DELETE_ORDER_FAILURE, error };
  }
  function refetch() {
    return { type: orderConstants.ORDER_LIST_REFETCH_REQUEST };
  }
}

function getOrders() {
  return (dispatch) => {
    dispatch(request());

    orderService.getOrders().then(
      (orderList) => {
        console.log("actions", orderList);
        orderList.orders = orderList.orders.sort(
          (a, b) => Number(a.isDelivered) - Number(b.isDelivered)
        ); //not delivered first
        dispatch(success(orderList));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request() {
    return { type: orderConstants.ORDERS_LIST_REQUEST };
  }
  function success(orderList) {
    return { type: orderConstants.ORDERS_LIST_SUCCESS, orderList };
  }
  function failure(error) {
    return { type: orderConstants.ORDERS_LIST_FAILURE, error };
  }
}
