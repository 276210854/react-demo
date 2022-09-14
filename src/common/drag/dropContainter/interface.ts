import type { ReactNode } from "react"
export interface DropGroupProps {
	allowedDropEffect: string
	children: ReactNode
	accept: string
	groupIndex: number
	pasteCb: (k: any) => void
}