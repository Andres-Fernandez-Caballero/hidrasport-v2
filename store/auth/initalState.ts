import { CREDIT_CARD_PAYMENT } from "@interfaces/Ipayment";
import { AuthData } from "./contracts";

const initialState: AuthData = {
  token: "",
  email: "",
  username: "",
  admin: false,
  profile: {
    address: "",
    street_number: 0,
    PC: 0,
    telephone: null,
    depto: "",
    province: "",
    city: "",
    neighbourhood: "",
    mayorista: false,
    business: false,
  },
  paymentMethods: [CREDIT_CARD_PAYMENT],
};

export default initialState;
