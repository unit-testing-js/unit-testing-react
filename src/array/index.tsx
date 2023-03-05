import { isObject, ObjectType } from 'abandonjs'
import { isEffectArray, isEmpty } from 'check-it-type'
import React, { CSSProperties, useEffect, useState } from 'react'
import { NumberField, StringField } from '../field'
import { ObjectField, ObjectFieldValue } from '../object'
import type { UnknownField } from '../type'
import './index.less'

export type ArrayFieldValue = ObjectType<number | string | undefined> | string | number | undefined
export type ArrayFieldValues = ArrayFieldValue[]

export type ArrayFieldRow = ({ type?: 'string' } & StringField) |
	({ type?: 'number' } & NumberField) | ({ type?: 'object' } & ObjectField)

export interface ArrayField extends UnknownField {
	names?: string
	fields?: ArrayFieldRow[]
	defaultValue?: ArrayFieldValues
	onClick?: (value: ArrayFieldValues, name?: string, props?: ArrayField) => void
	[key: string]: any
}

export function ArrayField(props: ArrayField) {
	const {
		fieldLabel = 'Click',
		defaultValue = [], onClick, record, name, fields = [], ...rest
	} = props

	const [field, setField] = useState<ObjectType<ArrayFieldValue>>(
		Object.assign(defaultValue.length >= fields.length
			? defaultValue
			: defaultValue.concat(new Array(fields.length - defaultValue.length).fill(undefined))
		)
	)

	useEffect(() => {
		if (isObject(record) && name && record[name] === undefined) {
			record[name] = defaultValue
		}
	}, [defaultValue])

	const bracketStyle: CSSProperties = {
		fontSize: 20,
	}

	return <div className={'array-field'} {...rest}>
		<div style={bracketStyle}>{`[`}</div>
		<div
			className={'array-field-container'}
			style={{
				marginLeft: 10
			}}>
			{isEffectArray(fields) && fields.map((unit, index) => {
				const { name, type, ...rest } = unit
				const cmmProps = {
					key: name,
					label: index,
					name: index.toString(),
					defaultValue: field[index],
					...rest,
				}

				if (type === 'object') {
					return <ObjectField
						mode='empty'
						onChange={(value: ObjectFieldValue, name: string) => {
							field[name] = value
							setField(field)
						}}
						{...cmmProps as ObjectField}
					/>
				}
				if (type === 'number') {
					return <NumberField
						mode='empty'
						onChange={(value: number, name: string) => {
							field[name] = value
							setField(field)
						}}
						{...cmmProps as NumberField}
					/>
				}
				return <StringField
					mode='empty'
					onChange={(value: string, name: string) => {
						field[name] = value
						setField(field)
					}}
					{...cmmProps as StringField}
				/>
			})}
		</div>
		<div>
			<span style={bracketStyle}>{`]`}</span>
			<button
				style={{
					marginLeft: 6,
					display: isEmpty(onClick) ? 'none' : 'inline-block'
				}}
				onClick={() => {

					function* createIterator(obj: ObjectType<ArrayFieldValue>) {
						for (let value in obj) yield obj[value]
					}
					const iterator = createIterator(field);

					onClick && onClick(Array.from(iterator), name, props)
				}}>{fieldLabel}</button>
		</div>
	</div>
}