import { useSelector} from 'react-redux'
import { selectPostIds } from './postsSlice'
import PostsExcerpt from './PostsExcerpt'
import { useGetPostsQuery } from './postsSlice'


const PostsList = () => {
    const {
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetPostsQuery()

    const orderedPostsIds = useSelector(selectPostIds)

    let content;
    if (isLoading){
        content = <p>"Loading..."</p>
    }else if (isSuccess){
        content = orderedPostsIds.map(post => <PostsExcerpt key={post.id} post={post}/>)
    }else if (isError){
        content = <p>{error}</p>
    }
    return <section>
        {content}
    </section>
}

export default PostsList
