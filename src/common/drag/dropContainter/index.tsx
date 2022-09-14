import { FC, useEffect, useState } from 'react'
import { useDrop } from 'react-dnd'
import React from 'react'
import { ItemTypes } from '../interface'
import './index.scss'
import { DropGroupProps } from './interface'

function selectBorderColor(isActive: boolean, canDrop: boolean) {
	if (isActive) {
		return '#00ff00'
	} else if (canDrop) {
		return 'darkkhaki'
	} else {
		return 'transparent'
	}
}

export const DropGroup: FC<DropGroupProps> = ({ allowedDropEffect, children, accept = ItemTypes.BOX }) => {
	const [{ canDrop, isOver }, drop] = useDrop(
		() => ({
			accept,
			drop: () => ({
				name: `${allowedDropEffect} Dustbin`,
				allowedDropEffect,
			}),
			collect: (monitor: any) => ({
				isOver: monitor.isOver(),
				canDrop: monitor.canDrop(),
			}),
		}),
		[allowedDropEffect],
	)

	const isActive = canDrop && isOver
	const borderColor = selectBorderColor(isActive, canDrop)
	return (
		<div ref={drop} className="drop" style={{ borderColor }}>
			{children}
		</div>
	)
}
