import { FaWhatsapp } from "react-icons/fa";
const WhatsappFloatingButton = () => {
  return (
    <div className="fixed bottom-8 right-8">
      <button className="bg-green-700 hover:bg-green-600 text-white font-bold py-3 px-3 rounded-full">
        <FaWhatsapp width={100} />
      </button>
    </div>
  );
};

export default WhatsappFloatingButton;
