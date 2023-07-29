import React from 'react'

export default function FormAddProduct() {
    return (
        <div class="modal_contaier">
            <div class="modal__overlay"></div>
            <div class="modal__body">
                <div className="auth-form">
                    <div className="auth-form__container auth-form__container-mt">
                        <div className="auth-form__header .auth-form__header-mt">
                            <h3 className="auth-form__heading">Thêm sản phẩm</h3>
                        </div>
                        <div className="auth-form__form">
                            <div className="auth-form__group auth-form__group-mt">
                                <label htmlFor="" className='btn-fontSize fw-500'>Tên sản phẩm</label>
                                <input type="text" className="auth-form__input margin-top-input" placeholder="Tên sản phẩm" />
                            </div>
                            <div className="auth-form__group auth-form__group-mt">
                                <label htmlFor="" className='btn-fontSize fw-500'>Ảnh mô tả sản phẩm</label>
                                <input type="file" className="auth-form__input margin-top-input auth-form__input-file-upload" />
                            </div>
                            <div className="auth-form__group auth-form__group-mt">
                                <label htmlFor="" className='btn-fontSize fw-500'>Giá</label>
                                <input type="number" className="auth-form__input margin-top-input" placeholder="Giá sản phẩm" />
                            </div>
                            <div className="auth-form__group auth-form__group-mt">
                                <label htmlFor="" className='btn-fontSize fw-500'>Mô tả sản phẩm</label>
                                <textarea className="auth-form__input margin-top-input" placeholder="Nhập mô tả sản phẩm" />
                            </div>
                            <div className="auth-form__group auth-form__group-mt auth-form__group-radio">
                                <span className='btn-fontSize fw-500'>Còn hàng&nbsp;</span>&ensp;<input type="radio" />&nbsp;
                                <span className='btn-fontSize fw-500'>Hết hàng&nbsp;</span>&ensp;<input type="radio" />&nbsp;
                            </div>
                            <div className="auth-form__group btn-fontSize">
                                <select className='auth-form__input fw-500'>
                                    <option value="">Category 1</option>
                                    <option value="">Category 2</option>
                                    <option value="">Category 3</option>
                                </select>
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
