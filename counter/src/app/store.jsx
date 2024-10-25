import {configureStore} from '@reduxjs/toolkit'
import counterReducer from '../features/counteSlice'

export const store = configureStore({
     reducer:{
        counter: counterReducer,
     } 
})