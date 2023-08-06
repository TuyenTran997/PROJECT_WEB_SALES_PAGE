import React, { useEffect, useState } from 'react'
import Header from './Header';
import Footer from './Footer';
import Cart from './Cart';
import Product from './Product';
import ProductAll from './ProductAll';
import axios from 'axios';
import ShowProduct from './ShowProduct';
import FormUpdateInfo from './FormUpdateInfo';
import ModalLayout from '../headerComponent/ModalLayout';
import { Link, NavLink, Outlet } from 'react-router-dom';


export default function User() {
    const userLogin = JSON.parse(localStorage.getItem('user-login'))

    const [arrCart, setArrCart] = useState([]);
    const [quantity, setQuantity] = useState(0);
    const calculatedQuantity = (a, b) => a + b;
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

    const handleDeleteProduct = async (productId) => {
        confirm('Bạn muốn xóa sản phẩm này ra khỏi giỏ hàng không?');
        await axios.delete(`http://localhost:8000/api/v1/carts?productId=${productId}&userId=${userLogin.userId}`)
            .then(res => { console.log(res); })
            .catch(err => { console.log(err); });
        loadArrCart();
    }

    const loadListProduct = async () => {
        axios.get(`http://localhost:8000/api/v1/products/product/all`)
            .then(res => {
                if (res.data.status === 200) {
                    console.log(res.data.data);
                }
            })
            .catch(err => console.log(err));
    }

    const [arrCategory, setArrCategory] = useState([]);
    const loadArrCategory = () => {
        axios.get('http://localhost:8000/api/v1/categories/category/all')
            .then(res => {
                if (res.data.status === 200) {
                    setArrCategory(res.data.data);
                }
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        loadArrCart();
        loadArrCategory();
    }, [])


    return (
        <>
            <div className="app">
                <Header />
                <div className="app__container">
                    <div className="grid">
                        <div className="grid__row app__content">
                            <div className="grid__collum-2">
                                <nav className="category">
                                    <h3 className="category__heading">Danh mục</h3>
                                    <ul className="category-list">
                                        {arrCategory.map((item, index) => {
                                            return (
                                                <NavLink to={`/category/${item.categoryId}`} className="category-item__link" key={index}>
                                                    <li className="category-item category-item--active"  >
                                                        {item.categoryName}
                                                    </li>
                                                </NavLink>
                                            )
                                        })}
                                    </ul>
                                </nav>
                            </div>
                            <div className="grid__collum-10">
                                <div className="home-filter">
                                    <span className="home-filter__label">Sắp xếp theo</span>
                                    <button className="btn home-filter__btn">Phổ biến</button>
                                    <button className="btn btn--primary home-filter__btn">
                                        Mới nhất
                                    </button>
                                    <button className="btn home-filter__btn">Bán chạy</button>
                                    <div className="select-input">
                                        <span className="select-input__label">Giá</span>
                                        <i className="select-input__icon fa-solid fa-chevron-down" />
                                        <ul className="select-input__list">
                                            <li className="select-input__item">
                                                <a href="#" className="select-input__link">
                                                    Giá thấp đến cao
                                                </a>
                                            </li>
                                            <li className="select-input__item">
                                                <a href="#" className="select-input__link">
                                                    {" "}
                                                    Giá cao đến thấp
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="home-filter__page">
                                        <span className="home-filter__page-num">
                                            <span className="home-filter__page-curent">1</span>/14
                                        </span>
                                        <div className="home-filter__page-control">
                                            <a
                                                href="#"
                                                className="home-filter__page--btn home-filter__page--btn-disable"
                                            >
                                                <i className="home-filter__page-icon fa-solid fa-chevron-left" />
                                            </a>
                                            <a href="#" className="home-filter__page--btn">
                                                <i className="home-filter__page-icon fa-solid fa-chevron-right" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <Outlet />
                            </div>
                        </div>
                        {/* <ShowProduct /> */}
                        {/* <ProductAll buyProduct={buyProduct} loadArrCart={loadArrCart} /> */}
                        {/* <Cart totalRecord={totalRecord} totalProduct={totalProduct} arrCart={arrCart} total={total} handleDeleteProduct={handleDeleteProduct} loadArrCart={loadArrCart} buyProduct={buyProduct} /> */}
                    </div>
                </div>
                <Footer />
                {/* <FormUpdateInfo /> */}
            </div>
            {/* <FormUpdateInfo /> */}
        </>
    )
}
