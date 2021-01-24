let models = require('../models/index');
var enumsCommon = require('../utils/enums')
require('dotenv').config()

const jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.login = async (req, res) => { 
    const username = req.body.username
    const password = req.body.password

    if(CredentialsIsEmpty(username, password))
        return res.status(enumsCommon.STATUS_CODE.NOT_FOUND).send({ message: 'user or passwword empty' })

    await CheckUserPassword(req, res)
}

exports.logout = (req, res) => { 
    res.set('x-access-token', null)
    return res.status(enumsCommon.STATUS_CODE.OK).send({ message: 'Logout successfully' })
}

exports.authenticate = (req, res) => { 
    const username = req.body.username
    const password = req.body.password

    if(CredentialsIsEmpty(username, password))
        return res.status(enumsCommon.STATUS_CODE.NO_CONTENT).send({ message: 'user or passwword empty' })

    var token = jwt.sign(
        { username: username }, 
        process.env.SECRET, 
        { expiresIn: 600 } // 10 min
    );

    return res.status(enumsCommon.STATUS_CODE.OK).send({
        message: 'Login successfully',
        accessToken: token
    })
}

CredentialsIsEmpty = (username, password) => { 
    return !username || !password ? true : false
}

CheckUserPassword = async (req, res) => {
    const username = req.body.username
    const password = req.body.password

    await models.Users.findOne({ where: { username: username } }).then((user) => {
        if(!user) 
            return res.status(enumsCommon.STATUS_CODE.NOT_FOUND).send({ message: 'User not found' })
        
        if(!PasswordsIsEquals(password, user.password))
            return res.status(enumsCommon.STATUS_CODE.UNAUTHORIZED).send({ message: 'Unauthorized: Invalid password' })
        
        return res.status(enumsCommon.STATUS_CODE.OK).send({ message: 'Login successfully' })
    })
}

PasswordsIsEquals = (password, userPassword) => { 
    const passwordsIsEquals = bcrypt.compareSync (
        password,
        userPassword
    )

    return !passwordsIsEquals ? false  : true
}

