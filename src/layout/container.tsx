import React from 'react'
import { classNames } from 'browser-helper-js'
import type { CMM } from './type'
import './container.less'
import { isString } from 'asura-eye'

export interface Container extends CMM {
	grid?: boolean
	columns?: number
	gap?: number | string
}

export function Container(props: Container) {
	const { grid = false, className, columns = 2, gap = 5, style, children, ...rest } = props
	return <div
		className={classNames('unit-testing-container', className)}
		style={grid ? {
			display: 'grid',
			gridTemplateColumns: `repeat(${columns}, 1fr)`,
			gap: isString(gap) ? gap : `0 ${gap}px`
			// gridTemplateColumns: 're'
		} : {
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
		className={classNames('unit-testing-unit ut', className)}
		{...rest}>
		{title && <h2>{title}</h2>}
		{children}
	</div>
}