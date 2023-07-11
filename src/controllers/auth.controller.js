// import * as AuthService from '../services/auth.service.js';
const { logger } = require('../utils/logger');
const AuthService = require('../services/auth.service');

module.exports.createUser = async (req, res) => {
  try {
    const { validatedData } = req;

    return res.status(201).json(await AuthService.createUser(validatedData));
  } catch (error) {
    logger().error(error.message);
    return res.status(500).json({ error: error.message });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { validatedData } = req;

    return res.status(200).json(await AuthService.login(validatedData));
  } catch (error) {
    logger().error(error.message);
    return res.status(500).json({ error: error.message });
  }
};
