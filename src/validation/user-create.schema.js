const Joi = require('joi');

module.exports = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  email: Joi.string().email().required(),
  fullname: Joi.string().required(),
  membership: Joi.string().valid('Premium', 'Normal').required(),
});
