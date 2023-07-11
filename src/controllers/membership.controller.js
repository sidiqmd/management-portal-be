const { logger } = require('../utils/logger');
const {
  purchasePremiumMembership,
  billplzCallback,
} = require('../services/membership.service');

module.exports.purchasePremiumMembership = async (req, res) => {
  try {
    const { user } = req;

    return res.status(201).json(await purchasePremiumMembership(user));
  } catch (error) {
    logger().error(error.message);
    return res.status(500).json({ error: error.message });
  }
};

module.exports.billplzCallback = async (req, res) => {
  try {
    const { id, paid, state } = req.body;

    return res.status(200).json(await billplzCallback(id, paid, state));
  } catch (error) {
    logger().error(error.message);
    return res.status(500).json({ error: error.message });
  }
};
