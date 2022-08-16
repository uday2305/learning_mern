import { config } from "../configurations";
import { authHeader } from "../helpers";

export const userService = {
  login,
  logout,
  register,
  userProfile,
  updateProfileAddress,
  updateProfilePicture,
  deleteProfilePicture,
  editUser,
  deleteUser,
  getUsers,
  getUserDetails,
};

async function login(email, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  };

  return fetch(`${config.API_URL}/users/login`, requestOptions)
    .then(handleResponse)
    .then((user) => {
      user.isLoggedIn = true;
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("user");
}

async function register(user) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  };

  return fetch(`${config.API_URL}/users/register`, requestOptions).then(
    handleResponse
  );
}
async function userProfile() {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  return fetch(`${config.API_URL}/profile`, requestOptions).then(
    handleResponse
  );
}

async function updateProfileAddress(address) {
  let requestBody = {};
  requestBody.profile = {};
  requestBody.profile.address = { ...address };
  const requestOptions = {
    method: "PATCH",
    body: JSON.stringify(requestBody),
    headers: authHeader(),
  };

  return fetch(`${config.API_URL}/profile/address`, requestOptions).then(
    handleResponse
  );
}

async function updateProfilePicture(imageSrc) {
  let requestBody = {};
  requestBody.profile = {};
  requestBody.profile.image = imageSrc;
  const requestOptions = {
    method: "PATCH",
    body: JSON.stringify(requestBody),
    headers: authHeader(),
  };

  return fetch(`${config.API_URL}/profile/image`, requestOptions).then(
    handleResponse
  );
}

async function deleteProfilePicture() {
  const requestOptions = {
    method: "DELETE",
    headers: authHeader(),
  };

  return fetch(`${config.API_URL}/profile/image`, requestOptions).then(
    handleResponse
  );
}

async function editUser(payload, userId) {
  let requestBody = {};
  requestBody.user = payload;
  const requestOptions = {
    method: "PATCH",
    body: JSON.stringify(requestBody),
    headers: authHeader(),
  };
  return fetch(`${config.API_URL}/admin/users/${userId}`, requestOptions).then(
    handleResponse
  );
}
async function deleteUser(userId) {
  const requestOptions = {
    method: "DELETE",
    headers: authHeader(),
  };
  return fetch(`${config.API_URL}/admin/users/${userId}`, requestOptions).then(
    handleResponse
  );
}
async function getUsers() {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  return fetch(`${config.API_URL}/admin/users`, requestOptions).then(
    handleResponse
  );
}

async function getUserDetails(userId) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  return fetch(`${config.API_URL}/admin/users/${userId}`, requestOptions).then(
    handleResponse
  );
}
function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        //location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
