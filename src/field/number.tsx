import { isObject, ObjectType } from 'abandonjs'
import React, { useEffect, useState } from 'react'

export interface NumberField {
	record?: ObjectType
	fieldName?: string
	/**
	 * @description 'Click'
	 */
	fieldLabel?: string
	defaultValue?: number
	onClick?: (value: number, fieldName?: string, props?: NumberField) => void
	[key: string]: any
}

export function NumberField(props: NumberField) {
	const { defaultValue = 0, onClick, record, fieldName } = props
	const [field, setField] = useState<number>(defaultValue)

	useEffect(() => {
		if (isObject(record) && fieldName && record[fieldName] === undefined) {
			record[fieldName] = defaultValue
		}
	}, [defaultValue])

	return <div>
		<input
			defaultValue={field}
			onChange={(e) => {
				let value = Number(e.target.value)
				if (isNaN(value)) value = 0
				setField(value)
				if (isObject(record) && fieldName) {
					record[fieldName] = value
				}
			}}
		/>
		<button onClick={() => {
			onClick && onClick(field, props.fieldName, props)
		}}>{props.fieldLabel || 'Click'}</button>
	</div>
}