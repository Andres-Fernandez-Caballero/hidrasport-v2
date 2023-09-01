/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useState } from "react"; 
import { useAuthStore } from "@store/auth.store";
import useCartStore from '@store/useCartStore'; 
import CartItemCard from "@components/cart/CartItemCard";
import { postCartToBackend } from "@api/cartAPI";
import { INewCartData, ICartSelector } from "@interfaces/ICart";
import CartModal from "@components/modals/CartModal"
import { SERVER_URL } from "@config/index";

const CartsManagement = () => {
  const { userSession } = useAuthStore();
  const { cartData, fetchCart } = useCartStore();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [isPublic, setIsPublic] = useState<boolean>(false);
  const [clear, setClear] = useState<boolean>(false);
  const [isNameTaken, setIsNameTaken] = useState<boolean>(false);
  const [cartsList, setCartsList] = useState<ICartSelector[]>([]);
  const [selectedCartId, setSelectedCartId] = useState<number | null>(null);

  useEffect(() => {
    fetchCart();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkCartNameAvailability = async (cartName: string) => {
    try {
      const encodedName = encodeURIComponent(cartName);
      const response = await fetch(`${SERVER_URL}/api/sessions/cart/cart-name-available/${encodedName}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        await response.json();
        setIsNameTaken(false);
      } else {
        setIsNameTaken(true);
      }
    } catch (error) {
      setIsNameTaken(false);
      console.error("Error checking cart name availability:", error);
    }
  };

  const fetchPublicCartList = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/api/sessions/cart/all-carts/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        setCartsList(data);
      }
    } catch (error) {
      setIsNameTaken(false);
      console.error("Error checking carts:", error);
    }
  };

  const handleDeleteCart = async (selectedCartId: number | null) => {
    try {
      const response = await fetch(`${SERVER_URL}/api/sessions/cart/delete-cart/${selectedCartId}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${userSession.token}`
        },
      });
  
      if (response.ok) {
        closeModal()
      }
    } catch (error) {
      setIsNameTaken(false);
      console.error("Error checking carts:", error);
    }
  };

  const handleNameChange = (value: string) => {
    setName(value);
    checkCartNameAvailability(value);
  };

  const openModal = (name: string) => {
    if(name === "create"){
      checkCartNameAvailability(name)
      setIsCreateModalOpen(true);
    }else if(name === "delete"){
      setIsDeleteModalOpen(true);
      fetchPublicCartList();
    }
  };

  const closeModal = () => {
    setIsCreateModalOpen(false);
    setIsDeleteModalOpen(false)
  };

  const handleFormSubmit = async () => {
    const newCartData: INewCartData = {
      name: name,
      public: isPublic,
      clear: clear
    };

    try {
      const response = await postCartToBackend(newCartData, userSession.token); 
      if (response.ok) {
        window.location.reload();
      }
    } catch (error) {
      console.error("Error creating cart:", error);
    }

    closeModal();
  };

  return (
    <div className="min-h-screen flex flex-col justify-center">
      {(isCreateModalOpen || isDeleteModalOpen) && <div className="fixed inset-0 bg-gray-600 opacity-50 z-10"></div>}

      {userSession.admin ? (
        <div className="container mx-auto px-4 flex flex-col items-center gap-4">
          <div className="flex flex-col gap-4">
            <div>
              <h1 className="text-5xl font-bold">Crear o modificar carritos publicos</h1>
            </div>
            <div className="flex justify-center gap-4">
            <button onClick={() => openModal("create")} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
              Crear carrito
            </button>
            {isCreateModalOpen && (
              <CartModal closeModal={closeModal}>
                <h1  className="text-2xl font-bold">Elija nombre y visibilidad del carrito</h1>
                <div className="flex gap-4">
                  <label htmlFor="name">Nombre:</label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    onBlur={() => checkCartNameAvailability(name)}
                    className={`border ${isNameTaken ? "border-red-500" : "border-gray-800"} w-60`}
                  />
                </div>
                {isNameTaken ? (
                  <p className="text-red-500">El carrito ya existe</p>
                  ) : (
                  <p className="text-green-700">El carrito está disponible</p>
                )}
                <div className="flex gap-4">
                  <label htmlFor="public">Public:</label>
                  <input
                    type="checkbox"
                    id="public"
                    checked={isPublic}
                    onChange={(e) => setIsPublic(e.target.checked)}
                  />
                </div>
                <div className="flex gap-4">
                  <label htmlFor="clear">Limpiar carrito al terminar:</label>
                  <input
                    type="checkbox"
                    id="clear"
                    checked={clear}
                    onChange={(e) => setClear(e.target.checked)}
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={handleFormSubmit}
                    disabled={isNameTaken}
                    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 ${
                      isNameTaken ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    Crear carrito
                  </button>
                  <button
                    className="mt-4 bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={closeModal}
                  >
                    Cerrar
                  </button>
                </div>
              </CartModal>
            )}


            <button onClick={() => openModal("delete")} className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
              Borrar carrito
            </button>
            {isDeleteModalOpen && (
              <CartModal closeModal={closeModal}>
                <div className="flex flex-col gap-4">
                  <h1 className="text-2xl font-bold">Selecciona el carrito para borrar</h1>
                  <select
                    value={selectedCartId || ''}
                    onChange={(e) => setSelectedCartId(Number(e.target.value) || null)}
                    >
                      <option value="">Elegir</option>
                      {cartsList.map((cart) => (
                        <option key={cart.id} value={cart.id}>
                          {cart.name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="flex gap-4">
                  <button
                      className="mt-4 bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleDeleteCart(selectedCartId)}
                    >
                      Borrar carrito seleccionado
                    </button>
                  <button
                      className="mt-4 bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={closeModal}
                    >
                      Cerrar
                  </button>
                </div>
              </CartModal>
            )}
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {cartData ? (
              Object.keys(cartData).map((key) => {
                
                // @ts-ignore
                const item = cartData[key];
                return <CartItemCard key={key} item={item} />;
              })
            ) : (
              <p>Cargado...</p>
            )}
          </div>
        </div>
      ) : (
        <div>
          <h1>Usuario no autorizado</h1>
        </div>
      )}
    </div>
  );
};

export default CartsManagement;
