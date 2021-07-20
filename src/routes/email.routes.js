const{ Router } = require('express')

const router = Router();

const emailCtr = require('../controllers/email.controller')

const { checkToken } = require('../auth/token_validation');

router.post('/', checkToken, emailCtr.email);

module.exports = router;