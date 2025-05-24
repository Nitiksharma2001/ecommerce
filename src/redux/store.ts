import { configureStore } from '@reduxjs/toolkit'

import DrawerSlice from './drawer-slice/drawer-slice'
import ModalSlice from './modal-slice/modal-slice'
import NotificationSlice from './notification-slice/notification-slice'

export const store = configureStore({
  reducer: {
    modal: ModalSlice,
    drawer: DrawerSlice,
    notification: NotificationSlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
