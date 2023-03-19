import React from 'react'
import { classNames } from 'browser-helper-js'
import type { CMM } from './type'
import './container.less'

export interface Container extends CMM {
	columns?: number
	gap?: number | string
}

export function Container(props: Container) {
	const { className, columns = 2, gap = 5, style, children, ...rest } = props
	return <div
		className={classNames('unit-testing-container', className)}
		style={{
			columnCount: columns,
			columnGap: gap,
			...style
		}}
		{...rest}>
		{children}
	</div>
}

export interface Unit extends CMM {
	title?: string
}

export function Unit(props: Unit) {
	const { title, className, children, ...rest } = props
	return <div
		className={classNames('unit-testing-unit', className)}
		{...rest}>
		{title && <h2>{title}</h2>}
		{children}
	</div>
}