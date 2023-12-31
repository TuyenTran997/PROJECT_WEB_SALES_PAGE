const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const multer = require('multer');
const path = require('path');
const userRoute = express.Router();
const cors = require('cors');
const database = require('../connection/connectMYSQL');
const cookie = require('cookie-parser')
const jwt = require('jsonwebtoken')

const { checkDataEmpty, validateEmail, checkDataEmptyLogin } = require('../middleware/validateData');


userRoute.use(bodyParser.json());
userRoute.use(bodyParser.urlencoded({ extended: true }));
userRoute.use(cors({ credentials: true, origin: true }));
userRoute.use(cookie());

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'router/uploads/images')
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname); // Lay ten duong dan file goc D:\CODE\Front-End Youtube\Web Ban Hang-SHOPPE\server\uploads\201501051404337920_Zen-A450-main-80.jpg
    }
})

const upload = multer({
    storage: storage
});
userRoute.use(express.static('router'))


userRoute.get('/', (req, res) => {
    const searchName = req.query.searchName;
    const limit = +req.query.LIMIT;
    const page = +req.query.OFFSET;
    // offset là vị trí bắt đầu lấy
    const offset = (page - 1) * limit;
    try {
        if (searchName === '') {
            database.query('call Proc_user_getAllUser(?, ?)', [limit, offset], (err, result) => {
                if (err) {
                    return res.status(500).json({
                        status: 500,
                        messageDEV: "Lỗi hệ thống",
                        error: err
                    })
                }
                else {
                    database.query('call Proc_user_getTotalRecord', (errCount, resultCount) => {
                        if (errCount) {
                            return res.status(500).json({
                                status: 500,
                                messageDEV: "Lỗi hệ thống",
                                error: errCount
                            })
                        } else {
                            const totalRecord = resultCount[0][0].total;
                            const totalPage = Math.ceil(totalRecord / limit);
                            const data = result[0];
                            return res.status(200).json({
                                status: 200,
                                totalPage: totalPage,
                                totalRecord: totalRecord,
                                message: 'Lấy dữ liệu thành công',
                                data: data
                            })

                        }
                    })
                }
            })
        } else
            if (searchName !== '') {
                database.query('call Proc_user_getSearchUser(?)', searchName, (err, result) => {
                    return res.status(200).json({
                        status: 200,
                        message: 'Lấy dữ liệu thành công',
                        data: result[0]
                    })
                })
            }
    } catch (error) {
        return res.status(500).json({
            status: 500,
            messageDEV: 'Error getting user',
            error: error
        });
    }
});


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

// đăng ký tài khoản user
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

// kiểm tra thông tin đăng nhập của user
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
                        const user_token = jwt.sign({ userId: user[0].userId, roleId: user[0].roleId }, 'user-secret-key', { expiresIn: '1day' })
                        // const role_token = jwt.sign({ roleId: user[0].roleId }, 'role-secret-key', { expiresIn: '1day' })
                        res.cookie('user_token', user_token, { httpOnly: true })
                        // res.cookie('role_token', role_token, { httpOnly: true })
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
        return res.status(500).json({
            status: 500,
            messageDEV: 'Error getting user',
            error: error
        });
    }
})

userRoute.get('/user/login', (req, res) => {
    // console.log(req.cookies);
    const user_token = req.cookies.user_token;
    console.log(user_token);
    jwt.verify(user_token, 'user-secret-key', (err, decoded) => {
        if (err) {
            return res.json({
                status: 401,
                Message: 'Authentication failed'
            })
        } else {
            database.query(`call Proc_user_gerUserById(?)`, decoded.userId, (error, result) => {
                if (error) {
                    return res.status(500).json({
                        status: 500,
                        messageDEV: 'Error getting user',
                        error: error
                    })
                } else {
                    return res.status(200).json({
                        status: 200,
                        data: result[0]
                    });
                }
            })
        }
    })
})

// cập nhật thông tin user
userRoute.put('/', upload.single('image'), (req, res) => {
    const image = req.file.filename;
    const info = req.body;
    const infoUpdate = [info.dateOfbirth, info.gender, info.phoneNumber, info.address, info.createdDate, info.createdBy, info.modifileDate, info.modifileBy, image, info.userId]
    try {
        database.query('call Proc_user_updateInfoUser(?,?,?,?,?,?,?,?,?,?)', infoUpdate, (err, result) => {
            if (err) {
                return res.status(500).json({
                    status: 500,
                    messageDEV: 'Error getting user',
                    error: err
                });
            } else {
                return res.status(200).json({
                    status: 200,
                    message: 'Cập nhật thông tin thành công'
                })
            }
        })
    } catch (error) {
        return res.status(500).json({
            status: 500,
            messageDEV: 'Error getting user',
            error: error
        });
    }
})

userRoute.get('/logout', (req, res) => {
    res.clearCookie('user_token')
    return res.json({ Status: 'Success' })
})

module.exports = userRoute;
