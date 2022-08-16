import { adminUserConstants } from "../constants";
import { userService } from "../services";
import { alertActions, redirectActions } from "./";

export const adminUserActions = {
  addUser,
  editUser,
  deleteUser,
  getUsers,
  getUserDetails,
};

function addUser(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.register(user).then(
      (user) => {
        dispatch(success(user));
        dispatch(alertActions.success("User created successfully"));
        dispatch(redirectActions.initRedirect("/admin/users"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: adminUserConstants.ADD_USER_REQUEST, user };
  }
  function success(user) {
    return { type: adminUserConstants.ADD_USER_SUCCESS, user };
  }
  function failure(error) {
    return { type: adminUserConstants.ADD_USER_FAILURE, error };
  }
}

function editUser(user, userId) {
  return (dispatch) => {
    dispatch(request(userId));

    userService.editUser(user, userId).then(
      (user) => {
        dispatch(success(user));
        dispatch(alertActions.success("User Modified successfully"));
        dispatch(redirectActions.initRedirect("/admin/users"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(userId) {
    return { type: adminUserConstants.EDIT_USER_REQUEST, userId };
  }
  function success(user) {
    return { type: adminUserConstants.EDIT_USER_SUCCESS, user };
  }
  function failure(error) {
    return { type: adminUserConstants.EDIT_USER_FAILURE, error };
  }
}

function deleteUser(userId) {
  return (dispatch) => {
    dispatch(request(userId));

    userService.deleteUser(userId).then(
      (res) => {
        dispatch(success(res));
        dispatch(alertActions.success("User Deleted successfully"));
        dispatch(refetch());
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(userId) {
    return { type: adminUserConstants.EDIT_USER_REQUEST, userId };
  }
  function success(res) {
    return { type: adminUserConstants.EDIT_USER_SUCCESS, res };
  }
  function failure(error) {
    return { type: adminUserConstants.EDIT_USER_FAILURE, error };
  }
  function refetch() {
    return { type: adminUserConstants.USERS_LIST_REFETCH_REQUEST };
  }
}

function getUsers() {
  return (dispatch) => {
    dispatch(request());

    userService.getUsers().then(
      (userList) => {
        dispatch(success(userList.users));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request() {
    return { type: adminUserConstants.USERS_LIST_REQUEST };
  }
  function success(users) {
    return { type: adminUserConstants.USERS_LIST_SUCCESS, users };
  }
  function failure(error) {
    return { type: adminUserConstants.USERS_LIST_FAILURE, error };
  }
}

function getUserDetails(userId) {
  return (dispatch) => {
    dispatch(request(userId));

    userService.getUserDetails(userId).then(
      (userDetails) => {
        dispatch(success(userDetails.user));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(userId) {
    return { type: adminUserConstants.USER_DETAILS_REQUEST, userId };
  }
  function success(userDetails) {
    return { type: adminUserConstants.USER_DETAILS_SUCCESS, userDetails };
  }
  function failure(error) {
    return { type: adminUserConstants.USER_DETAILS_FAILURE, error };
  }
}
