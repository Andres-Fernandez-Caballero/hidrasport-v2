import { useAuthModalStore } from "@store/authModal.store";
import InputAuthForm from "./inputAuthForm";
import { useState } from "react";
import { RegisterDto } from "@interfaces/IAuth";
import { useAuthStore } from "@store/auth/auth.store";
import { toast } from "react-toastify";
import * as Yup from "yup";
import styles from "./styles.module.css";

// Validation Rules
const validationSchemaRegister = Yup.object()
  .shape({
    username: Yup.string().required("El nombre de usuario es obligatorio"),
    email: Yup.string()
      .email("Ingrese un email válido")
      .required("El email es obligatorio"),
    password: Yup.string().required("La contraseña es obligatoria"),
    password2: Yup.string()
      .oneOf([Yup.ref("password")], "Las contraseñas deben coincidir")
      .required("Confirme la contraseña"),
  })

const Register = () => {
  const { closeModal, goTab } = useAuthModalStore();
  const { register } = useAuthStore();
  const [form, setForm] = useState<RegisterDto>({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const toastMessageError = (message: string) => {
    toast.error(message, {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      theme: "dark",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    actionRegister().then();
  }

      const actionRegister = async () => {
        try {
          const registerDataValidated = await validationSchemaRegister.validate(form, { abortEarly: false });
          await register(registerDataValidated);

          toast.success("Registro existo");
          closeModal();
        }catch(error) {
          if(error instanceof Yup.ValidationError){
            const emptyFieldsMessage = "Complete todos los campos";
            const errorMessages = error.errors.filter(message => message!== emptyFieldsMessage);
            
            if (!form.username &&!form.password &&!form.password2 &&!form.email) {
              toastMessageError(emptyFieldsMessage);
            } else if (errorMessages.length > 0) {
              error.errors.forEach(messageError => {
                toastMessageError(messageError);
              });
            }
          }else {
            toastMessageError((error as Error).message)
          }
        }
      }


  return (
    <section className="container mt-3 p-4 text-center sm:ml-4 sm:mt-0 sm:text-left">
      <h2
        className="text-lg font-bold leading-10 text-gray-700"
        id="modal-title"
      >
        Registro de usuario
      </h2>
      <form className="mt-2" onSubmit={handleSubmit}>
        <InputAuthForm
          label="Nombre "
          icon="fa-solid fa-user"
          placeholder="nombre de usuario"
          name="username"
          onChange={handleChange}
          type="text"
        />
        <InputAuthForm
          label="Email"
          icon="fa-solid fa-envelope"
          placeholder="correo@mail.com"
          name="email"
          onChange={handleChange}
          type="email"
        />

        <InputAuthForm
          label="Contraseña"
          icon="fa-solid fa-key"
          placeholder="contraseña"
          name="password"
          onChange={handleChange}
          type="password"
        />
        <InputAuthForm
          label="Confirmar Contraseña"
          icon="fa-solid fa-key"
          placeholder="confirmar contraseña"
          name="password2"
          onChange={handleChange}
          type="password"
        />

        <menu className="justify-items-end flex gap-3 mt-3">
          <button
            onClick={() => {
              goTab("login");
            }}
            className={styles.secondaryButton}
          >
            Login
          </button>
          <button
            type="submit"
            className={styles.primaryButton}
          >
            Confirmar
          </button>
        </menu>
      </form>
    </section>
  );
};

export default Register;
