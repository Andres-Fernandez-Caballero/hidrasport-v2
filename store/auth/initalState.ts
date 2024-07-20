import { CREDIT_CARD_PAYMENT } from "@interfaces/Ipayment";
import { AuthData } from "./contracts";

const initialState: AuthData = {
    token: "",
    email: "",
    username: "",
    admin: false,
    paymentMethods: [CREDIT_CARD_PAYMENT],
  };

  export default initialState;