import { WHATSAPP_BUSSINESS_NUMBER } from "@config/index";
import { FaWhatsapp } from "react-icons/fa";
const WhatsappFloatingButton = () => {
  const whatsappLink = `https://wa.me/${WHATSAPP_BUSSINESS_NUMBER}`

  return (
    <div className="fixed bottom-8 right-8">
        <a href={whatsappLink}>
      <button className="bg-green-700 hover:bg-green-600 text-white font-bold py-3 px-3 rounded-full">
        <FaWhatsapp width={100} />
      </button>
      </a>
    </div>
  );
};

export default WhatsappFloatingButton;
