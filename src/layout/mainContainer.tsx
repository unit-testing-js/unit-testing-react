import React, { useState, useEffect } from "react"
import { Routes, Route, Link, BrowserRouter } from 'react-router-dom'
import type { CMM, MenuObject } from './type'
import { getIcon } from './icon'
import './index.less'
import { isUndefined } from "check-it-type"
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
		if (names && names.length) {
			setSelect(names[0])
		}
	}, [])

	return (
		<BrowserRouter basename="/">
			<div
				className="main"
				style={{
					gridTemplateColumns: fold ? '60px 1fr' : '10vw 1fr',
					transition: 'all .2s ease-in-out',
				}}>
				<aside className="menu">
					{menu.map((item: MenuObject) => {
						const { name, path } = item
						if (path && path !== '/') {
							const _name = name || path.replace('/', '')
							const showName = fold ? (_name[0]) : (_name)
							return <Link
								to={path}
								className={select === name ? 'isSelect' : ''}
								style={fold ? {
									textAlign: 'center',
									fontSize: '18px',
									fontWeight: 'bold',
								} : {}}
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
					<div className="header">
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