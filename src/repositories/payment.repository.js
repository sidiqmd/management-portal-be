const db = require('../configs/postgres.config');
const { logger } = require('../utils/logger');

module.exports.getPaymentByPaymentId = async (paymentId) => {
  logger().info(`getPaymentByPaymentId: ${paymentId}`);

  const query = {
    text: 'SELECT * FROM public.payment WHERE payment_id = $1',
    values: [paymentId],
  };
  const { rows } = await db.query(query);

  return rows !== 0 ? rows[0] : null;
};

module.exports.createPayment = async (
  paymentId,
  userId,
  amount,
  paymentMethod,
  status
) => {
  logger().info(
    `createPayment: ${paymentId}, ${userId}, ${amount}, ${paymentMethod}, ${status}`
  );

  const query = {
    text: 'INSERT INTO public.payment (payment_id, user_id, amount, payment_method, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    values: [paymentId, userId, amount, paymentMethod, status],
  };
  const { rows } = await db.query(query);

  return rows[0];
};

module.exports.createPaymentStatus = async (paymentId, status) => {
  logger().info(`createPaymentStatus: ${paymentId}, ${status}`);

  const query = {
    text: 'UPDATE public.payment SET status = $1 WHERE payment_id = $2 RETURNING *',
    values: [status, paymentId],
  };
  const { rows } = await db.query(query);

  return rows[0];
};
