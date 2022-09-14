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

export const DropGroup: FC<DropGroupProps> = ({ allowedDropEffect, children, accept = ItemTypes.BOX, groupIndex, pasteCb }) => {
	const [{ canDrop, isOver }, drop] = useDrop(
		() => ({
			accept,
			drop: (item) => {
				pasteCb && pasteCb(item)
				return {
					name: `${allowedDropEffect} Dustbin`,
					allowedDropEffect,
					groupIndex: groupIndex
				}
			},
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
