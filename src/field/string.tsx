import React, { useEffect, useState } from 'react'
import { isObject, isEmpty } from 'abandonjs'
import { FieldResultType } from './components'
import type { UnknownField } from '../type'

export interface StringField extends UnknownField {
	defaultValue?: string
	onClick?: (value?: string, name?: string, props?: StringField) => void
	onChange?: (value?: string, name?: string, props?: StringField) => void
}

export function StringField(props: StringField) {
	const { 
		label, defaultValue = '', onClick, onChange,
		record, name, mode = 'block', ...rest 
	} = props
	const [field, setField] = useState<string>(defaultValue)
	const [result, setResult] = useState<unknown>()
	useEffect(() => {
		if (isObject(record) && name && record[name] === undefined) {
			record[name] = defaultValue
		}
	}, [defaultValue])

	const render = () => <React.Fragment>
		<label>{isEmpty(label) ? '' :
			<React.Fragment>
				<span>{label}</span>
				<span className='colon'>:</span>
			</React.Fragment>
		}</label>
		<input
			defaultValue={field}
			onChange={(e) => {
				const value = e.target.value
				setField(value)
				onChange && onChange(value, props.name, props)
				if (isObject(record) && name) {
					record[name] = value
				}
			}}
		/>
		<span>
			<button
				style={{
					marginRight: 5,
					display: isEmpty(onClick) ? 'none' : 'inline-block',
				}}
				onClick={() => {
					const res = onClick && onClick(field, props.name, props)
					setResult(res)
				}}>{props.fieldLabel || 'Click'}</button>

			<FieldResultType result={result} />
		</span>
	</React.Fragment>

	return {
		'block': <div {...rest}>{render()}</div>,
		'inline': <span {...rest}>{render()}</span>,
		'empty': render(),
	}[mode]
}