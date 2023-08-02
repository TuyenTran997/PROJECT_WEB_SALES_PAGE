import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { calculate, changeDate1, changeNumber } from '../../formData/formData';

export default function Product({ productId, buyProduct, quantity, setQuantity }) {
    const userLogin = JSON.parse(localStorage.getItem('user-login'))
    let userId = userLogin.userId;
    let userName = userLogin.userName;
    const arrStatus = [
        { statusId: 0, status: 'Còn hàng' },
        { statusId: 1, status: 'Hết hàng' },
    ];

    const [product, setProduct] = useState({})
    const createdDate = changeDate1(new Date());
    const createdBy = 'Trần Công Tuyến';
    const modifileDate = changeDate1(new Date());
    const modifileBy = 'Trần Công Tuyến';
    const loadProductData = () => {
        axios.get(`http://localhost:8000/api/v1/products/${productId}`)
            .then(res => {
                if (res.status === 200) {
                    setProduct(res.data.data[0])
                }
            })
            .catch(err => console.error(err))
    };

    useEffect(() => loadProductData(), [productId]);
    return (
        <>
            <div className="home-product-item">
                <div className="grid__row">
                    <div className="grid__collum-5">
                        <div
                            className="home-product-item__img"
                            style={{
                                backgroundImage:
                                    `url(http://localhost:8000/api/v1/products/uploads/images/${product.image})`
                            }}
                        ></div>
                    </div>
                    <div className="grid__collum-7 product-item-info">
                        <p className='product-item-title'>Thông tin sản phẩm:</p>
                        <p>{product.productName}</p>
                        <p>{product._description}</p>
                        <div className="product-item-info__price">
                            <span className="home-product-item__price-old product-item-info__price-old">
                                {changeNumber(product.price)}
                            </span>
                            <span className="home-product-item__price-curent home-product-item-info__price-curent">
                                {changeNumber(calculate(product.price, product.percent_discount))}
                            </span>
                        </div>
                        <div>
                            {arrStatus.map((item, index) => {
                                return <label key={index} className='btn-fontSize fw-500' style={{ marginRight: '20px' }} >
                                    {item.status}
                                    <input type="radio" name='status' style={{ marginLeft: '10px' }} checked={item.statusId === product._status} value={item.statusId} onClick={(e) => setStatus(e.target.value)} />
                                </label>
                            })}
                        </div>
                        <div className='product-item-info__description'>
                            <p>Model: {product.model}</p>
                            <p>Mã SP: {product.product_code}</p>
                        </div>
                        {/* <div className='product-item__promotion'>
                            <span>KHUYẾN MẠI</span>
                            <li>Chuột quang có dây Newmen M007 trị giá 149,000đ</li>
                            <li>Giảm giá 10% chuột trị giá dưới 1 triệu, khi mua kèm với tất cả laptop (xem chi tiết)</li>
                            <li>Giảm giá 10% balo, túi khi mua kèm với tất cả Laptop (xem chi tiết)</li>
                        </div> */}
                        <div className='product-item__choose'>
                            <label htmlFor="">Số lượng &nbsp;</label>
                            <input type="number" min={1} value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                            <button title='Thêm vào giỏ hàng' onClick={() => buyProduct({ ...product, userId: userId, quantity: quantity, price_percent_discount: calculate(product.price, product.percent_discount), userName: userName, createdDate: createdDate, createdBy: createdBy, modifileDate, modifileBy: modifileBy })}>MUA HÀNG</button>
                            <button title='Thêm vào danh sách quan tâm'>
                                <i className="fa-solid fa-heart" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='product-comment'>
                <div className='product-comment-title'>
                    <p>Bình luận</p>
                </div>
                <div className='product-comment-write'>
                    <textarea name="" id="" cols="30" rows="10" placeholder='Nhập nội dung bình luận'></textarea>
                </div>
                <button>Gửi bình luận &nbsp;
                    <i className="fas fa-paper-plane"></i>
                </button>
            </div>
            <div className='render-comment'>
                <p>Username</p>
                <p>Nội dung comment</p>
                <span>Thời gian bình luận</span>
            </div>
        </>

    )
}
