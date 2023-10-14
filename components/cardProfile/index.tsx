export interface DataProfile {
  children: React.ReactNode;
  title: string;
}

const CardData: React.FC<DataProfile> = ({ children, title }: DataProfile) => {
  return (
    <div className=" bg-white m-auto border border-slate-500 rounded-md my-8">
      <header className="bg-slate-600 p-3 text-lg font-bold text-white text-center">
        <h2 className=" ">{title}</h2>
      </header>
      <article className="p-4">{children}</article>
    </div>
  );
};
export default CardData;
