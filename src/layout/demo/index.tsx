import React from "react"
import { Container, Unit } from '..'
import Fake from 'fakingjs'

export default function () {
	return <Container
		// grid
		columns={4}
		gap={10}
	>
		{new Array(15).fill('').map((u, index) =>
			<Unit
				title={index.toString()}
				key={index}
				style={{
					marginBottom: 10,
					border: '1px solid #eee',
					padding: 12
				}}>
				<div >
					{Fake(`@para(${(index % 10) + 1})`)}
				</div>
			</Unit>
		)}
	</Container>
}
