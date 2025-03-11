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

export const numberToDayjs = (number: number): Dayjs => {
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

export const mapResponseToForm = (
  responseConditions: ResponseFilterType[]
): FormFilterType[] => {
  if (!responseConditions || !responseConditions.length) {
    return []
  }

  return responseConditions.map((condition) => {
    const formCondition: FormFilterType = {
      attribute: objectToString(condition.metaAttr),
      operator: condition.operator
    }

    switch (condition.valueType) {
      case TYPES.STRING:
        formCondition.values = condition.textValues || []
        break

      case TYPES.DOUBLE:
        if (condition.operator === OPERATORS.BETWEEN) {
          formCondition.between.doubleValue1 = condition.doubleValue1
          formCondition.between.doubleValue2 = condition.doubleValue2
        } else if (condition.operator === OPERATORS.EXIST) {
          formCondition.boolValue = condition.boolValue
        } else {
          formCondition.values = condition.doubleValue1
        }
        break

      case TYPES.LONG:
        if (condition.operator === OPERATORS.BETWEEN) {
          formCondition.between.longValue1 = condition.longValue1
          formCondition.between.longValue2 = condition.longValue2
        } else if (condition.operator === OPERATORS.EXIST) {
          formCondition.boolValue = condition.boolValue
        } else {
          formCondition.values = condition.longValue1
        }
        break

      case TYPES.BOOLEAN:
        formCondition.boolValue = condition.boolValue
        break

      case TYPES.TIMESTAMP:
        if (condition.operator === OPERATORS.BETWEEN) {
          formCondition.values = [
            numberToDayjs(condition.longValue1),
            numberToDayjs(condition.longValue2)
          ]
        } else if (condition.operator === OPERATORS.RELATIVE_TIME) {
          formCondition.relativeTime.longValue1 = numberToDayjs(
            condition.longValue1
          )
          formCondition.relativeTime.longValue2 = numberToDayjs(
            condition.longValue2
          )
          formCondition.relativeTime.timeType = condition.timeType
        } else if (condition.operator === OPERATORS.EXIST) {
          formCondition.boolValue = condition.boolValue
        } else {
          formCondition.values = numberToDayjs(condition.longValue1)
        }
        break
    }

    return formCondition
  })
}
