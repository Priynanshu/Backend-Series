import React, { useEffect } from 'react'
import "../styles/feed.scss"
import Post from '../components/Post'
import { usePost } from '../hooks/usePost'
import Nav from '../../shared/components/Nav'
import Sidebar from '../components/Sidebar'

const Feed = () => {

    const { feed, handleGetFeed,loading, handleLike, handleUnLike } = usePost()

    useEffect(() => { 
        handleGetFeed()
    }, [])

    if(loading || !feed){
        return (<main><h1>Feed is loading...</h1></main>)
    }

    console.log(feed)




   return (
    <main className='feed-page'>
        <Nav />
        {/* Is naye div ko add karein taaki sidebar aur feed side-by-side aayein */}
        <div className="main-wrapper">
            <Sidebar />
            
            <div className="feed">
                <div className="posts">
                    {feed.map(post => {
                        return <Post key={post._id} user={post.user} post={post} loading={loading} handleLike={handleLike} handleUnLike={handleUnLike} />
                    })}
                </div>
            </div>
        </div>
    </main>
)
}

export default Feed