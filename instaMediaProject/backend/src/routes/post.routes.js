const express = require("express")
const postRouter = express.Router()
const postController = require("../controllers/post.controller")
const multer = require("multer")
const upload = multer({ storage: multer.memoryStorage() })
const identifyUser = require("../middlewares/auth.middlewares")



/**
 * POST /api/posts [protected]
 * - req.body = { caption,image-file }
 */
postRouter.post("/", upload.single("image"), identifyUser, postController.createPostController)


/**
 * GET /api/posts/ [protected]
 */
postRouter.get("/", identifyUser, postController.getPostController)


/**
 * GET /api/posts/details/:postid
 * - return an detail about specific post with the id. also check whether the post belongs to the user that the request come from
 */
postRouter.get("/details/:postId", identifyUser, postController.getPostDetailsController)

postRouter.post("/like/:postId", identifyUser, postController.likePostController)
postRouter.post("/unLike/:postId", identifyUser, postController.unLikePostController)

postRouter.get("/feed", identifyUser, postController.getFeedController)

module.exports = postRouter