import React from 'react'

export default function FormAddCategry() {
    return (
        <div className="modal_contaier">
            <div className="modal__overlay"></div>
            <div className="modal__body">
                <div className="auth-form">
                    <div className="auth-form__container auth-form__container-mt">
                        <div className="auth-form__header .auth-form__header-mt">
                            <h3 className="auth-form__heading">ADD CATEGORY</h3>
                        </div>
                        <div className="auth-form__form">
                            <div className="auth-form__group auth-form__group-mt">
                                <label htmlFor="" className='btn-fontSize'>Category Name</label>
                                <input type="email" className="auth-form__input margin-top-input" placeholder="Email của bạn" />
                            </div>
                            <div className="auth-form__group auth-form__group-mt">
                                <label htmlFor="" className='btn-fontSize'>Description</label>
                                <textarea type="password" className="auth-form__input margin-top-input" placeholder="Mật khẩu của bạn" rows="3" />
                            </div>
                        </div>
                        <div className="auth-form__controls">
                            <button className="btn auth-form__controls-back btn-normal btn-fontSize">TRỞ LẠI</button>
                            <button className="btn btn--primary btn-fontSize">THÊM</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
