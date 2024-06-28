import { CREDIT_CARD } from "@interfaces/IpaymentMethods";
import { AuthData } from "./contracts";

const initialState: AuthData = {
    token: "",
    email: "",
    username: "",
    admin: false,
    paymentMethods: [CREDIT_CARD],
  };

  export default initialState;