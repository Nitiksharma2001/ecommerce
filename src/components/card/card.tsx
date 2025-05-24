import React, { ReactNode } from 'react'

import { Flex } from 'antd'

import { GLOBAL_STYLES } from '../../utils/global-styles'

const cardStyle: React.CSSProperties = {
  borderRadius: GLOBAL_STYLES['primaryRadius'],
  background: GLOBAL_STYLES['colors']['grey']['5'],
  boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.06)',
  padding: '8px 16px'
}

interface CardJSXProps {
  children: ReactNode
}

export default function CardJSX({ children }: CardJSXProps) {
  return <Flex style={cardStyle}>{children}</Flex>
}
