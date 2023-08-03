const express = require('express');
const categoryRouter = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const database = require('../connection/connectMYSQL');

categoryRouter.use(bodyParser.json());
categoryRouter.use(bodyParser.urlencoded({ extended: true }));
categoryRouter.use(cors());

categoryRouter.get('/', (req, res) => {
    const searchName = req.query.searchName;
    const limit = +req.query.LIMIT;
    const page = +req.query.OFFSET;
    // offset là vị trí bắt đầu lấy
    const offset = (page - 1) * limit;

    try {
        if (searchName === '') {
            database.query('call Proc_category_getAllCategory(?, ?)', [limit, offset], (err, result) => {
                if (err) {
                    return res.status(500).json({
                        status: 500,
                        messageDEV: "Lỗi hệ thống",
                        error: err
                    })
                }
                else {
                    database.query('call Proc_category_getTotalRecord', (errCount, resultCount) => {
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
        } else
            if (searchName !== '') {
                database.query('call Proc_category_getSearchCategory(?)', searchName, (err, result) => {
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
            messageDEV: "Lỗi hệ thống",
            error: error
        })
    }
})

categoryRouter.post('/', (req, res) => {
    const categoryId = uuidv4();
    const category = req.body;
    const categoryPost = [categoryId, category.categoryName, category.createdDate, category.createdBy, category.modifileDate, category.modifileBy];
    try {
        database.query('call Proc_category_createCategory(?,?,?,?,?,?)', categoryPost, (err, result) => {
            if (err) {
                return res.status(500).json({
                    status: 500,
                    messageDEV: "Lỗi hệ thống",
                    error: err
                })
            }
            return res.status(201).json({
                status: 201,
                message: "Thêm mới thành công",
                data: result[0]
            })
        })
    } catch (error) {
        return res.status(500).json({
            status: 500,
            messageDEV: "Lỗi hệ thống",
            error: error
        })
    }
})

categoryRouter.get('/category/all', (req, res) => {
    try {
        database.query('call Proc_category_getCategories()', (err, results) => {
            return res.status(200).json({
                status: 200,
                data: results[0]
            })
        })
    } catch (error) {
        return res.status(500).json({
            status: 500,
            messageDEV: "Lỗi hệ thống",
            error: error
        })
    }
})

module.exports = categoryRouter;
