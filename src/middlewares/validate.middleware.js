// import _ from 'lodash';
const _ = require('lodash');

module.exports.validateMiddleware = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      return res.status(400).json({ error: _.map(error.details, 'message') });
    }

    req.validatedData = value;

    next();
  };
};
