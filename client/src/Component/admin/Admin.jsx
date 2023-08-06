import React, { useState } from 'react'
import Category from './Category'
import UserManager from './UserManager'
import ProductManager from './ProductManager'
import FormAddProduct from './FormAddProduct'
import FormAddUser from './FormAddUser'
import { Link, NavLink, Outlet, Route, Routes, useNavigate, useParams } from 'react-router-dom'
import FormCategory from './FormCategory'
import FormClassity from './FormClassity'

export default function Admin() {
    const navigate = useNavigate()
    const userLogin = JSON.parse(localStorage.getItem('user-login'));
    const handleLogout = () => {
        localStorage.removeItem('user-login')
        navigate('/login')
    }

    const list = [
        { id: 1, value: 'Manger User', path: '' },
        { id: 2, value: 'Category', path: '/category' },
        { id: 3, value: 'Classify', path: '/classify' },
        { id: 4, value: 'Product Manager', path: '/product' }
    ]

    const [check, setCheck] = useState(1);

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
                        {list.map((item, index) => {
                            return (
                                <NavLink style={{ textDecoration: 'none' }} className="link" to={`/admin${item.path}`} key={index}>
                                    <li className={`navbar-list-item ${check === item.id ? 'active' : ''}`} onClick={() => setCheck(item.id)}>
                                        <span className="">{item.value}</span>
                                    </li>
                                </NavLink>
                            )
                        })}

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
                                            <img src={`http://localhost:8000/api/v1/users/uploads/images/${userLogin.image}`} alt='' />
                                            <span className="text-dark">{userLogin.userName}</span>
                                            <i className="fas fa-angle-down"></i>
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
                                            <Link className="" to="/login">
                                                Đăng xuất
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </nav>
                    <main className="content">
                        {/* {type === null && <UserManager />} */}
                        {/* <UserManager /> */}
                        {/* <Category /> */}
                        {/* {type === 'product-manager' && <ProductManager />} */}
                        {/* <FormClassity /> */}
                        <Outlet />
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
