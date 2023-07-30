import React, { useState } from 'react'
import axios from 'axios';

import { changeDate1 } from '../../formData/formData';

export default function FormCategory({ isShow, setIsShow, loadArrCategory }) {

    const [categoryName, setCategoryName] = useState();
    const createdDate = changeDate1(new Date());
    const createdBy = 'Trần Công Tuyến';
    const modifileDate = changeDate1(new Date());
    const modifileBy = 'Trần Công Tuyến';

    const handleCreateCategory = async () => {
        const newCategory = {
            categoryName: categoryName,
            createdDate: createdDate,
            createdBy: createdBy,
            modifileDate: modifileDate,
            modifileBy: modifileBy
        }
        await axios.post('http://localhost:8080/api/v1/categories', newCategory)
            .then(res => console.log(res))
            .catch(err => console.log(err));

        loadArrCategory();
        setIsShow(false)
        setCategoryName('');
    };

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
                                <input type="text" className="auth-form__input margin-top-input" placeholder="Nhập mặt hàng"
                                    value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
                            </div>
                        </div>
                        <div className="auth-form__controls">
                            <button className="btn auth-form__controls-back btn-normal btn-fontSize" onClick={() => setIsShow(false)}>TRỞ LẠI</button>
                            <button className="btn btn--primary btn-fontSize" onClick={() => handleCreateCategory()}>THÊM</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
