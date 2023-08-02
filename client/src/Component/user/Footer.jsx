import React from 'react'

export default function Footer() {
    return (
        <footer className="footer">
            <div className="grid">
                <div className="grid__row grip__row-2-4">
                    <div className="grid__collum-2-4">
                        <h3 className="footer__heading">CHĂM SÓC KHÁCH HÀNG</h3>
                        <ul className="footer__list">
                            <li className="footer__item">
                                <a href="" className="footer__item-link">
                                    Trung tâm trợ giúp
                                </a>
                            </li>
                            <li className="footer__item">
                                <a href="" className="footer__item-link">
                                    T_SALES_PAGE_T
                                </a>
                            </li>
                            <li className="footer__item">
                                <a href="" className="footer__item-link">
                                    Hướng dẫn mua hàng
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="grid__collum-2-4">
                        <h3 className="footer__heading">Giới thiệu</h3>
                        <ul className="footer__list">
                            <li className="footer__item">
                                <a href="" className="footer__item-link">
                                    Giới thiệu
                                </a>
                            </li>
                            <li className="footer__item">
                                <a href="" className="footer__item-link">
                                    Tuyển dụng
                                </a>
                            </li>
                            <li className="footer__item">
                                <a href="" className="footer__item-link">
                                    Điều khoản
                                </a>
                            </li>
                        </ul>
                    </div>
                    {/* <div className="grid__collum-2-4">
                        <h3 className="footer__heading">DANH MỤC</h3>
                        <ul className="footer__list">
                            <li className="footer__item">
                                <a href="" className="footer__item-link">
                                    Trang diem mat
                                </a>
                            </li>
                            <li className="footer__item">
                                <a href="" className="footer__item-link">
                                    Trang diem mat
                                </a>
                            </li>
                            <li className="footer__item">
                                <a href="" className="footer__item-link">
                                    Trang diem moi
                                </a>
                            </li>
                        </ul>
                    </div> */}
                    <div className="grid__collum-2-4">
                        <h3 className="footer__heading">Theo doi</h3>
                        <ul className="footer__list">
                            <li className="footer__item">
                                <a href="" className="footer__item-link">
                                    <i className="footer__item-icon fa-brands fa-facebook" />
                                    Facebook
                                </a>
                            </li>
                            <li className="footer__item">
                                <a href="" className="footer__item-link">
                                    <i className="footer__item-icon fa-brands fa-instagram" />
                                    Instagram
                                </a>
                            </li>
                            <li className="footer__item">
                                <a href="" className="footer__item-link">
                                    <i className="footer__item-icon fa-brands fa-linkedin" />
                                    LinkedIn
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="grid__collum-2-4">
                        <h3 className="footer__heading">Vao cua hang tren ung dung</h3>
                        <div className="footer-dowload">
                            <img
                                src="./assets/img/QRcode.png"
                                alt=""
                                className="footer-dowload__qr"
                            />
                            <div className="footer-dowload__app">
                                <a href="" className="app__link">
                                    <img
                                        src="./assets/img/app_store.png"
                                        alt="Dowload App Store"
                                        className="footer-dowload__app-img"
                                    />
                                </a>
                                <a href="" className="app__link">
                                    <img
                                        src="./assets/img/gg_play.png"
                                        alt="Dowload Google Play"
                                        className="footer-dowload__app-img"
                                    />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="gird__row"></div>
            </div>
            <div className="footer-bottom">
                <div className="gird">
                    <p className="footer__text">2019 - Ban quyen thuoc ve Cong ty MyCV</p>
                </div>
            </div>
        </footer>
    )
}
