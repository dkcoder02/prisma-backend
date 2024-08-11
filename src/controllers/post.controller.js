const prisma = require("../../prisma/index.js");

const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res
        .status(400)
        .json({ success: false, error: "Please provide all the details" });
    }

    console.log("slug", title.toLowerCase().split(" ").join("-"));

    const post = await prisma.post.create({
      data: {
        slug: title.toLowerCase().split(" ").join("-"),
        title: title,
        content: content,
        author: { connect: { id: req.user.id } }, // connect refers to the relationship between the post and the user
      },
    });

    res.json({ success: true, post });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const isExitPost = await prisma.post.findUnique({
      where: {
        id,
      },
    });

    if (!isExitPost) {
      return res.status(400).json({ success: false, error: "Post not found" });
    }

    const updatePost = await prisma.post.update({
      where: {
        id,
      },
      data: {
        title: title,
        slug: title.toLowerCase().split(" ").join("-"),
        content: content,
      },
    });

    res.json({ success: true, updatePost });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const deletePost = await prisma.post.delete({
      where: {
        id,
      },
    });

    res.json({ success: true, deletePost });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany();
    res.json({ success: true, posts });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

module.exports = { createPost, updatePost, deletePost, getAllPosts };
