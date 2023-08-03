import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { changeDate1 } from '../../formData/formData';
export default function FormUpdateProduct({ loadProduct, setIsShowFormEdit, productEdit, setSearchName }) {

    console.log(productEdit);
    const arrStatus = [
        { statusId: 0, status: 'Còn hàng' },
        { statusId: 1, status: 'Hết hàng' },
    ];
    const [arrCategory, setArrCategory] = useState([]);
    const [arrClassify, setArrClassify] = useState([]);

    const [_status, setStatus] = useState(productEdit._status);
    const [productName, setProductName] = useState(productEdit.productName);
    const [_description, setDescription] = useState(productEdit._description);
    const [model, setModel] = useState(productEdit.model);
    const [product_code, setProduct_code] = useState(productEdit.product_code);
    const [price, setPrice] = useState(productEdit.price);
    const [percent_discount, setPercentDiscount] = useState(productEdit.percent_discount);
    const [image, setImage] = useState('');
    const modifileDate = changeDate1(new Date());
    const modifileBy = 'Trần Công Tuyến';

    const handleChangeFile = async (event) => {
        let data = event.target.files;
        setImage((data[0]))
    }



    const handleUpdateProduct = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('productName', productName)
        formData.append('_description', _description)
        formData.append('model', model)
        formData.append('product_code', product_code)
        formData.append('price', price)
        formData.append('percent_discount', percent_discount)
        formData.append('image', image)
        formData.append('modifileDate', modifileDate)
        formData.append('modifileBy', modifileBy)
        formData.append('_status', _status)
        formData.append('productId', productEdit.productId)

        await axios.put('http://localhost:8000/api/v1/products', formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
        loadProduct();
        setIsShowFormEdit(false);
        setSearchName('')
    }


    const loadArrCategory = () => {
        axios.get('http://localhost:8000/api/v1/classifies/classify/all')
            .then(res => {
                if (res.data.status === 200) {
                    setArrClassify(res.data.data)
                }
            })
        axios.get('http://localhost:8000/api/v1/categories/category/all')
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
        <form method='POST' onSubmit={handleUpdateProduct}>
            <div className="modal_contaier">
                <div className="modal__overlay"></div>
                <div className="modal__body">
                    <div className="auth-form">
                        <div className="auth-form__container auth-form__container-mt">
                            <div className="auth-form__header .auth-form__header-mt">
                                <h3 className="auth-form__heading">Cập nhật thông tin sản phẩm</h3>
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
                                    <input type="file" className="auth-form__input margin-top-input auth-form__input-file-upload" name='image' onChange={e => handleChangeFile(e)} />
                                </div>
                                <div className="auth-form__group auth-form__group-mt auth-form__group-radio">
                                    {arrStatus.map((item, index) => {
                                        return <label key={index} className='btn-fontSize fw-500' style={{ display: 'flex', marginRight: '20px' }} >
                                            {item.status}
                                            <input type="radio" name='status' style={{ marginLeft: '10px' }} checked={item.statusId == _status} value={item.statusId} onChange={(e) => setStatus(e.target.value)} />
                                        </label>
                                    })}
                                </div>
                            </div>
                            <div className="auth-form__controls auth-form__controls-mt">
                                <button className="btn auth-form__controls-back btn-normal btn-fontSize" onClick={() => setIsShowFormEdit(false)}>TRỞ LẠI</button>
                                <button className="btn btn--primary btn-fontSize" type='submit'>Cập nhật thông tin</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}
