import { useSelector } from 'react-redux';
import { selectPostById } from './postsSlice';
import { useParams } from 'react-router-dom';
import PostAuther from './PostAuth';
import ReactionButton from './ReactionButton';
import TimeAgo from './TimeAgo';
import { Link } from 'react-router-dom';

const SinglePostPage = () => {
    //retrive the postId
    const { postId } = useParams()
    const post = useSelector(state => selectPostById(state, Number(postId)))

    if(!post){
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        )
    }

    return (
            <article>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
                <p className='postCredit'>
                    <Link to={`/posts/edit/${post.id}`}>Edit Post</Link>
                    <PostAuther userId={post.user} />
                    <TimeAgo timestamp={post.date} />
                </p>
                <ReactionButton post={post} />
            </article>
    )
}

export default SinglePostPage;