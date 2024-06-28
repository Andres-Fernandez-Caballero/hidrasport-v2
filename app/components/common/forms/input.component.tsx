import { InputText } from "primereact/inputtext"
import { InputFormComponentProps } from "./contracts"


const InputFormComponent = (props:  InputFormComponentProps) => (
    <div className="flex flex-col gap-2">
        <label htmlFor={props.name}>{props.label}</label>
        <InputText id={props.name}   {...props} className="rounded-lg"/>
    </div>
)


export default InputFormComponent;