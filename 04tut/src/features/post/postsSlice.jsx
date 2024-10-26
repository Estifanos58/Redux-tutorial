import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import axios from 'axios'
import { sub } from 'date-fns'

const PORTS_URL = 'http://jsonplaceholder.typicode.com/posts'
const initialState = {
    posts: [],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    count: 0
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

export const updatePost = createAsyncThunk('posts/updatePost', async (initialPost) => {
    const {id} = initialPost
    try{
        const response = await axios.put(`${PORTS_URL}/${id}`, initialPost)
        return response.data
    }catch(err){
        // return err.message
        return initialPost // only fro testing Redux Toolkit
    }
})

export const deletePost = createAsyncThunk('posts/deletePost', async (initialPost) => { 
    const {id} = initialPost
    try{
        const response = await axios.delete(`${PORTS_URL}/${id}`)
        if(response.status == 200){
            return initialPost
        }
        return `${response.status}: ${response.statusText}`
    } catch(err){
        return err.message
    }
})

const postsSlice = createSlice({
    name : "posts",
    initialState,
    reducers: {
        reactionAdded(state, action){
            const {postId, reaction} = action.payload
            const existingPost = state.posts.find(post => post.id === postId)
            if(existingPost){
                existingPost.reactions[reaction]++
            }
        },
        increaseCount(state, action) {
            state.count = state.count + 1
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
            .addCase(updatePost.fulfilled, (state, action) => {
                if(!action.payload?.id) {
                    console.log('Update failed')
                    console.log(action.payload)
                    return
                }
                const { id } = action.payload
                action.payload.date = new Date().toISOString()
                const posts = state.posts.filter(post => post.id !== id)
                state.posts = [...posts, action.payload] 
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                const { id } = action.payload
                if(!id){
                    console.log('Delete failed')
                    console.log(action.payload)
                    return
                }
                const posts = state.posts.filter(post => post.id !== id)
                state.posts = posts
            })
    }
})

const postsReducer = postsSlice.reducer

export const selectAllPosts = (state) => state.posts.posts
export const getPostsStatus = (state) => state.posts.status
export const getPostsError = (state) => state.posts.error
export const getCount = (state) => state.posts.count

export const selectPostById = (state, postId) => 
    state.posts.posts.find(post => post.id === postId)

export const selectPostsByUser = createSelector(
    [selectAllPosts, (state, userId) => userId],
    (posts, userId) => posts.filter(post => post.userId === userId)
)

export const { increaseCount, reactionAdded } = postsSlice.actions


export default postsReducer