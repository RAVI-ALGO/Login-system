const express = require('express')
const controller = require('../controller/controller')
const router = express.Router()
const Auth = require('../middleware/auth')
const mailer = require('../controller/mailer')
router.post('/register', controller.postRegister)


router.post('/registerMail', mailer.registerMail) // send the email
router.post('/authenticate', controller.verifyUser,(req,res)=>res.end()) // authenticate user
router.post('/login',controller.verifyUser, controller.login) // login in app

/** GET Methods */
router.get('/user/:userName', controller.getUser)   // user with username
router.get('/generateOTP',controller.verifyUser,Auth.localVariables, controller.generateOTP)  // generate random OTP
router.get('/verifyOTP/:code', controller.verifyOTP)    // verify generated OTP
router.get('/createResetSession', controller.createResetSession)   // reset all the variables

// PUT Methods
router.put('/updateuser/:id', Auth.Authentication, controller.updateUser)// is use to update the user profile
router.put('/reset-Password',controller.verifyUser,  controller.resetPassword)// use to reset password



module.exports = router;