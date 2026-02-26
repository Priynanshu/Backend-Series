const postModel = require("../models/post.models")
const ImageKit = require("@imagekit/nodejs")
const { toFile } = require("@imagekit/nodejs")
const likeModel = require("../models/like.models")

const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})


async function createPostController(req, res) {

    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: "Test",
        folder: "insta-clone-posts"
    })

    const post = await postModel.create({
        caption: req.body.caption,
        imgUrl: file.url,
        user: req.user.id
    })

    res.status(201).json({
        message: "Post created successfully.",
        post
    })
}

async function getPostController(req, res) {
    const userId = req.user.id

    const posts = await postModel.find({
        user: userId 
    })

    if(!posts) {
        return res.status(404).json({
            message: "Post not found"
        })
    }

    if(posts.length === 0) {
        return res.status(404).json({
            message: "There si no post available"
        })
    }

    return res.status(200).json({
        message: "Posts fetched successfully",
        posts
    })
}

async function getPostDetailsController(req, res) {
    
    const userId = req.user.id
    const postId = req.params.postId

    const post = await postModel.findById(postId)
    if(!post) {
        return res.status(404).json({
            message: "Post not Found"
        })
    }

    const isValidUser = post.user.toString() === userId
    if(!isValidUser) {
        return res.status(403).json({
            message: "Forbidden Content"
        })
    }

    return res.status(200).json({
        message: "Posts Fetched Successfully",
        post
    })
}

async function likePostController(req, res) {
    const username = req.user.username
    const postId = req.params.postId

    const post = await postModel.findById(postId)

    if(!post) {
        return res.status(404).json({
            message: "Post Not Found"
        })
    }

    const like = await likeModel.create({
        post: postId,
        user: username
    })

    return res.status(200).json({
        message: "like successfully",
        like
    })
}

async function unLikePostController(req, res) {
    try {
        const postId = req.params.postId
        const username = req.user.username

        const isLiked = await likeModel.findOne({
            post: postId,
            user: username
        })

        if(!isLiked) {
            return res.status(400).json({
                message: "Post didn't liked"
            })
        }

        await likeModel.findByIdAndDelete({_id: isLiked._id })

        return res.status(200).json({
            message: "Post UnLiked Successfully"
        })
    }catch(err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

async function getFeedController(req, res) {
    try {
        const user = req.user
        
        const posts = await Promise.all((await postModel.find().populate("user").lean())
        .map(async (post)=> {
            const isLiked = await likeModel.findOne({
                user: user.username,
                post: post._id
            })

            post.isLiked = Boolean(isLiked)
            return post
        })
    )

        return res.status(200).json({
            message: "Posts Fetched Successfully",
            posts
        })
    }catch(err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

module.exports = {
    createPostController,
    getPostController,
    getPostDetailsController,
    likePostController,
    getFeedController,
    unLikePostController
}