import React, { useState, useEffect } from 'react';
import { useAuthStore } from '@store/auth/auth.store';

const UserData = ({ postalCode }) => {
  const { userSession, updateUserSession } = useAuthStore();
  const [formData, setFormData] = useState({
    firstName: userSession?.firstName || '',
    lastName: userSession?.lastName || '',
    telephone: userSession?.profile?.telephone || '',
    address: userSession?.profile?.address || '',
    street_number: userSession?.profile?.street_number || '',
    depto: userSession?.profile?.depto || '',
    neighbourhood: userSession?.profile?.neighbourhood || '',
    city: userSession?.profile?.city || '',
    province: userSession?.profile?.province || ''
  });

  useEffect(() => {
    setFormData({
      firstName: userSession?.firstName || '',
      lastName: userSession?.lastName || '',
      telephone: userSession?.profile?.telephone || '',
      address: userSession?.profile?.address || '',
      street_number: userSession?.profile?.street_number || '',
      depto: userSession?.profile?.depto || '',
      neighbourhood: userSession?.profile?.neighbourhood || '',
      city: userSession?.profile?.city || '',
      province: userSession?.profile?.province || ''
    });
  }, [userSession]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);
    if (name === 'firstName' || name === 'lastName') {
      updateUserSession({ [name]: value });
    } else {
      updateUserSession({ profile: { ...userSession.profile, [name]: value } });
    }
  };

  return (
    <div className="mb-8">
      <h1 className="text-2xl font-bold mb-4">Datos del usuario</h1>
      <div className="grid grid-cols-1 gap-4">
        <input
          type="text"
          name="firstName"
          placeholder="Nombre"
          value={formData.firstName}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded"
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Apellido"
          value={formData.lastName}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded"
          required
        />
        <input
          type="number"
          name="telephone"
          placeholder="Teléfono"
          value={formData.telephone}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded"
          required
        />
      </div>
      {postalCode !== "0" && (
        <div className="mt-8">
          <h1 className="text-2xl font-bold mb-4">Datos de envio</h1>
          <div className="grid grid-cols-1 gap-4">
            <input
              type="text"
              name="address"
              placeholder="Calle"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded"
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                name="street_number"
                placeholder="Número de casa"
                value={formData.street_number}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded"
                required
              />
              <input
                type="text"
                name="depto"
                placeholder="Depto"
                value={formData.depto}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="neighbourhood"
                placeholder="Barrio"
                value={formData.neighbourhood}
                onChange={handleChange}
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
                value={formData.city}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded"
              />
              <input
                type="text"
                name="province"
                placeholder="Provincia"
                value={formData.province}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded"
              />
            </div>
          </div>
        </div>
      )}
      {postalCode === "0" && (
        <div className="mt-8">
          <h1 className="text-2xl font-bold mb-4">Datos de retiro</h1>
          <p className="text-lg">Elegiste la opción pickup!</p>
          <p className="text-md text-gray-600">
            El pedido se preparará para retirar en el depósito Hidra.
          </p>
        </div>
      )}
    </div>
  );
};

export default UserData;
