import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    count: 0
}

export const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers :{
        increment :(state)=>{
            state.count += 1
        },
        decrement :(state)=>{
            state.count -= 1
        },
        reset :(state)=>{
            state.count = 0
        },
        increamentByAmount : (state, action)=> {
            state.count += action.payload
        }
    }
})

const counterReducer = counterSlice.reducer;
export const {increment, decrement, increamentByAmount, reset} = counterSlice.actions;
export default counterReducer;
