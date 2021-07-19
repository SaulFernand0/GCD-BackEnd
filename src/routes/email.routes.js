const{ Router } = require('express')

const router = Router();

const emailCtr = require('../controllers/email.controller')

const { checkToken } = require('../auth/token_validation');

router.get('/', checkToken, emailCtr.readAllEmails);
router.get('/:id', checkToken, emailCtr.readEmail);
router.post('/add', checkToken, emailCtr.createEmail);
router.delete('/delete/:id', checkToken, emailCtr.delEmail);

module.exports = router;