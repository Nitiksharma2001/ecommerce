import { Image } from 'antd'
import { CgProfile } from 'react-icons/cg'
import { IoHomeOutline } from 'react-icons/io5'

import mainIcon from '../assets/icons/main-icon.png'
import Home from '../pages/home/home'
import NotFound from '../pages/not-found'

export type RoutingType = {
  key: string
  route: string
  Component?: React.FC
  Icon?: React.FC
  title?: string
}

export const appRoutes: RoutingType[] = [
  { key: 'home', route: '/', Icon: IoHomeOutline, title: 'home', Component: Home },
  {
    key: 'main-icon',
    route: '/',
    title: 'Main Icon',
    Icon: () => <Image preview={false} src={mainIcon} />,
    Component: Home
  },
  {
    key: 'avatar-icon',
    route: '/',
    title: 'Avatar Icon',
    Icon: CgProfile
  },
  {
    key: 'not-found',
    route: '*',
    title: 'Page Not Found',
    Component: NotFound
  }
]

export const sidebarIconsKeys = ['home']
