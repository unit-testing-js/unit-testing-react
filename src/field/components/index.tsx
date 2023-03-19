import React from 'react'
import { isUndefined, stringify, type } from 'abandonjs'

export interface FieldResultType {
	result: unknown
}

/**
 * @description 参数值及类型类型
 * @param props {FieldResultType}
 */
export function FieldResultType(props: FieldResultType) {
	const { result } = props
	if (isUndefined(result)) return <span />
	return <span>
		{stringify(result)}<span style={{ color: '#585858' }}>{`<${type(result)}>`}</span>
	</span>
}