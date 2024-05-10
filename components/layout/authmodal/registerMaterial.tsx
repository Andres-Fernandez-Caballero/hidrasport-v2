import InputAuthForm from "./inputAuthForm"
import { LoginSlot } from "./interfaces"

const RegisterMaterial = (props:LoginSlot) =>(
    
    <>
<div >
    <div className="relative p-4 w-full max-w-md max-h-full">
    
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="p-4 md:p-5">
                <form onSubmit={props.onSubmit} className="space-y-4" action="#">
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
                    <div className="flex justify-between">
                        <a href="#" className="text-sm text-blue-700 hover:underline dark:text-blue-500">Olvidaste tu contraseña?</a>
                    </div>
                    <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Iniciar sesión</button>
                    <button
                        type="button"
                        onClick={() => {
                        props.goTab("register"); // Aquí estás pasando un valor de tipo Tab
                    }}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    >
                        Registrate
                    </button>
                </form>
            </div>
        </div>
    </div>
</div> 
</>


)

export default RegisterMaterial