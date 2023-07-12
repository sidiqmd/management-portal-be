const { Router } = require('express');
const { validateMiddleware } = require('../middlewares/validate.middleware');
const {
  getCategoryList,
  getCategoryByCategoryId,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/category.controller');
const categorySchema = require('../validations/category.schema');
const { verifyAccessToken } = require('../middlewares/auth.middleware');

const router = Router();

router.get('/', verifyAccessToken, getCategoryList);
router.get('/:categoryId', verifyAccessToken, getCategoryByCategoryId);
router.post(
  '/',
  verifyAccessToken,
  validateMiddleware(categorySchema),
  createCategory
);
router.post(
  '/:categoryId',
  verifyAccessToken,
  validateMiddleware(categorySchema),
  updateCategory
);
router.delete('/:categoryId', verifyAccessToken, deleteCategory);

module.exports = router;
