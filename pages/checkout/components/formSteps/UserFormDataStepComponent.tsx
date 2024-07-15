import { useAuthStore } from "@store/auth/auth.store";
import { useAuthModalStore } from "@store/authModal.store";

const UserDataFormStepComponent = () => {
  const { userSession, isLogedIn} = useAuthStore()
  const {openModal} = useAuthModalStore()
  if(isLogedIn()) 
  return (
        <div>
          <h2>{userSession.username}</h2>
          </div>
    )

  else
  return (
        <div>
          <h2>Por favor inicia sesión para continuar la compra</h2>
          <nav>
            <button className="bg-blue-500 p-4 text-white rounded-2xl" onClick={openModal}>Identificarse 🏄</button>
          </nav>
        </div>
    )
 
}

export default UserDataFormStepComponent;