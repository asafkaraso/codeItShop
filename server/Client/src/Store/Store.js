import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './Slices/productSlice'
import drawerReducer from './Slices/drawerSlice';


export const store = configureStore({
  reducer: {
    products: productsReducer,
    drawer: drawerReducer,
    // cart:cartReducer,
    // general: generalReducer
  },
})