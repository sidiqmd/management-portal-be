const jwt = require('jsonwebtoken');
const { getUserByUserId } = require('../repositories/user.repository');
const { logger } = require('../utils/logger');

module.exports.verifyAccessToken = async (req, res, next) => {
  logger().info(`verifyAccessToken: ${req.method} ${req.originalUrl}`);

  const authHeader = req.headers['authorization'];
  const accessToken = authHeader && authHeader.split(' ')[1];

  if (!accessToken) {
    return res.status(401).json({
      message: 'Access Denied',
    });
  }

  try {
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_KEY);
    const userId = decoded.sub;

    const user = await getUserByUserId(userId);

    if (!user) {
      return res.status(401).json({
        message: 'Access Denied',
      });
    }

    req.user = user;

    const originalUrl = req.originalUrl;
    const method = req.method;
    if (user.membership === 'Normal' && method !== 'GET') {
      return res.status(403).json({
        message: 'Forbidden',
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      message: error.message,
    });
  }
};

module.exports.verifyRefreshToken = async (req, res, next) => {
  logger().info(`verifyRefreshToken`);
  const authHeader = req.headers['authorization'];
  const refreshToken = authHeader && authHeader.split(' ')[1];

  if (!refreshToken) {
    return res.status(401).json({
      message: 'Access Denied',
    });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY);
    const userId = decoded.sub;

    const user = await getUserByUserId(userId);

    if (!user) {
      return res.status(401).json({
        message: 'Unauthorized',
      });
    }

    if (refreshToken !== user.refresh_token) {
      return res.status(401).json({
        message: 'Unauthorized',
      });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      message: error.message,
    });
  }
};
