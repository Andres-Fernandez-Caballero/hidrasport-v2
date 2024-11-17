import { useAuthModalStore } from "@store/authModal.store";
import { useState } from "react";
import styles from "./styles.module.css";
import { toast } from "react-toastify";

export default function ForgotPasswordTab() {
    const {  goTab } = useAuthModalStore();
    const [email, setEmail] = useState<string>("");

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleOnSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await fetch('/api/auth/forgot_passord', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email})
        });
        if(!response.ok) {
            toast.error("El Email no esta registrado");
            return;
        }

        const data = await response.json();
        toast.success(data.message);
    }

    return (
        <section className="container mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
            <h2
                className="text-lg font-bold leading-10 text-gray-700"
                id="modal-title"
            >
                Recuperar contraseña
            </h2>
            <form onSubmit={handleOnSubmit}>
                <div className="mt-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Correo electrónico
                    </label>
                    <div className="mt-1">
                        <input
                            type="email"
                            name="email"
                            id="email"
                            autoComplete="email"
                            required
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="correo@ejemplo.com"
                            onChange={handleOnChange}
                            value={email}
                        />
                    </div>
                </div>
                <div className="mt-4">
                    <button
                        type="submit"
                        className={styles.primaryButton}
                    >
                        Enviar
                    </button>
                </div>
                <div className="flex justify-center gap-3 mt-3">
                    <button
                        type="button"
                        onClick={() => {
                            goTab("register"); // Aquí estás pasando un valor de tipo Tab
                        }}
                        className={styles.secondaryButton}
                    >
                        Login
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            goTab("register"); // Aquí estás pasando un valor de tipo Tab
                        }}
                        className={styles.secondaryButton}
                    >
                        Registrarse
                    </button>
                </div>
            </form>
        </section>
    );
}