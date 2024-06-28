import React from "react";
import { FetchButtonProps } from "./../../interfaces/IButton";

const FetchButton: React.FC<FetchButtonProps> = ({ text, color, onClick }) => {
  return (
    <button
      className={`bg-${color}-500 hover:bg-${color}-700 text-white font-bold py-2 px-4 rounded mb-4`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default FetchButton;
