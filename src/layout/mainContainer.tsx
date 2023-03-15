import React, { useState, useEffect } from "react"
import { Routes, Route, Link, BrowserRouter } from 'react-router-dom'
import { isUndefined } from "check-it-type"
import { classNames } from 'browser-helper-js'
import type { CMM, MenuObject } from './type'
import { getIcon } from './icon'
import './index.less'
export interface MainContainer extends CMM {
	menu: MenuObject[]
	/**
	 * @default true
	 */
	fold?: boolean
}

export function MainContainer(props: MainContainer) {
	const { menu = [] } = props
	const [select, setSelect] = useState<string>('')
	const [fold, setFold] = useState<boolean>(isUndefined(props.fold) ? true : props.fold)

	useEffect(() => {
		const names = /(\w+)$/.exec(location.href)
		if (names && names.length) setSelect(names[0])
	}, [])

	return (
		<BrowserRouter basename="/">
			<div
				className={classNames("main", { fold })}>
				<aside className="menu">
					{menu.map((item: MenuObject) => {
						const { name, path } = item
						if (path && path !== '/') {
							const _name = name || path.replace('/', '')
							const showName = fold ? (_name[0]) : (_name)
							return <Link
								to={path}
								className={classNames({
									isSelect: select === name,
									fold,
								})}
								title={name}
								key={name + path}
								onClick={() => {
									name && setSelect(name)
								}}>
								{showName}
							</Link>
						}
					})}
				</aside>
				<div className="docs-component-content">
					<div className={classNames("header", { fold })}>
						<button
							onClick={() => {
								setFold(!fold)
							}}>
							{getIcon(fold ? 'fold' : 'unFold', 32, '#c5c5c5')}
						</button>
					</div>
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