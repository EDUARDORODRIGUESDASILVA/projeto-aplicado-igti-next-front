import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'
// Define a type for the slice state
export interface ShoppingCartProduct {
  id: number,
  amount: number
}[]
interface ShoppingCart {
  products: Array<ShoppingCartProduct>,
  totalCount: number
}

// Define the initial state using that type
const initialState: ShoppingCart = {
  products: [],
  totalCount: 0
}

const updateTotalCount = (products: ShoppingCartProduct[]) => {
  return products.map(x => x.amount).reduce((previous, current) => previous + current, 0)
}

export const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {

    reset: (state) => {
      state.products = [],
        state.totalCount = 0
    },

    reduceAmount: (state, action: PayloadAction<ShoppingCartProduct>) => {
      const f = state.products.find(p => p.id == action.payload.id)
      if (f) {
        if (f.amount - action.payload.amount <= 0) {
          f.amount = 0

        } else {
          f.amount -= action.payload.amount
        }
      }
      state.totalCount = updateTotalCount(state.products)
    },

    // Use the PayloadAction type to declare the contents of `action.payload`
    addProduct: (state, action: PayloadAction<ShoppingCartProduct>) => {

      const f = state.products.find(p => p.id == action.payload.id)
      if (f) {
        f.amount += action.payload.amount
      } else {
        state.products.push(action.payload)
      }
      state.totalCount = updateTotalCount(state.products)

    },

    removeProduct: (state, action: PayloadAction<ShoppingCartProduct>) => {
      const index = state.products.findIndex(p => p.id == action.payload.id)
      state.products.splice(index, 1)
      state.totalCount = updateTotalCount(state.products)


    },
  },
})

export const { reset, addProduct, reduceAmount, removeProduct } = shoppingCartSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectShoppingCartProducts = (state: RootState) => state.shoppingCart.products
export const selectShoppingCartCount = (state: RootState) => state.shoppingCart.totalCount

// exporting the reducer here, as we need to add this to the store
export default shoppingCartSlice.reducer;
