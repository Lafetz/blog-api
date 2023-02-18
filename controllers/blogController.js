const Blog = require("../models/blog");
exports.blogs_list = (req, res, next) => {
  Blog.find()
    .then((blogs) => {
      res.status(200).json({ blogs });
    })
    .catch((err) => {
      return next(err);
    });
};

exports.blog_get = async (req, res, next) => {
  try {
    const blog = await Blog.findOne({ _id: req.params.blogId }).populate(
      "comments"
    );
    res.status(200).json(blog);
  } catch (err) {
    return next(err);
  }
};
exports.blog_post = (req, res, next) => {
  const blog = new Blog({
    content: req.body.content,
  });
  blog
    .save()
    .then((x) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      return next(err);
    });
};
exports.blog_put = async (req, res, next) => {
  const blog = await Blog.findOne({ _id: req.params.blogId });
  blog.content = req.body.content;
  blog
    .save()
    .then((x) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      return next(err);
    });
};
exports.blog_delete = (req, res, next) => {
  Blog.deleteOne({ _id: req.params.blogId })
    .then((x) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      return next(err);
    });
};
