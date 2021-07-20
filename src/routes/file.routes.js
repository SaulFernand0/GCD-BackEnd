const{ Router } = require('express')

const router = Router();

const fileCtr = require('../controllers/file.controller')

const { checkToken } = require('../auth/token_validation');
const { readUser } = require('../controllers/user.controller');

const { fileMulter } = require('../libs/multer');

router.get('/', checkToken, fileCtr.readAllFiles);
router.get('/:id', checkToken, fileCtr.readFile);
router.post('/add', checkToken, fileMulter, fileCtr.createFile);
router.delete('/delete/:id', checkToken, fileCtr.delFile);

module.exports = router;