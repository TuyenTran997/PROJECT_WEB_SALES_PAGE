import React from 'react'
import UserHeader from './UserHeader'
import HelpHeader from './HelpHeader'
import NotifyHeader from './NotifyHeader'
import SearchHeader from './SearchHeader'
import CartHeader from './CartHeader'
import { NavLink } from 'react-router-dom'

export default function Header() {
    return (
        <header className="header">
            <div className="grid">
                <nav className="header__navbar">
                    <ul className="header__navbar-list">
                        <li className="header__navbar-item header__navbar-item--has-qr header__navbar-item--separate ">
                            Vào cửa hang trên ứng dụng F8-Shop
                            <div className="header__qr">
                                <img
                                    src="http://localhost:8000/api/v1/products/uploads/images/QRcode.png"
                                    alt="QR"
                                    className="header__qr-img"
                                />
                                <div className="header__qr-apps">
                                    <a href="" className="header__pr-link">
                                        <img
                                            src="http://localhost:8000/api/v1/products/uploads/images/app_store.png"
                                            alt="App Store"
                                            className="header__qr-dowload-img"
                                        />
                                    </a>
                                    <a href="" className="header__pr-link">
                                        <img
                                            src="http://localhost:8000/api/v1/products/uploads/images/gg_play.png"
                                            alt="Goodle Play"
                                            className="header__qr-dowload-img"
                                        />
                                    </a>
                                </div>
                            </div>
                        </li>
                        <li className="header__navbar-item">
                            <span className="header__navbar-item-title-no-pointer">
                                Kết nối
                            </span>
                            <a href="" className="header__navbar-icon-link">
                                <i className="header__navbar-icon fa-brands fa-facebook" />
                            </a>
                            <a href="" className="header__navbar-icon-link">
                                <i className="header__navbar-icon fa-brands fa-instagram" />
                            </a>
                        </li>
                    </ul>
                    <ul className="header__navbar-list">

                        <NotifyHeader />

                        <HelpHeader />

                        <UserHeader />
                    </ul>
                </nav>
                {/* Header with search */}
                <div className="header-with-search">
                    <div className="header__logo">
                        <NavLink to="/" className="header__logo-link">
                            <h3 className="header__logo-img">TT_SALES_PAGE</h3>
                        </NavLink>
                    </div>

                    <SearchHeader />

                    <CartHeader />
                </div>
            </div>
        </header>
    )
}
