import React, {useState} from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { increamentByAmount,increment, decrement, reset } from './counteSlice'

function Counter() {
    const count = useSelector(state => state.counter.count)
    const dispatch = useDispatch()
    const [incrementAmount, setIncrementAmount] = useState(0)

    const addValue = Number(incrementAmount) || 0
    console.log(addValue)
  return (
    <div>
        <p>{count}</p>
        <div>
            <button onClick={()=>dispatch(increment())}>+</button>
            <button onClick={()=>dispatch(decrement())}>-</button>
            <button onClick={()=>dispatch(reset())}>reset</button>
            <input type="text" value={incrementAmount} onChange={(e)=>setIncrementAmount(e.target.value)}/>
            <button onClick={()=>dispatch(increamentByAmount(addValue))}>increase by {incrementAmount}</button>
        </div>
    </div>
  )
}

export default Counter