import { useAuthStore } from "@store/auth/auth.store";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { toast } from "react-toastify";
import useUserData, { IFormUserData } from "app/hooks/useUserData";




const EditProfile = () => {
  const { userSession } = useAuthStore();
  const router = useRouter();
  const { getUserData, updateUserData } = useUserData();
  const [formPassword, setFormPassword] = useState<IFormUserData | undefined>();

  useEffect(() => {
    if (userSession.token === '') {
      router.replace("/");
    }
    getUserData().then(data => setFormPassword({ ...data, password: '', passwordConfirmation: '' }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userSession.token, router]);

  if (!userSession) {
    return null; // O un spinner de carga mientras redirige
  }

  const handleOnChangeFormPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormPassword((prevState) => (
      prevState ? { ...prevState, [e.target.name]: e.target.value } : undefined
    ))
  };

  const handleOnChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!formPassword) return;
    
    if(formPassword.password !== formPassword.passwordConfirmation){
      toast.error("Las contraseñas no coinciden");
      return;
    }

    try{
      const response = await updateUserData(formPassword);
      toast.success(response.message);

    }catch(error) {
      toast.error("Error al actualizar los datos");
    }
    
  };

  const InputForm = (props: InputFormProps) => {
    return (
      <div className="flex flex-col">
        <input
          {...props}
          id={props.name}
          type="text"
          onChange={handleOnChangeFormPassword}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Escribe aquí"
        />
      </div>
    );
  };

  return (
    <main className="p-4 w-full lg:min-h-[90vh] flex items-center py-16">
      <section className="grid gap-1 grid-cols-1 lg:grid-cols-1 w-full">
        <div className="col-span-1 lg:row-span-2 w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col ">
          <div className="flex flex-col items-center p-5 h-full">
            <article className="my-4">
              <Image className="w-24 h-24 mb-3 rounded-full shadow-lg" src="/images/avatar.jpg" alt="Avatar del usuario logueado" width={400} height={400} />
              <span className="text-sm text-gray-500 dark:text-gray-400">{userSession.email}</span>
            </article>

            {
              formPassword && (

                <form onSubmit={handleOnChangePassword} className="grid grid-cols-1 gap-4 md:grid-cols-4">
                  <fieldset>
                    <legend>Usuario</legend>
                    <label htmlFor="username">Nombre de Usuario</label>
                    <InputForm
                      type="text"
                      name="username"
                      value={formPassword.username?? ''}
                      placeholder=""
                    />
                    <label htmlFor="first_name">Nombre</label>
                    <InputForm
                      type="text"
                      name="first_name"
                      value={formPassword.first_name ?? ''}
                    />

                    <label htmlFor="last_name">Apellido</label>
                    <InputForm
                      type="text"
                      name="last_name"
                      value={formPassword.last_name ?? ''}
                      placeholder=""
                    />
                  </fieldset>

                  <fieldset>
                    <legend>Datos de contacto</legend>
                    <label htmlFor="email">Email</label>
                    <InputForm
                      type="email"
                      name="email"
                      value={formPassword.email ?? ''}
                      placeholder="example@example.com"
                    />

                    <label htmlFor="telephone">Teléfono</label>
                    <InputForm
                      type="tel"
                      name="telephone"
                      value={formPassword.telephone?.toString() ?? ''}
                      placeholder="Ingrese su número de teléfono"
                    />
                  </fieldset>

                  <fieldset>
                    <legend>Dirección</legend>

                    <label htmlFor="city">Ciudad</label>
                    <InputForm
                      type="text"
                      name="city"
                      value={formPassword.city ?? ''}
                      placeholder="Ingrese su ciudad"
                    />

                    <label htmlFor="province">Provincia</label>
                    <InputForm
                      type="text"
                      name="province"
                      value={formPassword.province ?? ''}
                      placeholder="Ingrese su provincia"
                    />

                    <label htmlFor="neighbourhood">Barrio</label>
                    <InputForm
                      type="text"
                      name="neighbourhood"
                      value={formPassword.neighbourhood ?? ''}
                      placeholder="Ingrese su barrio"
                    />

                    <label htmlFor="address">Calle</label>
                    <InputForm
                      type="text"
                      name="address"
                      value={formPassword.address ?? ''}
                      placeholder="Ingrese su dirección"
                    />

                    <label htmlFor="street-number">Número de calle</label>
                    <InputForm
                      type="number"
                      name="street-number"
                      value={formPassword['street-number']?.toString() ?? ''}
                      placeholder="Número de calle"
                    />

                    <label htmlFor="PC">Código postal</label>
                    <InputForm
                      type="number"
                      name="PC"
                      value={formPassword.PC?.toString() ?? ''}
                      placeholder="Ingrese su código postal"
                    />
                  </fieldset>

                  <fieldset>
                    <legend>Contraseña</legend>
                    <InputForm
                      type="password"
                      placeholder="Contraseña actual"
                      name="password"
                    />

                    <InputForm
                      type="password"
                      name="passwordConfirmation"
                      placeholder="Nueva contraseña"
                    />
                  </fieldset>

                  <button type="submit" className={styles.primaryButton}>Guardar cambios</button>
                </form>
              )
            }
          </div>
        </div>
      </section>
    </main>
  );
};

interface InputFormProps {
  name: string;
  value?: string;
  type: string;
  placeholder?: string;
}

export default EditProfile;
