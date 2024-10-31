import { createEntityAdapter } from "@reduxjs/toolkit";

import { apiSlice } from "../api/apiSlice";


const userAdapter = createEntityAdapter({
})

const initialState = userAdapter.getInitialState()

const usersdApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers : builder.query({
            query: ()=> '/users',   
            transformResponse : responseData => {
                return userAdapter.setAll(initialState, responseData)
            },
            providesTags: (result, error, arg) => [
                { type: 'User', id: "LIST"},
                ...result.ids.map(id=> ({ type: 'User', id}))
            ]
        })
    })
})




export const { 
    useGetUsersQuery,

} = usersdApiSlice

export const selectUsersResult = extendedApiSlice.endpoints.getUsers.select()

const selectUsersData = createSelector(
    selectUsersResult,
    usersResult => usersResult.data
)

export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
    selectIds: selectUserIds
} = userAdapter.getSelectors( state => selectUsersData(state)?? initialState)