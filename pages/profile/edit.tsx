
import { useAuthStore } from "@store/auth/auth.store";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import styles from "./styles.module.css"
import { toast } from "react-toastify";

const EditProfile = () => {
  const { userSession} = useAuthStore();
  const router = useRouter();

  const [formPassword, setFormPassword] = useState<{password: string, passwordConfirmation: string}>({
    password: "",
    passwordConfirmation: "",
  });
1
  useEffect(() => {
    if (userSession.token === '') {
      router.replace("/");
    }
  }, [userSession.token, router]);

  if (!userSession) {
    return null; // O un spinner de carga mientras redirige
  }

  const handleOnChangeFormPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormPassword({
      ...formPassword,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnChangePassword = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
      console.log(formPassword);
      
        const response = await fetch('/api/auth/change_password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${userSession.token}`,
            },
            body: JSON.stringify(formPassword)
        });
        console.log(response);
        
        if (!response.ok) {
            toast.error("Error al cambiar la contraseña");
            return;
        }

        const data = await response.json();
        toast.success("Cambio de contraseña exitoso" + data.message);
        
  };

  return (
    <main className="p-4 w-full lg:min-h-[90vh] flex items-center py-16"> 
      <section className="grid gap-1 grid-cols-1 lg:grid-cols-1 w-full">
        <div className="col-span-1 lg:row-span-2 w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col ">
          <div className="flex flex-col items-center p-5 h-full">
            <article className="my-4">
                <Image className="w-24 h-24 mb-3 rounded-full shadow-lg" src="/images/avatar.jpg" alt="Avatar del usuario logueado" width={400} height={400} />
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{userSession.username}</h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">{userSession.email}</span>
            </article>

            <form onSubmit={handleOnChangePassword} >
                <fieldset>
                <legend>Cambiar contraseña</legend>
                <input 
                    type="text" 
                    placeholder="contraseña actual" 
                    name="password"
                    onChange={handleOnChangeFormPassword}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mb-1"/>
                
                <input 
                    type="text" 
                    name="passwordConfirmation"
                    placeholder="nueva contraseña" 
                    onChange={handleOnChangeFormPassword}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
                <button type="submit" className={styles.primaryButton}>Guardar cambios</button>
                </fieldset>
            </form>
            
          </div>
        </div>
      </section>
    </main>

  )
};

export default EditProfile;
