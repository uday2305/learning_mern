import { productConstants } from "../constants";
import { alertActions } from './';
import { redirectActions } from './';
import { productService } from "../services";

export const productActions = {
    addProduct,
    editProduct,
    deleteProduct,
    getProducts,
    getProductDetails,
    getHomePageBanners,
};

function addProduct(payload) {
    return dispatch => {
        dispatch(request(payload));

        productService.addProduct(payload)
            .then(
                product => { 
                    dispatch(success(product));
                    dispatch(alertActions.success('Product Added successfully'));
                    dispatch(redirectActions.initRedirect('/admin/products'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(payload) { return { type: productConstants.PRODUCT_ADD_REQUEST, payload } }
    function success(product) { return { type: productConstants.PRODUCT_ADD_SUCCESS, product } }
    function failure(error) { return { type: productConstants.PRODUCT_ADD_FAILURE, error } }
}

function editProduct(payload,productId) {
    return dispatch => {
        dispatch(request(productId));

        productService.editProduct(payload,productId)
            .then(
                product => { 
                    dispatch(success(product));
                    dispatch(alertActions.success('Product Updated successfully'));
                    dispatch(redirectActions.initRedirect('/admin/products'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(productId) { return { type: productConstants.PRODUCT_UPDATE_REQUEST, productId } }
    function success(product) { return { type: productConstants.PRODUCT_UPDATE_SUCCESS, product } }
    function failure(error) { return { type: productConstants.PRODUCT_UPDATE_FAILURE, error } }
}

function deleteProduct(productId) {
    return dispatch => {
        dispatch(request(productId));

        productService.deleteProduct(productId)
            .then(
                product => { 
                    dispatch(success(product));
                    dispatch(alertActions.success('Product Deleted successfully'));
                    dispatch(refetch());
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(productId) { return { type: productConstants.PRODUCT_DELETE_REQUEST, productId } }
    function success(product) { return { type: productConstants.PRODUCT_DELETE_SUCCESS, product } }
    function failure(error) { return { type: productConstants.PRODUCT_DELETE_FAILURE, error } }
    function refetch() { return { type: productConstants.PRODUCT_LIST_REFETCH_REQUEST } }
}

function getProductDetails(productId) {
    return dispatch => {
        dispatch(request(productId));

        productService.getProductDetails(productId)
            .then(
                product => { 
                    dispatch(success(product));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(productId) { return { type: productConstants.PRODUCT_DETAILS_REQUEST, productId } }
    function success(productDetails) { return { type: productConstants.PRODUCT_DETAILS_SUCCESS, productDetails } }
    function failure(error) { return { type: productConstants.PRODUCT_DETAILS_FAILURE, error } }
}

function getProducts() {
    return dispatch => {
        dispatch(request());

        productService.getProducts()
            .then(
                product => { 
                    dispatch(success(product));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request() { return { type: productConstants.PRODUCT_LIST_REQUEST } }
    function success(productList) { return { type: productConstants.PRODUCT_LIST_SUCCESS, productList } }
    function failure(error) { return { type: productConstants.PRODUCT_LIST_FAILURE, error } }
    
}

function getHomePageBanners(){
    return dispatch => {
        dispatch(request());

        productService.getHomePageBanners()
            .then(
                product => { 
                    dispatch(success(product));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request() { return { type: productConstants.HOME_PAGE_PRODUCT_BANNER_REQUEST } }
    function success(productList) { return { type: productConstants.HOME_PAGE_PRODUCT_BANNER_SUCCESS, productList } }
    function failure(error) { return { type: productConstants.HOME_PAGE_PRODUCT_BANNER_FAILURE, error } }
}