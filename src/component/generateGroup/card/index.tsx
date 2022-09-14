import { useEffect, useState } from 'react'
import React from 'react'
import './index.scss'
import {Close, Dian, Search, Small, Big} from '@/common/icons'
import { Checkbox, Input } from 'antd'
import { propTypes } from './interface'

const GroupCard = (props: propTypes) => {
	const { info, allSourceObj, close } = props
	const [plainOptions, setPlainOptions] = useState([])
	const [showAll, setShowAll] = useState(true)
    useEffect(() => {
		info?.details?.length && setPlainOptions(info.details.map(item=> ({...item, checked: false, show: true})))
	}, [info])

	const handleChangeSelected = (e, selected) => {
		const _newSelected = { ...selected, checked: !selected.checked }
		const index = plainOptions.findIndex(item => item.value === selected.value)
		const _plainOptions = [...plainOptions]
		_plainOptions.splice(index, 1, _newSelected)
		setPlainOptions(_plainOptions)
	}
	const clearAllSelected = () => {
		setPlainOptions(info.details.map(item=> ({...item, checked: false, show: true})))
	}
    const changeSearchVal = (e) => {
        setPlainOptions(plainOptions.map(item => {
            return {　...item, show: item.name.indexOf(e.target.value) > -1}
        }))
    }
	const selecteds = plainOptions.filter(item => item.checked)
    const showOption = plainOptions.filter(item => !!item.show)
	const treeName = info?.parentIds?.map(id => allSourceObj[id]?.name)?.join(' / ') + ' / ' + info.name
	const handleClose = () => {
		close && close(info.id)
	}
	return (
		<div className='card'>
			<div className='group-title'>
				<div className='left'>
					<Dian width={10} height={10} />&nbsp;&nbsp;
					<span className='groupName'>{info.name}</span>
					&nbsp;=&nbsp;
					<span className='selected'>{selecteds.map(item => item.name)?.join(',')}</span>
				</div>
				<div className="right">
					{showAll ? <Small onClick={() => setShowAll(false)} /> : <Big onClick={() => setShowAll(true)} />}
					<Close width={10} height={10} onClick={handleClose} />
				</div>
			</div>
			<div className={`main ${showAll ? '' : 'hidden'}`}>
				<div className='tree'>{treeName}</div>
				<div className='operation'>
					<div className='search'>
						<Input placeholder="large size" onChange={changeSearchVal} prefix={<Search />} />
					</div>
					<div className='statistics flexStart'>
						<span className='clear' onClick={clearAllSelected}>Clear All</span>
						<span>{selecteds?.length || 0} selected</span>
					</div>
					<div className='check-list'>
						{
							showOption.map(item => {
								return (
									<div className='check-wrapper' key={item.name}>
										<Checkbox onChange={e => handleChangeSelected(e, item)} checked={item.checked}>{item.name}</Checkbox>
										<span className='num'>{item.value}</span>
									</div>
								)
							})
						}
					</div>
				</div>
			</div>
		</div>
	)
}
export default GroupCard