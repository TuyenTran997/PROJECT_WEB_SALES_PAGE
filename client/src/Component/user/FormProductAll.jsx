import React, { useState } from 'react'
import { calculate, changeDate1, changeNumber } from '../../formData/formData'

export default function FormProductAll({ arrProduct, handleChangeProductId, buyProduct }) {

    const userLogin = JSON.parse(localStorage.getItem('user-login'))
    let userId = userLogin.userId;
    let userName = userLogin.userName;
    const [quantity, setQuantity] = useState(1);
    const createdDate = changeDate1(new Date());
    const createdBy = 'Trần Công Tuyến';
    const modifileDate = changeDate1(new Date());
    const modifileBy = 'Trần Công Tuyến';

    return (
        <>
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
            <div className="home-product">
                <div className="grid__row">
                    {arrProduct.map((item, index) => {
                        return <div className="grid__collum-2-4" key={index}>
                            <a className="home-product-item" href="##" onClick={() => handleChangeProductId(item.productId)}>
                                <div
                                    className="home-product-item__img"
                                    style={{
                                        backgroundImage:
                                            `url(http://localhost:8000/api/v1/products/uploads/images/${item.image})`
                                    }}
                                ></div>
                                <h4 className="home-product-item__name">
                                    {item.productName} ({item._description})
                                </h4>
                                <div className="home-product-item__price">
                                    <span className="home-product-item__price-old">
                                        {changeNumber(item.price)}
                                    </span>
                                    <span className="home-product-item__price-curent">
                                        {changeNumber(calculate(item.price, item.percent_discount))}
                                    </span>
                                </div>
                                <div className="home-product-item__action">
                                    {/* <span className="home-product-item__like home-product-item__like-liked">
                                        <i className="home-product-item__icon-fill fa-solid fa-heart" />
                                        <i className="home-product-item__icon-empty fa-regular fa-heart" />
                                    </span> */}
                                    {/* <div className="home-product-item__rating">
                                            <i className="home-product-item__start-gold fa-sharp fa-solid fa-star" />
                                            <i className="home-product-item__start-gold fa-sharp fa-solid fa-star" />
                                            <i className="home-product-item__start-gold fa-sharp fa-solid fa-star" />
                                            <i className="home-product-item__start-gold fa-sharp fa-solid fa-star" />
                                            <i className="fa-sharp fa-solid fa-star" />
                                        </div> */}

                                    <span className="home-product-item__sold">{item._status === 0 ? 'Còn hàng' : 'Hết hàng'}</span>
                                    <button className='btn-buy' onClick={() => buyProduct({ ...item, userId: userId, quantity: quantity, price_percent_discount: calculate(item.price, item.percent_discount), userName: userName, createdDate: createdDate, createdBy: createdBy, modifileDate, modifileBy: modifileBy })}>Đặt hàng</button>
                                </div>
                                {/* <div className="home-product-item__origin">
                                        <span className="home-product-item__brand">Whoo</span>
                                        <span className="home-product-item__origin-name">
                                            Hàn Quóc
                                        </span>
                                    </div> */}
                                <div className="home-product-item__favourite">
                                    <i className="fa-solid fa-check" />
                                    <span>Yêu thích</span>
                                </div>
                            </a>
                        </div>
                    })}

                </div>
            </div>
            <ul className="pagination home-product__pagination">
                <li className="pagination-item">
                    <a href="#" className="pagination-item__link">
                        <i className="pagination-item__icon fa-solid fa-chevron-left" />
                    </a>
                </li>
                <li className="pagination-item pagination-item--active">
                    <a href="#" className="pagination-item__link">
                        1
                    </a>
                </li>
                <li className="pagination-item">
                    <a href="#" className="pagination-item__link">
                        2
                    </a>
                </li>
                <li className="pagination-item">
                    <a href="#" className="pagination-item__link">
                        3
                    </a>
                </li>
                <li className="pagination-item">
                    <a href="#" className="pagination-item__link">
                        4
                    </a>
                </li>
                <li className="pagination-item">
                    <a href="#" className="pagination-item__link">
                        5
                    </a>
                </li>
                <li className="pagination-item">
                    <a href="#" className="pagination-item__link">
                        ...
                    </a>
                </li>
                <li className="pagination-item">
                    <a href="#" className="pagination-item__link">
                        14
                    </a>
                </li>
                <li className="pagination-item">
                    <a href="#" className="pagination-item__link">
                        <i className="pagination-item__icon fa-solid fa-chevron-right" />
                    </a>
                </li>
            </ul>
        </>
    )
}
