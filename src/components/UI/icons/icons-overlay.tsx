import React from 'react'

import { Flex, Typography } from 'antd'
import { IconType } from 'react-icons'

import { GLOBAL_STYLES } from '../../../utils/global-styles'

const { Text } = Typography

interface IconOverlayProps {
  Icon: IconType
  title: string
  type?: 'default' | 'clicked' | 'hovered'
  position?: 'relative' | 'absolute' | string
}

export default function IconJSX({ Icon, title, type = 'default', position = 'relative' }: IconOverlayProps) {
  const iconSize = '25px'
  const iconStyle: React.CSSProperties = {
    height: GLOBAL_STYLES['icons']['height'],
    padding: '13px',
    borderRadius: '15px',
    cursor: 'pointer',
    textTransform: 'capitalize',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    position: position as React.CSSProperties['position'],
    left: position === 'absolute' ? 12 : undefined,
    zIndex: position === 'absolute' ? 100 : undefined
  }

  if (type === 'clicked') {
    return (
      <Flex
        style={{
          ...iconStyle,
          width: '50px',
          backgroundColor: 'white'
        }}
      >
        <Icon color='red' size={iconSize} />
      </Flex>
    )
  }

  if (type === 'hovered') {
    return (
      <Flex
        style={{
          ...iconStyle,
          backgroundColor: 'red',
          paddingLeft: '16px'
        }}
      >
        <Icon color='white' size={iconSize} />
        <Text style={{ color: 'white', whiteSpace: 'nowrap' }}>{title}</Text>
      </Flex>
    )
  }

  return (
    <Flex
      style={{
        ...iconStyle,
        width: '50px',
        backgroundColor: 'inherit'
      }}
    >
      <Icon color='grey' size={iconSize} />
    </Flex>
  )
}
