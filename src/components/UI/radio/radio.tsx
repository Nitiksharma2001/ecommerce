import { Radio } from 'antd'
import type { RadioChangeEvent } from 'antd'

import './radio.css'

interface RadioJSXProps {
  values: { key: string | number; value: string }[]
  selectedValue: string | number
  onChange: (e: RadioChangeEvent) => void
}

export default function RadioJSX({ values, selectedValue, onChange }: RadioJSXProps) {
  return (
    <Radio.Group value={selectedValue} onChange={onChange}>
      {values.map(({ key, value }) => (
        <Radio key={key} value={key}>
          {value}
        </Radio>
      ))}
    </Radio.Group>
  )
}
