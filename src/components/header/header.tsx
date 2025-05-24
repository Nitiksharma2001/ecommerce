import React from 'react'

import { ReloadOutlined } from '@ant-design/icons'
import { Button, Flex, Layout, Typography } from 'antd'

import { AlertIcon } from '../../assets/icons/support-icons'
import { GLOBAL_STYLES } from '../../utils/global-styles'

const { Header } = Layout
const { Text } = Typography

const titleStyle: React.CSSProperties = {
  fontWeight: '600',
  fontSize: '20px',
  color: '#59595A'
}

const iconStyle: React.CSSProperties = {
  position: 'absolute',
  right: '1px',
  top: '-2px',
  height: '16px',
  width: '16px',
  borderRadius: '15px',
  backgroundColor: 'red',
  color: 'white'
}
const headerNotificationStyle = {
  fontWeight: GLOBAL_STYLES['typogrpahy']['weight']['light'],
  fontSize: GLOBAL_STYLES['typogrpahy']['size']['normal'],
  color: GLOBAL_STYLES['colors']['grey']['6']
}

interface HeaderJSXProps {
  title: string
}

export default function HeaderJSX({ title }: HeaderJSXProps) {
  return (
    <Header
      style={{
        margin: '0 20px 0 20px',
        padding: 0,
        backgroundColor: 'inherit',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      <Text style={titleStyle}>{title}</Text>
      <Flex gap='10px' align='center'>
        <Flex gap='5px' align='center'>
          <Button icon={<ReloadOutlined />} size='small' variant='text' color='default'></Button>
          <Text style={headerNotificationStyle}>Last Refresh date - 08:00AM CST, 6th May 2024</Text>
        </Flex>
      </Flex>
    </Header>
  )
}
