import dayjs, { Dayjs } from 'dayjs'

import { OPERATORS, TYPES } from '../constants/data'
import { FormFilterType, ResponseFilterType } from '../types/type'

export const objectToString = (object: unknown): string => {
  return JSON.stringify(object)
}

export const stringToObject = (string: string) => {
  return JSON.parse(string)
}

export const dayjsToNumber = (dayjs: Dayjs): number => {
  return dayjs.valueOf()
}

export const numberToDayjs = (number: string): Dayjs => {
  return dayjs(number)
}

export const mapFormToResponse = (
  formFilters: FormFilterType[]
): ResponseFilterType[] => {
  return formFilters.map((filter: FormFilterType, index: number) => {
    const selectedAttribute = stringToObject(filter.attribute)
    const { dataType } = selectedAttribute
    let fieldValue = {}
    switch (dataType) {
      case TYPES.STRING:
        if (filter.operator === OPERATORS.EXIST) {
          fieldValue = { boolValue: filter.values || false }
        } else {
          fieldValue = { textValues: filter.values }
        }
        break

      case TYPES.BOOLEAN:
        fieldValue = { boolValue: filter.values || false }
        break

      case TYPES.LONG:
        if (filter.operator === OPERATORS.EXIST) {
          fieldValue = { boolValue: filter.values || false }
        } else if (filter.operator === OPERATORS.BETWEEN) {
          fieldValue = { ...filter.between }
        } else {
          fieldValue = { longValue1: filter.values }
        }
        break

      case TYPES.DOUBLE:
        if (filter.operator === OPERATORS.EXIST) {
          fieldValue = { boolValue: filter.values || false }
        } else if (filter.operator === OPERATORS.BETWEEN) {
          fieldValue = { ...filter.between }
        } else {
          fieldValue = { doubleValue1: filter.values }
        }
        break

      case TYPES.TIMESTAMP:
        if (filter.operator === OPERATORS.EXIST) {
          fieldValue = { boolValue: filter.values || false }
        } else if (filter.operator === OPERATORS.BETWEEN) {
          fieldValue = {
            longValue1: dayjsToNumber(filter.values[0]),
            longValue2: dayjsToNumber(filter.values[1])
          }
        } else if (filter.operator === OPERATORS.RELATIVE_TIME) {
          fieldValue = { ...filter.relativeTime }
        } else {
          fieldValue = { longValue1: dayjsToNumber(filter.values as Dayjs) }
        }
        break
    }

    return {
      attribute: selectedAttribute?.key,
      index: index + 1,
      operator: filter.operator,
      valueType: dataType,
      metaAttr: selectedAttribute,
      display: selectedAttribute?.name,
      ...fieldValue
    }
  })
}
