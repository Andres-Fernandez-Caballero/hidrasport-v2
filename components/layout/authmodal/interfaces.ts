export interface LoginSlot {
    onSubmit: (e: React.FormEvent<HTMLFormElement>)=> void
    onChange: (e: React.ChangeEvent<HTMLInputElement>)=> void
    goTab: (tab: Tab) => void 
}