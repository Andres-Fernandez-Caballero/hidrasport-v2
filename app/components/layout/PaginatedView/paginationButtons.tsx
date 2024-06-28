
interface PaginationMenuProps {
    hasPrevious?: string | boolean | null;
    hasNext?: string | boolean | null;
    onPrevius: () => void;
    onNext: () => void;
    currentPage: number;
}

interface PaginationButtonProps {
    text: string;
    children?: React.ReactNode;
    onClick: () => void;
}

interface CurrentPageIndiatorProps {
    currentPage: number;
}

const PaginationButton = (props: PaginationButtonProps) => (
    <button
        onClick={props.onClick}
        className=" text-gray-800 font-semibold py-2 px-4 border">
        <span className="sr-only">{props.text}</span>
        {props.children}
    </button>
)


const CurrentPageIndiator = ({ currentPage }: CurrentPageIndiatorProps) => (
    <div>
        <p>{currentPage}</p>
    </div>
)

const PaginationMenu = ({ onNext, onPrevius, currentPage, hasNext = false, hasPrevious = false }: PaginationMenuProps) => (
    <menu className="flex items-center gap-4">
        {hasPrevious &&
            <PaginationButton onClick={onPrevius} text="Previous" >
                <a className="flex items-center justify-center px-3 h-8 me-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    <svg className="w-3.5 h-3.5 me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
                    </svg>
                    Anterior
                </a>
            </PaginationButton>}

        <CurrentPageIndiator currentPage={currentPage} />

        {hasNext &&
            <PaginationButton onClick={onNext} text="Next" >
                <a className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    Siguiente
                    <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                </a>
            </PaginationButton>}
    </menu>
)

export default PaginationMenu