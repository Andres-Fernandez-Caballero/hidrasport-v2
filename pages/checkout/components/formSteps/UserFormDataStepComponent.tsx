import { useAuthStore } from "@store/auth/auth.store";
import { useAuthModalStore } from "@store/authModal.store";
import styles from "../../styles.module.css"

const UserDataFormStepComponent = () => {
  const { userSession, isLogedIn} = useAuthStore()
  const {openModal} = useAuthModalStore()
  if(isLogedIn()) 
  return (
        <div className={styles.stepContainer}>
          <p>Sesion iniciada correctamente.</p>
          <span className={styles.divider} />
          <span>Bienvenido</span>
          <h3>{userSession.username}</h3>
          <span>Puede continuar</span>
        </div>
    )

  else
  return (
        <div className={styles.stepContainer}>
          <h3>Por favor inicia sesión para continuar la compra</h3>
          <span className={styles.divider} />
          <nav>
            <button className="bg-black p-4 text-white rounded-2xl" onClick={openModal}>- Identificarse -</button>
          </nav>
        </div>
    )
 
}

export default UserDataFormStepComponent;