import dayjs, { Dayjs } from 'dayjs'

import { OPERATORS, TYPES } from '../constants/data'
import { FormFilterType, ResponseFilterType } from '../types/type'

export const getOperatorLabel = (value: string): string | undefined => {
  const operator = Object.values(OPERATORS).find((op) => op.value === value)
  return operator?.label
}

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
        if (filter.operator === OPERATORS.EXIST.value) {
          fieldValue = { boolValue: filter.values }
        } else {
          fieldValue = { textValues: filter.values }
        }
        break

      case TYPES.BOOLEAN:
        fieldValue = { boolValue: filter.values || false }
        break

      case TYPES.LONG:
        if (filter.operator === OPERATORS.EXIST.value) {
          fieldValue = { boolValue: filter.values || false }
        } else if (filter.operator === OPERATORS.BETWEEN.value) {
          fieldValue = { ...(filter.values as object) }
        } else {
          fieldValue = { longValue1: filter.values }
        }
        break

      case TYPES.DOUBLE:
        if (filter.operator === OPERATORS.EXIST.value) {
          fieldValue = { boolValue: filter.values || false }
        } else if (filter.operator === OPERATORS.BETWEEN.value) {
          fieldValue = { ...(filter.values as object) }
        } else {
          fieldValue = { doubleValue1: filter.values }
        }
        break

      case TYPES.TIMESTAMP:
        if (filter.operator === OPERATORS.EXIST.value) {
          fieldValue = { boolValue: filter.values || false }
        } else if (filter.operator === OPERATORS.BETWEEN.value) {
          fieldValue = {
            longValue1: dayjsToNumber(filter.values[0]),
            longValue2: dayjsToNumber(filter.values[1])
          }
        } else if (filter.operator === OPERATORS.RELATIVE_TIME.value) {
          fieldValue = { ...(filter.values as object) }
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
        if (condition.operator === OPERATORS.EXIST.value) {
          formCondition.values = condition.boolValue
        } else {
          formCondition.values = condition.textValues
        }
        break

      case TYPES.DOUBLE:
        if (condition.operator === OPERATORS.BETWEEN.value) {
          formCondition.values = {
            doubleValue1: condition.doubleValue1,
            doubleValue2: condition.doubleValue2
          }
        } else if (condition.operator === OPERATORS.EXIST.value) {
          formCondition.values = condition.boolValue
        } else {
          formCondition.values = condition.doubleValue1
        }
        break

      case TYPES.LONG:
        if (condition.operator === OPERATORS.BETWEEN.value) {
          formCondition.values = {
            longValue1: condition.longValue1,
            longValue2: condition.longValue2
          }
        } else if (condition.operator === OPERATORS.EXIST.value) {
          formCondition.values = condition.boolValue
        } else {
          formCondition.values = condition.longValue1
        }
        break

      case TYPES.BOOLEAN:
        formCondition.values = condition.boolValue
        break

      case TYPES.TIMESTAMP:
        if (condition.operator === OPERATORS.BETWEEN.value) {
          formCondition.values = [
            numberToDayjs(condition.longValue1),
            numberToDayjs(condition.longValue2)
          ]
        } else if (condition.operator === OPERATORS.RELATIVE_TIME.value) {
          formCondition.values = {
            longValue1: condition.longValue1,
            longValue2: condition.longValue2,
            timeType: condition.timeType
          }
        } else if (condition.operator === OPERATORS.EXIST.value) {
          formCondition.values = condition.boolValue
        } else {
          formCondition.values = numberToDayjs(condition.longValue1)
        }
        break
    }

    return formCondition
  })
}

export const handleTag = ({
  attribute,
  operator,
  values
}: FormFilterType): string => {
  const attributeObject = stringToObject(attribute)
  const operatorLabel = getOperatorLabel(operator)
  switch (attributeObject.dataType) {
    case TYPES.STRING:
      if (operator === OPERATORS.EXIST.value) {
        return values
          ? `${operatorLabel} ${attributeObject.name}`
          : `Not ${operatorLabel} ${attributeObject.name}`
      } else {
        const value = (values as string[])?.join(', ')
        return `${attributeObject.name} ${operatorLabel} '${value}'`
      }
    case TYPES.DOUBLE:
      if (operator === OPERATORS.EXIST.value) {
        return values
          ? `${operatorLabel} ${attributeObject.name}`
          : `Not ${operatorLabel} ${attributeObject.name}`
      } else if (operator === OPERATORS.BETWEEN.value) {
        const { doubleValue1, doubleValue2 } = values as {
          doubleValue1: number
          doubleValue2: number
        }
        return `${attributeObject.name} ${operatorLabel} ${doubleValue1} ~ ${doubleValue2}`
      } else {
        return `${attributeObject.name} ${operatorLabel} ${values}`
      }
    case TYPES.LONG:
      if (operator === OPERATORS.EXIST.value) {
        return values
          ? `${operatorLabel} ${attributeObject.name}`
          : `Not ${operatorLabel} ${attributeObject.name}`
      } else if (operator === OPERATORS.BETWEEN.value) {
        const { longValue1, longValue2 } = values as {
          longValue1: number
          longValue2: number
        }
        return `${attributeObject.name} ${operatorLabel} ${longValue1} ~ ${longValue2}`
      } else {
        return `${attributeObject.name} ${operatorLabel} ${values}`
      }
    case TYPES.BOOLEAN:
      return `${attributeObject.name} ${operatorLabel} ${values}`
    case TYPES.TIMESTAMP:
      if (operator === OPERATORS.EXIST.value) {
        return values
          ? `${operatorLabel} ${attributeObject.name}`
          : `Not ${operatorLabel} ${attributeObject.name}`
      } else if (operator === OPERATORS.BETWEEN.value) {
        return `${attributeObject.name} ${operatorLabel} ${values[0].format(
          'MM-DD-YYYY HH:mm:ss'
        )}, ${values[1].format('MM-DD-YYYY HH:mm:ss')}`
      } else if (operator === OPERATORS.RELATIVE_TIME.value) {
        const { longValue1, longValue2, timeType } = values as {
          longValue1: number
          longValue2: number
          timeType: string
        }
        return `${attributeObject.name} ${operatorLabel} [${longValue1}, ${longValue2}] ${timeType}(s)`
      } else {
        return `${attributeObject.name} ${operatorLabel} ${(
          values as Dayjs
        ).format('MM-DD-YYYY HH:mm:ss')}`
      }
  }
}
