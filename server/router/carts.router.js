const express = require('express');
const cartRouter = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const database = require('../connection/connectMYSQL');

cartRouter.use(bodyParser.json());
cartRouter.use(bodyParser.urlencoded({ extended: true }));
cartRouter.use(cors());

cartRouter.post('/', (req, res) => {
    const productChoose = req.body;
    const cartId = productChoose.userId;
    const productBuy = [cartId, productChoose.userId, productChoose.userName, productChoose.productId, productChoose.quantity, productChoose.price_percent_discount, productChoose.createdDate, productChoose.createdBy, productChoose.modifileDate, productChoose.modifileBy]
    console.log(productBuy);
    try {
        database.query('call Proc_cart_addProductInCart(?,?,?,?,?,?,?,?,?,?)', productBuy, (err, result) => {
            if (err) {
                return res.status(500).json({
                    status: 500,
                    messageDEV: "Lỗi hệ thống",
                    error: err
                })
            } else {
                return res.status(200).json({
                    status: 200,
                    message: "Thêm thành công"
                })
            }
        })
    } catch (error) {
        return res.status(500).json({
            status: 500,
            messageDEV: "Lỗi hệ thống",
            error: error
        })
    }
})

cartRouter.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        database.query('call Proc_cart_getAllCardProduct(?)', id, (err, result) => {
            if (err) {
                return res.status(500).json({
                    status: 500,
                    messageDEV: "Lỗi hệ thống",
                    error: err
                })
            } else {
                return res.status(200).json({
                    status: 200,
                    message: "Lấy dữ liệu thành công",
                    data: result[0],
                    totalRecord: result[0].length
                })
            }
        })
    } catch (error) {
        return res.status(500).json({
            status: 500,
            messageDEV: "Lỗi hệ thống",
            error: error
        })
    }
})

cartRouter.delete('/', (req, res) => {
    const { productId, userId } = req.query
    try {
        database.query('call Proc_cart_deleteProduct(?,?)', [productId, userId], (err, result) => {
            if (err) {
                return res.status(500).json({
                    status: 500,
                    messageDEV: "Lỗi hệ thống",
                    error: err
                })
            } else {
                return res.status(200).json({
                    status: 200,
                    message: "Xóa thành công",
                })
            }
        })
    } catch (error) {
        return res.status(500).json({
            status: 500,
            messageDEV: "Lỗi hệ thống",
            error: error
        })
    }

})
cartRouter.put('/', (req, res) => {
    const quantity = parseInt(req.params.quantity)
    const { productId, userId } = req.query;
    console.log(typeof quantity, '--', productId, '--', userId);
    try {
        database.query('call Proc_cart_updateCartProduct(?,?,?)', [quantity, productId, userId], (err, result) => {
            if (err) {
                return res.status(500).json({
                    status: 500,
                    messageDEV: "Lỗi hệ thống",
                    error: err
                })
            } else {
                return res.status(200).json({
                    status: 200,
                    message: "Thay đổi thành công",
                })
            }
        })
    } catch (error) {
        return res.status(500).json({
            status: 500,
            messageDEV: "Lỗi hệ thống",
            error: error
        })
    }

})

module.exports = cartRouter;
