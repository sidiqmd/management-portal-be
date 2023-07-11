const { Router } = require('express');
const { verifyAccessToken } = require('../middlewares/auth.middleware');
const {
  purchasePremiumMembership,
  billplzCallback,
} = require('../controllers/membership.controller');

const router = Router();

router.get('/health', (req, res) => res.send('Ok'));

router.get('/purchase', verifyAccessToken, purchasePremiumMembership);
router.post('/billplz-callback', billplzCallback);

module.exports = router;
