import { notification } from 'antd'

type NotificationType = 'success' | 'info' | 'warning' | 'error'
type OpenNotificationInputType = {
  notificationMessage: string
  notificationDescription: string
  notificationType: NotificationType
}
export default function useNotification() {
  const [api, contextHolder] = notification.useNotification()

  const openNotification = (details: OpenNotificationInputType) => {
    const { notificationMessage, notificationDescription, notificationType } = details
    api[notificationType]({
      message: notificationMessage,
      description: notificationDescription,
      placement: 'top',
      duration: 2,
      pauseOnHover: true,
    })
  }

  return {
    contextHolder,
    openNotification,
  }
}
