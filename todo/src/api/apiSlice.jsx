import { createApi , fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3500/'}),
    tagTypes: ['TODOS'],
    endpoints: (builder) => ({
        getToDO: builder.query({
            query: ()=> 'todos',
            providesTags: ['TODOS']
        }),
        addToDO: builder.mutation({
            query: (todo) => ({
                url: 'todos',
                method: 'POST',
                body: todo
            }),
            invalidatesTags: ['TODOS']
        }),
        updateTodo: builder.mutation({
            query: (todo) => ({
                url: `todos/${todo.id}`,
                method: 'PATCH',
                body: todo
            }) ,
            invalidatesTags: ['TODOS']
        }),
        deleteTodo: builder.mutation({
            query: ({id}) => ({
                url: `todos/${id}`,
                method: 'DELETE',
                body: id
            }),
            invalidatesTags: ['TODOS']
        })
    })
})

export const { 
    useAddToDOMutation, 
    useGetToDOQuery,
    useDeleteTodoMutation,
    useUpdateTodoMutation
    } = apiSlice