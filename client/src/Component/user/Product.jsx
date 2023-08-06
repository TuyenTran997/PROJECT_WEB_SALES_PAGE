import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { calculate, changeDate1, changeNumber } from '../../formData/formData';
import { useParams } from 'react-router-dom';

export default function Product() {
    const userLogin = JSON.parse(localStorage.getItem('user-login'))
    let userId = userLogin.userId;
    let userName = userLogin.userName;

    const productId = useParams().productId;

    const arrStatus = [
        { statusId: 0, status: 'Còn hàng' },
        { statusId: 1, status: 'Hết hàng' },
    ];

    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    console.log(typeof quantity, quantity);
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
    useEffect(() => {
        loadArrCart()
    }, [quantity])
    useEffect(() => loadProductData(), [productId]);

    const [arrCart, setArrCart] = useState([]);
    const buyProduct = async (productBuy) => {
        let check;
        let quantity;
        if (productBuy._status === 1) {
            alert('Sản phẩm bạn chọn đã hết hàng, bạn vui lòng xem các sản phẩm tương tự trong Shop. Xin cảm ơn!')
        } else if (productBuy._status === 0) {
            if (arrCart.length === 0) {
                confirm("Bạn có muốn thêm sản phẩm vào giỏ hàng của bạn không?")
                await axios.post('http://localhost:8000/api/v1/carts', productBuy)
                    .then(res => console.log(res))
                    .catch(err => console.error(err))
            } else
                if (arrCart.length > 0) {
                    arrCart.find((item) => {
                        if (userLogin.userId === productBuy.userId) {
                            if (item.productId === productBuy.productId) {
                                quantity = item.quantity + productBuy.quantity;
                                check = true
                            } else {
                                check = false;
                            }
                        }
                    })
                }
        }
        if (check) {
            confirm('Sản phẩm đã có trong giỏ hàng, bạn có muốn thêm vào giỏ hàng nữa không?')
            await axios.put(`http://localhost:8000/api/v1/carts?quantity=${quantity}&productId=${productBuy.productId}&userId=${userLogin.userId}`)
                .then(res => { console.log(res); })
                .catch(err => { console.log(err); });
        }
        if (check === false) {
            confirm('Bạn muốn thêm sản phẩm vào giỏ hàng?')
            await axios.post('http://localhost:8000/api/v1/carts', productBuy)
                .then(res => console.log(res))
                .catch(err => console.error(err))
        }
        loadArrCart();
        setQuantity(1);
    }
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


    useEffect(() => {
        loadArrCart();
    }, [])


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
                            <input type="number" min={1} value={quantity} onChange={(e) => setQuantity(+e.target.value)} />
                            <button title='Thêm vào giỏ hàng' onClick={() => buyProduct({ ...product, userId: userId, quantity: quantity, price_percent_discount: calculate(product.price, product.percent_discount), userName: userName, createdDate: createdDate, createdBy: createdBy, modifileDate, modifileBy: modifileBy })}>MUA HÀNG</button>
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
