const { Router } = require('express');

const router = Router();

// Health check endpoint
router.get('/health', (req, res) => res.send('Ok'));

module.exports = router;
