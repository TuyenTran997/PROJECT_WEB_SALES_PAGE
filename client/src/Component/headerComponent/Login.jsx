import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const user = {
        email: email,
        _password: password,
    }

    const hadndleLogin = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:8000/api/v1/users/login', user)
            .then(res => {
                if (res.status === 200) {
                    if (res.data.data.roleId === 0) {
                        localStorage.setItem('user-login', JSON.stringify(res.data.data));
                    } else {
                        localStorage.setItem('user-login', JSON.stringify(res.data.data));
                    }
                }
            })
            .catch(err => console.log(err))
    }

    const navigate = useNavigate();
    return (
        <>
            <div className="modal_contaier modal_contaier-form">
                {/* <div className="modal__overlay"></div> */}
                <div className="modal__body">
                    <h2>Hãy đăng nhập để truy cập TT SHOP !!!</h2>
                    <div className="auth-form auth-form-form">
                        <div className="auth-form__container auth-form__container-mt">
                            <div className="auth-form__header">
                                <h3 className="auth-form__heading">Đăng nhập</h3>
                                <span className="auth-form__switch-btn" onClick={() => { navigate('/register') }}>Đăng ký</span>
                            </div>
                            <form method='POST' onSubmit={hadndleLogin}>
                                <div className="auth-form__form">
                                    <div className="auth-form__group">
                                        <input type="email" className="auth-form__input" placeholder="Email của bạn" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                    <div className="auth-form__group">
                                        <input value={1} hidden />
                                    </div>
                                    <div className="auth-form__group">
                                        <input type="password" className="auth-form__input" placeholder="Mật khẩu của bạn" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                </div>
                                <div className="auth-form__aside">
                                    <div className="auth-form__help">
                                        <a href="" className="auth-form__help-link auth-form__help-forgot">Quên mật khẩu</a>
                                        <span className="auth-form__help-separate"></span>
                                        <a href="" className="auth-form__help-link">Cần trợ giúp?</a>
                                    </div>
                                </div>
                                <div className="auth-form__controls">
                                    <button className="btn auth-form__controls-back btn-normal">TRỞ LẠI</button>
                                    <button className="btn btn--primary" type='submit'>Đăng nhập</button>
                                </div>
                            </form>
                        </div>
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
