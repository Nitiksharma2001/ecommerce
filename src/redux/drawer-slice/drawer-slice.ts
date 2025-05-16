import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface DrawerState {
  isDrawerOpen: boolean
  details?: {
    title: string
    content: React.ReactNode
  }
}

const initialState: DrawerState = {
  isDrawerOpen: false,
}

export const drawerSlice = createSlice({
  name: 'drawer',
  initialState,
  reducers: {
    openDrawer: (state, action: PayloadAction<Omit<DrawerState, 'isDrawerOpen'>>) => {
      const { details } = action.payload
      state.isDrawerOpen = true
      state.details = details
    },
    closeDrawer: (state) => {
      state.isDrawerOpen = false
    },
  },
})

export const { openDrawer, closeDrawer } = drawerSlice.actions

export default drawerSlice.reducer
