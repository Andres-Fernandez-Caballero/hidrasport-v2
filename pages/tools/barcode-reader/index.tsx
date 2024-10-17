import React, { useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

const BarcodeScannerPage = () => {
  const onScanSuccess = (decodedText, decodedResult) => {
    console.log(`Code matched = ${decodedText}`, decodedResult);
    alert(`Code scanned: ${decodedText}`);
  };

  const onScanFailure = () => {
    return
  };

  useEffect(() => {
    const html5QrcodeScanner = new Html5QrcodeScanner(
      'reader', 
      { fps: 10, qrbox: 250 },
      false
    );
    html5QrcodeScanner.render(onScanSuccess, onScanFailure);

    return () => {
      html5QrcodeScanner.clear();
    };
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen pt-20">
      <h1 className="text-5xl font-bold mb-8">Escáner de Códigos</h1>
      <div className="flex flex-col items-center space-y-8">
        <div id="reader" style={{ width: '500px' }}></div>
      </div>
    </div>
  );
};

export default BarcodeScannerPage;
