const{ Router } = require('express')

const router = Router();

const emailCtr = require('../controllers/email.controller')

const { checkToken } = require('../auth/token_validation');

router.get('/', emailCtr.readAllEmails);
router.get('/:id', emailCtr.readEmail);
router.post('/add', emailCtr.createEmail);
router.delete('/delete/:id', emailCtr.delEmail);

module.exports = router;