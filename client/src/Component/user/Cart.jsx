import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { changeNumber } from '../../formData/formData';
import { NavLink } from 'react-router-dom';

export default function Cart() {

    const userLogin = JSON.parse(localStorage.getItem('user-login'))
    const [productId, setProductId] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [arrCart, setArrCart] = useState([]);

    const handleUpdateProduct = async () => {
        if (quantity !== 0 && productId !== '') {
            await axios.put(`http://localhost:8000/api/v1/carts?quantity=${quantity}&productId=${productId}&userId=${userLogin.userId}`)
                .then(res => { console.log(res); })
                .catch(err => { console.log(err); });
            loadArrCart();
        }
    }

    useEffect(() => {
        handleUpdateProduct();
    }, [quantity, productId])



    const [totalRecord, setTotalRecord] = useState(0);
    const total = arrCart.map((item) => (item.price_percent_discount * item.quantity)).reduce((a, b) => a + b, 0);
    const totalProduct = arrCart.map((item) => (item.quantity)).reduce((a, b) => a + b, 0);
    const loadArrCart = () => {
        axios.get(`http://localhost:8000/api/v1/carts/${userLogin.userId}`)
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
        loadArrCart();
    }

    useEffect(() => {
        loadArrCart();
    }, [])

    useEffect(() => {
        loadArrCart();
    }, [])

    return (
        <div>
            <h3 style={{ marginTop: '10px' }}>Thông tin giỏ hàng</h3>
            {totalRecord === 0 ? (
                <div className='header__cart-list--no-cart' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <div
                        className="header__cart-no-cart-img"
                        style={{ backgroundImage: 'url(https://suckhoetruongtho.vn/assets/images/no-cart.png)', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}
                    >
                    </div>
                    <span className="header__cart-no-cart-msg">Chưa có sản phẩm</span>
                    <NavLink to={'/'} style={{ textDecoration: 'none' }}><button className='btn' style={{ width: '60px', marginTop: '10px' }}> Mua ngay </button></NavLink>
                </div>
            ) : (
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
                    </div >
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
                            <div className="grid__collum-1 product-item-quatity" style={{ display: 'flex' }}>
                                {/* <button><i className="fas fa-minus" onChange={() => { setQuantity() }} ></i></button> */}
                                <input type="number" min={1} defaultValue={item.quantity} onClick={(e) => { setQuantity(e.target.value), setProductId(item.productId) }} />
                                {/* <button><i className="fas fa-plus" onChange={() => { setQuantity(+item.quantity + 1) }}></i></button> */}
                            </div>
                            <div className="grid__collum-1">
                                {quantity !== 0 && productId === item.productId ? changeNumber(quantity * item.price_percent_discount) : changeNumber(item.price_percent_discount * item.quantity)}
                            </div>
                            <div className="grid__collum-1" >
                                <button className='btn-delete' onClick={() => handleDeleteProduct(item.productId)}>Xóa</button>
                            </div>
                        </div>
                    })}
                    <div className="summary-section">
                        <div className="summary-heading">Thông tin đơn hàng:</div>
                        <p className="summary-label">{totalRecord} mặt hàng ( {totalProduct} sản phẩm):</p>
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
        </div >
    )
}
