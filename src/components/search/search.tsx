import React from 'react'

import { SearchOutlined } from '@ant-design/icons'
import { Input } from 'antd'

import { GLOBAL_STYLES } from '../../utils/global-styles'

interface SearchJSXProps {
  placeholder?: string
  onSearch: (value: string) => void
  style?: React.CSSProperties
}

export default function SearchJSX({ placeholder = 'Search', onSearch, style }: SearchJSXProps) {
  return (
    <Input
      placeholder={placeholder}
      onChange={(e) => onSearch(e.target.value)}
      suffix={<SearchOutlined />}
      style={{
        ...style,
        color: GLOBAL_STYLES['colors']['grey']['7'],
        fontSize: GLOBAL_STYLES['typogrpahy']['size']['normal'],
        fontStyle: 'italic'
      }}
      allowClear
    />
  )
}
