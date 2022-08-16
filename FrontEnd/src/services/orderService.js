import { config } from "../configurations";
import { authHeader } from "../helpers";
export const orderService = {
  createOrder,
  updateOrder,
  deleteOrder,
  getOrders,
};

async function createOrder(payload) {
  const requestOptions = {
    method: "POST",
    body: JSON.stringify(payload),
    headers: authHeader(),
  };
  return fetch(`${config.API_URL}/checkout`, requestOptions).then(
    handleResponse
  );
}
async function updateOrder(payload, orderId) {
  let requestBody = payload;
  const requestOptions = {
    method: "PATCH",
    body: JSON.stringify(requestBody),
    headers: authHeader(),
  };
  return fetch(
    `${config.API_URL}/admin/orders/${orderId}`,
    requestOptions
  ).then(handleResponse);
}
async function deleteOrder(orderId) {
  const requestOptions = {
    method: "DELETE",
    headers: authHeader(),
  };
  return fetch(
    `${config.API_URL}/admin/orders/${orderId}`,
    requestOptions
  ).then(handleResponse);
}
async function getOrders() {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  return fetch(`${config.API_URL}/orders`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        //do-something
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
