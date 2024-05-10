type InputType = "text" | "password" | "email";

export interface AuthFormInputProps {
  label: string;
  icon: string;
  type: InputType;
  name: string;
  placeholder: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputAuthForm = (props: AuthFormInputProps) => (
  <div>
    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{props.label}</label>
      <input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
        required
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        value={props?.value}
        onChange={props.onChange}
      />
  </div>
);

export default InputAuthForm;
