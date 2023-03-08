import React, { useState, useEffect } from "react"
import { useNavigate, Routes, Route } from 'react-router-dom'
import type { CMM, MenuObject } from './type'
import './index.less'

export interface MainContainer extends CMM {
	menu: MenuObject[]
}

export function MainContainer(props: MainContainer) {
	const { menu = [] } = props
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
			<Routes>
				{menu.map(router => (<Route path={router.path} element={router.element} />))}
			</Routes>
		</div>
	</div>
	)
}