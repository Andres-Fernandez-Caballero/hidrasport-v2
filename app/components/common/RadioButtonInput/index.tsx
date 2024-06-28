import InputAvailable from "./inputAvailable";
import InputDesactivate from "./inputDesactivate";

interface RadioButtonInputProps {
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  totalItemsList: string[];
  itemsAvailables: string[];
  currentState: string;
  className?: string;
}
const RadioButtonInput = ({
  itemsAvailables,
  name,
  totalItemsList,
  onChange,
  currentState,
  className,
}: RadioButtonInputProps) => {
  const itemList = totalItemsList
    .map((item) => ({ item, isAvailable: itemsAvailables.includes(item) }))
    .sort((a, b) => a.item.localeCompare(b.item));

  return (
    <div
      className={`grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4 ${className}`}
    >
      {itemList.map((item) =>
        item.isAvailable ? (
          <InputAvailable
            key={item.item}
            item={item.item}
            name={name}
            currentState={currentState}
            onchange={onChange}
          />
        ) : (
          <InputDesactivate key={item.item} item={item.item} name={name} />
        ),
      )}
    </div>
  );
};

export default RadioButtonInput;
