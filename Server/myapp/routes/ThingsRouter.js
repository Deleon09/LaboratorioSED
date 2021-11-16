const router = require('express').Router();
const { create } = require('../controllers/ThingsController');

router.post('/create', create);

module.exports = router;