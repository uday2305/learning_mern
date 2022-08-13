import { productConstants } from "../constants";

export const productAddReducer  = (state = {}, action) => {
    switch (action.type) {
        case productConstants.PRODUCT_ADD_REQUEST:
          return { loading: true };
        case productConstants.PRODUCT_ADD_SUCCESS:
          return { res: action.payload };
        case productConstants.PRODUCT_ADD_FAILURE:
          return {};
        default:
          return state
      };
};
export const productDeleteReducer  = (state = {}, action) => {
    switch (action.type) {
        case productConstants.PRODUCT_DELETE_REQUEST:
          return { loading: true };
        case productConstants.PRODUCT_DELETE_SUCCESS:
          return { res: action.payload };
        case productConstants.PRODUCT_DELETE_FAILURE:
          return {};
        default:
          return state
      };
};
export const productDetailsReducer = (state = {}, action) => {
    switch (action.type) {
        case productConstants.PRODUCT_DETAILS_REQUEST:
          return { loading: true };
        case productConstants.PRODUCT_DETAILS_SUCCESS:
          return { ...action.productDetails };
        case productConstants.PRODUCT_DETAILS_FAILURE:
          return {};
        default:
          return state
      };
};
export const productListReducer  = (state = {}, action) => {
    switch (action.type) {
      case productConstants.PRODUCT_LIST_REFETCH_REQUEST:
        return { productListUpdateRequired: true };
        case productConstants.PRODUCT_LIST_REQUEST:
          return { loading: true };
        case productConstants.PRODUCT_LIST_SUCCESS:
          return { productList: action.productList };
        case productConstants.PRODUCT_LIST_FAILURE:
          return {};
        default:
          return state
      };
};
export const productUpdateReducer  = (state = {}, action) => {
    switch (action.type) {
        case productConstants.PRODUCT_UPDATE_REQUEST:
          return { loading: true };
        case productConstants.PRODUCT_UPDATE_SUCCESS:
          return { res: action.payload };
        case productConstants.PRODUCT_UPDATE_FAILURE:
          return {};
        default:
          return state
      };
};

export const homePageBannerReducer  = (state = {}, action) => {
  switch (action.type) {
      case productConstants.HOME_PAGE_PRODUCT_BANNER_REQUEST:
        return { loading: true };
      case productConstants.HOME_PAGE_PRODUCT_BANNER_SUCCESS:
        return { homePageBannerProductList: action.productList };
      case productConstants.HOME_PAGE_PRODUCT_BANNER_FAILURE:
        return {};
      default:
        return state
    };
};