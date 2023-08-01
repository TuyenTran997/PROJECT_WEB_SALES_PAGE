const express = require('express');
const productRouter = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const database = require('../connection/connectMYSQL');
const multer = require('multer');
const path = require('path');
const { changeDate } = require('../middleware/formData');


productRouter.use(express.json());
productRouter.use(bodyParser.json());
productRouter.use(bodyParser.urlencoded({ extended: true }));
productRouter.use(cors());

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
productRouter.use(express.static('router'))

productRouter.get('/', (req, res) => {
    const searchName = req.query.searchName;
    console.log(searchName);
    const limit = +req.query.LIMIT;
    const page = +req.query.OFFSET;
    // offset là vị trí bắt đầu lấy
    const offset = (page - 1) * limit;

    try {
        if (searchName === '') {
            database.query('call Proc_product_getAllProduct(?, ?)', [limit, offset], (err, result) => {
                if (err) {
                    return res.status(500).json({
                        status: 500,
                        messageDEV: "Lỗi hệ thống",
                        error: err
                    })
                }
                else {
                    database.query('call Proc_product_getTotalRecord', (errCount, resultCount) => {
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
            database.query('call Proc_product_getSearchProduct(?)', searchName, (err, results) => {
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
productRouter.post('/', upload.single('image'), (req, res) => {
    const productId = uuidv4();
    const productPost = req.body;
    const image = req.file.filename;
    console.log(image);
    const product = [productId, productPost.productName, productPost._description, productPost.model, productPost.product_code, productPost.price, productPost.percent_discount, image, productPost.categoryId, productPost.classifyId, productPost.createdDate, productPost.createdBy, productPost.modifileDate, productPost.modifileBy, productPost._status]
    try {
        database.query('call Proc_product_createProduct(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', product, (err, result) => {
            if (err) {
                return res.status(500).json({
                    status: 500,
                    messageDEV: "Lỗi hệ thống",
                    error: err
                })
            }
            return res.status(201).json({
                status: 201,
                message: "Thêm mới sản phẩm thành công"
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


productRouter.delete('/:id', (req, res) => {
    const productId = req.params.id;
    console.log(productId);
    try {
        database.query('call Proc_product_deleteProduct(?)', productId, (err, result) => {
            if (err) {
                return res.status(500).json({
                    status: 500,
                    messageDEV: 'Error getting user',
                    error: err
                });
            }
            return res.status(200).json({
                status: 200,
                message: 'Xóa thành công sản phẩm'
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

module.exports = productRouter;
