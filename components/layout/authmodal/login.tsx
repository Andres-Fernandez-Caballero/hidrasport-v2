import { useAuthModalStore } from "@store/authModal.store"
import Link from "next/link"
import InputAuthForm from "./inputAuthForm"
import { useAuthStore } from "@store/auth.store"
import { LoginDto } from "@interfaces/IAuth"
import { useState } from "react"
import { SERVER_URL } from "@config/index";


const Login = () => {
    const {closeModal, goTab} = useAuthModalStore()
    const {userSession, login} = useAuthStore()
    const [loginData, setLoginData] = useState<LoginDto>({
        username: "",
        password: "",
    })

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value,
        })
      }

    const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try{
          alert("cargando")
        const response = await fetch(`${SERVER_URL}/api/accounts/login/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
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
          <h3>{userSession.username}</h3>
        <h2
          className="text-lg font-bold leading-10 text-gray-700"
          id="modal-title"
        >
          Iniciar sesión
        </h2>
        <form className="mt-2" onSubmit={handleOnSubmit}>
            <InputAuthForm
                label="Nombre de usuario o Email"
                icon="fa-solid fa-user"
                placeholder="nombre / email"
                name="username"
                onChange={handleOnChange}
                type="text"
                
            />

            <InputAuthForm
                label="Contraseña"
                icon="fa-solid fa-key"
                placeholder="contraseña"
                name="password"
                onChange={handleOnChange}
                type="password"
            />
        
          <blockquote className="my-2">
            <Link className="underline hover:text-blue-400" href="#">
              Olvido su contraseña?
            </Link>
          </blockquote>

          <menu className="justify-items-end px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              type="submit"
              className="inline-flex w-full justify-center rounded-md bg-blue-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => {goTab("register")}}
              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
            >
              Registrate
            </button>
          </menu>
        </form>
      </section>
    )
}

export default Login