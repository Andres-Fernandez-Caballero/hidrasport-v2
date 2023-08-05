import { useAuthModalStore } from "@store/authModal.store";
import Link from "next/link";
import InputAuthForm from "./inputAuthForm";
import { useState } from "react";
import { RegisterDto } from "@interfaces/IAuth";
import { useAuthStore } from "@store/auth.store";

const Register = () => {

    const {closeModal, goTab} = useAuthModalStore()
    const {login} = useAuthStore()
    const [form, setForm] = useState<RegisterDto>({
        username: "",
        email: "",
        password: "",
        password2: "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      try{
        alert("cargando")
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      })

      if (!response.ok) {
        const message = await response.text()
        throw new Error(message)
      }

      const data = await response.json()
      login(data)
      alert("Login exitoso")
        closeModal()
      }catch(error){  
        alert((error as Error).message)
      }
    }

    return (
        <section className="container mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
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

          <menu className="justify-items-end px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              type="submit"
              className="inline-flex w-full justify-center rounded-md bg-blue-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
            >
              Registrate
            </button>
            <button
              onClick={() => {goTab("login")}}
              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
            >
              Login
            </button>
          </menu>
        </form>
      </section>
    );
}

export default Register;