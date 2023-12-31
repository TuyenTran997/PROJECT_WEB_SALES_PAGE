import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { notification } from 'antd'

export default function UserHeader() {
    const navigate = useNavigate()
    const userLogin = JSON.parse(localStorage.getItem('user-login')) || {};
    const handleLogout = () => {
        localStorage.removeItem('user-login')
        navigate('/login')
    }

    return (
        <>
            {/* <li className="header__navbar-item header__navbar-item--strong header__navbar-item--separate" onClick={() => { navigate('/login') }}>
                Đăng nhập
            </li>
            <li className="header__navbar-item header__navbar-item--strong" onClick={() => { navigate('/register') }}>
                Đăng ký
            </li> */}
            <li className="header__navbar-item header__navbar-user">
                <img
                    className="header__navbar-user-img"
                    src={`http://localhost:8000/api/v1/users/uploads/images/${userLogin.image}`}
                    alt=""
                />
                <span className="header__navbar-user-name" style={{ marginRight: '10px' }}>
                    {userLogin.userName}
                </span>
                <i className="fas fa-angle-down"></i>
                <ul className="header__navbar-user-menu">
                    <li className="header__navbar-user-item">
                        <a href="#">Tài khoản của tôi</a>
                    </li>
                    <li className="header__navbar-user-item">
                        <a href="#">Địa chỉ của tôi</a>
                    </li>
                    <li className="header__navbar-user-item">
                        <a href="#">Đơn mua</a>
                    </li>
                    <li className="header__navbar-user-item header__navbar-user-item-separate" onClick={handleLogout} >
                        <a href="">Đăng xuất</a>
                    </li>
                </ul>
            </li>
        </>
    )
}
