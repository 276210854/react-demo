import React from 'react'
import './index.scss'
import { Checkbox} from 'antd'
import { propTypes } from './interface'

export const CheckGroup = (props: propTypes) => {
	const { onChange, options } = props
	return (
		<div className='check-list'>
            {
                options.map(item => {
                    return (
                        <div className='check-wrapper' key={item.name}>
                            <Checkbox onChange={e => onChange(e, item)} checked={item.checked}>{item.name}</Checkbox>
                            <span className='num'>{item.value}</span>
                        </div>
                    )
                })
            }
        </div>
	)
}