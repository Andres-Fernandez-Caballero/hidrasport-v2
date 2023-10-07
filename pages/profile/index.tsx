import { useAuthStore } from "@store/auth.store";
import { IoPencil } from "react-icons/io5";

const Profile = () => {
  const { userSession, logout } = useAuthStore();
  return (
    <section className="container p-4 m-auto">
      <aside className="flex items-center justify-between">
        <header>
          <h1 className="text-gray-700 font-bold text-4xl leading-10 text-justify px-12 py-6">
            Profile
          </h1>
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
      <article className="block rounded-lg bg-white container max-w-screen-lg m-auto border border-gray-700 border-top-2 border-dark-200">
        <h2 className="border-b-2 border-dark-200 px-6 py-3 text-xl font-medium leading-tight bg-zinc-950 text-center text-white">
          Mis Datos
        </h2>
        <button className="float-right inline-flex items-center px-4 py-2 bg-cyan-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-wide hover:bg-cyan-600 focus:ring ring-gray-300 disabled:opacity-25 transition mr-2">
          Editar datos <IoPencil />
        </button>
        <section className="p-4 mt-2 grid grid-rows-2">
          <p className="text-zinc-950 text-md leading-6 font-bold">
            Usuario:{" "}
            <span className="font-normal italic">{userSession.username}</span>
          </p>
          <p className="text-zinc-950 text-md leading-6 font-bold">
            Email:{" "}
            <span className="font-normal italic">{userSession.email}</span>
          </p>
        </section>
      </article>
    </section>
  );
};

export default Profile;
