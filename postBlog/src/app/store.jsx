import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../features/users/userSlice'
import postsReducer from '../features/posts/postsSlice'

const store = configureStore({
    reducer :{
        users : userReducer,
        posts : postsReducer
    }
})

export default store