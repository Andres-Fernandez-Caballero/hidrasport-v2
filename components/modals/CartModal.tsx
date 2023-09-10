import React from "react";
import { ICreateCartModalProps } from "@interfaces/IModal";

const Modal: React.FC<ICreateCartModalProps> = ({ children }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="flex flex-col gap-4 bg-white p-16 rounded-lg shadow-lg">
        {children}
      </div>
    </div>
  );
};

export default Modal;
