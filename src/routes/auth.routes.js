const { Router} = require('express')
const router = Router()
const authCtrl = require('../controllers/auth.controller')
router.post('/', authCtrl.login);
router.post('/signin/', authCtrl.signIn)

module.exports = router;