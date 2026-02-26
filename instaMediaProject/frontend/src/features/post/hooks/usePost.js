import { getFeed, createPost, likePost, unLikePost, getFollowers, unFollow, follow } from "../services/post.api"
import { useContext, useEffect } from "react"
import { PostContext } from "../post.context"
import { useAuth } from "../../auth/hooks/useAuth"

export const usePost = () => {

    const context = useContext(PostContext)
    const {setUser, user} = useAuth()

    const { loading, setLoading, post, setPost, feed, setFeed, followUser, setFollowUser } = context

    const handleGetFeed = async () => {
        setLoading(true)
        const data = await getFeed()
        setFeed(data.posts.reverse())
        setLoading(false)
    }

    const handleCreatePost = async (imageFile, caption) => {
        setLoading(true)
        const data = await createPost(imageFile, caption)
        setFeed([ data.post, ...feed ])
        setLoading(false)
    }

    const handleLike = async (post) => {

        const data = await likePost(post)
        await handleGetFeed()

    }
    const handleUnLike = async (post) => {

        const data = await unLikePost(post)
        await handleGetFeed()

    }

    const handleFollow = async (username) => {
    await follow(username)

    const followedUser = user.others.find(
        user => user.username === username
    )

    setUser(prev => ({
        ...prev,
        following: [...prev.following, followedUser],
        others: prev.others.filter(
            user => user.username !== username
        )
    }))
}

    const handleUnFollow = async (username) => {
    await unFollow(username)

    setUser(prev => ({
        ...prev,
        following: prev.following.filter(
            user => user.username !== username
        ),
        others: [
            ...prev.others,
            prev.following.find(user => user.username === username)
        ]
    }))
}


    // useEffect(() => {
    //     handleGetFeed()
    // }, [])

    return { loading, feed, post, handleGetFeed, handleCreatePost, handleLike, handleUnLike,  followUser, handleUnFollow, handleFollow }

}