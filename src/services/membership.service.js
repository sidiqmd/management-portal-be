const { logger } = require('../utils/logger');
const {
  getPaymentByPaymentId,
  createPayment,
  createPaymentStatus,
} = require('../repositories/payment.repository');
const { upgradeUserToPremium } = require('../repositories/user.repository');
const axios = require('axios');

module.exports.purchasePremiumMembership = async (user) => {
  logger().info(`purchasePremiumMembership`);
  const { user_id, email, fullname, membership } = user;

  if (membership === 'Premium') {
    throw new Error('You are already a premium member');
  }

  const amount = 39.99;

  const payload = {
    collection_id: process.env.BILLPLZ_COLLECTION_CODE,
    email,
    mobile: '',
    name: fullname,
    amount: amount * 100,
    callback_url: `${process.env.BILLPLZ_CALLBACK_URL}`,
    description: 'Premium Membership Upgrade',
    reference_1_label: 'Membership',
    reference_1: '',
    reference_2_label: '',
    reference_2: '',
  };

  const url = `${process.env.BILLPLZ_URL}/bills`;
  const encodeSecretKey = Buffer.from(process.env.BILLPLZ_SECRET_KEY).toString(
    'base64'
  );
  const headers = {
    Authorization: `Basic ${encodeSecretKey}`,
    Accept: 'application/json',
  };

  try {
    const response = await axios.post(url, payload, { headers });

    logger().info('purchasePremiumMembership', response.data);

    await createPayment(
      response.data.id,
      user_id,
      amount,
      'Billplz',
      'In Progress'
    );

    return {
      message: 'Please make payment using the payment url',
      paymentUrl: response.data.url,
    };
  } catch (error) {
    logger().error(error);
    throw new Error('Unable to process payment');
  }
};

module.exports.billplzCallback = async (id, paid, state) => {
  logger().info(`billplzCallback`);

  const payment = await getPaymentByPaymentId(id);

  if (payment.length > 0) {
    await createPaymentStatus(id, state === 'paid' ? 'Success' : 'Failed');

    if (paid === 'true') {
      await upgradeUserToPremium(payment[0].user_id);
    }
  }

  return {
    message: 'Payment status updated',
  };
};
