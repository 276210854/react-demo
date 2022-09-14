import { FC, useEffect, useState } from 'react'
import React from 'react'
import { DragGroup } from '@/common/drag/dragContainer'
import { DropGroup } from '@/common/drag/dropContainter'
import './index.scss'
import {Arrow, OpenFolder, CloseFolder, Dian, Person} from '@/common/icons'
import { wrapperawait, toFlatArray } from '@/utils/tool'
import { getDetailByIdXHR, getListXHR } from '@/utils/request'
import { message } from 'antd';
import GroupCard from '../card'
import { ItemTypes } from './itemTypes'

export const Container: FC = () => {
	//tree
	const [sourceList, setSourceList] = useState([])
	//obj 字段
	const [sourceObj, setSourceObj] = useState({})
	const [groupIds, setGroupIds] = useState([])
	useEffect(() => {
		getList()
	}, [])
	//获取原始数据
	const getList = async () => {
		const [err, res] = await wrapperawait(getListXHR())
		if(err) return
		//处理数据
		setSourceObj(toFlatArray(res, []))
		res?.length && setSourceList(res)
	}
	//放group
	const handlePaste = async ({id}) => {
		if(!id) return
		const [err, res] = await wrapperawait(getDetailByIdXHR(id))
		if(err) return
		//是否已经存在
		const _sourceObj = {...sourceObj}
		_sourceObj[id]['details'] = res
		setSourceObj(_sourceObj)
		setGroupIds([...groupIds, id])
	}
	//可拖动元素
	const renderNoChildMenu = (props) => {
		return (
			<DragGroup id={props.id} pasteCb={handlePaste} type={ItemTypes.BOX}>
				<Dian />&nbsp;&nbsp;
				<Person />&nbsp;&nbsp;
				<span>{props.name}</span>
			</DragGroup>
		)
	}
	//文件夹
	const renderChildMenu = (item) => {
		const switchStatus = () => {
			const _sourceObj = {...sourceObj, [item.id]: {...item, showChild: !sourceObj[item.id].showChild}}
			setSourceObj(_sourceObj)
		}
		return (
			<>
				<div className='folder flexStart borderBottom' onClick={switchStatus}>
					<Arrow />&nbsp;
					{!!sourceObj[item.id].showChild ? <OpenFolder /> : <CloseFolder />}&nbsp;
					<span className='folderName'>{item.name}</span>
				</div>
				{!!sourceObj[item.id].showChild ? (
					<div className='folder-child'>
						{ 
							item.children.map((child) => {
								return <div className={`${child?.children?.length ? 'folder' : 'detail borderBottom'}`} key={child.name}>{renderMenu(child)}</div>
							})
						}
					</div>
				) : null}
			</>
		)
	}
	const renderMenu = (item) => {
		return item?.children?.length ? renderChildMenu(item) : renderNoChildMenu(item)
	}
	//删除
	const deleteGroup = (id) => {
		setGroupIds(groupIds.filter(val => val !== id))
		message.success('已删除')
	}
	return (
		<div className='container'>
			<div className='left'>
				{
					sourceList.map(item => (
						<div key={item.name} className="folder">
							{renderMenu(item)}
						</div>
					))
				}
			</div>
			<div className='right'>
				<DropGroup allowedDropEffect="copy" accept={ItemTypes.BOX}>
					{groupIds?.length ? (
						groupIds.map(id => {
							return (
								<div className='card' key={id}>
										<GroupCard info={sourceObj[id]} allSourceObj={sourceObj} close={deleteGroup}/>
								</div>
							)
						})
					) : null}
				</DropGroup>
			</div>
		</div>
	)
}