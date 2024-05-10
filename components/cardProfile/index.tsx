export interface DataProfile {
  children: React.ReactNode;
  title: string;
}

const CardData: React.FC<DataProfile> = ({ children, title }: DataProfile) => {
  return (
    <div className=" bg-white border border-slate-500 rounded-md">
      <header className="bg-blue-900 p-3 text-lg font-bold text-white text-center">
        <h2 className=" ">{title}</h2>
      </header>
      <article className="p-4">{children}</article>
    </div>
  );
};
export default CardData;