type InputType = 'text' | 'password' | 'email';

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
    <div className="flex flex-col mb-2">
    <label className="text-sm">
      {props.label}
    </label>
    <div className="">
      <span className="border rounded-l-lg p-2 text-gray-100 my-1 bg-blue-300">
        <i className={props.icon}></i>
      </span>
      <input
        className="border rounded-r-lg p-2 hover:border-blue-400 focus:bg-blue-100"
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        value={props?.value}
        onChange={props.onChange}
      />
    </div>
  </div>
)

export default InputAuthForm;
