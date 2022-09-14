interface details{
    name: string
    value: string
}
interface sourceObj {
	id?: string
	name?: string
	parentIds?: []
	children?: sourceObj[]
    details?: details[]
}
interface allSourceObj {
	[id: string]: sourceObj
}
export interface propTypes {
	allSourceObj?: allSourceObj,
	info: sourceObj
    close: (k: string) => void
}