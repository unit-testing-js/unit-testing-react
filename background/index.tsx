import React, { lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
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
		
			<MainContainer menu={menu} />
	);