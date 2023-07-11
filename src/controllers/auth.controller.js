const { logger } = require('../utils/logger');
const { createUser, login, refreshToken } = require('../services/auth.service');

module.exports.createUser = async (req, res) => {
  try {
    const { validatedData } = req;

    return res.status(201).json(await createUser(validatedData));
  } catch (error) {
    logger().error(error.message);
    return res.status(500).json({ error: error.message });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { validatedData } = req;

    return res.status(200).json(await login(validatedData));
  } catch (error) {
    logger().error(error.message);
    return res.status(500).json({ error: error.message });
  }
};

module.exports.refreshToken = async (req, res) => {
  try {
    const { userId } = req.user;

    return res
      .status(200)
      .json(await refreshToken(userId));
  } catch (error) {
    logger().error(error.message);
    return res.status(500).json({ error: error.message });
  }
};
