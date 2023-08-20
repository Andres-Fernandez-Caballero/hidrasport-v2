interface InputAvailableProps {
    item: string
    name: string
    currentState: string
    onchange: (event: React.ChangeEvent<HTMLInputElement>) => void
}


const InputAvailable = ({item, name, currentState,onchange}:  InputAvailableProps ) => (
    <label key={item} className="group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6 cursor-pointer bg-white text-gray-900 shadow-sm">
                
                        <input
                        type="radio"
                        name={name}
                        value={item}
                        checked={item === currentState}
                        onChange={onchange}
                        className="sr-only"
                        aria-labelledby="size-choice-1-label"
                        />
                        <span id="size-choice-1-label">{item}</span>
                        {/* <!--
                    Active: "border", Not Active: "border-2"
                    Checked: "border-indigo-500", Not Checked: "border-transparent"
                    --> */}
                        <span
                        className={`
                            pointer-events-none 
                            absolute -inset-px 
                            rounded-md 
                            ${item === currentState ? "border-2 border-indigo-500" : "border"}
                            `}
                        aria-hidden="true"
                        ></span>
                    </label>
)

export default InputAvailable