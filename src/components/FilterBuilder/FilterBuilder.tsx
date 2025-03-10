import { Dayjs } from 'dayjs'
import { useContext, useEffect, useState } from 'react'
import { CloseOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import {
  Col,
  Row,
  Form,
  Flex,
  Button,
  Drawer,
  Select,
  Switch,
  DatePicker,
  InputNumber
} from 'antd'

import { operators as operatorsData } from '../../constants/data'
import { AppContext, DataModelType } from '../../contexts/app.context'

const { Option } = Select
const { RangePicker } = DatePicker

interface Props {
  open: boolean
  onClose: () => void
}

interface AttributeType {
  key: string
  sysIndexKey: string
  name: string
  dataType: string
  refType: null
  ctxMasterDataRef: null
}

interface FilterType {
  attribute: string
  operator: string
  values: Dayjs | Dayjs[] | boolean | number | string[] | undefined
  between?: number[]
}

const inputRenderMap = {
  String: {
    default: () => (
      <Select mode='tags' placeholder='Enter' style={{ width: '100%' }} />
    ),
    exist: () => <Switch />
  },
  Double: {
    default: () => <InputNumber style={{ width: '100%' }} />,
    between: (name: number) => (
      <Row gutter={8}>
        <Col span={12}>
          <Form.Item
            name={[name, 'between', 'Value1']}
            style={{ marginBottom: 0 }}
          >
            <InputNumber
              placeholder='Min'
              style={{ width: '100%', marginBottom: 0 }}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name={[name, 'between', 'Value2']}
            style={{ marginBottom: 0 }}
          >
            <InputNumber placeholder='Max' style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      </Row>
    ),
    exist: () => <Switch />
  },
  Long: {
    default: () => <InputNumber style={{ width: '100%' }} />,
    between: (name: number) => (
      <Row gutter={8}>
        <Col span={12}>
          <Form.Item
            name={[name, 'between', 'Value1']}
            style={{ marginBottom: 0 }}
          >
            <InputNumber placeholder='Min' style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name={[name, 'between', 'Value2']}
            style={{ marginBottom: 0 }}
          >
            <InputNumber placeholder='Max' style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      </Row>
    ),
    exist: () => <Switch />
  },
  Boolean: {
    default: () => <Switch />
  },
  Timestamp: {
    default: () => <DatePicker showTime style={{ width: '100%' }} />,
    between: () => <RangePicker showTime style={{ width: '100%' }} />,
    relativeTime: (name: number) => (
      <Row gutter={8}>
        <Col span={8}>
          <Form.Item
            name={[name, 'relativeTime', 'longValue1']}
            style={{ marginBottom: 0 }}
          >
            <InputNumber placeholder='Min' style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name={[name, 'relativeTime', 'longValue2']}
            style={{ marginBottom: 0 }}
          >
            <InputNumber placeholder='Max' style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name={[name, 'relativeTime', 'timeType']}
            style={{ marginBottom: 0 }}
          >
            <Select
              options={[
                { label: 'Day', value: 'Day' },
                { label: 'Hour', value: 'Hour' },
                { label: 'Month', value: 'Month' },
                { label: 'Minute', value: 'Minute' }
              ]}
              placeholder='Max'
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Col>
      </Row>
    ),
    exist: () => <Switch />
  },
  default: () => <Select disabled />
}

const getInputComponent = (type?: string, operator?: string, name?: number) => {
  if (!type || !operator) {
    return inputRenderMap.default()
  }

  if (type in inputRenderMap) {
    const typeConfig = inputRenderMap[type as keyof typeof inputRenderMap]

    if (operator in typeConfig) {
      if (operator === 'between' || operator === 'relativeTime') {
        return (
          typeConfig[
            operator as keyof typeof typeConfig
          ] as () => React.ReactNode
        )(name)
      }
      return (
        typeConfig[operator as keyof typeof typeConfig] as () => React.ReactNode
      )()
    }

    // Nếu không có operator cụ thể, dùng default
    if ('default' in typeConfig) {
      return typeConfig.default()
    }
  }
}

const FilterBuilder = ({ open, onClose }: Props) => {
  const [form] = Form.useForm()
  const { item } = useContext(AppContext)
  const [attributes, setAttributes] = useState<AttributeType[] | null>(null)
  const [hasFilters, setHasFilters] = useState<boolean>(false)
  const fieldValues = Form.useWatch('filters', form) || []
  const isCurrentFilled = fieldValues.every(
    (filter: FilterType) =>
      (filter?.attribute && filter?.operator) ||
      (filter?.operator === 'exist' &&
        (Array.isArray(filter?.values)
          ? filter?.values.length > 0
          : filter?.values))
  )

  useEffect(() => {
    setAttributes((item as DataModelType)?.attributes)
  }, [item])

  const handleClose = () => {
    onClose()
    form.resetFields()
    setHasFilters(false)
  }

  const handleSubmit = () => {
    const values = form.getFieldsValue()
    const moreFilters = values.filters?.map(
      (filter: FilterType, index: number) => {
        const selectedAttribute = attributes?.find(
          (attr) => attr.key === filter.attribute
        )
        const { dataType } = selectedAttribute || {}

        const fieldValue: Record<string, () => object | undefined> = {
          String: () => ({ textValues: filter.values }),
          Boolean: () => ({ boolValue: filter.values || false }),
          Long: () =>
            filter.operator === 'between'
              ? {
                  longValue1: filter.between?.[0],
                  longValue2: filter.between?.[1]
                }
              : { longValue1: filter.values },
          Double: () =>
            filter.operator === 'between'
              ? {
                  doubleValue1: filter.between?.[0],
                  doubleValue2: filter.between?.[1]
                }
              : { doubleValue1: filter.values },
          Timestamp: () =>
            filter.operator === 'between'
              ? {
                  longValue1: (filter.values as Dayjs[])[0]?.valueOf(),
                  longValue2: (filter.values as Dayjs[])[1]?.valueOf()
                }
              : { longValue1: (filter.values as Dayjs)?.valueOf() }
        }[dataType as keyof typeof fieldValue]?.()

        return {
          attribute: filter.attribute,
          index: index + 1,
          operator: filter.operator,
          valueType: dataType,
          metaAttr: selectedAttribute,
          display: selectedAttribute?.name,
          ...fieldValue
        }
      }
    )

    console.log({ moreFilters, pageSize: 1 })
  }

  return (
    <Drawer
      open={open}
      size='large'
      closable={false}
      title={
        <Flex align='center' justify='space-between'>
          FILTER BUILDER
          <Button type='text' icon={<CloseOutlined />} onClick={handleClose} />
        </Flex>
      }
    >
      <Form form={form} layout='vertical' style={{ height: '100%' }}>
        <Form.List name='filters'>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }, index) => {
                const selectedAttribute = fieldValues?.[name]?.attribute
                const selectedOperator = fieldValues?.[name]?.operator
                const selectedValues = fieldValues?.[name]?.values

                const selectedAttributeType = attributes?.find(
                  (attribute: AttributeType) =>
                    attribute.key === selectedAttribute
                )?.dataType
                const operators = selectedAttributeType
                  ? operatorsData[selectedAttributeType]
                  : []

                const isLastRow = index === fields.length - 1

                return (
                  <Row key={key} gutter={8} align='middle'>
                    <Col span={9}>
                      <Form.Item
                        {...restField}
                        name={[name, 'attribute']}
                        rules={[{ required: true, message: '' }]}
                      >
                        <Select
                          allowClear
                          placeholder='Select'
                          onChange={() => {
                            form.setFieldsValue({
                              filters: {
                                [name]: {
                                  operator: undefined,
                                  values: undefined
                                }
                              }
                            })
                          }}
                          style={{ width: '100%' }}
                        >
                          {attributes &&
                            attributes?.map((attribute) => (
                              <Option key={attribute.key} value={attribute.key}>
                                {`${attribute.name} - ${attribute.dataType}`}
                              </Option>
                            ))}
                        </Select>
                      </Form.Item>
                    </Col>

                    <Col span={4}>
                      <Form.Item
                        {...restField}
                        name={[name, 'operator']}
                        rules={[{ required: true, message: '' }]}
                      >
                        <Select
                          allowClear
                          placeholder='Select'
                          onChange={() => {
                            form.setFieldsValue({
                              filters: {
                                [name]: {
                                  values: undefined
                                }
                              }
                            })
                          }}
                          style={{ width: '100%' }}
                        >
                          {operators.map((operator) => (
                            <Option key={operator.value} value={operator.value}>
                              {operator.label}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>

                    <Col span={9}>
                      <Form.Item
                        {...restField}
                        name={[name, 'values']}
                        rules={[{ required: true, message: '' }]}
                      >
                        {getInputComponent(
                          selectedAttributeType,
                          selectedOperator,
                          name
                        )}
                      </Form.Item>
                    </Col>

                    <Col span={1}>
                      <Form.Item>
                        <Button
                          type='text'
                          icon={<DeleteOutlined />}
                          onClick={() => {
                            remove(name)
                            if (fields.length === 1) {
                              setHasFilters(false)
                            }
                          }}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={1}>
                      <Form.Item>
                        {isLastRow && (
                          <Button
                            type='text'
                            icon={<PlusOutlined />}
                            disabled={!isCurrentFilled}
                            onClick={add}
                          />
                        )}
                      </Form.Item>
                    </Col>
                  </Row>
                )
              })}

              {!hasFilters && (
                <Button
                  type='dashed'
                  icon={<PlusOutlined />}
                  onClick={() => {
                    add()
                    setHasFilters(true)
                  }}
                >
                  Add Criteria
                </Button>
              )}
            </>
          )}
        </Form.List>
        {hasFilters && (
          <Button
            type='primary'
            onClick={handleSubmit}
            disabled={!isCurrentFilled}
          >
            Estimate data size
          </Button>
        )}
      </Form>
    </Drawer>
  )
}

export default FilterBuilder
