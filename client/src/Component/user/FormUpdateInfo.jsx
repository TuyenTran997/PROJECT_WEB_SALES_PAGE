import { changeConfirmLocale } from 'antd/es/modal/locale';
import React, { useState } from 'react'
import { changeDate, changeDate1 } from '../../formData/formData';
import axios from 'axios';

export default function FormUpdateInfo() {
    const userLogin = JSON.parse(localStorage.getItem('user-login'))
    const arrGender = [
        { id: 0, title: 'Nam' },
        { id: 1, title: 'Nữ' }
    ];
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');
    const [dateOfbirth, setDateOfBirth] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [file, setFile] = useState('');
    const createdDate = changeDate1(new Date());
    const createdBy = userLogin.userName;
    const modifileDate = changeDate1(new Date());
    const modifileBy = userLogin.userName;

    const handleUpdateInformationUser = () => {
        const formData = new FormData();
        formData.append('userId', userLogin.userId);
        formData.append('dateOfbirth', dateOfbirth);
        formData.append('gender', gender);
        formData.append('phoneNumber', phoneNumber);
        formData.append('address', address);
        formData.append('createdDate', createdDate);
        formData.append('createdBy', createdBy);
        formData.append('modifileDate', modifileDate);
        formData.append('modifileBy', modifileBy);
        formData.append('image', file);

        axios.put('http://localhost:8000/api/v1/users', formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
            .then(res => { console.log(res); })
            .catch(err => { console.log(err); });
    }


    return (
        <div class="modal_contaier">
            <div class="modal__overlay"></div>
            <div class="modal__body">
                <div className="auth-form">
                    <div className="auth-form__container auth-form__container-mt">
                        <div className="auth-form__header .auth-form__header-mt">
                            <h3 className="auth-form__heading">Cập nhật thông tin</h3>
                        </div>
                        <div className="auth-form__form">
                            <div className="auth-form__group auth-form__group-mt">
                                <label htmlFor="" className='btn-fontSize'>Địa chỉ</label>
                                <input type="text" className="auth-form__input margin-top-input" placeholder="Nhập địa chỉ" value={address} onChange={e => setAddress(e.target.value)} />
                            </div>
                            <div className="auth-form__group auth-form__group-mt">
                                <label htmlFor="" className='btn-fontSize'>Ngày sinh</label>
                                <input type="date" className="auth-form__input margin-top-input" placeholder="Nhập ngày sinh" value={dateOfbirth} onChange={e => setDateOfBirth((e.target.value))} />
                            </div>
                            <div className="auth-form__group auth-form__group-mt" style={{ display: 'flex' }}>
                                <div className="auth-form__group" style={{
                                    marginRight: '10px'
                                }}>
                                    <label htmlFor="" className='btn-fontSize fw-500'>Giới tính</label>
                                    <select className='auth-form__input margin-top-input fw-500' value={gender} onChange={e => setGender(e.target.value)}>
                                        <option>--------Giới tính--------</option>
                                        {arrGender.map((item, index) => {
                                            return <option key={index} value={item.id}>{item.title}</option>
                                        })}
                                    </select>
                                </div>
                                <div className="auth-form__group">
                                    <label htmlFor="" className='btn-fontSize fw-500'>Số điện thoại</label>
                                    <input type="number" className="auth-form__input margin-top-input" placeholder="Nhập số điện thoại" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="auth-form__group auth-form__group-mt">
                                <label htmlFor="" className='btn-fontSize fw-500'>Ảnh đại diện</label>
                                <input type="file" className="auth-form__input margin-top-input auth-form__input-file-upload" name='image' onChange={(e) => setFile(e.target.files[0])} />
                            </div>
                        </div>
                        <div className="auth-form__controls">
                            <button className="btn auth-form__controls-back btn-normal btn-fontSize">TRỞ LẠI</button>
                            <button className="btn btn--primary btn-fontSize" onClick={handleUpdateInformationUser}>Cập nhật thông tin</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
