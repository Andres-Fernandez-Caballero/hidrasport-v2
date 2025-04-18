import type { NextPage } from "next";
import React from "react";
import { FaBox, FaCartPlus, FaUserCog  } from 'react-icons/fa';
import Link from 'next/link';

const Tools: NextPage = () => {
  return (
    <div style={{ minHeight: '100vh' }} className="flex flex-col items-center pt-20">
      <h1 className="text-5xl font-bold mb-8">Herramientas</h1>
      <div className="flex space-x-8 mt-8">
        <Link href="/tools/orders" className="flex flex-col items-center text-center">
          <FaBox className="text-6xl mb-2" />
          <span className="text-xl">Administrar pedidos</span>
        </Link>
        <Link href="/tools/manage-public-carts" className="flex flex-col items-center text-center">
          <FaCartPlus className="text-6xl mb-2" />
          <span className="text-xl">Administrar carritos publicos</span>
        </Link>
        <Link href="/tools/client-type-manager" className="flex flex-col items-center text-center">
          <FaUserCog  className="text-6xl mb-2" />
          <span className="text-xl">Administrar clientes y tipos de clientes</span>
        </Link>
      </div>
    </div>
  );
};

export default Tools;
