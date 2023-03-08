import React, { lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { MainContainer, MenuObject } from '../src'

const menu: MenuObject[] = [
	{
		path: '/',
		element: <div />
	},
].concat([
	'field',
	'object',
	'array',
	'layout'
].map(name => {
	return {
		name,
		path: '/' + name,
		element: <Suspense fallback={<div>Loading</div>}>
			{React.createElement(lazy(() =>
				import(name === 'test' ? `../src/${name}` : `../src/${name}/demo`))
			)}
		</Suspense>
	}
}))

createRoot(document.getElementById('root')!)
	.render(
		<BrowserRouter basename="/">
			<MainContainer menu={menu} />
		</BrowserRouter>
	);