import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type NotificationType = 'success' | 'info' | 'warning' | 'error'

interface NotificationState {
  isNotificationOpen: boolean
  notificationDetails?: {
    notificationMessage: string
    notificationDescription: string
    notificationType: NotificationType
  }
}

const initialState: NotificationState = {
  isNotificationOpen: false
}

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification: (state, action: PayloadAction<NotificationState>) => {
      const { isNotificationOpen, notificationDetails } = action.payload
      state.isNotificationOpen = isNotificationOpen
      state.notificationDetails = notificationDetails
    },
    closeNotification: (state) => {
      state.isNotificationOpen = false
      state.notificationDetails = undefined
    }
  }
})

export const { showNotification, closeNotification } = notificationSlice.actions

export default notificationSlice.reducer
