import { useContext, useEffect, useState } from 'react'
import { Col, Row, Form, Flex, Button, Drawer, Select } from 'antd'
import { CloseOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons'

import { RenderInput } from './InputRenderers'
import { AttributeType, FormFilterType } from '../../types/type'
import {
  OPERATORS,
  operators as operatorsData,
  TYPES
} from '../../constants/data'
import { AppContext, DataModelType } from '../../contexts/app.context'
import {
  objectToString,
  stringToObject,
  mapFormToResponse
} from '../../utils/utils'

const { Option } = Select

interface Props {
  open: boolean
  onClose: () => void
}

const renderInput = (type?: string, operator?: string, name?: number) => {
  if (!type || !operator) {
    return RenderInput.default()
  }

  if (type in RenderInput) {
    const typeConfig = RenderInput[type]

    if (operator in typeConfig) {
      if (operator === 'between' || operator === 'relativeTime') {
        return typeConfig[operator](name)
      }

      return typeConfig[operator]()
    }

    if ('default' in typeConfig) {
      return typeConfig.default()
    }
  }
  return RenderInput.default()
}

const FilterBuilder = ({ open, onClose }: Props) => {
  const [form] = Form.useForm()
  const { item } = useContext(AppContext)
  const [attributes, setAttributes] = useState<AttributeType[] | null>(null)
  const [hasFilters, setHasFilters] = useState<boolean>(false)
  const fieldValues = Form.useWatch('filters', form) || []
  const isCurrentFilled = fieldValues.every(
    (filter: FormFilterType) =>
      filter?.attribute &&
      filter?.operator &&
      (Array.isArray(filter?.values)
        ? filter?.values.length > 0
        : filter?.values)
  )

  useEffect(() => {
    setAttributes((item as DataModelType)?.attributes)
  }, [item])

  const handleClose = () => {
    onClose()
    form.resetFields()
    setHasFilters(false)
  }

  const onFinish = (values: { filters: FormFilterType[] }) => {
    const moreFilters = mapFormToResponse(values.filters)
    console.log({ moreFilters, page: 1 })
    moreFilters.map((filter) => console.log(filter))
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
      <Form
        form={form}
        layout='vertical'
        onFinish={onFinish}
        style={{ height: '100%' }}
      >
        <Form.List name='filters'>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }, index) => {
                const selectedAttribute = fieldValues?.[name]?.attribute
                  ? stringToObject(fieldValues?.[name]?.attribute)
                  : ''
                const selectedOperator = fieldValues?.[name]?.operator

                const selectedAttributeType = selectedAttribute?.dataType
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
                              <Option
                                key={attribute.key}
                                value={objectToString(attribute)}
                              >
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
                        rules={[
                          {
                            required:
                              selectedOperator !== OPERATORS.EXIST &&
                              selectedAttributeType !== TYPES.BOOLEAN,
                            message: ''
                          }
                        ]}
                      >
                        {renderInput(
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
                            disabled={
                              !isCurrentFilled &&
                              selectedAttributeType !== TYPES.BOOLEAN &&
                              selectedOperator !== OPERATORS.EXIST
                            }
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
          <Button type='primary' htmlType='submit'>
            Estimate data size
          </Button>
        )}
      </Form>
    </Drawer>
  )
}

export default FilterBuilder
