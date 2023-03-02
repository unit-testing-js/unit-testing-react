import { isObject, isUndefined, ObjectType, stringify, type } from 'abandonjs'
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
	const [result, setResult] = useState<unknown>()
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
		<button
			style={{ marginRight: 5 }}
			onClick={() => {
				const res = onClick && onClick(field, props.fieldName, props)
				setResult(res)
			}}>{props.fieldLabel || 'Click'}</button>

		<span style={{ display: isUndefined(result) ? 'none' : 'inline-block' }}>
			{stringify(result)}<span style={{ color: '#585858' }}>{`<${type(result)}>`}</span>
		</span>
	</div>
}

