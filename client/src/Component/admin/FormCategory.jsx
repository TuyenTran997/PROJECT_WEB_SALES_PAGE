import React from 'react'

export default function FormCategory() {
    return (
        <div class="modal_contaier">
            <div class="modal__overlay"></div>
            <div class="modal__body">
                <div className="auth-form">
                    <div className="auth-form__container auth-form__container-mt">
                        <div className="auth-form__header .auth-form__header-mt">
                            <h3 className="auth-form__heading">THÊM MỚI MẶT HÀNG</h3>
                        </div>
                        <div className="auth-form__form">
                            <div className="auth-form__group auth-form__group-mt">
                                <label htmlFor="" className='btn-fontSize'>Tên mặt hàng</label>
                                <input type="text" className="auth-form__input margin-top-input" placeholder="Nhập mặt hàng" />
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
