import React from 'react'

import { Select } from 'antd'

import { GLOBAL_STYLES } from '../../utils/global-styles'

interface DropdownJSXProps {
  options: { label: string; value: string | number }[]
  placeholder?: string
  defaultValue?: string
  onChange: (value: string | number | undefined) => void
  style?: React.CSSProperties
}

const DropdownJSX: React.FC<DropdownJSXProps> = ({ options = [], placeholder, defaultValue, onChange, style }) => {
  return (
    <Select
      style={{
        ...style,
        color: GLOBAL_STYLES['colors']['grey']['7'],
        fontSize: GLOBAL_STYLES['typogrpahy']['size']['paragraph']
      }}
      options={options}
      defaultValue={defaultValue}
      placeholder={placeholder}
      onChange={onChange}
    />
  )
}

export default DropdownJSX
