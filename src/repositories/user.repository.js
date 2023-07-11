const db = require('../configs/postgres.config');
const { logger } = require('../utils/logger');

module.exports.getUserByUserId = async (userId) => {
  logger().info(`getUserByUserId: ${userId}`);

  const query = {
    text: 'SELECT * FROM public.user WHERE user_id = $1',
    values: [userId],
  };
  const { rows } = await db.query(query);

  return rows !== 0 ? rows[0] : null;
};

module.exports.getUserByUsername = async (username) => {
  logger().info(`getUserByUsername: ${username}`);

  const query = {
    text: 'SELECT * FROM public.user WHERE username = $1',
    values: [username],
  };
  const { rows } = await db.query(query);

  return rows !== 0 ? rows[0] : null;
};

module.exports.insertUser = async (username, password, email, fullname) => {
  logger().info(`insertUser: ${username}, ${email}, ${fullname}`);

  const membership = 'Normal';

  const query = {
    text: 'INSERT INTO public.user (username, password, email, fullname, membership) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    values: [username, password, email, fullname, membership],
  };
  const { rows } = await db.query(query);

  return rows[0];
};

module.exports.updateUser = async (userId, email, fullname) => {
  logger().info(`updateUser: ${userId}, ${email}, ${fullname}`);

  const query = {
    text: 'UPDATE public.user SET email = $1, fullname = $2 WHERE user_id = $3 RETURNING *',
    values: [email, fullname, userId],
  };
  const { rows } = await db.query(query);

  return rows[0];
};

module.exports.upgradeUserToPremium = async (userId) => {
  logger().info(`upgradeUserToPremium: ${userId}`);

  const query = {
    text: 'UPDATE public.user SET membership = $1 WHERE user_id = $2 RETURNING *',
    values: ['Premium', userId],
  };
  const { rows } = await db.query(query);

  return rows[0];
};

module.exports.updateRefreshToken = async (userId, refreshToken) => {
  logger().info(`updateRefreshToken: ${userId}, ${refreshToken}`);

  const query = {
    text: 'UPDATE public.user SET refresh_token = $1 WHERE user_id = $2',
    values: [refreshToken, userId],
  };
  await db.query(query);
};
