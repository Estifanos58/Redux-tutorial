import {  createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { sub } from 'date-fns'
import { apiSlice } from '../api/apiSlice'

const postsAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.date.localeCompare(a.date)
})

const initialState = postsAdapter.getInitialState()

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getPosts: builder.query({
            query: () => '/posts',
            transformResponse: responseData => {
                let min = 1
                const loadedPosts = responseData.map(post => {
                  if (!post?.date) post.date = sub(new Date(), {minutes: min++}).toISOString()
                  if (!post?.reactions) post.reactions = {
                    thumbsUp: 0,
                    hooray: 0,
                    heart: 0,
                    rocket: 0,
                    eyes: 0
                  }
                  return post
                })
                return postsAdapter.addMany(initialState, loadedPosts)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [ { type: 'Post', id: 'LIST' }, ...result.ids.map(id => ({ type: 'Post', id }))]
                }
            }
        })
    })
})

export const { useGetPostsQuery } = extendedApiSlice

// returns the query result object
export const selectPostsResult = extendedApiSlice.endpoints.getPosts.select()

// creates memoized selector
const selectPostsData = createSelector(
    selectPostsResult,
    postsResult => postsResult.data // normalized state object with ids and entities
)

export const  {
    selectAll: selectAllPosts,
    selectById: selectPostById,
    selectIds: selectPostIds
} = postsAdapter.getSelectors(state => selectPostsData(state) ?? initialState)