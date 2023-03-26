import { isEmpty, isObject } from 'abandonjs'
import React, { useEffect, useState } from 'react'
import { FieldResultType } from './components'
import type { UnknownField } from '../type'

export interface NumberField extends UnknownField {
	defaultValue?: number
	onClick?: (value?: number, name?: string, props?: NumberField) => void
	onChange?: (value?: number, name?: string, props?: NumberField) => void
}

export function NumberField(props: NumberField) {
	const {
		fieldLabel = 'Click',
		label, defaultValue, onClick, onChange,
		record, name, mode = 'block', ...rest
	} = props
	const [field, setField] = useState<number | undefined>(defaultValue)
	const [result, setResult] = useState<unknown>()

	useEffect(() => {
		if (isObject(record) && name && record[name] === undefined) {
			record[name] = defaultValue
		}
	}, [defaultValue])


	const render = () =>
		<React.Fragment>

			<label className='ut-label'>{isEmpty(label) ? '' :
				<React.Fragment>
					<span>{label}</span>
					<span className='colon'>:</span>
				</React.Fragment>
			}</label>

			<input
				value={field}
				onChange={(e) => {
					let value = Number(e.target.value)
					if (isNaN(value)) value = 0
					setField(value)
					onChange && onChange(value, name, props)
					if (isObject(record) && name) {
						record[name] = value
					}
				}}
			/>

			<span>
				<button
					style={{ display: isEmpty(onClick) ? 'none' : 'inline-block' }}
					onClick={() => {
						const res = onClick && onClick(field, name, props)
						setResult(res)
					}}>{fieldLabel}</button>

				<FieldResultType result={result} />
			</span>

		</React.Fragment>

	return {
		'block': <div {...rest}>{render()}</div>,
		'inline': <span {...rest}>{render()}</span>,
		'empty': render(),
	}[mode]


}