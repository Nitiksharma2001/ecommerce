import { ConfigProvider, Layout, ThemeConfig } from 'antd'
import SidebarJSX from '../components/sidebar/sidebar'
import HeaderJSX from '../components/header/header'
import ModalJSX from '../components/modal/modal'
import { closeModal } from '../redux/modal-slice/modal-slice'
import { useNavigate } from 'react-router-dom'
import { useEffect, type ReactNode } from 'react'
import type { RootState } from '../redux/store' // adjust if the store type is elsewhere
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { GLOBAL_STYLES } from '../utils/global-styles'
import DrawerJSX from '../components/drawer/drawer'
import useNotification from '../hooks/notification/notification'
import { closeNotification } from '../redux/notification-slice/notification-slice'

const { Content } = Layout

const themeStyle: ThemeConfig = {
  token: {
    fontFamily: 'Poppins',
    fontSize: 12,
  },
}
interface MainWrapperProps {
  children: ReactNode
  title: string
}

export default function MainWrapper({ children, title }: MainWrapperProps) {
  const { isOpen, modalTitle, redirectRoute } = useAppSelector((state: RootState) => state.modal)
  const { isDrawerOpen, details } = useAppSelector((state: RootState) => state.drawer)
  const { isNotificationOpen, notificationDetails } = useAppSelector((state: RootState) => state.notification)
  const { contextHolder, openNotification } = useNotification()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  function handleCancel(route: string) {
    dispatch(closeModal())
    navigate(route)
  }
  useEffect(() => {
    if (isNotificationOpen && notificationDetails) {
      openNotification({ ...notificationDetails })
      dispatch(closeNotification())
    }
  }, [isNotificationOpen])

  return (
    <ConfigProvider theme={themeStyle}>
      <Layout style={{ backgroundColor: 'white' }} hasSider>
        <SidebarJSX />
        <Layout style={{ backgroundColor: 'inherit' }}>
          <HeaderJSX title={title} />
          <Content
            style={{
              overflow: 'initial',
              padding: '16px 50px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '10px',
            }}
          >
            {children}
          </Content>
        </Layout>
        <ModalJSX isOpen={isOpen} message={modalTitle} handleCancel={() => handleCancel(redirectRoute)} />
        <DrawerJSX isDrawerOpen={isDrawerOpen} details={details} />
        {contextHolder}
      </Layout>
    </ConfigProvider>
  )
}
