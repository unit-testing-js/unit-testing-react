import { isObject, ObjectType } from 'abandonjs'
import { isEffectArray, isEmpty } from 'check-it-type'
import React, { CSSProperties, useEffect, useState } from 'react'
import { NumberField, StringField } from '../field'
import type { UnknownField } from '../type'
import './index.less'

export type ObjectFieldValue = ObjectType<number | string | undefined>

export type ObjectFieldRow = ({ type?: 'string' } & StringField) |
	({ type?: 'number' } & NumberField)

export interface ObjectField extends UnknownField {
	names?: string
	fields?: ObjectFieldRow[]
	defaultValue?: ObjectFieldValue
	onClick?: (value: ObjectFieldValue, name?: string, props?: ObjectField) => void
	[key: string]: any
}

export function ObjectField(props: ObjectField) {
	const {
		fieldLabel = 'Click', label, mode = 'block', onChange,
		defaultValue = {}, onClick, record, name, fields = [], ...rest
	} = props
	const [field, setField] = useState<ObjectFieldValue>(
		Object.keys(defaultValue).length >= fields.length
			? defaultValue
			: Object.assign(defaultValue,
				(() => {
					const result: ObjectFieldRow = {}
					fields.forEach(item => {
						const { name } = item || {}
						if (isEmpty(name) || Object.keys(defaultValue).includes(name)) return;
						result[name] = undefined
					})
					return result
				})()
			)
	)

	useEffect(() => {
		if (isObject(record) && name && record[name] === undefined) {
			record[name] = defaultValue
		}
		onChange && onChange(field, name, props)
	}, [Object.keys(defaultValue)])

	const bracketStyle: CSSProperties = {
		fontSize: 20,
	}

	const handleChange = (value: ObjectFieldValue) => {
		onChange && onChange(value, name, props)
	}

	const render = () => <React.Fragment>

		<label>{isEmpty(label) ? '' :
			<React.Fragment>
				<span>{label}</span>
				<span className='colon'>:</span>
			</React.Fragment>}
			<div style={bracketStyle}>{`{`}</div>
		</label>

		<span
			className={'object-field-container'}
			style={{
				marginLeft: 10
			}}>
			{isEffectArray(fields) && fields.map(unit => {
				const { name, ...rest } = unit
				const cmmProps = {
					key: name,
					label: name,
					name,
					defaultValue: name && field[name],
					...rest
				}

				if (unit.type === 'number') {
					return <NumberField
						mode='empty'
						onChange={(value: number, name: string) => {
							field[name] = value
							setField(field)
							handleChange(field)
						}}
						{...cmmProps as NumberField} />
				}
				return <StringField
					mode='empty'
					onChange={(value: string, name: string) => {
						field[name] = value
						setField(field)
						handleChange(field)
					}}
					{...cmmProps as StringField} />
			})}
		</span>

		<div>
			<span style={bracketStyle}>{`}`}</span>
			<button
				style={{ marginLeft: 6, display: isEmpty(onClick) ? 'none' : 'inline-block' }}
				onClick={() => {
					onClick && onClick(field, name, props)
				}}>{fieldLabel}</button>
		</div>
	</React.Fragment>

	return {
		'block': <div className={'object-field'}  {...rest}>{render()}</div>,
		'inline': <span className={'object-field'}  {...rest}>{render()}</span>,
		'empty': render(),
	}[mode]
}