import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { orderActions, alertActions } from "../actions";
import { connect } from "react-redux";

const Orders = (props) => {
  let { alert } = props;
  useEffect(() => {
    // code to run on component mount
    props.getOrders();
  }, []);

  return (
    <div className="container">
      <div className="my-5 d-flex">
        <h1>Orders</h1>
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
                  <Link
                    to={`/orders/${order._id}`}
                    role="button"
                    className="btn card-text btn-primary"
                  >
                    Details
                  </Link>
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
  const { loading, orderList } = state.orderList;
  const { alert } = state;
  return { alert, loading, orderList };
}

const actionCreators = {
  getOrders: orderActions.getOrders,
  clearAlerts: alertActions.clear,
};

const connectedOrders = connect(mapState, actionCreators)(Orders);
export { connectedOrders as Orders };
