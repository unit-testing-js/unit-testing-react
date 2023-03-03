import React from "react"
import { Container, Unit } from '../../layout'
import { ObjectField, ObjectFieldValue } from '..'

export default function () {
	return <Container>
		<Unit>
			<ObjectField
				name="obj"
				fields={[
					{ name: 'a' },
					{ name: 'b' },
					{ name: 'c' },
				]}
				onClick={(value: ObjectFieldValue, name: string) => {
					console.log(value, name)
				}}
			/>
		</Unit>
	</Container>
}
