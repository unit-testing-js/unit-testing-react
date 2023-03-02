import { isObject, ObjectType } from 'abandonjs'
import React, { useEffect, useState } from 'react'

export interface StringField {
	record?: ObjectType
	fieldName?: string
	/**
	 * @description 'Click'
	 */
	fieldLabel?: string
	defaultValue?: string
	onClick?: (value: string, fieldName?: string, props?: StringField) => void
	[key: string]: any
}

export function StringField(props: StringField) {
	const { defaultValue = '', onClick, record, fieldName } = props
	const [field, setField] = useState<string>(defaultValue)

	useEffect(() => {
		if (isObject(record) && fieldName && record[fieldName] === undefined) {
			record[fieldName] = defaultValue
		}
	}, [defaultValue])

	return <div>
		<input
			defaultValue={field}
			onChange={(e) => {
				const value = e.target.value
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

