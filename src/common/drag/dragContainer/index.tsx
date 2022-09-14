import type { FC } from 'react'
import React from 'react'
import type { DragSourceMonitor } from 'react-dnd'
import { useDrag } from 'react-dnd'
import { ItemTypes } from '../interface'
import { DragGroupProps, DropResult } from './interface'
import './index.scss'

export const DragGroup: FC<DragGroupProps> = ({ id, children, type = ItemTypes.BOX }) => {
	const [{ opacity }, drag] = useDrag(
		() => ({
			type,
			item: { id },
			end(item, monitor) {
				//选中放置
				const dropResult = monitor.getDropResult() as DropResult
				if (item && dropResult) {
					const isDropAllowed =
						dropResult.allowedDropEffect === 'any' ||
						dropResult.allowedDropEffect === dropResult.dropEffect
					if (isDropAllowed) {
						const isCopyAction = dropResult.dropEffect === 'copy'
						const actionName = isCopyAction ? 'copied' : 'moved'
					}
				}
			},
			collect: (monitor: DragSourceMonitor) => ({
				opacity: monitor.isDragging() ? 0.8 : 1,
			}),
		}),
		[id],
	)

	return (
		<div className='drag' ref={drag} style={{ opacity }}>
			{children}
		</div>
	)
}
