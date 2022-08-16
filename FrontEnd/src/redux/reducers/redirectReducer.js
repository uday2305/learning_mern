import { redirectConstants } from '../constants';

export const redirect = (state = {}, action) => {
    switch (action.type) {
      case redirectConstants.REDIRECT_INIT:
        return { redirectTo: action.payload };
      case redirectConstants.REDIRECT_SUCCESS:
          return {};  
      default:
        return state;
    }
  };