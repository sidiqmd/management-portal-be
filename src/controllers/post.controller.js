const { logger } = require('../utils/logger');
const {
  getPostList,
  getPostByPostId,
  createPost,
  updatePost,
  deletePost,
} = require('../services/post.service');

module.exports.getPostList = async (req, res) => {
  try {
    const { membership } = req.user;

    return res.status(201).json(await getPostList(membership));
  } catch (error) {
    logger().error(error.message);
    return res.status(500).json({ error: error.message });
  }
};

module.exports.getPostByPostId = async (req, res) => {
  try {
    const { postId } = req.params;

    return res.status(200).json(await getPostByPostId(postId));
  } catch (error) {
    logger().error(error.message);
    return res.status(500).json({ error: error.message });
  }
};

module.exports.createPost = async (req, res) => {
  try {
    const { validatedData } = req;

    return res.status(201).json(await createPost(validatedData));
  } catch (error) {
    logger().error(error.message);
    return res.status(500).json({ error: error.message });
  }
};

module.exports.updatePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { validatedData } = req;

    return res.status(200).json(await updatePost(postId, validatedData));
  } catch (error) {
    logger().error(error.message);
    return res.status(500).json({ error: error.message });
  }
};

module.exports.deletePost = async (req, res) => {
  try {
    const { postId } = req.params;

    return res.status(200).json(await deletePost(postId));
  } catch (error) {
    logger().error(error.message);
    return res.status(500).json({ error: error.message });
  }
};
