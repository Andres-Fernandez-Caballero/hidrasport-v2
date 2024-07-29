const backendUrl: string = process.env.SERVER_URL || "http://localhost:8000";
const urls = {
  login: backendUrl + "/api/accounts/login/",
  register: backendUrl + "/api/accounts/register/",
  orders: backendUrl + "/api/orders/orders/filter/",
  permission: backendUrl + "/api/accounts/users/get-permission-level/",
  landingPage: backendUrl + "/api/store/site-test/get-test-info/",
  products: backendUrl + "/api/store/products/",
};

export default urls;