import { Fragment, useContext, useEffect, useState } from 'react'
import { Col, Row, Form, Flex, Button, Drawer, Select, Divider } from 'antd'
import { CloseOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons'

import { RenderInput } from './InputRenderers'
import { AppContext } from '../../contexts/app.context'
import { AttributeType, FormFilterType } from '../../types/type'
import { operators as operatorsData } from '../../constants/data'
import {
  objectToString,
  stringToObject,
  mapFormToResponse,
  mapResponseToForm
} from '../../utils/utils'
import { StoreValue } from 'antd/es/form/interface'

const { Option } = Select

interface Props {
  open: boolean
  onClose: () => void
}

const renderInput = (
  type?: string,
  operator?: string,
  name?: number,
  restField?: { fieldKey?: number }
) => {
  if (!type || !operator) {
    return RenderInput.default()
  }

  if (type in RenderInput) {
    const typeConfig = RenderInput[type]

    if (operator in typeConfig) {
      return typeConfig[operator](name, restField)
    }

    if ('default' in typeConfig) {
      return typeConfig.default(name, restField)
    }
  }
  return RenderInput.default()
}

const FilterBuilder = ({ open, onClose }: Props) => {
  const [form] = Form.useForm()
  const { item, filters, setFilters } = useContext(AppContext)
  const [attributes, setAttributes] = useState<AttributeType[] | null>(null)
  const [hasFilters, setHasFilters] = useState<boolean>(false)
  const fieldValues = Form.useWatch('filters', form) || []

  useEffect(() => {
    if (item) {
      setAttributes(item.attributes)

      const savedFilters = filters[item.id] || []
      if (savedFilters.length > 0) {
        form.setFieldsValue({ filters: mapResponseToForm(savedFilters) })
        setHasFilters(true)
      }
    }
  }, [item, filters, form])

  const handleClose = () => {
    onClose()
    form.resetFields()
    const savedFilters = filters[item.id] || []
    if (savedFilters.length > 0) {
      form.setFieldsValue({ filters: mapResponseToForm(savedFilters) })
      return
    }
    setHasFilters(false)
  }

  const onFinish = (values: { filters: FormFilterType[] }) => {
    const moreFilters = mapFormToResponse(values.filters)
    console.log({ moreFilters, page: 1 })
  }

  const onFinishFailed = (error) => {
    console.error('Validation failed (Estimate data size):', error)
  }

  const handleAddRow = async (
    add: (defaultValue?: StoreValue, insertIndex?: number) => void
  ) => {
    try {
      const values = await form.validateFields()
      if (!values) return
      add()
    } catch (error) {
      console.error('Validation failed (Add row):', error)
    }
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
      footer={
        <Flex align='center' justify='end' gap={8}>
          <Button
            onClick={() => {
              onClose()
              form.resetFields()
              const savedFilters = filters[item.id] || []
              if (savedFilters.length > 0) {
                form.setFieldsValue({
                  filters: mapResponseToForm(savedFilters)
                })
                return
              }
              setHasFilters(false)
            }}
          >
            Cancel
          </Button>
          <Button
            type='primary'
            onClick={async () => {
              try {
                const values = await form.validateFields()
                const moreFilters = mapFormToResponse(values.filters || [])
                if (!item) return
                setFilters(item.id, moreFilters)
              } catch (error) {
                console.error('Validation failed (Save filters):', error)
              }
            }}
          >
            Save Filters
          </Button>
        </Flex>
      }
    >
      <Form
        form={form}
        layout='vertical'
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
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
                const isFirstRow = index !== 0

                return (
                  <Fragment key={key}>
                    {isFirstRow && (
                      <div
                        style={{
                          position: 'relative',
                          marginLeft: '2.5rem',
                          marginBlock: '0.3rem'
                        }}
                      >
                        <Divider
                          type='vertical'
                          dashed
                          style={{ borderColor: '#1677ff', height: '3rem' }}
                        />
                        <article
                          style={{
                            position: 'absolute',
                            background: '#1677ff',
                            color: '#ffffff',
                            borderRadius: 5,
                            padding: '0.2rem 0.5rem',
                            left: '-14px',
                            top: '50%',
                            transform: 'translateY(-50%)'
                          }}
                        >
                          AND
                        </article>
                      </div>
                    )}
                    <Row gutter={8} align='middle'>
                      <Col span={9}>
                        <Form.Item
                          {...restField}
                          name={[name, 'attribute']}
                          rules={[{ required: true, message: '' }]}
                        >
                          <Select
                            allowClear
                            showSearch
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
                              <Option
                                key={operator.value}
                                value={operator.value}
                              >
                                {operator.label}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>

                      <Col span={9}>
                        {renderInput(
                          selectedAttributeType,
                          selectedOperator,
                          name,
                          restField
                        )}
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
                              onClick={() => handleAddRow(add)}
                            />
                          )}
                        </Form.Item>
                      </Col>
                    </Row>
                  </Fragment>
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
            htmlType='submit'
            style={{ marginTop: '12px', marginBottom: '24px' }}
          >
            Estimate data size
          </Button>
        )}
      </Form>
    </Drawer>
  )
}

export default FilterBuilder
