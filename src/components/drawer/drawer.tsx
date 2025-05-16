import React from 'react'
import { Drawer } from 'antd'
import { closeDrawer } from '../../redux/drawer-slice/drawer-slice'
import { useAppDispatch } from '../../redux/hooks'
import { AppDispatch } from '../../redux/store'

interface DrawerProps {
  isDrawerOpen: boolean
  details?: {
    title: string
    content: React.ReactNode
  }
}

const DrawerJSX: React.FC<DrawerProps> = ({ isDrawerOpen, details }) => {
  const dispatch = useAppDispatch<AppDispatch>()

  if (!isDrawerOpen || !details) return

  const { content, title } = details

  return (
    <Drawer width={500} title={title} onClose={() => dispatch(closeDrawer())} open={isDrawerOpen}>
      {content}
    </Drawer>
  )
}

export default DrawerJSX
