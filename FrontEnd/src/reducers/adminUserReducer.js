import { adminUserConstants } from "../constants";

export const addUserReducer = (state = {}, action) => {
  switch (action.type) {
    case adminUserConstants.ADD_USER_REQUEST:
      return { loading: true };
    case adminUserConstants.ADD_USER_SUCCESS:
      return { res: action.payload };
    case adminUserConstants.ADD_USER_FAILURE:
      return {};
    default:
      return state;
  }
};

export const userListReducer = (state = {}, action) => {
  switch (action.type) {
    case adminUserConstants.USERS_LIST_REFETCH_REQUEST:
      return { userListUpdateRequired: true };
    case adminUserConstants.USERS_LIST_REQUEST:
      return { loading: true };
    case adminUserConstants.USERS_LIST_SUCCESS:
      return { users: action.users };
    case adminUserConstants.USERS_LIST_FAILURE:
      return {};
    default:
      return state;
  }
};

export const editUserReducer = (state = {}, action) => {
  switch (action.type) {
    case adminUserConstants.EDIT_USER_REQUEST:
      return { loading: true };
    case adminUserConstants.EDIT_USER_SUCCESS:
      return { res: action.payload };
    case adminUserConstants.EDIT_USER_FAILURE:
      return {};
    default:
      return state;
  }
};
export const userDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case adminUserConstants.USER_DETAILS_REQUEST:
      return { loading: true };
    case adminUserConstants.USER_DETAILS_SUCCESS:
      return { userDetails: action.userDetails };
    case adminUserConstants.USER_DETAILS_FAILURE:
      return {};
    default:
      return state;
  }
};
