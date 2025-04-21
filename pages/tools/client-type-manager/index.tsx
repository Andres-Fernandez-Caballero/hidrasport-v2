import React, { useCallback, useEffect, useState } from "react";
import { Input } from "app/components/ui/input";
import { Button } from "app/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "app/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "app/components/ui/select";
import { FaTrash } from "react-icons/fa";
import useApi from "app/hooks/useApi";
import urls from "@config/urls";
import debounce from "lodash.debounce";
import { toast } from "react-toastify";
import {
  ClientType,
  ClientTypeResponse,
  AssignClientTypeRequest,
} from "../../../interfaces/IClientType";
import { UserSearchPaginatedResponse } from "@interfaces/IAuth";

interface UserSearchRequest {
  username: string;
}

interface UserSearchResponse {
  id: number;
  username: string;
}

const ClientTypeManager = () => {
  const [selectedClientType, setSelectedClientType] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [userList, setUserList] = useState<UserSearchResponse[]>([]);
  const [newClientTypeName, setNewClientTypeName] = useState("");
  const [newPriceMultiplier, setNewPriceMultiplier] = useState("");
  const [clientTypes, setClientTypes] = useState<ClientType[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserSearchResponse[]>([]);

  const { request: createClientType, loading } = useApi<ClientType, ClientType>();
  const { request: fetchClientTypes } = useApi<null, ClientTypeResponse>();
  const { request: fetchUser } = useApi<UserSearchRequest, UserSearchPaginatedResponse>();
  const { request: assignClientType, loading: saving } = useApi<AssignClientTypeRequest, null>();

  const loadClientTypes = async () => {
    try {
      const response = await fetchClientTypes(urls.clientType, "GET");
      setClientTypes(response.results);
    } catch {
      toast.error("No se pudieron cargar los tipos de cliente");
    }
  };

  const searchUser = async (value: string) => {
    if (value.length < 3) return;
    try {
      const response = await fetchUser(urls.searchUser, "POST", { username: value });
      setFilteredUsers(response.results);
    } catch {
      setFilteredUsers([]);
      toast.error("Usuarios no encontrados");
    }
  };

  const handleSelectUser = (user: UserSearchResponse) => {
    if (!userList.find((u) => u.id === user.id)) {
      setUserList((prev) => [...prev, user]);
    }
    setFilteredUsers([]);
    setSearchValue("");
  };

  const debouncedSearch = useCallback(debounce(searchUser, 400), [userList, searchUser]);


  const handleCreateClientType = async () => {
    const payload: ClientType = {
      name: newClientTypeName,
      price_multiplier: parseFloat(newPriceMultiplier),
    };

    try {
      await createClientType(urls.clientType, "POST", payload);
      setNewClientTypeName("");
      setNewPriceMultiplier("");
      toast.success("Creado con éxito");
      loadClientTypes();
    } catch {
      toast.error("Hubo un problema al crear el tipo de cliente");
    }
  };

  const handleAssignClientType = async () => {
    if (!selectedClientType || userList.length === 0) {
      toast.error("Selecciona usuarios y un tipo de cliente");
      return;
    }

    try {
      await assignClientType(urls.updateClientTypes, "POST", {
        user_ids: userList.map((u) => u.id),
        new_client_type: selectedClientType,
      });
      toast.success("Clientes actualizados con éxito");
      setUserList([]);
      setSelectedClientType("");
    } catch {
      toast.error("Error al asignar tipo de cliente");
    }
  };

  useEffect(() => {
    loadClientTypes();
  }, []);

  useEffect(() => {
    debouncedSearch(searchValue);
    return debouncedSearch.cancel;
  }, [searchValue]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4">
      <div className="w-full max-w-5xl">
        <h1 className="text-4xl font-bold mb-8 text-center">Administrar Tipos de Cliente</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Crear nuevo tipo de cliente</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Nombre del nuevo tipo de cliente"
                value={newClientTypeName}
                onChange={(e) => setNewClientTypeName(e.target.value)}
              />
              <Input
                placeholder="Multiplicador de precio (ej: para 70% usar 0.7)"
                value={newPriceMultiplier}
                onChange={(e) => setNewPriceMultiplier(e.target.value)}
                type="number"
                step="0.01"
                min="0"
              />
              <Button className="w-full" onClick={handleCreateClientType} disabled={loading}>
                Crear
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Asignar tipo de cliente a usuarios</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Input
                  placeholder="Buscar usuario por nombre o email"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && filteredUsers.length > 0) {
                      handleSelectUser(filteredUsers[0]);
                    }
                  }}
                />
                {filteredUsers.length > 0 && (
                  <div className="absolute z-10 mt-1 w-full bg-white border rounded shadow max-h-48 overflow-y-auto">
                    {filteredUsers.map((user) => (
                      <div
                        key={user.id}
                        onClick={() => handleSelectUser(user)}
                        className="cursor-pointer px-3 py-2 hover:bg-gray-100"
                      >
                        {user.username}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Select value={selectedClientType} onValueChange={setSelectedClientType}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccionar tipo de cliente" />
                </SelectTrigger>
                <SelectContent>
                  {clientTypes.map((type) => (
                    <SelectItem key={type.name} value={type.name}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="border rounded-lg p-4 space-y-2 max-h-48 overflow-y-auto">
                {userList.length === 0 ? (
                  <p className="text-gray-500 text-sm text-center">No hay usuarios agregados</p>
                ) : (
                  userList.map((user, index) => (
                    <div
                      key={user.id}
                      className="flex justify-between items-center bg-gray-100 rounded px-3 py-2"
                    >
                      <span>{user.username}</span>
                      <button onClick={() => setUserList(userList.filter((_, i) => i !== index))}>
                        <FaTrash className="text-red-500" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              <Button className="w-full" onClick={handleAssignClientType} disabled={saving}>
                Guardar cambios
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ClientTypeManager;
