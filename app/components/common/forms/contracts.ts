export type TypeInputForm = 'text' | 'number' | 'date' | 'datetime' | 'password'

export interface InputFormComponentProps {
    type: TypeInputForm
    value?: string
    label: string
    name: string
    className?: string
    onChange?:(event:  React.ChangeEvent<HTMLInputElement>) => void
}