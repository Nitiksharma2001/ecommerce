import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ModalState {
  isOpen: boolean
  modalTitle: string
  redirectRoute: string
}

const initialState: ModalState = {
  isOpen: false,
  modalTitle: '',
  redirectRoute: '/',
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal: (state, action: PayloadAction<ModalState>) => {
      const { isOpen, modalTitle, redirectRoute } = action.payload
      state.isOpen = isOpen
      state.modalTitle = modalTitle
      state.redirectRoute = redirectRoute
    },
    closeModal: (state) => {
      state.isOpen = false
      state.modalTitle = ''
      state.redirectRoute = '/'
    },
  },
})

export const { showModal, closeModal } = modalSlice.actions

export default modalSlice.reducer
