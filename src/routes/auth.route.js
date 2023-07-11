const { Router } = require('express');
const AuthController = require('../controllers/auth.controller');
const { validateMiddleware } = require('../middlewares/validate.middleware');
const userCreateSchema = require('../validation/user-create.schema');
const loginSchema = require('../validation/login.schema');

const router = Router();

router.get('/health', (req, res) => res.send('Ok'));
router.post(
  '/login',
  validateMiddleware(loginSchema),
  AuthController.login
);
router.post(
  '/',
  validateMiddleware(userCreateSchema),
  AuthController.createUser
);

module.exports = router;
