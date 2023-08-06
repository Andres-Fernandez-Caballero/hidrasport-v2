import { useAuthStore } from "@store/auth.store"

const Profile = () => {
    const {userSession, logout} = useAuthStore()
    return (
        <section className="container p-4 border  m-auto shadow-md">
            <header>
                <h2 className="text-gray-700 font-bold text-2xl leading-9">Profile</h2>
            </header>
            <div className="md:columns-2">
                <blockquote>
                    <p className="text-gray-600 text-sm leading-6 font-bold">
                        Usuario: <span className="font-normal italic">{userSession.username}</span>
                    </p>
                    <p className="text-gray-600 text-sm leading-6 font-bold">
                        Email: <span className="font-normal italic">{userSession.email}</span>
                    </p>
                </blockquote>
                <aside>
                    <button onClick={logout} className="text-sm font-semibold leading-6 text-gray-900">
                        Logout <i className="fa-solid fa-arrow-right-from-bracket"></i>
                    </button>
                </aside>

            </div>
        </section>
    )
}

export default Profile