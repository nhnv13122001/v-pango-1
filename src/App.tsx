import { useContext, useState } from 'react'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons'
import { Flex, Form, Select, Button, Tag, Typography, Divider } from 'antd'

import { dataModel } from './constants/data'
import FilterBuilder from './components/FilterBuilder'
import {
  handleTag,
  mapResponseToForm,
  objectToString,
  stringToObject
} from './utils/utils'
import { AppContext } from './contexts/app.context'
import { FormFilterType } from './types/type'

const { Option } = Select
const { Text } = Typography

function App() {
  const [form] = Form.useForm()
  const { item, setItem, filters, setFilters } = useContext(AppContext)
  const [open, setOpen] = useState<boolean>(false)

  const handleShowDrawer = () => setOpen(true)
  const handleCloseDrawer = () => setOpen(false)

  const handleClearFilters = () => {
    if (item) setFilters(item.id, [])
  }

  return (
    <Flex justify='center' align='center' style={{ height: '100vh' }}>
      <Flex vertical style={{ width: '50%' }}>
        <Form form={form} layout='vertical'>
          <Form.Item
            name='data-model'
            label='Select Data Model'
            rules={[{ required: true, message: '' }]}
          >
            <Select
              allowClear
              placeholder='Select'
              onChange={(value) =>
                setItem(value ? stringToObject(value) : null)
              }
            >
              {dataModel.map((item) => (
                <Option key={item.id} value={objectToString(item)}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
        {item && filters[item.id]?.length ? (
          <Flex
            vertical
            gap='small'
            style={{
              border: '1px solid #d9d9d9',
              borderRadius: '8px',
              marginTop: '24px'
            }}
          >
            <Flex
              justify='space-between'
              align='center'
              style={{ padding: '12px' }}
            >
              <Flex align='center' justify='start'>
                <Text strong>Criteria</Text>
                <Button
                  type='link'
                  icon={<PlusOutlined />}
                  onClick={handleShowDrawer}
                >
                  Add
                </Button>
              </Flex>

              <Button
                type='link'
                icon={<DeleteOutlined />}
                onClick={handleClearFilters}
              >
                Clear filter
              </Button>
            </Flex>
            <Divider
              style={{
                borderColor: '#d9d9d9',
                width: '100%',
                margin: 0
              }}
            />
            <Flex
              wrap='wrap'
              gap='small'
              style={{
                padding: '12px',
                // height: '100px',
                overflowY: 'auto'
              }}
            >
              {mapResponseToForm(filters[item.id])?.map(
                (filter: FormFilterType, index: number) => {
                  return (
                    <Tag key={index} color='blue'>
                      {handleTag(filter)}
                    </Tag>
                  )
                }
              )}
            </Flex>
          </Flex>
        ) : (
          <Button
            type='dashed'
            disabled={!item}
            icon={<PlusOutlined />}
            style={{ paddingBlock: '50px', marginTop: '24px' }}
            onClick={handleShowDrawer}
          >
            Add Filter
          </Button>
        )}
      </Flex>
      <FilterBuilder open={open} onClose={handleCloseDrawer} />
    </Flex>
  )
}

export default App
