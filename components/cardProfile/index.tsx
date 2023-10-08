export interface DataProfile {
children : React.ReactNode
title: string
}

const CardData : React.FC<DataProfile>=({children, title} :DataProfile) => {
    return (
        <article className="block rounded-lg bg-white container max-w-screen-lg m-auto border border-gray-700 border-top-2 border-dark-200">
            <h2 className="border-b-2 border-dark-200 px-6 py-3 text-xl font-medium leading-tight bg-zinc-950 text-center text-white">
          {title}
        </h2>
            {children}

        </article>
    )

}
export default CardData