const router = require('express').Router(); 
const userController = require('../../controllers/userController')

//get all users
router.get('/', userController.getAllUser);
//get a single id
router.get('/')

module.exports = router;