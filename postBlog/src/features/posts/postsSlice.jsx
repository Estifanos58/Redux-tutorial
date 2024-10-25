import { createSlice,nanoid } from '@reduxjs/toolkit'

const initialState = [
        {
            id: "1",
            title: "First Post!",
            content: "Hello!",
            date: new Date().toISOString(),
            reactions: {
                thumbsUp: 0,
                wow: 0,
                heart: 0,
                rocket: 0,
                coffee: 0
            }
        },
        {
            id: "2",
            title: "Second Post!",
            content: "Holla!",
            date: new Date().toISOString(),
            reactions: {
                thumbsUp: 0,
                wow: 0,
                heart: 0,
                rocket: 0,
                coffee: 0
            }
        }
]

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        postAdded : {
            reducer(state, action){
                state.push(action.payload)
            },
            prepare(title, content, userId){
                return{
                    payload : {
                        id: nanoid(),
                        title,
                        content,
                        userId,
                        date: new Date().toISOString(),
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
        }
    }
})

const postsReducer = postsSlice.reducer
export const {postAdded} = postsSlice.actions
export default postsReducer

