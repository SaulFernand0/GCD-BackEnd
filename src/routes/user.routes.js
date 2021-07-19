const{ Router } = require('express')

const router = Router();

const userCtr = require('../controllers/user.controller')

const { checkToken } = require('../auth/token_validation');

router.get('/', userCtr.readAllUsers);
router.get('/:id', userCtr.readUser);
router.post('/add', userCtr.createUser);
router.delete('/delete/:id', userCtr.delUser);

module.exports = router;