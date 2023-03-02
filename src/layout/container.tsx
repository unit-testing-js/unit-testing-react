import React, { CSSProperties } from 'react'

interface CMM {
	style?: CSSProperties
	className?: string
	children?: any
	[key: string]: any
}

export interface Container extends CMM {
	count?: number
}

export function Container(props: Container) {
	const { children, ...rest } = props
	return <div {...rest}>
		{children}
	</div>
}

export interface Unit extends CMM {
	title?: string
}

export function Unit(props: Unit) {
	const { children, ...rest } = props
	return <div {...rest}>
		{children}
	</div>
}