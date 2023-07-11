const Joi = require('joi');

module.exports = Joi.object({
  title: Joi.string().required(),
  body: Joi.string().required(),
  status: Joi.string().required(),
  label: Joi.string().required(),
  categoryId: Joi.string().required(),
});
