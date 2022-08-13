import { config } from '../constants';
import { authHeader } from '../helpers';
export const productService = {
    addProduct,
    editProduct,
    deleteProduct,
    getProducts,
    getProductDetails,
    getHomePageBanners,
};

async function addProduct(payload) {
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: authHeader()
    };
    return fetch(`${config.API_URL}/admin/products`, requestOptions).then(handleResponse);
}
async function editProduct(payload,productId) {
    let requestBody = {};
    requestBody.product = payload;
    const requestOptions = {
        method: 'PATCH',
        body: JSON.stringify(requestBody),
        headers: authHeader()
    };
    return fetch(`${config.API_URL}/admin/products/${productId}`, requestOptions).then(handleResponse);
}
async function deleteProduct(productId) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };
    return fetch(`${config.API_URL}/admin/products/${productId}`, requestOptions).then(handleResponse);
}
async function getProducts() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.API_URL}/products`, requestOptions).then(handleResponse);
}

async function getProductDetails(productId) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.API_URL}/products/${productId}`, requestOptions).then(handleResponse);
}

async function getHomePageBanners() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.API_URL}/homepage/banner`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                //logout();
                //location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}