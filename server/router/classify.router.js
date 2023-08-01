const express = require('express');
const classifyRouter = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const database = require('../connection/connectMYSQL');

classifyRouter.use(bodyParser.json());
classifyRouter.use(bodyParser.urlencoded({ extended: true }));
classifyRouter.use(cors());

classifyRouter.post('/', (req, res) => {
    const classifyId = uuidv4();
    const classify = req.body;
    const classifyPost = [classifyId, classify.trademark, classify.categoryId, classify.createdDate, classify.createdBy, classify.modifileDate, classify.modifileBy]
    try {
        database.query('call Proc_classify_createClassify(?,?,?,?,?,?,?)', classifyPost, (err, result) => {
            if (err) {
                return res.status(500).json({
                    status: 500,
                    messageDev: "Lỗi hệ thống",
                    error: err
                });
            }
            return res.status(201).json({
                status: 201,
                message: 'Thêm mới thành công',
                data: result[0]
            })
        })
    } catch (error) {
        return res.status(500).json({
            status: 500,
            messageDev: "Lỗi hệ thống",
            error: error
        });
    }
})


classifyRouter.get('/', (req, res) => {
    const searchName = req.query.searchName;
    console.log(searchName);
    const limit = +req.query.LIMIT;
    const page = +req.query.OFFSET;
    // offset là vị trí bắt đầu lấy
    const offset = (page - 1) * limit;
    console.log(limit, offset);
    try {
        if (searchName === '') {
            database.query('call Proc_classify_getAllClassify(?, ?)', [limit, offset], (err, result) => {
                if (err) {
                    return res.status(500).json({
                        status: 500,
                        messageDEV: "Lỗi hệ thống",
                        error: err
                    })
                }
                else {
                    database.query('call Proc_classify_getTotalRecord', (errCount, resultCount) => {
                        if (errCount) {
                            return res.status(500).json({
                                status: 500,
                                messageDEV: "Lỗi hệ thống",
                                error: errCount
                            })
                        } else {
                            const totalRecord = resultCount[0][0].total;
                            const totalPage = Math.ceil(totalRecord / limit);
                            const data = result[0]
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
        } else if (searchName !== '') {
            database.query('call Proc_classify_getSearchClassify(?)', searchName, (err, results) => {
                if (err) {
                    return res.status(500).json({
                        status: 500,
                        messageDev: "Lỗi hệ thống",
                        error: err
                    });
                } else {
                    return res.status(200).json({
                        status: 200,
                        message: 'Lấy dữ liệu thành công',
                        data: results[0]
                    })
                }
            })
        }
    } catch (error) {
        return res.status(500).json({
            status: 500,
            messageDev: "Lỗi hệ thống",
            error: error
        });
    }
})


classifyRouter.get('/classify/all', (req, res) => {
    try {
        database.query('call Proc_classify_getClassify()', (err, results) => {
            return res.status(200).json({
                status: 200,
                message: 'Lấy dữ liệu thành công',
                data: results[0]
            })
        })
    } catch (error) {
        return res.status(500).json({
            status: 500,
            messageDev: "Lỗi hệ thống",
            error: error
        });
    }
})

module.exports = classifyRouter;
