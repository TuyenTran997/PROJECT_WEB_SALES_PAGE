import React from 'react'

export default function CartHeader() {
    return (
        <div className="header__cart">
            <div className="header__cart-wrap">
                <i className="header__cart-icon fa-solid fa-cart-shopping" />
                <span className="header__cart-notify">3</span>
                {/* has cart: header__cart-list--no-cart */}
                <div className="header__cart-list">
                    <img
                        className="header__cart-no-cart-img"
                        src="./assets/img/no_cart.png"
                        alt=""
                    />
                    <span className="header__cart-no-cart-msg">Chưa có sản phẩm</span>
                    <h4 className="header__cart-heading">Sản phẩm đã thêm</h4>
                    <ul className="header__cart-list-item">
                        {/* cart item */}
                        <li className="header__cart-item">
                            <img
                                src="https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQeeZDVUrEHiSweYjhvk8e5rMfR7zovtO73q2NhzHaFapdxPHFUYWjaAnnKxlVr_RoaQRcKfbv1jeo&usqp=CAc"
                                alt=""
                                className="header__cart-img"
                            />
                            <div className="header__cart-item-info">
                                <div className="header__cart-item-head">
                                    <h5 className="header__cart-item-name">
                                        Bộ kem đặc trị vùng mặt
                                    </h5>
                                    <div className="header-cart-item-price-wrap">
                                        <span className="header__cart-item-price">
                                            2.000.000D
                                        </span>
                                        <span className="header__cart-item-multiply">x</span>
                                        <span className="header__cart-item-qnt">2</span>
                                    </div>
                                </div>
                                <div className="header__cart-item-body">
                                    <span className="header__cart-item-description">
                                        Phân loại: Bạc
                                    </span>
                                    <span className="header__cart-item-remove">Xoá</span>
                                </div>
                            </div>
                        </li>
                        <li className="header__cart-item">
                            <img
                                src="data:image/jpeg;base64,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"
                                alt=""
                                className="header__cart-img"
                            />
                            <div className="header__cart-item-info">
                                <div className="header__cart-item-head">
                                    <h5 className="header__cart-item-name">
                                        Bộ kem đặc trị vùng mặt
                                    </h5>
                                    <div className="header-cart-item-price-wrap">
                                        <span className="header__cart-item-price">
                                            2.000.000D
                                        </span>
                                        <span className="header__cart-item-multiply">x</span>
                                        <span className="header__cart-item-qnt">2</span>
                                    </div>
                                </div>
                                <div className="header__cart-item-body">
                                    <span className="header__cart-item-description">
                                        Phân loại: Bạc
                                    </span>
                                    <span className="header__cart-item-remove">Xoá</span>
                                </div>
                            </div>
                        </li>
                        <li className="header__cart-item">
                            <img
                                src="https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQPMx3zM7aGIFYSiMDIjKBj-qdTKteXSDmuAvG2ZDIZqslPX5Kk3WqnPRtr5K8F39N6Bp6S8GAvnw&usqp=CAc"
                                alt=""
                                className="header__cart-img"
                            />
                            <div className="header__cart-item-info">
                                <div className="header__cart-item-head">
                                    <h5 className="header__cart-item-name">
                                        Bộ kem đặc trị vùng mặt
                                    </h5>
                                    <div className="header-cart-item-price-wrap">
                                        <span className="header__cart-item-price">
                                            2.000.000D
                                        </span>
                                        <span className="header__cart-item-multiply">x</span>
                                        <span className="header__cart-item-qnt">2</span>
                                    </div>
                                </div>
                                <div className="header__cart-item-body">
                                    <span className="header__cart-item-description">
                                        Phân loại: Bạc
                                    </span>
                                    <span className="header__cart-item-remove">Xoá</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <a href="#" className="header__cart-view-cart btn btn--primary">
                        Xem giỏ hàng
                    </a>
                </div>
            </div>
        </div>
    )
}
