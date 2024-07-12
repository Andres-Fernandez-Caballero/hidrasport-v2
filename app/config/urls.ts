const backendUrl: string = process.env.SERVER_URL || "http://localhost:8000";
const urls = {
  login: backendUrl + "/api/accounts/login/",
  orders: backendUrl + "/api/orders/orders/filter/",
};

export default urls;