import PostAuthor from './PostAuth.jsx'
import TimeAgo from './TimeAgo.jsx'
import ReactionButton from './ReactionButton.jsx'

function PostsExcerpt({post}) {
  return (
    <article>
            <h3>{post.title}</h3>
            <p>{post.body.substring(0, 75)}...</p>

            <p className='postCredit'>
                <PostAuthor userId={post.userId}/>
                <TimeAgo timestamp={post.date}/>
            </p>
            <ReactionButton post={post}/>
        </article>
  )
}

export default PostsExcerpt