import React from 'react'

export default function FormAddUser() {
    return (
        <div class="modal_contaier">
            <div class="modal__overlay"></div>
            <div class="modal__body">
                <div className="auth-form">
                    <div className="auth-form__container auth-form__container-mt">
                        <div className="auth-form__header .auth-form__header-mt">
                            <h3 className="auth-form__heading">THông tin khách hàng</h3>
                        </div>
                        <div className="auth-form__form">
                            <div className="auth-form__group auth-form__group-mt">
                                <label htmlFor="" className='btn-fontSize fw-500'>Tên đăng nhập</label>
                                <input type="text" className="auth-form__input margin-top-input" placeholder="Nhập tên đăng nhập" />
                            </div>
                            <div className="auth-form__group auth-form__group-mt">
                                <label htmlFor="" className='btn-fontSize fw-500'>Họ và tên</label>
                                <input type="file" className="auth-form__input margin-top-input auth-form__input-file-upload" />
                            </div>
                            <div className="auth-form__group auth-form__group-mt">
                                <label htmlFor="" className='btn-fontSize fw-500'>Email</label>
                                <input type="mail" className="auth-form__input margin-top-input" placeholder="Nhập email" />
                            </div>
                            <div className="auth-form__group auth-form__group-mt">
                                <label htmlFor="" className='btn-fontSize fw-500'>Ngày sinh</label>
                                <input type="date" className="auth-form__input margin-top-input" placeholder="Nhập ngày sinh" />
                            </div>
                            <div className="auth-form__group auth-form__group-mt auth-form__group-radio">
                                <label htmlFor="" className='btn-fontSize fw-500'>Giới tính : &nbsp;</label>
                                <span className='btn-fontSize fw-500'>Nam &nbsp;</span>&ensp;<input type="radio" />&nbsp;
                                <span className='btn-fontSize fw-500'>Nữ &nbsp;</span>&ensp;<input type="radio" />&nbsp;
                            </div>
                        </div>
                        <div className="auth-form__controls auth-form__controls-mt">
                            <button className="btn auth-form__controls-back btn-normal btn-fontSize">TRỞ LẠI</button>
                            <button className="btn btn--primary btn-fontSize">THÊM</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
