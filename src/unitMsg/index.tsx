import React, { useState } from "react"
import { type } from "asura-eye"
import { stringify } from "abandonjs"

export interface UnitItem {
	list: unknown[],
	time: string
}

export interface UnitMsgProps {
	unit: UnitItem[]
}

export function useUnitMsg(): [UnitItem[], (...args: unknown[]) => void] {

	const [unit, setMsg] = useState<UnitItem[]>([])
	const log = (...args: unknown[]) => {
		console.log(...args)
		setMsg([
			{
				list: args,
				time: new Date().toLocaleTimeString()
			},
			...unit
		])
	}
	return [unit, log]
}

export function UnitMsg(props: UnitMsgProps) {
	const { unit = [] } = props
	return <div>
		{
			unit.map((item: UnitItem, index: number) => {
				const { list, time } = item
				return <div key={index}
					style={{
						display: 'inline-block',
						marginBottom: 10
					}}>
					{list.map((arg, index) => {
						return <span key={index} style={{ display: 'inline-block' }}>
							<span style={{ display: 'inline-block' }}>
								{stringify(arg)}
							</span>
							<span
								style={{
									color: 'rgb(137,137,137)',
									marginLeft: 5,
									marginRight: 5,
									display: 'inline-block',
									fontSize: 5,
									zoom: '.65'
								}}>
								{`${type(arg)}`}
								{(index + 1 !== list.length) && <span style={{ fontSize: 20, marginLeft: 5, color: '#000' }}>,</span>}
							</span>
						</span>
					})}
					<span style={{
						display: 'inline-block',
						color: '#5468ff',
						fontSize: 5,
						zoom: '.8'
					}}>{`${time}`}</span>
				</div>
			})
		}
	</div>
}