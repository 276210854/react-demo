import type { ReactNode } from 'react'

export interface GroupProps {
	id: string,
}
export interface DragGroupProps extends GroupProps {
	children: ReactNode
	type: string
	id: string
}
export interface DropResult {
	allowedDropEffect: string
	dropEffect: string
	name: string
}