const backendUrl: string = process.env.SERVER_URL || "http://localhost:8000";
const urls = {
  login: backendUrl + "/api/accounts/login/",
  register: backendUrl + "/api/accounts/register/",
  permission: backendUrl + "/api/accounts/users/get-permission-level/",
  landingPage: backendUrl + "/api/store/site-test/get-test-info/",
  configSite: backendUrl + "/api/store/site-configuration/",
  products: backendUrl + "/api/store/products/",
  categoriesList: backendUrl + "/api/store/get-navbar-categories/",
  productsFilter: backendUrl + "/api/store/products/filter/",
  publicCarts: backendUrl + "/api/cart/public-carts/",
  titles: backendUrl + "/api/store/titles/",
  titlesFilter: backendUrl + "/api/store/titles/filter/",
  forgotPassword: backendUrl + "/api/accounts/users/send-recover-email/",
  payment: backendUrl + "/api/store/payment/",
  validateCoupon: backendUrl + "/api/store/coupons/validate/",
  calculateShipping: backendUrl + "/api/store/get-shipping-cost/",
  /* Client Types */
  updateUsersClientType: backendUrl + "/api/accounts/users/update-users-client-type/",
  clientType: backendUrl + "/api/accounts/client-type/",
  updateClientTypes: backendUrl + "/api/accounts/client-type/update-users-client-type/",
  /* Accounts */
  searchUser: backendUrl + "/api/accounts/users/search-user/",
  /* cart */ 
  cart: backendUrl + "/api/cart/",
  userCart: backendUrl + "/api/cart/cart/me",
  /* Order */ 
  orders: backendUrl + "/api/orders/",
  ordersUpdateStatus: backendUrl + "/api/orders/orders/update-status",
  ordersFilter: backendUrl + "/api/orders/orders/filter/",
};

export default urls;