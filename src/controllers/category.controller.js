const { logger } = require('../utils/logger');
const {
  getCategoryList,
  getCategoryByCategoryId,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../services/category.service');

module.exports.getCategoryList = async (req, res) => {
  try {
    return res.status(201).json(await getCategoryList());
  } catch (error) {
    logger().error(error.message);
    return res.status(500).json({ error: error.message });
  }
};

module.exports.getCategoryByCategoryId = async (req, res) => {
  try {
    const { categoryId } = req.params;

    return res.status(200).json(await getCategoryByCategoryId(categoryId));
  } catch (error) {
    logger().error(error.message);
    return res.status(500).json({ error: error.message });
  }
};

module.exports.createCategory = async (req, res) => {
  try {
    const { validatedData } = req;

    return res.status(201).json(await createCategory(validatedData));
  } catch (error) {
    logger().error(error.message);
    return res.status(500).json({ error: error.message });
  }
};

module.exports.updateCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { validatedData } = req;

    console.log(req.params);

    return res
      .status(200)
      .json(await updateCategory(categoryId, validatedData));
  } catch (error) {
    logger().error(error.message);
    return res.status(500).json({ error: error.message });
  }
};

module.exports.deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    return res.status(200).json(await deleteCategory(categoryId));
  } catch (error) {
    logger().error(error.message);
    return res.status(500).json({ error: error.message });
  }
};
