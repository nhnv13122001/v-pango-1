import { Form, Select, InputNumber, Switch, DatePicker, Row, Col } from 'antd'
import { TYPES, OPERATORS } from '../../../constants/data'

const { RangePicker } = DatePicker

export const StringInput = {
  default: () => (
    <Select mode='tags' placeholder='Enter' style={{ width: '100%' }} />
  ),
  [OPERATORS.EXIST]: () => <Switch />
}

export const DoubleInput = {
  default: () => <InputNumber style={{ width: '100%' }} />,
  [OPERATORS.BETWEEN]: (name: number) => (
    <Row gutter={8}>
      <Col span={12}>
        <Form.Item
          name={[name, 'between', 'doubleValue1']}
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
          name={[name, 'between', 'doubleValue2']}
          style={{ marginBottom: 0 }}
        >
          <InputNumber placeholder='Max' style={{ width: '100%' }} />
        </Form.Item>
      </Col>
    </Row>
  ),
  [OPERATORS.EXIST]: () => <Switch />
}

export const LongInput = {
  default: () => <InputNumber style={{ width: '100%' }} />,
  [OPERATORS.BETWEEN]: (name: number) => (
    <Row gutter={8}>
      <Col span={12}>
        <Form.Item
          name={[name, 'between', 'longValue1']}
          style={{ marginBottom: 0 }}
        >
          <InputNumber placeholder='Min' style={{ width: '100%' }} />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name={[name, 'between', 'longValue2']}
          style={{ marginBottom: 0 }}
        >
          <InputNumber placeholder='Max' style={{ width: '100%' }} />
        </Form.Item>
      </Col>
    </Row>
  ),
  [OPERATORS.EXIST]: () => <Switch />
}

export const BooleanInput = {
  default: () => <Switch />
}

export const TimestampInput = {
  default: () => <DatePicker showTime style={{ width: '100%' }} />,
  [OPERATORS.BETWEEN]: () => <RangePicker showTime style={{ width: '100%' }} />,
  [OPERATORS.RELATIVE_TIME]: (name: number) => (
    <Row gutter={8}>
      <Col span={8}>
        <Form.Item
          name={[name, 'relativeTime', 'longValue1']}
          style={{ marginBottom: 0 }}
        >
          <InputNumber placeholder='Value' style={{ width: '100%' }} />
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
            placeholder='Unit'
            style={{ width: '100%' }}
          />
        </Form.Item>
      </Col>
    </Row>
  ),
  [OPERATORS.EXIST]: () => <Switch />
}

export const RenderInput = {
  [TYPES.STRING]: StringInput,
  [TYPES.DOUBLE]: DoubleInput,
  [TYPES.LONG]: LongInput,
  [TYPES.BOOLEAN]: BooleanInput,
  [TYPES.TIMESTAMP]: TimestampInput,
  default: () => <Select disabled />
}
