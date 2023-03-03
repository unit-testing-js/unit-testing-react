import { ObjectType } from 'abandonjs'

export interface UnknownField {
	mode?: 'block' | 'inline' | 'empty'
	title?: string
	record?: ObjectType
	name?: string
	/**
	 * @description 'Click'
	 */
	label?: string
	fieldLabel?: string
	[key: string]: any
}