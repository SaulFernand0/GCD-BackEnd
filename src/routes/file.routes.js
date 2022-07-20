const{ Router } = require('express')

const router = Router();

const fileCtr = require('../controllers/file.controller')

const { checkToken } = require('../auth/token_validation');
const { readUser } = require('../controllers/user.controller');

const { fileMulter } = require('../libs/multer');

router.get('/', fileCtr.readAllFiles);
router.get('/:id', fileCtr.readFile);
router.post('/add', fileMulter, fileCtr.createFile);
router.delete('/delete/:id', fileCtr.delFile);

module.exports = router;