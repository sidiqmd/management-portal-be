const db = require('../configs/postgres.config');
const { logger } = require('../utils/logger');

module.exports.getCategoryList = async () => {
  logger().info('getCategoryList');

  const query = {
    text: 'SELECT * FROM public.category',
  };
  const { rows } = await db.query(query);

  return rows;
};

module.exports.getCategoryByCategoryId = async (categoryId) => {
  logger().info(`getCategoryByCategoryId: ${categoryId}`);

  const query = {
    text: 'SELECT * FROM public.category WHERE category_id = $1',
    values: [categoryId],
  };
  const { rows } = await db.query(query);

  return rows !== 0 ? rows[0] : null;
};

module.exports.getCategoryByName = async (name) => {
  logger().info(`getCategoryByName: ${name}`);

  const query = {
    text: 'SELECT * FROM public.category WHERE name = $1',
    values: [name],
  };
  const { rows } = await db.query(query);

  return rows !== 0 ? rows[0] : null;
};

module.exports.getCategoryByNameNExcludeCategoryId = async (
  name,
  categoryId
) => {
  logger().info(`getCategoryByName: ${name}, ${categoryId}`);

  const query = {
    text: 'SELECT * FROM public.category WHERE name = $1 AND category_id != $2',
    values: [name, categoryId],
  };
  const { rows } = await db.query(query);

  return rows !== 0 ? rows[0] : null;
};

module.exports.createCategory = async (name, description, activated) => {
  logger().info(`createCategory: ${name}, ${description}, ${activated}`);

  const query = {
    text: 'INSERT INTO public.category (name, description, activated) VALUES ($1, $2, $3) RETURNING *',
    values: [name, description, activated],
  };
  const { rows } = await db.query(query);

  return rows[0];
};

module.exports.updateCategory = async (
  categoryId,
  name,
  description,
  activated
) => {
  logger().info(
    `updateCategory: ${categoryId}, ${name}, ${description}, ${activated}`
  );

  const query = {
    text: 'UPDATE public.category SET name = $1, description = $2, activated = $3 WHERE category_id = $4 RETURNING *',
    values: [name, description, activated, categoryId],
  };
  const { rows } = await db.query(query);

  return rows[0];
};

module.exports.deleteCategory = async (categoryId) => {
  logger().info(`deleteCategory: ${categoryId}`);

  const query = {
    text: 'DELETE FROM public.category WHERE category_id = $1 RETURNING *',
    values: [categoryId],
  };

  await db.query(query);
};
