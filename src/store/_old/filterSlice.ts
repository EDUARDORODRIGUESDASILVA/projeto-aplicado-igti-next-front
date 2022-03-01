import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'
// Define a type for the slice state
interface FilterState {
  search: String
}

// Define the initial state using that type
const initialState: FilterState = {
  search: '',
}

export const filterSlice = createSlice({
  name: 'filter',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload
    },
    clearFilter: (state) => {
      state.search = ''
    },

  },
})

export const { setSearch, clearFilter } = filterSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectSearchFilter = (state: RootState) => state.filter.search

// exporting the reducer here, as we need to add this to the store
export default filterSlice.reducer;
