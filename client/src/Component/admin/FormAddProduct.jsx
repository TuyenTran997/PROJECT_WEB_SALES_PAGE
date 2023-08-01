import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { changeDate1 } from '../../formData/formData';

export default function FormAddProduct({ loadProduct, setIsShow }) {

    const arrStatus = [
        { statusId: 0, status: 'Còn hàng' },
        { statusId: 1, status: 'Hết hàng' },
    ];
    const [arrCategory, setArrCategory] = useState([]);
    const [arrClassify, setArrClassify] = useState([]);

    const [categoryId, setCategoryId] = useState('');
    const [classifyId, setClassifyId] = useState('');
    const [_status, setStatus] = useState();
    const [productName, setProductName] = useState('');
    const [_description, setDescription] = useState('');
    const [model, setModel] = useState('');
    const [product_code, setProduct_code] = useState('');
    const [price, setPrice] = useState('');
    const [percent_discount, setPercentDiscount] = useState(0);
    const [image, setImage] = useState('');
    const createdDate = changeDate1(new Date());
    const createdBy = 'Trần Công Tuyến';
    const modifileDate = changeDate1(new Date());
    const modifileBy = 'Trần Công Tuyến';



    const handleSubmitProduct = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('productName', productName)
        formData.append('_description', _description)
        formData.append('model', model)
        formData.append('product_code', product_code)
        formData.append('price', price)
        formData.append('percent_discount', percent_discount)
        formData.append('image', image)
        formData.append('categoryId', categoryId)
        formData.append('classifyId', classifyId)
        formData.append('createdDate', createdDate)
        formData.append('createdBy', createdBy)
        formData.append('modifileDate', modifileDate)
        formData.append('modifileBy', modifileBy)
        formData.append('_status', _status);

        await axios.post('http://localhost:8080/api/v1/products', formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
        loadProduct();
        setIsShow(false);
    }


    const loadArrCategory = () => {
        axios.get('http://localhost:8080/api/v1/classifies/classify/all')
            .then(res => {
                if (res.data.status === 200) {
                    setArrClassify(res.data.data)
                }
            })
        axios.get('http://localhost:8080/api/v1/categories/category/all')
            .then(res => {
                if (res.data.status === 200) {
                    setArrCategory(res.data.data);
                }
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        loadArrCategory()
    }, [])
    return (
        <form method='POST' onSubmit={handleSubmitProduct}>
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
                                    <input type="text" className="auth-form__input margin-top-input" placeholder="Tên sản phẩm"
                                        value={productName} onChange={(e) => setProductName(e.target.value)} />
                                </div>
                                <div className="auth-form__group auth-form__group-mt">
                                    <label htmlFor="" className='btn-fontSize fw-500'>Mô tả sản phẩm</label>
                                    <textarea className="auth-form__input margin-top-input" placeholder="Nhập mô tả sản phẩm"
                                        value={_description} onChange={(e) => setDescription(e.target.value)} />
                                </div>
                                <div className="auth-form__group auth-form__group-mt" style={{ display: 'flex' }}>
                                    <div className="auth-form__group" style={{
                                        marginRight: '10px'
                                    }}>
                                        <label htmlFor="" className='btn-fontSize fw-500'>Model</label>
                                        <input type="text" className="auth-form__input margin-top-input" placeholder='Nhập Model sản phẩm'
                                            value={model} onChange={(e) => setModel(e.target.value)} />
                                    </div>
                                    <div className="auth-form__group">
                                        <label htmlFor="" className='btn-fontSize fw-500'>Mã sản phẩm</label>
                                        <input type="text" className="auth-form__input margin-top-input" placeholder='Nhập mã sản phẩm'
                                            value={product_code} onChange={(e) => setProduct_code(e.target.value)} />
                                    </div>
                                </div>
                                <div className="auth-form__group auth-form__group-mt" style={{ display: 'flex' }}>
                                    <div className="auth-form__group" style={{
                                        marginRight: '10px'
                                    }}>
                                        <label htmlFor="" className='btn-fontSize fw-500'>Giá</label>
                                        <input type="number" className="auth-form__input margin-top-input" placeholder="Giá sản phẩm"
                                            value={price} onChange={e => setPrice(e.target.value)} />
                                    </div>
                                    <div className="auth-form__group">
                                        <label htmlFor="" className='btn-fontSize fw-500'>Giảm giá</label>
                                        <input type="number" className="auth-form__input margin-top-input" placeholder="Giá sản phẩm"
                                            value={percent_discount} onChange={e => setPercentDiscount(e.target.value)} />
                                    </div>
                                </div>
                                <div className="auth-form__group auth-form__group-mt">
                                    <label htmlFor="" className='btn-fontSize fw-500'>Ảnh mô tả sản phẩm</label>
                                    <input type="file" className="auth-form__input margin-top-input auth-form__input-file-upload" onChange={e => setImage(e.target.files[0])} />
                                </div>
                                <div className="auth-form__group auth-form__group-mt auth-form__group-radio">
                                    {arrStatus.map((item, index) => {
                                        return <label className='btn-fontSize fw-500' style={{ display: 'flex', marginRight: '20px' }} >
                                            {item.status}
                                            <input type="radio" name='status' style={{ marginLeft: '10px' }} value={item.statusId} onClick={(e) => setStatus(e.target.value)} />
                                        </label>
                                    })}

                                </div>
                                <div className="auth-form__group auth-form__select btn-fontSize">
                                    <select className='auth-form__input fw-500 select_1' value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                                        <option>---Chọn nhóm loại hàng---</option>
                                        {arrCategory.map((item, index) => {
                                            return <option value={item.categoryId}>{item.categoryName}</option>
                                        })}
                                    </select>
                                    <select className='auth-form__input fw-500' value={classifyId} onChange={(e) => setClassifyId(e.target.value)}>
                                        <option>---Chọn loại hàng ---</option>
                                        {arrClassify.map((item, index) => {
                                            if (item.categoryId === categoryId) {
                                                return <option value={item.classifyId}>{item.trademark}</option>
                                            }
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className="auth-form__controls auth-form__controls-mt">
                                <button className="btn auth-form__controls-back btn-normal btn-fontSize" onClick={() => setIsShow(false)}>TRỞ LẠI</button>
                                <button className="btn btn--primary btn-fontSize" type='submit'>THÊM</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}
