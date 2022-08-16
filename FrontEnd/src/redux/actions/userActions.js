import { userConstants } from "../constants";
import { userService } from "../../services";
import { alertActions } from "./";
import { redirectActions } from "./";

export const userActions = {
  login,
  logout,
  register,
  getUserProfile,
  updateProfileAddress,
  updateProfilePicture,
  deleteProfilePicture,
};

function login(username, password) {
  return (dispatch) => {
    dispatch(request({ username }));

    userService.login(username, password).then(
      (user) => {
        dispatch(success(user));
        dispatch(redirectActions.initRedirect("/"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.LOGIN_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }
}

function logout() {
  userService.logout();
  return { type: userConstants.LOGOUT };
}

function register(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.register(user).then(
      (user) => {
        dispatch(success());
        dispatch(alertActions.success("Registration successful"));
        dispatch(redirectActions.initRedirect("/login"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.REGISTER_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.REGISTER_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.REGISTER_FAILURE, error };
  }
}

function getUserProfile() {
  return (dispatch) => {
    dispatch(request());

    userService.userProfile().then(
      (userProfile) => {
        dispatch(success(userProfile));
      },
      (error) => {
        dispatch(failure(error.toString()));
      }
    );
  };

  function request() {
    return { type: userConstants.PROFILE_DETAILS_REQUEST };
  }
  function success(userProfile) {
    return { type: userConstants.PROFILE_DETAILS_SUCCESS, userProfile };
  }
  function failure(error) {
    return { type: userConstants.PROFILE_DETAILS_FAILURE, error };
  }
}

function updateProfileAddress(address) {
  return (dispatch) => {
    dispatch(request());

    userService.updateProfileAddress(address).then(
      (res) => {
        dispatch(success(res));
        dispatch(refetch());
      },
      (error) => {
        dispatch(failure(error.toString()));
      }
    );
  };

  function request() {
    return { type: userConstants.PROFILE_ADDRESS_UPDATE_REQUEST };
  }
  function success(res) {
    return { type: userConstants.PROFILE_ADDRESS_UPDATE_SUCCESS, res };
  }
  function failure(error) {
    return { type: userConstants.PROFILE_ADDRESS_UPDATE_FAILURE, error };
  }
  function refetch() {
    return { type: userConstants.PROFILE_DETAILS_REFETCH_REQUEST };
  }
}

function updateProfilePicture(imgSrc) {
  return (dispatch) => {
    dispatch(request());

    userService.updateProfilePicture(imgSrc).then(
      (res) => {
        dispatch(success(res));
        dispatch(refetch());
      },
      (error) => {
        dispatch(failure(error.toString()));
      }
    );
  };

  function request() {
    return { type: userConstants.PROFILE_PICTURE_UPDATE_REQUEST };
  }
  function success(res) {
    return { type: userConstants.PROFILE_PICTURE_UPDATE_SUCCESS, res };
  }
  function failure(error) {
    return { type: userConstants.PROFILE_PICTURE_UPDATE_FAILURE, error };
  }
  function refetch() {
    return { type: userConstants.PROFILE_DETAILS_REFETCH_REQUEST };
  }
}

function deleteProfilePicture() {
  return (dispatch) => {
    dispatch(request());

    userService.deleteProfilePicture().then(
      (res) => {
        dispatch(success(res));
        dispatch(refetch());
      },
      (error) => {
        dispatch(failure(error.toString()));
      }
    );
  };

  function request() {
    return { type: userConstants.PROFILE_PICTURE_DELETE_REQUEST };
  }
  function success(res) {
    return { type: userConstants.PROFILE_PICTURE_DELETE_SUCCESS, res };
  }
  function failure(error) {
    return { type: userConstants.PROFILE_PICTURE_DELETE_FAILURE, error };
  }
  function refetch() {
    return { type: userConstants.PROFILE_DETAILS_REFETCH_REQUEST };
  }
}
