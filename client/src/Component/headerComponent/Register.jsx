import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

export default function Register() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [roleId, setRoleId] = useState(1);
    const [message, setMessage] = useState('');
    const [conformPassword, setConformPassword] = useState('')
    console.log();
    console.log(message);
    const newUser = {
        userName: userName,
        email: email,
        _password: password,
        roleId: roleId
    }
    const handleRegister = (e) => {
        e.preventDefault();
        if (conformPassword === password) {
            axios.post('http://localhost:8000/api/v1/users', newUser)
                .then(res => console.log(res))
                .catch(err => console.log(err))
            navigate('/login');
        } else {
            setMessage('Mật khẩu nhập lại không đúng, kiểm tra lại')
        }
    }

    return (
        <>
            <div className="modal_contaier modal_contaier-form">
                {/* <div class="modal__overlay"></div> */}
                <div className="modal__body">
                    <h2>Hãy đăng ký để trở thành thành viên của TT SHOP !!!</h2>
                    <div className="auth-form auth-form-form">
                        <form onSubmit={handleRegister}>
                            <div className="auth-form__container auth-form__container-mt">
                                <div className="auth-form__header">
                                    <h3 className="auth-form__heading">Đăng ký</h3>
                                    <span className="auth-form__switch-btn">Đăng nhập</span>
                                </div>
                                <div className="auth-form__form">
                                    <div className="auth-form__group">
                                        <input type="text" className="auth-form__input" placeholder="Tên của bạn"
                                            value={userName} onChange={(e) => setUserName(e.target.value)} />
                                    </div>
                                    <div className="auth-form__group">
                                        <input type="email" className="auth-form__input" placeholder="Email của bạn"
                                            value={email} onChange={(e) => { setEmail(e.target.value) }} />
                                    </div>
                                    <div className="auth-form__group">
                                        <input type="password" className="auth-form__input" placeholder="Mật khẩu của bạn"
                                            value={password} onChange={(e) => { setPassword(e.target.value) }} />
                                    </div>
                                    <div className="auth-form__group">
                                        <input type="password" className="auth-form__input" placeholder="Nhập lại mật khẩu"
                                            value={conformPassword} onChange={(e) => { setConformPassword(e.target.value) }} />
                                    </div>
                                    <p>{message}</p>
                                    <input type="number" value={1} onChange={e => setRoleId(e.target.value)} hidden />
                                </div>
                                <div className="auth-form__aside">
                                    <p className="auth-form__policy-text">
                                        Bằng việc Đăng ký, bạn đã đồng ý với TT-Shop về,
                                        <a href="" className="auth-form__policy-link">Điều khoản dịch vụ</a> &
                                        <a href="" className="auth-form__policy-link">Chính sách bảo mật</a>
                                    </p>
                                </div>
                                <div className="auth-form__controls">
                                    <button className="btn auth-form__controls-back btn-normal">TRỞ LẠI</button>
                                    <button className="btn btn--primary" type='submit' >ĐĂNG KÝ</button>
                                </div>
                            </div>
                        </form>
                        <div className="auth-form__socials">
                            <a href="" className="btn btn--size-s btn--with-icon auth-form__socials--facebook">
                                <i className="auth-form__socials-icon fa-brands fa-square-facebook"></i>
                                <span className="auth-form__socials-title">Kết nối với facebook</span>
                            </a>
                            <a href="" className="auth-form__socials--google btn btn--size-s btn--with-icon">
                                <i className="auth-form__socials-icon fa-brands fa-google"></i>
                                <span className="auth-form__socials-title">Kết nối với Google</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
