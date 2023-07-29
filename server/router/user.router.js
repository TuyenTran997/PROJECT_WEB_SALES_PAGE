const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

const userRoute = express.Router();
const cors = require('cors');
const database = require('../connection/connectMYSQL');
const { checkDataEmpty, validateEmail, checkDataEmptyLogin } = require('../middleware/validateData');
userRoute.use(bodyParser.json());
userRoute.use(bodyParser.urlencoded({ extended: true }));
userRoute.use(cors({ credentials: true, origin: true }));

userRoute.get('/', (req, res) => {
    try {
        database.query('call Proc_user_getAllUser()', (err, result) => {
            return res.status(200).json({
                status: 200,
                data: result[0]
            });
        })
    } catch (error) {
        return res.status(500).json({
            status: 500,
            messageDEV: 'Error getting user',
            error: error
        });
    }
})

// Lấy bản ghi user theo id
userRoute.get('/:id', (req, res) => {
    const id = req.params.id;
    try {
        database.query(`call Proc_user_gerUserById('?')`, id, (err, result) => {
            return res.status(200).json({
                status: 200,
                data: result[0]
            });
        })
    } catch (error) {
        return res.status(500).json({
            status: 500,
            messageDEV: 'Error getting user',
            error: error
        });
    }
})

userRoute.post('/', checkDataEmpty, validateEmail, (req, res) => {
    const id = uuidv4();
    const user = req.body;
    const hashpass = bcrypt.hashSync(user._password, salt);

    try {
        database.query(`call Proc_user_postUser(?, ? , ? , ? , ? )`, [id, user.userName, user.email, hashpass, user.roleId], (err, result) => {
            if (err) {
                return res.status(500).json({
                    status: 500,
                    err: err
                })
            } else {
                return res.status(201).json({
                    status: 201,
                    message: 'User post successfully'
                })
            }
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            messageDEV: 'Error getting user',
            error: error
        });
    }
})

userRoute.post('/login', checkDataEmptyLogin, validateEmail, (req, res) => {
    const { email, _password } = req.body;

    try {
        database.query('call Proc_user_loginUser(?)', email, (err, result) => {
            if (err) {
                return res.status(500).json({
                    status: 500,
                    messageDEV: 'Error getting user',
                    error: err
                });
            } else {
                const user = result[0];
                if (user.length === 0) {
                    return res.status(404).json({
                        status: 404,
                        messageDEV: 'Email không tồn tại, vui lòng nhập lại email',
                    });
                } else {
                    const isMatch = bcrypt.compareSync(_password, user[0]._password)
                    if (isMatch) {
                        return res.status(200).json({
                            status: 200,
                            message: 'Bạn đã đăn nhập thành công',
                            data: user[0]
                        });
                    } else {
                        return res.status(401).json({
                            status: 401,
                            message: "Mật khẩu nhập vào không đúng, vui lòng nhập lại mật khẩu"
                        });
                    }
                }
            }
        })
    } catch (error) {
        return res.status(201).json({
            status: 201,
            message: 'User post successfully'
        })
    }
})


module.exports = userRoute;
