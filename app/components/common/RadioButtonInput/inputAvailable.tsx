import Image from "next/image";

interface InputAvailableProps {
  item: string;
  image?: string;
  name: string;
  currentState: string;
  onchange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputAvailable = ({
  item,
  image,
  name,
  currentState,
  onchange,
}: InputAvailableProps) => (
  <label
    key={item}
    className="group relative flex items-center justify-center rounded-md border py-3 px-4 text-xs font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6 cursor-pointer bg-white text-gray-900 shadow-sm"
  >
    <input
      type="radio"
      name={name}
      value={item}
      checked={item === currentState}
      onChange={onchange}
      className="sr-only"
      aria-labelledby={`${item}-label`}
    />
    <div className="flex items-center">
      {image ?
        <Image
          src={image}
          alt={item}
          height={200}
          width={200}
          className="w-12 h-12 object-cover rounded-full mr-3"
        />
        :
        <span id={`${item}-label`} className="flex-1">{item}</span>
      }
    </div>
    <span
      className={`
                            pointer-events-none 
                            absolute -inset-px 
                            rounded-md 
                            ${item === currentState
          ? "border-2 border-black"
          : "border"
        }
                            `}
      aria-hidden="true"
    ></span>
  </label>
);

export default InputAvailable;
