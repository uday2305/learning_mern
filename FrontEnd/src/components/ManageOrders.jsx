import React, { useEffect } from "react";
import { orderActions, alertActions } from "../actions";
import { connect } from "react-redux";
const ManageOrders = (props) => {
  const { alert, orderListUpdateRequired } = props;
  useEffect(() => {
    // code to run on component mount
    props.getOrders();
  }, []);
  const handleDeleteOrder = (e) => {
    let orderId = e.currentTarget.attributes["data-orderid"]?.nodeValue;
    if (orderId) {
      props.deleteOrder(orderId);
    }
  };
  if (orderListUpdateRequired) {
    props.getOrders();
  }
  const handleEditOrder = (e) => {
    let orderId = e.currentTarget.attributes["data-orderid"]?.nodeValue;
    if (orderId) {
      let payload = {
        orders: {
          isDelivered: true,
        },
      };
      props.updateOrder(payload, orderId);
    }
  };
  return (
    <div className="container">
      <div className="my-5 d-flex">
        <h1> Manage Orders</h1>
      </div>
      {alert.message && (
        <div className={`alert ${alert.type}`}>{alert.message}</div>
      )}
      {props.orderList?.orders.length !== 0 ? (
        <ul>
          {props.orderList?.orders.map((order, index) => (
            <li
              className="mt-3 d-flex border-bottom pb-3 border-dark"
              key={order._id}
            >
              <div role="button" className="w-50" data-productid={order._id}>
                <h5
                  className={`card-title ${
                    order.isDelivered ? "text-success" : ""
                  }`}
                >
                  #{order._id}
                </h5>
                <span className="card-text"> {order.userEmail}</span>
              </div>
              <div className="w-50">
                <div className="float-end">
                  {!order.isDelivered ? (
                    <span>
                      <button
                        role="button"
                        data-orderid={order._id}
                        onClick={handleEditOrder}
                        className="btn card-text"
                      >
                        Process
                      </button>
                      <span className="card-text mx-2">|</span>
                    </span>
                  ) : (
                    ""
                  )}
                  <button
                    role="button"
                    data-orderid={order._id}
                    onClick={handleDeleteOrder}
                    className="btn card-text text-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <h2 className="text-primary"> No Orders are placed</h2>
      )}
    </div>
  );
};

function mapState(state) {
  const { loading, orderList, orderListUpdateRequired } = state.orderList;
  const { alert } = state;
  return { alert, loading, orderList, orderListUpdateRequired };
}

const actionCreators = {
  getOrders: orderActions.getOrders,
  updateOrder: orderActions.updateOrder,
  deleteOrder: orderActions.deleteOrder,
  clearAlerts: alertActions.clear,
};

const connectedManageOrders = connect(mapState, actionCreators)(ManageOrders);
export { connectedManageOrders as ManageOrders };
