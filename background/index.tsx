import React from 'react'
import { createRoot } from 'react-dom/client'
import { MainContainer, MenuObject, getTestMenuRoute, lazyLoad } from '../src'
import './index.less'

const menu: MenuObject[] = [
	// {
	// 	path: '/home',
	// 	element: <div style={{ color: 'red' }}>Home</div>
	// },
	getTestMenuRoute({
		fold: false,
		modules: [
			{ name: 'field', element: lazyLoad(import('../src/field/demo')) },
			{ name: 'object', element: lazyLoad(import('../src/object/demo')) },
			{ name: 'array', element: lazyLoad(import('../src/array/demo')) },
			{ name: 'layout', element: lazyLoad(import('../src/layout/demo')) },
		],

	})
]

createRoot(document.getElementById('root')!)
	.render(<MainContainer menu={menu} />)