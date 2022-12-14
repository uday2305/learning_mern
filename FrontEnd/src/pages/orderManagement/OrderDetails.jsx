import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { alertActions } from "../../redux/actions";
import { useSelector, connect } from "react-redux";
import { displayAsCurrency } from "../../helpers";

const OrderDetails = (props) => {
  useEffect(() => {
    props.clearAlerts();
  });
  const usePathname = () => {
    const location = useLocation();
    return location.pathname;
  };
  let pathName = usePathname();
  let orderId = pathName.substring("/orders/".length);
  const storedOrders = useSelector((state) => state.orderList);
  let storedOrder = storedOrders.orderList.orders.find(
    (order) => order._id === orderId
  );
  return (
    <div className="container">
      <div className="my-5 d-flex">
        <h1> Order Details</h1>
      </div>
      {storedOrder && storedOrder.cart?.length !== 0 ? (
        <div>
          <ul className="list-group">
            {storedOrder.cart?.map((item, index) => (
              <li className="list-group-item" key={`${item._id}_${index}`}>
                <div className="d-flex">
                  <div className="w-50">
                    <h5 className="card-title">
                      <span>{item.quantity} x</span>
                      <span className="ms-1">{item.productName}</span>
                    </h5>
                  </div>
                  <div className="w-50">
                    <div className="float-end">
                      <h4 className="card-title">
                        {displayAsCurrency(item.price)}
                      </h4>
                    </div>
                  </div>
                </div>
                <div></div>
              </li>
            ))}
          </ul>
          <div className="mt-3 float-end">
            <Link
              to="/orders"
              type="button"
              className="btn btn-primary btn-lg float-end"
            >
              Back
            </Link>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
function mapState(state) {
  return {};
}

const actionCreators = {
  clearAlerts: alertActions.clear,
};

const connectedOrderDetails = connect(mapState, actionCreators)(OrderDetails);
export { connectedOrderDetails as OrderDetails };
