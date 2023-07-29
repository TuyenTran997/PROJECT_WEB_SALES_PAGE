import React from 'react'

export default function NotifyHeader() {
    return (
        <li className="header__navbar-item header__navbar-item--has-notify">
            <a className="header__navbar-item-link" href="">
                <i className="header__navbar-icon fa-regular fa-bell" />
                Thông báo
            </a>
            <div className="header__notify">
                <header className="header__notify-header">
                    <h3>Thông báo mới nhất</h3>
                </header>
                <ul className="header__notify-list">
                    <li className="header__notify-item header__notify-item--viewed">
                        <a href="" className="header__notify-link">
                            <img
                                src="./assets/img/anh sp.jpg"
                                alt=""
                                className="header__notify-img"
                            />
                            <div className="header__notify-info">
                                <span className="header__notify-name">
                                    Mỹ phẩm Ohui chính hãng
                                </span>
                                <span className="header__notify-descrition">
                                    Mô tả nỹ phẩm Ohui chính hãng
                                </span>
                            </div>
                        </a>
                    </li>
                    <li className="header__notify-item header__notify-item--viewed">
                        <a href="" className="header__notify-link">
                            <img
                                src="./assets/img/anh sp.jpg"
                                alt=""
                                className="header__notify-img"
                            />
                            <div className="header__notify-info">
                                <span className="header__notify-name">
                                    Mỹ phẩm Ohui chính hãng
                                </span>
                                <span className="header__notify-descrition">
                                    Mô tả nỹ phẩm Ohui chính hãng
                                </span>
                            </div>
                        </a>
                    </li>
                    <li className="header__notify-item">
                        <a href="" className="header__notify-link">
                            <img
                                src="./assets/img/anh sp.jpg"
                                alt=""
                                className="header__notify-img"
                            />
                            <div className="header__notify-info">
                                <span className="header__notify-name">
                                    Mỹ phẩm Ohui chính hãng
                                </span>
                                <span className="header__notify-descrition">
                                    Mô tả nỹ phẩm Ohui chính hãng
                                </span>
                            </div>
                        </a>
                    </li>
                    <footer className="header__notify-footer">
                        <a href="" className="header__notify-footer-btn">
                            Xem tất cả
                        </a>
                    </footer>
                </ul>
            </div>
        </li>
    )
}
