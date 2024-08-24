import InputAuthForm from "./inputAuthForm"
import { LoginSlot } from "./interfaces"
import styles from "./styles.module.css";

const LoginMaterial = (props: LoginSlot) => (
    <>
        <div >
                    <div className="p-4 md:p-5">
                        <form onSubmit={props.onSubmit} className="space-y-4" action="#">
                            <InputAuthForm
                                label="Nombre de usuario o Email"
                                icon="fa-solid fa-user"
                                placeholder="Usuario / E-mail"
                                name="username"
                                onChange={props.onChange}
                                type="text"
                            />

                            <InputAuthForm
                                label="Contraseña"
                                icon="fa-solid fa-key"
                                placeholder="Contraseña"
                                name="password"
                                onChange={props.onChange}
                                type="password"
                            />
                            <div className="flex justify-center">
                                <a href="#" onClick={() => alert("Característica en desarrollo 🚧")} className="text-sm text-blue-700 hover:underline dark:text-blue-500">¿Olvidaste tu contraseña?</a>
                            </div>
                            <button type="submit" className={styles.primaryButton}>Iniciar sesión</button>
                            <button
                                type="button"
                                onClick={() => {
                                    props.goTab("register"); // Aquí estás pasando un valor de tipo Tab
                                }}
                                className={styles.secondaryButton}
                            >
                                Registrarse
                            </button>
                        </form>
                    </div>
                </div>
    </>


)

export default LoginMaterial