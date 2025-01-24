interface SelectorProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    options: string[];
    emptyOption?: string;
}

const Selector = (props: SelectorProps) => (
    <select 
        className="w-full p-2 bg-gray-800 text-white rounded"
        onChange={props.onChange}
        value={props.value}
        >
        <option value="">{props.emptyOption}</option>
        {props.options.map(option => (
            <option key={option} value={option}>
                {option}
            </option>
        ))}
    </select>
);

export default Selector;