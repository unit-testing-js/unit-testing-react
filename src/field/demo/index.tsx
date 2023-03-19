import React from "react"
import { Container, Unit } from '../../layout'
import { StringField, NumberField } from '..'

export default function () {
	return <Container>
		<Unit>
			<StringField onClick={() => { return 123 }} />
			<StringField onClick={() => { return '123' }} />
			<NumberField onClick={() => { return 123 }} />
		</Unit>
	</Container>
}
