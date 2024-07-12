const express = require('express')
const userControllers = require('../controllers/userControllers')

const router = express.Router()

router.get('/',userControllers.getForm)

router.get('/user/get-user',userControllers.getUser)

router.post('/user/add-user',userControllers.addUser)

router.post('/user/delete-user',userControllers.deleteUser)

router.post('/user/edit-user',userControllers.editUser)


module.exports = router