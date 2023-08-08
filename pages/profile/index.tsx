import { useAuthStore } from "@store/auth.store";
import { IoPencil } from "react-icons/io5";

const Profile = () => {
  const { userSession, logout } = useAuthStore();
  return (
    <>
      <section className="container p-4 m-auto">
        <aside className="flex items-center justify-between">
          <header>
            <h2 className="text-gray-700 font-bold text-4xl leading-10 text-justify px-12 py-6">
              Profile
            </h2>
          </header>
          <aside>
            <button
              onClick={logout}
              className="text-sm font-semibold leading-6 text-gray-900 px-12 py-6"
            >
              Logout <i className="fa-solid fa-arrow-right-from-bracket"></i>
            </button>
          </aside>
        </aside>
        <article className="max-w-screen-lg px-4 py-8 m-auto shadow-md bg-white rounded-lg shadow-md border border-gray-700">
          <div className="flex items-center justify-between">
            <header>
              <h2 className="text-gray-700 font-bold text-2xl leading-9">
                Hola {userSession.username}
              </h2>
            </header>
          </div>

          <aside className="mt-2">
            <p className="text-gray-600 text-md leading-6 font-bold">
              Usuario:{" "}
              <span className="font-normal italic">{userSession.username}</span>
            </p>
            <p className="text-gray-600 text-md leading-6 font-bold">
              Email:{" "}
              <span className="font-normal italic">{userSession.email}</span>
            </p>
          </aside>
          <div className="flex items-center justify-between mt-5">
            <a
              href="#"
              className="text-blue-600 dark:text-blue-400 hover:underline leading-6"
              tabIndex={0}
              role="link"
            >
              Editar perfil <IoPencil />
            </a>
          </div>
        </article>
      </section>
    </>
  );
};

export default Profile;
