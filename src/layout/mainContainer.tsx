import React, { Suspense, useState, useEffect } from "react"
import { useNavigate, useRoutes } from 'react-router-dom'
import type { CMM, MenuObject } from './type'
import './index.less'

export interface MainContainer extends CMM {
	menu: MenuObject[]
}

export function MainContainer(props: MainContainer) {
	const { menu = [] } = props
	const element = useRoutes(Array.from(menu, (item) => ({ path: item.path, element: item.element })))
	const [select, setSelect] = useState<string>('')
	const nav = useNavigate()

	useEffect(() => {
		const names = /(\w+)$/.exec(location.href)
		if (names && names.length) {
			setSelect(names[0])
		}
	}, [])

	return (<div className="main">
		<aside className="menu">
			{menu.map((item: MenuObject) => {
				const { name, path } = item
				if (path && path !== '/')
					return <div
						className={select === name ? 'isSelect' : ''}
						key={name + path}
						onClick={() => {
							nav(path)
							name && setSelect(name)
						}} >
						{name || path.replace('/', '')}
					</div>

			})}
		</aside>
		<div className="docs-component-content">
			<Suspense fallback={<div>loading...</div>}>
				<div>{element}</div>
			</Suspense>
		</div>
	</div>
	)
}