const db = require('../configs/postgres.config');
const { logger } = require('../utils/logger');

module.exports.getPostList = async () => {
  logger().info('getPostList');

  const query = {
    text: 'SELECT * FROM public.post',
  };
  const { rows } = await db.query(query);

  return rows;
};

module.exports.getNormalPostList = async () => {
  logger().info('getNormalPostList');

  const query = {
    text: 'SELECT * FROM public.post WHERE  status = $1 AND label = $2',
    values: ['Published', 'Normal'],
  };
  const { rows } = await db.query(query);

  return rows;
};

module.exports.getPostByPostId = async (postId) => {
  logger().info(`getPostByPostId: ${postId}`);

  const query = {
    text: 'SELECT * FROM public.post WHERE post_id = $1',
    values: [postId],
  };
  const { rows } = await db.query(query);

  return rows !== 0 ? rows[0] : null;
};

module.exports.getNormalPostByPostId = async (postId) => {
  logger().info(`getNormalPostByPostId: ${postId}`);

  const query = {
    text: 'SELECT * FROM public.post WHERE post_id = $1 AND status = $2 label = $3',
    values: [postId, 'Published', 'Normal'],
  };
  const { rows } = await db.query(query);

  return rows !== 0 ? rows[0] : null;
};

module.exports.getPostsByCategoryId = async (categoryId) => {
  logger().info(`getPostsByCategoryId: ${categoryId}`);

  const query = {
    text: 'SELECT * FROM public.post WHERE category_id = $1',
    values: [categoryId],
  };
  const { rows } = await db.query(query);

  return rows;
};

module.exports.createPost = async (title, body, status, label, categoryId) => {
  logger().info(
    `insertPost: ${title}, ${body}, ${status}, ${label}, ${categoryId}`
  );

  const query = {
    text: 'INSERT INTO public.post (title, body, status, label, category_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    values: [title, body, status, label, categoryId],
  };
  const { rows } = await db.query(query);

  return rows[0];
};

module.exports.updatePost = async (
  postId,
  title,
  body,
  status,
  label,
  categoryId
) => {
  logger().info(
    `updatePost: ${postId}, ${title}, ${body}, ${status}, ${label}, ${categoryId}`
  );

  const query = {
    text: 'UPDATE public.post SET title = $1, body = $2, status = $3, label = $4, category_id = $5 WHERE post_id = $6 RETURNING *',
    values: [title, body, status, label, categoryId, postId],
  };
  const { rows } = await db.query(query);

  return rows[0];
};

module.exports.deletePost = async (postId) => {
  logger().info(`deletePost: ${postId}`);

  const query = {
    text: 'DELETE FROM public.post WHERE post_id = $1 RETURNING *',
    values: [postId],
  };

  await db.query(query);
};
