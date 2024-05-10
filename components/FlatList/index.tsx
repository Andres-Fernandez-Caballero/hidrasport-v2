type Direction = "horizontal" | "vertical";
interface FlatListProps<T> {
  data: T[];
  renderItem: (item: T) => React.ReactNode;
  renderEmptyList?: () => React.ReactNode;
  keyExtractor: (item: T) => string;
  direction?: Direction;
}

const FlatList = <T,>({
  data,
  renderEmptyList,
  direction = "horizontal",
}: FlatListProps<T>) => {
  if (renderEmptyList && data.length === 0) return renderEmptyList();

  return (
    <ul
      className={`flex divide-y divide-gray-200 dark:divide-gray-700
      ${
        direction.includes("horizontal") ? "flex-col" : "flex-row"
      }`}
    >
      {data.map((item) => (
  
        <li key={item.id} className="py-3 sm:py-4">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-1.jpg" alt="Neil image"/>
                    </div>
                    <div className="flex-1 min-w-0 ms-4">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                            <b>{item.title}</b>


                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                            Color: <b>{item.color}</b> <br/> Talle: <b>{item.size}</b> 
                        </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    {item.price}
                    </div>
                </div>
            </li>
      ))}
    </ul>
  );
};

export default FlatList;