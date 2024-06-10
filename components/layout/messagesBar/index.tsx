import { useEffect, useState } from "react";

interface MessageBarProps {
  messages: string[];
  delay?: number;
}

const MessageBar: React.FC<MessageBarProps> = ({
  delay = 3000,
  messages = ["mensaje1", "mensaje2"],
}) => {
  const [messageSelected, setMessageSelected] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageSelected((messageSelected + 1) % messages.length);
    }, delay);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messageSelected]);

  return (
    <nav className="w-full flex p-2 text-white justify-center text-xl font-bold m-4">
      <p className="text-xl animate-pulse duration-1000  bg-gradient-to-r from-red-700 via-red-400 to-white bg-clip-text text-transparent">
        {messages[messageSelected]}
      </p>
    </nav>
  );
};

export default MessageBar;
