const backendUrl: string = process.env.SERVER_URL || "http://localhost:8000";
const urls = {
  login: backendUrl + "/api/accounts/login/",
  register: backendUrl + "/api/accounts/register/",
  orders: backendUrl + "/api/orders/orders/filter/",
  permission: backendUrl + "/api/accounts/users/get-permission-level/",
  landingPage: backendUrl + "/api/store/site-test/get-test-info/",
  configSite: backendUrl + "/api/store/site-configuration/",
  products: backendUrl + "/api/store/products/",
  ordersBase: backendUrl + "/api/orders",
  cart: backendUrl + "/api/cart/",
  publicCarts: backendUrl + "/api/cart/public-carts/",
  forgotPassword: backendUrl + "/api/accounts/users/send-recover-email/"
};

export default urls;