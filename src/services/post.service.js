const {
  getPostList,
  getPostByPostId,
  createPost,
  updatePost,
  deletePost,
  getNormalPostList,
  getNormalPostByPostId,
} = require('../repositories/post.repository');
const {
  getCategoryByCategoryId,
} = require('../repositories/category.repository');
const { logger } = require('../utils/logger');

module.exports.getPostList = async (membership) => {
  logger().info(`getPostList`);

  if (membership === 'Premium') {
    return getPostList();
  } else {
    return getNormalPostList();
  }
};

module.exports.getPostByPostId = async (postId, membership) => {
  logger().info(`getPostByPostId`);

  if (membership === 'Premium') {
    return getPostByPostId(postId);
  } else {
    return getNormalPostByPostId(postId);
  }
};

module.exports.createPost = async (data) => {
  logger().info(`createPost`);

  const { title, body, status, label, categoryId } = data;

  const category = await getCategoryByCategoryId(categoryId);
  if (!category) {
    throw new Error('Category not found');
  }

  return createPost(title, body, status, label, categoryId);
};

const checkPostExist = async (postId) => {
  const post = await getPostByPostId(postId);

  if (!post) {
    throw new Error('Post not found');
  }
};

module.exports.updatePost = async (postId, data) => {
  logger().info(`updatePost`);

  const { title, body, status, label, categoryId } = data;

  await checkPostExist(postId);

  const category = await getCategoryByCategoryId(categoryId);
  if (!category) {
    throw new Error('Category not found');
  }

  return updatePost(postId, title, body, status, label, categoryId);
};

module.exports.deletePost = async (postId) => {
  logger().info(`deletePost`);

  await checkPostExist(postId);

  return deletePost(postId);
};
