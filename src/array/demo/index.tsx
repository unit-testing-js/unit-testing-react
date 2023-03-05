import React from "react"
import { Container, Unit } from '../../layout'
import { ArrayField, ArrayFieldValue, ArrayFieldValues } from '..'

export default function () {
	return <Container>
		<Unit>
			<ArrayField
				name="obj"
				defaultValue={[
					'1', 'b', 'c', {
						d: 1,
						e: '3'
					}
				]}
				fields={[
					{ name: 'a' },
					{ name: 'b' },
					{ name: 'c' },
					{
						type: 'object',
						name: 'e',
						fields: [
							{ name: 'd' },
							{ name: 'e' },
						]
					},

				]}
				onClick={(value: ArrayFieldValues, name: string) => {
					console.log(value, name)
				}}
			/>
		</Unit>
	</Container>
}
