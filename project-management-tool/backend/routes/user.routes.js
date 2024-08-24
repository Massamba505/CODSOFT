const express = require('express');
const router = express.Router();
const {protectRoute} = require('../middlewares/protectRoute');
const { all } = require('../controllers/user.controller');

router.get('/all', all);

module.exports = router;
