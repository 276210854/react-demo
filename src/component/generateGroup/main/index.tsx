import { FC, useEffect, useState } from 'react'
import React from 'react'
import { DragGroup, DropGroup, ArrowIcon, OpenFolderIcon, CloseFolderIcon, DianIcon, PersonIcon } from '@/common'
import './index.scss'
import { wrapperawait, toFlatObj } from '@/utils/tool'
import { getDetailByIdXHR, getListXHR } from '@/utils/request'
import { message } from 'antd';
import GroupCard from '../card'
import { ItemTypes } from './itemTypes'

export const Container: FC = () => {
	//tree
	const [sourceList, setSourceList] = useState([])
	//obj 字段
	const [sourceObj, setSourceObj] = useState({})
	//二维数组 分组
	const [groupIds, setGroupIds] = useState([[]])
	useEffect(() => {
		getList()
	}, [])
	//获取原始数据
	const getList = async () => {
		const [err, res] = await wrapperawait(getListXHR())
		if(err) return
		//tree转字典，新增parentIds
		setSourceObj(toFlatObj(res, []))
		res?.length && setSourceList(res)
	}
	//paste group
	const handlePaste = async ({id}, index) => {
		if(!id) return
		const [err, res] = await wrapperawait(getDetailByIdXHR(id))
		if(err) return
		//新增元数据 详情
		setSourceObj(pre => {
			const _pre = {...pre}
			_pre[id]['details'] = res
			return _pre
		})
		//分组，index组, 去重
		setGroupIds(pre => {
			const indexGroup = pre[index].indexOf(id) > -1 ? [...pre[index]] : [...pre[index], id]
			const _groupIds = [...pre]
			_groupIds.splice(index, 1, indexGroup)
			const hasEmptyGroup = _groupIds.some(item => !item?.length)
			return hasEmptyGroup ? _groupIds : [..._groupIds, []]
		})
	}
	//drag element
	const renderNoChildMenu = (props) => {
		return (
			<DragGroup id={props.id} type={ItemTypes.BOX}>
				<DianIcon />&nbsp;&nbsp;
				<PersonIcon />&nbsp;&nbsp;
				<span>{props.name}</span>
			</DragGroup>
		)
	}
	//folder
	const renderChildMenu = (item) => {
		const switchStatus = () => {
			const _sourceObj = {...sourceObj, [item.id]: {...item, showChild: !sourceObj[item.id].showChild}}
			setSourceObj(_sourceObj)
		}
		return (
			<>
				<div className='folder flexStart borderBottom' onClick={switchStatus}>
					<ArrowIcon />&nbsp;
					{sourceObj[item.id].showChild ? <OpenFolderIcon /> : <CloseFolderIcon />}&nbsp;
					<span className='folderName'>{item.name}</span>
				</div>
				{sourceObj[item.id].showChild ? (
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
	//delete group
	const deleteGroup = (index, id) => {
		setGroupIds(pre => {
			//index组 删除后
			const newGroup = pre[index].filter(val => val !== id)
			const groups = [...pre]
			newGroup?.length && groups.splice(index, 1, newGroup)
			!newGroup?.length && groups.splice(index, 1)
			const hasEmptyGroup = groups.some(item => !item.length)
			return hasEmptyGroup ? groups : [...groups, []]
		})
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
				{groupIds?.length ? (
					groupIds.map((ids,index) => {
						return (
							<div className='card-group' key={index}>
								<DropGroup pasteCb={val => handlePaste(val, index)} allowedDropEffect="copy" accept={ItemTypes.BOX} groupIndex={index}>
									{ids.map(id => {
										return (
											<div className='card-wrap' key={id}>
												<GroupCard info={sourceObj[id]} allSourceObj={sourceObj} close={id => deleteGroup(index, id)}/>
											</div>
										)
									})}
								</DropGroup>
							</div>
						)
					})
				) : null}
			</div>
		</div>
	)
}