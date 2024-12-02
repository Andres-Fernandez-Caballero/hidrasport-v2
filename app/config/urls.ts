const backendUrl: string = process.env.SERVER_URL || "http://localhost:8000";
const urls = {
  login: backendUrl + "/api/accounts/login/",
  register: backendUrl + "/api/accounts/register/",
  orders: backendUrl + "/api/orders/orders/filter/",
  permission: backendUrl + "/api/accounts/users/get-permission-level/",
  landingPage: backendUrl + "/api/store/site-test/get-test-info/",
  configSite: backendUrl + "/api/store/site-configuration/",
  products: backendUrl + "/api/store/products/",
  productsFilter: backendUrl + "/api/store/products/filter/",
  ordersBase: backendUrl + "/api/orders",
  cart: backendUrl + "/api/cart/",
  publicCarts: backendUrl + "/api/cart/public-carts/",
  titles: backendUrl + "/api/store/titles/",
  titlesFilter: backendUrl + "/api/store/titles/filter/",
  forgotPassword: backendUrl + "/api/accounts/users/send-recover-email/",
  payment: backendUrl + "/api/store/payment/",
  validateCoupon: backendUrl + "/api/store/coupons/validate/"
};

export default urls;