import { useAuthModalStore } from "@store/authModal.store";
import { useAuthStore } from "@store/auth.store";
import { LoginDto } from "@interfaces/IAuth";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import LoginMaterial from "./loginMaterial";

const validationSchemaLogin = Yup.object().shape({
  username: Yup.string().required("Ingrese un nombre de usuario"),
  password: Yup.string()
    .required()
    .min(8, "La contraseña tiene que tener 8 caracteres"),
});

const Login = () => {
  const { closeModal, goTab } = useAuthModalStore();
  const { userSession, login } = useAuthStore();
  const [loginData, setLoginData] = useState<LoginDto>({
    username: "",
    password: "",
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const toastMessageError = (message: string) => {
    toast.error(message, {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      theme: "dark",
    });
  };

  const actionLogin = async () => {
    try {
      await validationSchemaLogin.validate(loginData, { abortEarly: false });
      const response = await fetch(`/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message);
      }

      const data = await response.json();
      login(data);
      toast.success("Login exitoso");
      closeModal();
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const emptyFieldsMessage = "Ingrese su usuario y contraseña";
        const errorMessages = error.errors.filter(
          (message) => message !== emptyFieldsMessage,
        );
        if (!loginData.username && !loginData.password) {
          toastMessageError(emptyFieldsMessage);
        } else if (errorMessages.length > 0) {
          error.errors.forEach((messageError) => {
            toastMessageError(messageError);
          });
        }
      } else {
        toastMessageError((error as Error).message);
      }
    }
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    actionLogin().then();
    // alert('Login exitoso')
  };

  return (
    <section className="container mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
      <h3>{userSession.username}</h3>
      <h2
        className="text-lg font-bold leading-10 text-gray-700"
        id="modal-title"
      >
        Iniciar sesión
      </h2>
      
      <LoginMaterial  onSubmit={handleOnSubmit} onChange={handleOnChange} goTab={goTab} ></LoginMaterial>
    </section>
  );
};

export default Login;
