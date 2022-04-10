import { createSlice } from '@reduxjs/toolkit'
import { RootState } from './store'
// Define a type for the slice state
interface SidebarState {
  sidebarOpened: boolean
  trocasModalOpened: boolean
}

// Define the initial state using that type
const initialState: SidebarState = {
  sidebarOpened: false,
  trocasModalOpened: false
}

export const sidebarSlice = createSlice({
  name: 'sidebar',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    openSidebar: (state) => {
      state.sidebarOpened = true
    },

    closeSidebar: (state) => {
      state.sidebarOpened = false
    },
    toggleSidebar: (state) => {
      state.sidebarOpened = !state.sidebarOpened
    },

    openTrocasModal: (state) => {
      state.trocasModalOpened = true
    },

    closeTrocasModal: (state) => {
      state.trocasModalOpened = false
    },
    toggleTrocasModal: (state) => {
      state.trocasModalOpened = !state.trocasModalOpened
    }
  },
})

export const { openSidebar, closeSidebar, toggleSidebar, openTrocasModal, closeTrocasModal, toggleTrocasModal } = sidebarSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectSidebarState = (state: RootState) => state.sidebar.sidebarOpened
export const selectTrocasModalState = (state: RootState) => state.sidebar.trocasModalOpened

// exporting the reducer here, as we need to add this to the store
export default sidebarSlice.reducer;
