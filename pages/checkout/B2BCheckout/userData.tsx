import React from 'react';

const UserData = ({ user, postalCode }) => {
  return (
    <div className="mb-8">
      <h1 className="text-2xl font-bold mb-4">Datos del usuario</h1>
      <div className="grid grid-cols-1 gap-4">
        <input
          type="text"
          name="first-name"
          placeholder="Nombre"
          value={user?.firstName || ''}
          className="w-full p-3 border border-gray-300 rounded"
          required
        />
        <input
          type="text"
          name="last-name"
          placeholder="Apellido"
          value={user?.lastName || ''}
          className="w-full p-3 border border-gray-300 rounded"
          required
        />
        <input
          type="number"
          name="telephone"
          placeholder="Teléfono"
          value={user?.profile?.telephone || ''}
          className="w-full p-3 border border-gray-300 rounded"
          required
        />
      </div>
      {postalCode !== 0 && (
        <div className="mt-8">
          <h1 className="text-2xl font-bold mb-4">Datos de envio</h1>
          <div className="grid grid-cols-1 gap-4">
            <input
              type="text"
              name="address"
              placeholder="Calle"
              value={user?.profile?.address || ''}
              className="w-full p-3 border border-gray-300 rounded"
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                name="street_number"
                placeholder="Número de casa"
                value={user?.profile?.street_number || ''}
                className="w-full p-3 border border-gray-300 rounded"
                required
              />
              <input
                type="text"
                name="depto"
                placeholder="Depto"
                value={user?.profile?.depto || ''}
                className="w-full p-3 border border-gray-300 rounded"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="neighbourhood"
                placeholder="Barrio"
                value={user?.profile?.neighbourhood || ''}
                className="w-full p-3 border border-gray-300 rounded"
                required
              />
              <input
                type="number"
                name="postal_code"
                placeholder="Código Postal"
                value={postalCode}
                className="w-full p-3 border border-gray-300 rounded"
                readOnly
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="city"
                placeholder="Ciudad"
                value={user?.profile?.city || ''}
                className="w-full p-3 border border-gray-300 rounded"
              />
              <input
                type="text"
                name="province"
                placeholder="Provincia"
                value={user?.profile?.province || ''}
                className="w-full p-3 border border-gray-300 rounded"
              />
            </div>
          </div>
        </div>
      )}
      {postalCode === 0 && (
        <div className="mt-8">
          <h1 className="text-2xl font-bold mb-4">Datos de retiro</h1>
          <p className="text-lg">Elegiste la opción pickup!</p>
          <p className="text-md text-gray-600">El pedido se preparará para retirar en el depósito Hidra.</p>
        </div>
      )}
    </div>
  );
};

export default UserData;
