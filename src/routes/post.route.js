const { Router } = require('express');
const { validateMiddleware } = require('../middlewares/validate.middleware');
const {
  getPostList,
  getPostByPostId,
  createPost,
  updatePost,
  deletePost,
} = require('../controllers/post.controller');
const postSchema = require('../validations/post.schema');
const { verifyAccessToken } = require('../middlewares/auth.middleware');

const router = Router();

router.get('/', verifyAccessToken, getPostList);
router.get('/:postId', verifyAccessToken, getPostByPostId);
router.post('/', verifyAccessToken, validateMiddleware(postSchema), createPost);
router.post(
  '/:postId',
  verifyAccessToken,
  validateMiddleware(postSchema),
  updatePost
);
router.delete('/:postId', verifyAccessToken, deletePost);

module.exports = router;
