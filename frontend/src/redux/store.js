import { configureStore } from '@reduxjs/toolkit'
import  blogsReducer from './blogs/blogsSlice'

export const store = configureStore({
  reducer: {
    blogs: blogsReducer,
  },
})

export default store;
