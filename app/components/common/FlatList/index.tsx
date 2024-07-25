import Image from "next/image";
import { SERVER_URL } from "@config/index";
import { iCartProduct } from "@interfaces/ICart";

type Direction = "horizontal" | "vertical";

interface FlatListProps {
  data: iCartProduct[];
  renderItem: (item: iCartProduct) => React.ReactNode;
  renderEmptyList?: () => React.ReactNode;
  keyExtractor?: (item: iCartProduct) => string;
  direction?: Direction;
}

const FlatList = ({
  data,
  renderEmptyList,
  keyExtractor,
  direction = "horizontal",
}: FlatListProps) => {
  if (renderEmptyList && data.length === 0) return renderEmptyList();

  return (
    <ul
      className={`flex divide-y divide-gray-200 dark:divide-gray-700 ${
        direction === "horizontal" ? "flex-row" : "flex-col"
      }`}
    >
      {data.map((item, index) => (
        <li key={keyExtractor? keyExtractor(item) : index} className="py-3 sm:py-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Image
                width={50}
                height={50}
                src={`${SERVER_URL}${item.img}`}
                alt={item.title}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="flex-1 min-w-0 ms-4">
              <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                <b>{item.title}</b>
              </p>
              <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                Color: <b>{item.color}</b> <br /> Talle: <b>{item.size}</b>
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
