import type { Dayjs } from 'dayjs'

export interface AttributeType {
  key: string
  sysIndexKey: string
  name: string
  dataType: string
  refType: null
  ctxMasterDataRef: null
}

export interface ResponseFilterType {
  index: number
  display: string
  operator: string
  attribute: string
  valueType: string
  metaAttr: AttributeType

  timeType?: string
  boolValue?: boolean
  longValue1?: number
  longValue2?: number
  doubleValue1?: number
  doubleValue2?: number
  textValues?: string[]
}

export interface FormFilterType {
  attribute: string
  operator: string
  values?:
    | string[]
    | number
    | boolean
    | Dayjs
    | Dayjs[]
    | Record<string, number | string>
}
