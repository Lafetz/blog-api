const express = require("express");
require("dotenv").config();
const router = express.Router();
const blogController = require("../controllers/blogController");
const commentController = require("../controllers/commentController");
// blogs

router.get("/:blogId", blogController.blog_get);
router.route("/").get(blogController.blogs_list).post(blogController.blog_post);
router.put("/:blogId", blogController.blog_put);
router.delete("/:blogId", blogController.blog_delete);
//comments
router.get("/:blogId/comments", commentController.comment_list);
router.post("/:blogId/comments", commentController.comment_put);
router.put("/:blogId/comments/:commentId", commentController.comment_put);
router.delete("/:blogId/comments/:commentId", commentController.comment_delete);
module.exports = router;
