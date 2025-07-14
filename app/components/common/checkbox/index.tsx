
interface CheckboxProps {
    checked?: boolean;
    onChange?: () => void;
}

const Checkbox = ({ checked = false, onChange }: CheckboxProps) => (
    <label className="hidra-checkbox">
        <input 
            type="checkbox" 
            checked={checked} 
            onChange={onChange} 
        />
        <span className="checkmark"></span>
    </label>
)

export default Checkbox;