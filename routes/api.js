const express = require("express");
require("dotenv").config();
const router = express.Router();
const blogController = require("../controllers/blogController");
// blogs

router.get("/:blogId", blogController.blog_get);
router.get("/", blogController.blogs_list);
router.post("/:blogId", blogController.blog_post);
router.put("/:blogId", blogController.blog_put);
router.delete("/:blogId", blogController.blog_delete);
module.exports = router;
