export function authHeader() {
  // return authorization header with jwt token
  let user = JSON.parse(localStorage.getItem("user"));

  if (user && user.accessToken) {
    return {
      "Content-Type": "application/json",
      Authorization: user.accessToken,
    };
  } else {
    return {};
  }
}
