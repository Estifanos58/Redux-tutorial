import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import { sub } from 'date-fns'

const PORTS_URL = 'http://jsonplaceholder.typicode.com/posts'
const initialState = {
    posts: [],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    try{
        const response = await axios.get(PORTS_URL)
        return response.data
    }catch(err){
        return err.message
    }
})

export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost) => {
    try{
        const response = await axios.post(PORTS_URL, initialPost)
        return response.data
    }catch(err){
        return err.message
    }
})

const postsSlice = createSlice({
    name : "posts",
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action){
                state.posts.push(action.payload)
            },
            prepare(title, content, userId){
                return {
                    payload: {
                        id: nanoid(),
                        title, 
                        content,
                        date: new Date().toISOString(),
                        userId,
                        reactions: {
                            thumbsUp: 0,
                            wow: 0,
                            heart: 0,
                            rocket: 0,
                            coffee: 0
                        }
                    }
                }
            }
        },
        reactionAdded(state, action){
            const {postId, reaction} = action.payload
            const existingPost = state.posts.find(post => post.id === postId)
            if(existingPost){
                existingPost.reactions[reaction]++
            }
        }
    },
    extraReducers(builder){
        builder
            .addCase(fetchPosts.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                // Adding fetched posts to the state
                let min = 1
                const loadedPosts = action.payload.map(post => {
                    post.date = sub(new Date(), {minutes: min++}).toISOString()
                    post.reactions = {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0
                    }
                    return post
                })

                // Add any fetched posts to the state
                state.posts = state.posts.concat(loadedPosts)
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addNewPost.fulfilled, (state, action) => {
                action.payload.userId = Number(action.payload.userId)
                action.payload.date = new Date().toISOString()
                action.payload.reactions = {
                    thumbsUp: 0,
                    wow: 0,
                    heart: 0,
                    rocket: 0,
                    coffee: 0
                }
                console.log(action.payload)
                state.posts.push(action.payload)
            })
    }
})

const postsReducer = postsSlice.reducer

export const selectAllPosts = (state) => state.posts.posts
export const getPostsStatus = (state) => state.posts.status
export const getPostsError = (state) => state.posts.error

export const { postAdded, reactionAdded } = postsSlice.actions


export default postsReducer