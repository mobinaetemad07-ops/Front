import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import studentReducer from "./slices/studentReducer"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    student:studentReducer,
  },
})

