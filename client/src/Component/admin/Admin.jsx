import React from 'react'
import Category from './Category'
import UserManager from './UserManager'
import ProductManager from './ProductManager'
import FormAddProduct from './FormAddProduct'
import FormAddUser from './FormAddUser'
import { Link, Outlet, Route, Routes, useNavigate } from 'react-router-dom'
import FormCategory from './FormCategory'
import FormClassity from './FormClassity'

export default function Admin() {
    const navigate = useNavigate()
    // const userLogin = JSON.parse(localStorage.getItem('user-login'));
    const handleLogout = () => {
        localStorage.removeItem('user-login')
        navigate('/login')
    }

    return (
        <>
            <div className="container__admin">
                <nav className="wrapper-sidebar">
                    <div className="wrapper-sidebar_nameShop">
                        <a className="" href="index.html">
                            <span className="">Admin Mabuu997</span>
                        </a>
                    </div>
                    <ul className="navbar-list">
                        <span className='navbar-list-title'>DANH MỤC</span>
                        <li className="navbar-list-item">
                            <a className="s" href="#">
                                <i className="" />
                                <span className="">Dashboard</span>
                            </a>
                        </li>
                        <li className="navbar-list-item">
                            <a className="" href="#">
                                <i className="" />
                                <span className="">Category</span>
                            </a>
                        </li>
                        <li className="navbar-list-item">
                            <a className="" href="#">
                                <i className="" data-feather="square" />{" "}
                                <span className="">Product </span>
                            </a>
                        </li>
                        <li className="navbar-list-item">
                            <a className="" href="#">
                                <i className="" data-feather="user" />{" "}
                                <span className="">Manager User</span>
                            </a>
                        </li>
                    </ul>
                </nav >
                <div className="main" style={{ width: '100%' }}>
                    <nav className="navbar__admin">
                        <div className="nav-item-iconMenu">
                            <i className="fas fa-bars"></i>
                        </div>
                        <div className="nav__admin-info">
                            <div className="navbar-item">
                                <a href="#"><i className="far fa-bell"></i></a>
                                <a href="#"><i className="far fa-comment-alt"></i></a>
                                <div className='navbar-item__info-admin'>
                                    <div className='navbar__info-admin'>
                                        <a href="">
                                            <img src='./public/assets/img/logo.png' alt='' />
                                            <span className="text-dark"></span>
                                            <i class="fas fa-angle-down"></i>
                                        </a>
                                    </div>
                                    <ul className="nav__drop">
                                        <li>
                                            <a className="" href="#">
                                                <i className="align-middle me-1" data-feather="user" />
                                                Thông tin cá nhân
                                            </a>
                                        </li>
                                        <li>
                                            <a className="" href="#">
                                                <i className="align-middle me-1" data-feather="pie-chart" />
                                                Analytics
                                            </a>
                                        </li>
                                        <li>
                                            <a className="" href="index.html">
                                                <i className="align-middle me-1" data-feather="settings" />{" "}
                                                Cài đặt &amp; Bảo mật
                                            </a>
                                        </li>
                                        <li>
                                            <a className="" href="#">
                                                <i className="align-middle me-1" data-feather="help-circle" />{" "}
                                                Trung tâm hỗ trợ
                                            </a>
                                        </li>
                                        <li onClick={() => handleLogout()}>
                                            <Link className="" href="#">
                                                Đăng xuất
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </nav>
                    <main className="content">
                        {/* <UserManager />
                        <Category /> */}
                        <ProductManager />

                        {/* <FormClassity /> */}


                    </main>
                    <footer className="footer-admin">
                        <div className="container-fluid">
                            <div className="row text-muted">
                                <div className="col-6 text-start">
                                    <p className="mb-0">
                                        <a className="text-muted" href="" target="_blank">
                                            <strong>ADMIN SHOP</strong>
                                        </a>
                                    </p>
                                </div>
                                <div className="col-6 text-end">
                                    <ul className="list-inline">
                                        <li className="list-inline-item">
                                            <a className="text-muted" href="#" target="_blank">
                                                Support
                                            </a>
                                        </li>
                                        <li className="list-inline-item">
                                            <a className="text-muted" href="#" target="_blank">
                                                Help Center
                                            </a>
                                        </li>
                                        <li className="list-inline-item">
                                            <a className="text-muted" href="#" target="_blank">
                                                Privacy
                                            </a>
                                        </li>
                                        <li className="list-inline-item">
                                            <a className="text-muted" href="#" target="_blank">
                                                Terms
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
            </div >
            {/* <FormCategory /> */}
        </>
    )
}
