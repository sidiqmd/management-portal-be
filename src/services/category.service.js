const {
  getCategoryList,
  getCategoryByCategoryId,
  getCategoryByName,
  getCategoryByNameNExcludeCategoryId,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../repositories/category.repository');
const { getPostsByCategoryId } = require('../repositories/post.repository');
const { logger } = require('../utils/logger');

module.exports.getCategoryList = async () => {
  logger().info(`getCategoryList`);

  return getCategoryList();
};

module.exports.getCategoryByCategoryId = async (categoryId) => {
  logger().info(`getCategoryByCategoryId`);

  return getCategoryByCategoryId(categoryId);
};

module.exports.createCategory = async (data) => {
  logger().info(`createCategory`);

  const { name, description, activated } = data;

  const category = await getCategoryByName(name);

  if (category) {
    throw new Error('Category already exist, please choose different name');
  }

  return createCategory(name, description, activated);
};

const checkCategoryExist = async (categoryId) => {
  const category = await getCategoryByCategoryId(categoryId);

  if (!category) {
    throw new Error('Category not found');
  }
};

module.exports.updateCategory = async (categoryId, data) => {
  logger().info(`updateCategory`);

  const { name, description, activated } = data;

  // const categoryIdExists = await getCategoryByCategoryId(categoryId);
  // if (!categoryIdExists) {
  //   throw new Error('Category not found');
  // }
  await checkCategoryExist(categoryId);

  const categoryNameExists = await getCategoryByNameNExcludeCategoryId(
    name,
    categoryId
  );
  if (categoryNameExists) {
    throw new Error('Category already exist, please choose different name');
  }

  return updateCategory(categoryId, name, description, activated);
};

module.exports.deleteCategory = async (categoryId) => {
  logger().info(`deleteCategory`);

  // const categoryIdExists = await getCategoryByCategoryId(categoryId);
  // if (!categoryIdExists) {
  //   throw new Error('Category not found');
  // }
  await checkCategoryExist(categoryId);

  const posts = await getPostsByCategoryId(categoryId);
  if (posts.length > 0) {
    throw new Error('Category been used with post');
  }

  return deleteCategory(categoryId);
};
