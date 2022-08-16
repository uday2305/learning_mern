import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { adminUserActions, alertActions } from "../../actions";
import { connect } from "react-redux";
const ManageUsers = (props) => {
  const { alert, userListUpdateRequired } = props;
  //  let navigate = useNavigate();
  useEffect(() => {
    // code to run on component mount
    props.getUsers();
  }, []);
  const handleDeleteUser = (e) => {
    let userId = e.currentTarget.attributes["data-userid"]?.nodeValue;
    if (userId) {
      props.deleteUser(userId);
    }
  };
  if (userListUpdateRequired) {
    props.getUsers();
  }
  //   const handlePageDetailsRedirect = (e) => {
  //     let productId =
  //       e.target.parentElement.attributes["data-productid"]?.nodeValue;
  //     if (productId) {
  //       navigate(`/products/${productId}`);
  //     }
  //   };
  return (
    <div className="container">
      <div className="my-5 d-flex">
        <h1> Manage Users</h1>
        <Link
          to="/admin/add-new-user"
          className="btn btn-primary ms-5"
          role="button"
        >
          Add New User
        </Link>
      </div>
      {alert.message && (
        <div className={`alert ${alert.type}`}>{alert.message}</div>
      )}
      <ul>
        {props.users?.map((user, index) => (
          <li
            className="mt-3 d-flex border-bottom pb-3 border-dark"
            key={user._id}
          >
            <div role="button" className="w-50" data-userid={user._id}>
              <h5 className="card-title">{`${user.firstName} ${user.lastName}`}</h5>
              <span className="card-text">{user.email}</span>
            </div>
            <div className="w-50">
              <div className="float-end">
                <Link
                  role="button"
                  to={`/admin/users/${user._id}/edit`}
                  className="btn card-text"
                >
                  Edit
                </Link>
                <span className="card-text mx-2">|</span>
                <button
                  onClick={handleDeleteUser}
                  data-userid={user._id}
                  className="btn card-text text-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

function mapState(state) {
  const { loading, users, userListUpdateRequired } = state.userList;
  const { alert } = state;
  return { alert, loading, users, userListUpdateRequired };
}

const actionCreators = {
  getUsers: adminUserActions.getUsers,
  deleteUser: adminUserActions.deleteUser,
  clearAlerts: alertActions.clear,
};

const connectedManageUsers = connect(mapState, actionCreators)(ManageUsers);
export { connectedManageUsers as ManageUsers };
