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
  renderItem,
  renderEmptyList,
  keyExtractor,
  direction = "vertical",
}: FlatListProps<T>) => {
  if (renderEmptyList && data.length === 0) return renderEmptyList();

  return (
    <ul
      className={`flex ${
        direction.includes("horizontal")
          ? "flex-col grid gap-4"
          : "flex-row grid sm:grid-cols-2 gap-2"
      }`}
    >
      {data.map((item) => (
        <li key={keyExtractor(item)}>{renderItem(item)}</li>
      ))}
    </ul>
  );
};

export default FlatList;
