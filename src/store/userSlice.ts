import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser } from '../interfaces/IUser'
import { RootState } from './store'
// Define a type for the slice state
interface UserState {
  user: IUser | null
}

// Define the initial state using that type
const initialState: UserState = {
  user: null,
}

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
    },

    // Use the PayloadAction type to declare the contents of `action.payload`
    login: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload
    },
  },
})

export const { login, logout } = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user.user
// exporting the reducer here, as we need to add this to the store
export default userSlice.reducer;
