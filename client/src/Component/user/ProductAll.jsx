import React from 'react'

export default function ProductAll() {
    return (
        <div className="grid__row app__content">
            <div className="grid__collum-2">
                <nav className="category">
                    <h3 className="category__heading">Danh mục</h3>
                    <ul className="category-list">
                        <li className="category-item category-item--active">
                            <a href="##" className="category-item__link">
                                Trang điểm mặt
                            </a>
                        </li>
                        <li className="category-item">
                            <a href="##" className="category-item__link">
                                Trang điểm mắt
                            </a>
                        </li>
                        <li className="category-item">
                            <a href="##" className="category-item__link">
                                Trang điểm môi
                            </a>
                        </li>
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
                <div className="home-product">
                    <div className="grid__row">
                        <div className="grid__collum-2-4">
                            <a className="home-product-item" href="##">
                                <div
                                    className="home-product-item__img"
                                    style={{
                                        backgroundImage:
                                            "url(./public/assets/img/GS.008781_FEATURE_94404.jpg)"
                                    }}
                                ></div>
                                <h4 className="home-product-item__name">
                                    Laptop Lenovo IdeaPad 1 11IGL05 81VT006FVN (Pentium N5030/4GB RAM/256GB/11.6"HD/Win 11/Grey)
                                </h4>
                                <div className="home-product-item__price">
                                    <span className="home-product-item__price-old">
                                        10,990,000đ
                                    </span>
                                    <span className="home-product-item__price-curent">
                                        4,490,000đ
                                    </span>
                                </div>
                                <div className="home-product-item__action">
                                    <span className="home-product-item__like home-product-item__like-liked">
                                        <i className="home-product-item__icon-fill fa-solid fa-heart" />
                                        <i className="home-product-item__icon-empty fa-regular fa-heart" />
                                    </span>
                                    <div className="home-product-item__rating">
                                        <i className="home-product-item__start-gold fa-sharp fa-solid fa-star" />
                                        <i className="home-product-item__start-gold fa-sharp fa-solid fa-star" />
                                        <i className="home-product-item__start-gold fa-sharp fa-solid fa-star" />
                                        <i className="home-product-item__start-gold fa-sharp fa-solid fa-star" />
                                        <i className="fa-sharp fa-solid fa-star" />
                                    </div>
                                    <span className="home-product-item__sold">Đã bán</span>
                                </div>
                                <div className="home-product-item__origin">
                                    <span className="home-product-item__brand">Whoo</span>
                                    <span className="home-product-item__origin-name">
                                        Hàn Quóc
                                    </span>
                                </div>
                                <div className="home-product-item__favourite">
                                    <i className="fa-solid fa-check" />
                                    <span>Yêu thích</span>
                                </div>
                            </a>
                        </div>
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
            </div>
        </div>
    )
}
