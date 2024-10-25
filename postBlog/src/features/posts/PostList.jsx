import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { postAdded } from "./postsSlice";

export const PostList = () => {
    const dispatch = useDispatch()
    const posts = useSelector(state => state.posts)

    return (
        <div>
            <h1>Posts</h1>
            {posts?.map(post=> (
                <div key={post.id}>
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                    <span>{post.date}</span>
                    <div>{Object.entries(post.reactions).map(([name,emoji])=>{
                        <p>{emoji}</p>
})}</div>
                </div>
            ))}
        </div>
    )
}