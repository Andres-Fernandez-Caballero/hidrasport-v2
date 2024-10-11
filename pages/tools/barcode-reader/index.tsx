import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { FaBarcode } from 'react-icons/fa';
import Link from 'next/link';

const BarcodeScannerComponent = dynamic(() => import('react-qr-barcode-scanner'), { ssr: false });

const BarcodeScannerPage = () => {
  const [data, setData] = useState('Not Found');

  return (
    <div className="flex flex-col items-center min-h-screen pt-20">
      <h1 className="text-5xl font-bold mb-8">Escáner de Códigos</h1>
      <div className="flex flex-col items-center space-y-8">
        <BarcodeScannerComponent
          width={500}
          height={500}
          onUpdate={(err, result) => {
            if (result) {
              setData(result.getText ? result.getText() : 'Not Found');
            } else {
              setData('Not Found');
            }
          }}
        />
        <p className="text-2xl">{data}</p>
        <div className="flex space-x-8 mt-8">
          <Link href="/tools" className="flex flex-col items-center text-center">
            <FaBarcode className="text-6xl mb-2" />
            <span className="text-xl">Volver a Herramientas</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BarcodeScannerPage;
