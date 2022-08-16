import { redirectConstants } from '../constants';
// action creators
export const redirectActions = {
  initRedirect,
  redirectSuccess,
};


function initRedirect(link){
  return { type: redirectConstants.REDIRECT_INIT, payload: link };
};


function redirectSuccess(){
  return { type: redirectConstants.REDIRECT_SUCCESS };
};