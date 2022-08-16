import { userConstants } from '../constants';
let user = JSON.parse(localStorage.getItem('user'));

const initialState = user ? { loggedIn: true, user } : {};

export const userAuthenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case userConstants.LOGIN_FAILURE:
      return {};
    case userConstants.LOGOUT:
      return {};
    default:
      return state
  }
};
export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case userConstants.USERS_REGISTER_REQUEST:
      return { registering: true };
    case userConstants.USERS_REGISTER_SUCCESS:
      return {};
    case userConstants.USERS_REGISTER_FAILURE:
      return {};
    default:
      return state
  }
};
export const userProfileDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case userConstants.PROFILE_DETAILS_REFETCH_REQUEST:
      return { profileDetailsUpdateRequired: true };
    case userConstants.PROFILE_DETAILS_REQUEST:
      return { profileDetailsUpdateRequired: false,loading: true };
    case userConstants.PROFILE_DETAILS_SUCCESS:
      return { userProfile: action.userProfile };
    case userConstants.PROFILE_DETAILS_FAILURE:
      return {};
    default:
      return state
  }
};
export const userProfileAddressUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case userConstants.PROFILE_ADDRESS_UPDATE_REQUEST:
      return { loading: true };
    case userConstants.PROFILE_ADDRESS_UPDATE_SUCCESS:
      return { userProfile: action.userProfile };
    case userConstants.PROFILE_ADDRESS_UPDATE_FAILURE:
      return {};
    default:
      return state
  }
};
export const userProfileImageUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case userConstants.PROFILE_PICTURE_UPDATE_REQUEST:
      return { loading: true };
    case userConstants.PROFILE_PICTURE_UPDATE_SUCCESS:
      return { res: action.payload };
    case userConstants.PROFILE_PICTURE_UPDATE_FAILURE:
      return {};
    default:
      return state
  }
};
export const userProfileImageDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case userConstants.PROFILE_PICTURE_DELETE_REQUEST:
      return { loading: true };
    case userConstants.PROFILE_PICTURE_DELETE_SUCCESS:
      return { res: action.payload };
    case userConstants.PROFILE_PICTURE_DELETE_FAILURE:
      return {};
    default:
      return state
  };
};