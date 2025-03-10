import { useContext, useState } from 'react'
import { CloseOutlined, PlusOutlined } from '@ant-design/icons'
import { Drawer, Flex, Form, Select, Button } from 'antd'

import { dataModel } from './constants/data'
import FilterBuilder from './components/FilterBuilder'
import { objectToString, stringToObject } from './utils/utils'
import { AppContext, DataModelType } from './contexts/app.context'

const { Option } = Select

function App() {
  const [form] = Form.useForm()
  const { setItem } = useContext(AppContext)
  const [open1, setOpen1] = useState<boolean>(false)
  const [open2, setOpen2] = useState<boolean>(false)
  const [selectedModel, setSelectedModel] = useState<DataModelType | null>(null)

  const handleShowDrawer1 = () => {
    setOpen1(true)
  }
  const handleCloseDrawer1 = () => {
    setOpen1(false)
    setSelectedModel(null)
    form.resetFields()
  }
  const handleShowDrawer2 = () => {
    setOpen2(true)
  }
  const handleCloseDrawer2 = () => {
    setOpen2(false)
  }

  return (
    <Flex justify='center' align='center' style={{ height: '100vh' }}>
      <Button type='primary' onClick={handleShowDrawer1}>
        Open
      </Button>
      <Drawer
        size='large'
        closable={false}
        open={open1}
        title={
          <Flex align='center' justify='space-between'>
            Drawer 1
            <Button
              type='text'
              icon={<CloseOutlined />}
              onClick={handleCloseDrawer1}
            />
          </Flex>
        }
      >
        <Form form={form} layout='vertical'>
          <Form.Item
            name='data-model'
            label='Select Data Model'
            rules={[{ required: true, message: '' }]}
          >
            <Select
              allowClear
              onChange={(value) =>
                setSelectedModel(value ? stringToObject(value) : null)
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
        <Button
          type='dashed'
          icon={<PlusOutlined />}
          disabled={!selectedModel}
          style={{ width: '100%', paddingBlock: '50px' }}
          onClick={() => {
            handleShowDrawer2()
            setItem(selectedModel)
          }}
        >
          Add Filter
        </Button>
        <FilterBuilder open={open2} onClose={handleCloseDrawer2} />
      </Drawer>
    </Flex>
  )
}

export default App
