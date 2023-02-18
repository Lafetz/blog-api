const Comment = require("../models/comment");
const Blog = require("../models/blog");
exports.comment_list = (req, res, next) => {
  Comment.find()
    .then((comments) => {
      res.status(200).json({ comments });
    })
    .catch((err) => {
      return next(err);
    });
};
exports.comment_post = (req, res, next) => {
  const comment = new Comment({
    username: req.user.username,
    content: req.body.content,
  });

  comment
    .save()
    .then((x) => {
      res.sendStatus(200);
      Blog.findById(req.body.blogId).then((blog) => {
        blog.comments.push(comment._id);
        blog.save();
      });
    })
    .catch((err) => {
      return next(err);
    });
};
exports.comment_put = async (req, res, next) => {
  const comment = await Comment.findOne({ _id: req.params.commentId });
  comment.content = req.body.content;
  comment
    .save()
    .then((x) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      return next(err);
    });
};
exports.comment_delete = (req, res, next) => {
  Comment.deleteOne({ _id: req.params.commentId })
    .then((x) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      return next(err);
    });
};
