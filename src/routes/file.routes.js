const{ Router } = require('express')

const router = Router();

const fileCtr = require('../controllers/file.controller')

const { checkToken } = require('../auth/token_validation');

router.get('/', checkToken, fileCtr.readAllFiles);
router.get('/:id', checkToken, fileCtr.readFile);
router.post('/add', checkToken, fileCtr.createFile);
router.delete('/delete/:id', checkToken, fileCtr.delFile);

module.exports = router;