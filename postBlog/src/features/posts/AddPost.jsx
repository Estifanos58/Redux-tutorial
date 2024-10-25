import { useSelector , useDispatch } from "react-redux";
import {postAdded} from './postsSlice'
import { useState } from "react";


function AddPost() {
    const dispatch = useDispatch()
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [userId, setUserId] = useState("")
  return (
    <div>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" value={title} onChange={e=>setTitle(e.target.value)}/>
        <label htmlFor="content">Content</label>
        <input type="text" id="content" value={content} onChange={e=>setContent(e.target.value)}/>
        <label htmlFor="userId">Author ID</label>
        <input type="text" id="userId" value={userId} onChange={e=>setUserId(e.target.value)}/>
        <button type="button" onClick={()=>dispatch(postAdded(title,content,userId))}>Save Post</button>
    </div>
  )
}

export default AddPost