const {validationResult} = require('express-validator');
const users = require('../datasets/userDataset.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config')



const register = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        });
    }
    const {username, email, password} = req.body
    
    users.find(user => {
        if(email === user.email){
            return res.json('this username already existed')
        }
        
    })
    
    const Id = users.length;
    const salt = await bcrypt.genSalt(10); // best practice
    const hashedPassword = await bcrypt.hash(password, salt)
    const user = {
        id: Id,
        username: username,
        email: email,
        password: hashedPassword
    };
    users.push(user)

        const payload = {
            user: {
                id: user.id,
                username: user.username
            }
        };

        jwt.sign(payload, config.get('jwt_secret.access'), {expiresIn: "60s"}, (err, token) => {
            if(err) return res.status(403).json('access denied')
            res.json({
                token: token,
                users: users
            })
        })
}

module.exports = {register}