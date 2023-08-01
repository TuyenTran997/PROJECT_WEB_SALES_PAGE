const express = require('express');
const productRouter = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const database = require('../connection/connectMYSQL');
const multer = require('multer');
const path = require('path');
// Thiet lap cho viec upload file
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'uploads')
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname); // Lay ten duong dan file goc
    }
})

// Tien hanh luu tru
const upload = multer({
    storage: storage
});

// Duong dan cho cac tap tin anh
productRouter.use('images', express.static(path.join(__dirname, 'uploads')))

productRouter.use(bodyParser.json());
productRouter.use(bodyParser.urlencoded({ extended: true }));
productRouter.use(cors());

productRouter.post('/', upload.single('image'), (req, res) => {
    const productId = uuidv4();
    const productPost = req.body;
    const fileName = req.file.filename ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}` : null;
    const product = [productId, productPost.productName, productPost._description, productPost.model, productPost.product_code, productPost.price, productPost.percent_discount, fileName, productPost.categoryId, productPost.classifyId, productPost.createdDate, productPost.createdBy, productPost.modifileDate, productPost.modifileBy, productPost._status]
    console.log(fileName);
    console.log("upload success", productPost);
    try {
        database.query('call Proc_product_createProduct(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', product, (err, result) => {
            console.log(err);
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


productRouter.get('/', (req, res) => {
    const searchName = req.query.searchName;
    const limit = +req.query.LIMIT;
    const page = +req.query.OFFSET;
    // offset là vị trí bắt đầu lấy
    const offset = (page - 1) * limit;
    console.log(searchName);
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
                database.query('call Proc_product_getSearchProduct(?)', searchName, (err, result) => {
                    console.log(result);
                    if (err) {
                        return res.status(500).json({
                            status: 500,
                            messageDEV: 'Error getting user',
                            error: err
                        });
                    }
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
