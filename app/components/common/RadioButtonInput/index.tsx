import InputAvailable from "./inputAvailable";
import InputDesactivate from "./inputDesactivate";

interface ItemWithImage {
  item: string;
  image: string;
}

interface RadioButtonInputProps {
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  totalItemsList: string[] | ItemWithImage[];
  itemsAvailables: string[] | ItemWithImage[];
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

  interface RadioItem {
    item: string;
    isAvailable: boolean;
    image?: string;
  }

  let itemList: RadioItem[] = [];

  if( isStringArray(totalItemsList) && isStringArray(itemsAvailables)){
    itemList = totalItemsList
      .map((item) => ({ 
        item, 
        isAvailable: itemsAvailables.includes(item) }))
  }else {
    itemList = (totalItemsList as unknown as  ItemWithImage[])
     .map((element) => ({ 
      item: element.item, 
      image: element.image, 
      isAvailable: (itemsAvailables as ItemWithImage[])
        .some(availableItem => availableItem.item === element.item) 
      }))
  }


  return (
    <div
      className={`grid grid-cols-3 gap-4 sm:grid-cols-8 lg:grid-cols-4 ${className}`}
    >
      {
        itemList.map((element) =>
          element.isAvailable ? (
            <InputAvailable
              key={element.item}
              item={element.item}
              image= {element.image}
              name={name}
              currentState={currentState}
              onchange={onChange}
            />
          ) : (
            <InputDesactivate key={element.item} item={element.item} name={name} />
          ),
        )}
    </div>
  );
};


function isStringArray(arr: unknown[]): arr is string[] {
  return Array.isArray(arr) && arr.every(item => typeof item === 'string');
}


export default RadioButtonInput;
