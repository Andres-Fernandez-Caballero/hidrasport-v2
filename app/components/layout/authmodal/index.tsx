import { useAuthModalStore } from "@store/authModal.store";
import Login from "./login";
import Register from "./register";

const AuthModal = () => {
  const { closeModal, tab } = useAuthModalStore();

  return (
    <menu
      className="relative z-50"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-40"></div>

      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:w-full sm:max-w-lg">
          <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div className="flex justify-between z-50">
              {tab === "login" ? <Login /> : <Register />}
              <nav>
                <button
                  onClick={closeModal}
                  className="border p-1 w-8 h-8 bg-slate-50 rounded-full text-gray-700 shadow-md hover:border-gray-800"
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </menu>
  );
};

export default AuthModal;


