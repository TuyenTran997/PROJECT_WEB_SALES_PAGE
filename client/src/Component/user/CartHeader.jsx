import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { changeNumber } from '../../formData/formData';
import { NavLink } from 'react-router-dom';

export default function CartHeader() {
    const userLogin = JSON.parse(localStorage.getItem('user-login'))
    const [productId, setProductId] = useState('');
    const [quantity, setQuantity] = useState();
    const [arrCart, setArrCart] = useState([]);
    const handleEditQuantity = (quantity1, productId1) => {
        let quantity = arrCart.filter(item => item.productId === productId1)[0].quantity
        console.log(quantity);
    }
    const handleUpdateProduct = async () => {
        if (quantity !== 0 && productId !== '') {
            await axios.put(`http://localhost:8000/api/v1/carts?quantity=${quantity}&productId=${productId}&userId=${userLogin.userId}`)
                .then(res => { console.log(res); })
                .catch(err => { console.log(err); });
            loadArrCart();
        }
    }

    useEffect(() => {
        handleUpdateProduct()
    }, [quantity, productId])

    const [totalRecord, setTotalRecord] = useState(0);
    const total = arrCart.map((item) => (item.price_percent_discount * item.quantity)).reduce((a, b) => a + b, 0);
    const totalProduct = arrCart.map((item) => (item.quantity)).reduce((a, b) => a + b, 0);
    const loadArrCart = async () => {
        await axios.get(`http://localhost:8000/api/v1/carts/${userLogin.userId}`)
            .then(res => {
                setArrCart(res.data.data)
                setTotalRecord(res.data.totalRecord)
            })
            .catch(err => {
                console.log(err);
            })
    }

    const handleDeleteProduct = async (productId) => {
        confirm('Bạn muốn xóa sản phẩm này ra khỏi giỏ hàng không?');
        await axios.delete(`http://localhost:8000/api/v1/carts?productId=${productId}&userId=${userLogin.userId}`)
            .then(res => { console.log(res); })
            .catch(err => { console.log(err); });
        // window.location.reload();
    }

    useEffect(() => {
        loadArrCart();
    })

    return (
        <div className="header__cart">
            <div className="header__cart-wrap">
                <i className="header__cart-icon fa-solid fa-cart-shopping" />
                {totalRecord !== 0 ? <span className="header__cart-notify">{totalRecord}</span> : <></>}
                {/* has cart: header__cart-list--no-cart */}
                <div className="header__cart-list">
                    {totalRecord === 0 ? (
                        <>
                            <div className='header__cart-list--no-cart'>
                                <div
                                    className="header__cart-no-cart-img"
                                    style={{ backgroundImage: 'url(https://suckhoetruongtho.vn/assets/images/no-cart.png)' }}
                                >
                                </div>
                                <span className="header__cart-no-cart-msg">Chưa có sản phẩm</span>
                                <span style={{ fontWeight: '600', fontSize: '1.6rem' }}> Mua ngay nào... </span>
                            </div>
                        </>
                    ) : (
                        <>
                            <h4 className="header__cart-heading">Sản phẩm đã thêm</h4>
                            <ul className="header__cart-list-item">
                                {/* cart item */}
                                {arrCart.map((cartItem, index) => {
                                    return (
                                        <li className="header__cart-item">
                                            <img
                                                src={`http://localhost:8000/api/v1/products/uploads/images/${cartItem.image}`}
                                                alt=""
                                                className="header__cart-img"
                                            />
                                            <div className="header__cart-item-info">
                                                <div className="header__cart-item-head">
                                                    <h5 className="header__cart-item-name">
                                                        {cartItem.productName}
                                                    </h5>
                                                    <div className="header-cart-item-price-wrap">
                                                        <span className="header__cart-item-price">
                                                            {changeNumber(cartItem.price_percent_discount)} Đ
                                                        </span>
                                                        <span className="header__cart-item-multiply">x</span>
                                                        <span className="header__cart-item-qnt">{cartItem.quantity}</span>
                                                    </div>
                                                </div>
                                                <div className="header__cart-item-body">
                                                    <span className="header__cart-item-description">
                                                        Phân loại: Bạc
                                                    </span>
                                                    <span className="header__cart-item-remove" onClick={() => handleDeleteProduct(cartItem.productId)}>Xoá</span>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                })}
                            </ul>
                            <NavLink to={'/cart'} className="header__cart-view-cart btn btn--primary" >
                                Xem giỏ hàng
                            </NavLink>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
