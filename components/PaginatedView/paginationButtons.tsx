
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
        className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
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
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </PaginationButton>}

        <CurrentPageIndiator currentPage={currentPage} />

        {hasNext &&
            <PaginationButton onClick={onNext} text="Next" >
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </PaginationButton>}
    </menu>
)

export default PaginationMenu