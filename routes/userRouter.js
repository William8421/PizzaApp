const express = require('express');
const users = require('../datasets/userDataset.js')
const {register} = require('../controllers/userController.js');
const {check} = require('express-validator')


const router = express.Router()


/**
 * @route GET / user
 * @desc get all users
 * @access public
 */

router.get('/users', (req, res) => {
    res.status(200).json(users)
})

router.post('/register',
    check('username', 'please fill the username').notEmpty(),
    check('email', 'please give a valid email').isEmail(),
    check('password', 'please enter a valid password with 6 or more letters').isLength({min:6}),
    register
)

module.exports = router