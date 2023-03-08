import React, { useState, useEffect } from "react"
import { Routes, Route, Link, BrowserRouter } from 'react-router-dom'
import type { CMM, MenuObject } from './type'
import './index.less'
export interface MainContainer extends CMM {
	menu: MenuObject[]
}

export function MainContainer(props: MainContainer) {
	const { menu = [] } = props
	const [select, setSelect] = useState<string>('')

	useEffect(() => {
		const names = /(\w+)$/.exec(location.href)
		if (names && names.length) {
			setSelect(names[0])
		}
	}, [])

	return (
		<BrowserRouter basename="/">
			<div className="main">
				<aside className="menu">
					{menu.map((item: MenuObject) => {
						const { name, path } = item
						if (path && path !== '/')
							return <Link
								to={path}
								className={select === name ? 'isSelect' : ''}
								key={name + path}
								onClick={() => {
									name && setSelect(name)
								}}>
								{name || path.replace('/', '')}
							</Link>
					})}
				</aside>
				<div className="docs-component-content">
					<Routes>
						{menu.map(router => (<Route
							key={router.path}
							path={router.path}
							element={router.element} />))}
					</Routes>
				</div>
			</div>
		</BrowserRouter>
	)
}