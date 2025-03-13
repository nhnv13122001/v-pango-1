import { Form, Select, InputNumber, Switch, DatePicker, Row, Col } from 'antd'
import { TYPES, OPERATORS } from '../../../constants/data'

const { RangePicker } = DatePicker

export const StringInput = {
  default: (name: number, restField: { fieldKey?: number }) => (
    <Form.Item
      {...restField}
      name={[name, 'values']}
      rules={[{ required: true, message: '' }]}
    >
      <Select mode='tags' placeholder='Enter' style={{ width: '100%' }} />
    </Form.Item>
  ),
  [OPERATORS.EXIST]: (name: number, restField: { fieldKey?: number }) => (
    <Form.Item
      {...restField}
      initialValue={false}
      name={[name, 'values']}
      rules={[{ required: true, message: '' }]}
    >
      <Switch />
    </Form.Item>
  )
}

export const DoubleInput = {
  default: (name: number, restField: { fieldKey?: number }) => (
    <Form.Item
      {...restField}
      name={[name, 'values']}
      rules={[{ required: true, message: '' }]}
    >
      <InputNumber style={{ width: '100%' }} />
    </Form.Item>
  ),
  [OPERATORS.BETWEEN]: (name: number, restField: { fieldKey?: number }) => (
    <Form.Item {...restField}>
      <Row gutter={8}>
        <Col span={12}>
          <Form.Item
            style={{ marginBottom: 0 }}
            name={[name, 'values', 'doubleValue1']}
            rules={[{ required: true, message: '' }]}
          >
            <InputNumber placeholder='Min' style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            style={{ marginBottom: 0 }}
            name={[name, 'values', 'doubleValue2']}
            rules={[{ required: true, message: '' }]}
          >
            <InputNumber keyboard placeholder='Max' style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      </Row>
    </Form.Item>
  ),
  [OPERATORS.EXIST]: (name: number, restField: { fieldKey?: number }) => (
    <Form.Item
      {...restField}
      initialValue={false}
      name={[name, 'values']}
      rules={[{ required: true, message: '' }]}
    >
      <Switch />
    </Form.Item>
  )
}

export const LongInput = {
  default: (name: number, restField: { fieldKey?: number }) => (
    <Form.Item
      {...restField}
      name={[name, 'values']}
      rules={[{ required: true, message: '' }]}
    >
      <InputNumber style={{ width: '100%' }} />
    </Form.Item>
  ),
  [OPERATORS.BETWEEN]: (name: number, restField: { fieldKey?: number }) => (
    <Form.Item {...restField}>
      <Row gutter={8}>
        <Col span={12}>
          <Form.Item
            style={{ marginBottom: 0 }}
            name={[name, 'values', 'longValue1']}
            rules={[{ required: true, message: '' }]}
          >
            <InputNumber placeholder='Min' style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            style={{ marginBottom: 0 }}
            name={[name, 'values', 'longValue2']}
            rules={[{ required: true, message: '' }]}
          >
            <InputNumber placeholder='Max' style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      </Row>
    </Form.Item>
  ),
  [OPERATORS.EXIST]: (name: number, restField: { fieldKey?: number }) => (
    <Form.Item
      {...restField}
      initialValue={false}
      name={[name, 'values']}
      rules={[{ required: true, message: '' }]}
    >
      <Switch />
    </Form.Item>
  )
}

export const BooleanInput = {
  default: (name: number, restField: { fieldKey?: number }) => (
    <Form.Item
      {...restField}
      initialValue={false}
      name={[name, 'values']}
      rules={[{ required: true, message: '' }]}
    >
      <Switch />
    </Form.Item>
  )
}

export const TimestampInput = {
  default: (name: number, restField: { fieldKey?: number }) => (
    <Form.Item
      {...restField}
      name={[name, 'values']}
      rules={[{ required: true, message: '' }]}
    >
      <DatePicker showTime style={{ width: '100%' }} />
    </Form.Item>
  ),
  [OPERATORS.BETWEEN]: (name: number, restField: { fieldKey?: number }) => (
    <Form.Item
      {...restField}
      name={[name, 'values']}
      rules={[{ required: true, message: '' }]}
    >
      <RangePicker showTime style={{ width: '100%' }} />
    </Form.Item>
  ),
  [OPERATORS.RELATIVE_TIME]: (
    name: number,
    restField: { fieldKey?: number }
  ) => (
    <Form.Item {...restField}>
      <Row gutter={8}>
        <Col span={8}>
          <Form.Item
            style={{ marginBottom: 0 }}
            name={[name, 'values', 'longValue1']}
            rules={[{ required: true, message: '' }]}
          >
            <InputNumber placeholder='Value' style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            style={{ marginBottom: 0 }}
            name={[name, 'values', 'longValue2']}
            rules={[{ required: true, message: '' }]}
          >
            <InputNumber placeholder='Max' style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            style={{ marginBottom: 0 }}
            name={[name, 'values', 'timeType']}
            rules={[{ required: true, message: '' }]}
          >
            <Select
              options={[
                { label: 'Day', value: 'Day' },
                { label: 'Hour', value: 'Hour' },
                { label: 'Month', value: 'Month' },
                { label: 'Minute', value: 'Minute' }
              ]}
              placeholder='Unit'
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form.Item>
  ),
  [OPERATORS.EXIST]: (name: number, restField: { fieldKey?: number }) => (
    <Form.Item
      {...restField}
      initialValue={false}
      name={[name, 'values']}
      rules={[{ required: true, message: '' }]}
    >
      <Switch />
    </Form.Item>
  )
}

export const RenderInput = {
  [TYPES.STRING]: StringInput,
  [TYPES.DOUBLE]: DoubleInput,
  [TYPES.LONG]: LongInput,
  [TYPES.BOOLEAN]: BooleanInput,
  [TYPES.TIMESTAMP]: TimestampInput,
  default: () => (
    <Form.Item>
      <Select disabled placeholder='Enter' />
    </Form.Item>
  )
}
