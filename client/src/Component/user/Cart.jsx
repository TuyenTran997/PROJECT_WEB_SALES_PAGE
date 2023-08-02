import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { changeNumber } from '../../formData/formData';

export default function Cart({ totalRecord, total, handleDeleteProduct, arrCart }) {

    const userLogin = JSON.parse(localStorage.getItem('user-login'))
    const handleUpdateProduct = async () => {
        confirm('Sản phẩm đã có trong giỏ hàng, bạn có muốn thêm vào giỏ hàng nữa không?')
        await axios.put(`http://localhost:8000/api/v1/carts?quantity=${quantity}&productId=${productBuy.productId}&userId=${userLogin.userId}`)
            .then(res => { console.log(res); })
            .catch(err => { console.log(err); });
    }


    return (
        <>
            <div className="grid__row app__content product-title">
                <div className="grid__collum-8">
                    Sản phẩm
                </div>
                <div className="grid__collum-1">
                    Đơn giá
                </div>
                <div className="grid__collum-1">
                    Số lượng
                </div>
                <div className="grid__collum-1">
                    Thành tiền
                </div>
                <div className="grid__collum-1">
                    Thao tác
                </div>
            </div>
            {arrCart.map((item, index) => {
                return <div className="grid__row cart-product" key={index}>
                    <div className="grid__collum-8 product-item">
                        <img src={`http://localhost:8000/api/v1/products/uploads/images/${item.image}`} alt="" style={{ width: "140px" }} />
                        <p>{item.productName}</p>
                        <p>{item._description}</p>
                    </div>
                    <div className="grid__collum-1">
                        {changeNumber(item.price_percent_discount)}
                    </div>
                    <div className="grid__collum-1 product-item-quatity">
                        <input type="number" min={1} value={item.quantity} />
                    </div>
                    <div className="grid__collum-1">
                        {changeNumber(item.price_percent_discount * item.quantity)}
                    </div>
                    <div className="grid__collum-1" >
                        <button className='btn-delete' onClick={() => handleDeleteProduct(item.productId)}>Xóa</button>
                    </div>
                </div>
            })}
            <div className="summary-section">
                <div className="summary-heading">Thông tin đơn hàng:</div>
                <p className="summary-label">Số sản phẩm ( {totalRecord} sản phẩm):</p>
                <p className="summary-value">{changeNumber(total)}₫</p>
                <p className="summary-label">Phí giao hàng:</p>
                <p className="summary-value">miễn phí</p>
                <div className="ma-giam-gia rows">
                    <input type="text" name="" id="" placeholder="Nhập mã giảm giá" />
                    <button style={{ marginLeft: '10px' }}>Áp dụng</button>
                </div>
                <p className="summary-label">Tổng cộng:</p>
                <p style={{ color: "#f57224" }}>{changeNumber(total)}₫</p>
                <p>Đã bao gồm phí VAT</p>
                <button>Xác nhận giỏ hàng</button>
            </div>
        </>
    )
}
