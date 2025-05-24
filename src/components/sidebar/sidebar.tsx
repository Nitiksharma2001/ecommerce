import React, { useState } from 'react'

import { Button, Flex, Layout, Popover } from 'antd'
import { IconType } from 'react-icons'
import { Link, useLocation } from 'react-router-dom'

import { RoutingType, appRoutes, sidebarIconsKeys } from '../../utils/routes-points'
import IconOverlay from '../UI/icons/icons-overlay'

const { Sider } = Layout

const siderStyle: React.CSSProperties = {
  height: '100vh',
  position: 'sticky',
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: 'thin',
  scrollbarGutter: 'stable',
  backgroundColor: '#F8F9FA',
  zIndex: 10
}

export default function SidebarJSX() {
  return (
    <Sider width='80px' style={siderStyle}>
      <Flex
        vertical
        align='center'
        justify='space-between'
        gap='10px'
        style={{
          height: '100%',
          padding: '24px 0 24px 0'
        }}
      >
        <RouteHoveredIcon
          iconDetails={appRoutes.find((icon) => icon.key === 'main-icon') as RoutingType}
          needRoute
          needHover={false}
        />

        <Flex
          vertical
          align='center'
          justify='center'
          style={{
            padding: '2px',
            backgroundColor: '#F8F9FA',
            borderRadius: '16px',
            boxShadow: '0px 2px 16px 0px rgba(0, 0, 0, 0.1)'
          }}
        >
          {appRoutes
            .filter((icondetails) => sidebarIconsKeys.includes(icondetails.key))
            .map((iconDetails, _) => (
              <React.Fragment key={_}>
                <RouteHoveredIcon iconDetails={iconDetails} needHover needRoute />
              </React.Fragment>
            ))}
        </Flex>
        <Flex vertical gap='10px'>
          <Popover content={AvatarContent} placement='right' trigger='hover'>
            <Flex>
              <RouteHoveredIcon
                iconDetails={appRoutes.find((icon) => icon.key === 'avatar-icon') as RoutingType}
                needHover={false}
                needRoute
              />
            </Flex>
          </Popover>
        </Flex>
      </Flex>
    </Sider>
  )
}

function RouteHoveredIcon({
  iconDetails,
  needHover,
  needRoute
}: {
  iconDetails: RoutingType
  needHover: boolean
  needRoute: boolean
}) {
  const { pathname } = useLocation()
  const currentRoute = `/${pathname.split('/')[1]}`
  const [hoverKey, setHoverKey] = useState('')

  if (!iconDetails) return

  const Icon = iconDetails.Icon as IconType
  const title = iconDetails.title as string

  return (
    <div
      onMouseEnter={() => setHoverKey(iconDetails.key)}
      onMouseLeave={() => setHoverKey('')}
      style={{ display: 'relative' }}
    >
      <Link to={needRoute ? iconDetails.route : '/'}>
        {needHover && hoverKey === iconDetails.key && (
          <IconOverlay Icon={Icon} title={title} type='hovered' position='absolute' />
        )}
        <IconOverlay Icon={Icon} title={title} type={currentRoute === iconDetails.route ? 'clicked' : 'default'} />
      </Link>
    </div>
  )
}

function AvatarContent() {
  function onSignout() {
    window.location.reload()
  }
  return (
    <Flex>
      <Button color='danger' variant='solid' onClick={onSignout}>
        Sign Out
      </Button>
    </Flex>
  )
}
