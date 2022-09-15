
interface option {
	name: string
    value: string
    checked?: boolean
    disabled?: boolean
    [k: string]: unknown
}
export interface propTypes {
	onChange?: (k: unknown, v: option) => void,
	options: option[]
}