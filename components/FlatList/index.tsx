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
          ? "flex-col grid grid-cols-1 gap-4"
          : "flex-row grid grid-cols-2  gap-2"
      }`}
    >
      {data.map((item) => (
        <li key={keyExtractor(item)}>{renderItem(item)}</li>
      ))}
    </ul>
  );
};

export default FlatList;

// how i use FlatList?
// import FlatList from 'components/FlatList'
//
// const data = [
//     { id: '1', name: 'foo' },
//     { id: '2', name: 'bar' },
//     { id: '3', name: 'baz' },
// ]
//
// const renderItem = (item: typeof data[0]) => {
//     return <div>{item.name}</div>
// }
//
// const keyExtractor = (item: typeof data[0]) => {
//     return item.id
// }
//
// const Example = () => {
//     return (
//         <FlatList
//             data={data}
//             renderItem={renderItem}
//             keyExtractor={keyExtractor}
//         />

//     )
