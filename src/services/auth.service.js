const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {
  getUserByUsername,
  insertUser,
  updateRefreshToken,
  getUserByUserId,
} = require('../repositories/user.repository');
const { logger } = require('../utils/logger');

module.exports.createUser = async (data) => {
  logger().info(`createUser`);
  const { username, password, email, fullname } = data;
  const user = await getUserByUsername(username);

  if (user) {
    throw new Error('Username already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  return insertUser(username, hashedPassword, email, fullname);
};

const generateToken = (payload) => {
  logger().info(`generateToken`);
  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_KEY, {
    expiresIn: '1d',
  });
  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_KEY, {
    expiresIn: '7d',
  });

  return {
    accessToken,
    refreshToken,
  };
};

module.exports.login = async (data) => {
  logger().info(`login`);
  const { username, password } = data;

  const user = await getUserByUsername(username);

  if (user && (await bcrypt.compare(password, user.password))) {
    const userId = user.user_id;
    const tokens = generateToken({ sub: userId });

    await updateRefreshToken(userId, tokens.refreshToken);

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  } else {
    throw new Error('Invalid username or password');
  }
};

module.exports.refreshToken = async (userId, refreshToken) => {
  logger().info(`refreshToken`);

  const tokens = generateToken({ sub: userId });
  console.log(tokens);

  await updateRefreshToken(userId, tokens.refreshToken);

  return {
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
  };
};
