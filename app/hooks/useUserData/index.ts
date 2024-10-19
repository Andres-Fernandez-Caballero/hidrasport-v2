import { useAuthStore } from "@store/auth/auth.store"
import {SERVER_URL} from "@config/index"


export interface IUserProfile {
  id: number;
  last_login: string; // Puedes cambiar a Date si quieres convertir las fechas
  is_superuser: boolean;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  is_staff: boolean;
  is_active: boolean;
  date_joined: string; // Puedes cambiar a Date si quieres convertir las fechas
  groups: unknown[]; // Si tienes una estructura específica para grupos, puedes cambiar 'any' por su tipo correspondiente
  user_permissions: unknown[]; // Igual que grupos, puedes ajustar el tipo si es necesario
  telephone: number;
  address: string;
  "street-number": number; // El guion requiere comillas en el nombre de la propiedad
  province: string | null;
  city: string | null;
  neighbourhood: string | null;
  PC: number;
}

export interface IFormUserData extends IUserProfile {
  password: string;
  passwordConfirmation: string;
}

export default function  useUserData () {
    const {userSession} = useAuthStore();

    const getUserData = async () => {
        if(!userSession || !userSession.token) throw new Error('No sesion activa');
        const response = await fetch( `${SERVER_URL}/api/accounts/users/get-self-profile/`,{
          headers: {
              'Authorization': `token ${userSession?.token ?? ''}`
          }
        });
        return await response.json() as IUserProfile;
      }

      const updateUserData = async (data: IFormUserData) => {
        if (!userSession || !userSession.token) throw new Error('No sesion activa');

        const response = await fetch(`${SERVER_URL}/api/accounts/users/update-self-profile/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${userSession?.token ?? ''}`
          },
          body: JSON.stringify({
            address:data.address,
            city:data.city,
            email:data.email,
            first_name:data.first_name,
            last_name:data.last_name,
            neighbourhood:data.neighbourhood,
            password:data.password,
            userame:data.username,
            telephone:data.telephone,
            PC:data.PC,
            province:data.province,
            street_number:data["street-number"]
          })
        });

        return await response.json() as {message: string};
      }

    return {
        getUserData,
        updateUserData,
    }
}