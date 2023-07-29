import React from 'react'

export default function ChangePassword() {
    return (
        <div class="modal__body">
            <div className="auth-form">
                <div className="auth-form__container">
                    <div className="auth-form__header">
                        <h3 className="auth-form__heading">Thay đổi mật khẩu</h3>
                    </div>
                    <div className="auth-form__form">
                        <div className="auth-form__group">
                            <input type="password" className="auth-form__input" placeholder="Nhập mật khẩu cũ của bạn" />
                        </div>
                        <div className="auth-form__group">
                            <input type="password" className="auth-form__input" placeholder="Nhập mật khẩu mới của bạn" />
                        </div>
                        <div className="auth-form__group">
                            <input type="password" className="auth-form__input" placeholder="Nhập lại mật khẩu mới" />
                        </div>
                    </div>
                    <div className="auth-form__controls auth-form-changePassword">
                        <button className="btn auth-form__controls-back btn-normal" onClick={() => { setIsToggleModal(true) }}>TRỞ LẠI</button>
                        <button className="btn btn--primary" onClick={() => { setIsToggleModal(!isToggleModal) }}>THAY ĐỔI</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
