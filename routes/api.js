const express = require("express");
require("dotenv").config();
const router = express.Router();
const blogController = require("../controllers/blogController");
const commentController = require("../controllers/commentController");
const verifyUser = require("../middleware/verifyUser");
//login and signUP

// blogs

router.get("/:blogId", blogController.blog_get);
router
  .route("/")
  .get(blogController.blogs_list)
  .post(verifyUser.userAdmin, blogController.blog_post);
router.put("/:blogId", verifyUser.userAdmin, blogController.blog_put);
router.delete("/:blogId", verifyUser.userAdmin, blogController.blog_delete);
//comments
router.get("/:blogId/comments", commentController.comment_list);
router.post(
  "/:blogId/comments",
  verifyUser.userExist,
  commentController.comment_post
);
router.put(
  "/:blogId/comments/:commentId",
  verifyUser.userExist,
  commentController.comment_put
);
router.delete(
  "/:blogId/comments/:commentId",
  verifyUser.userExist,
  commentController.comment_delete
);

module.exports = router;
