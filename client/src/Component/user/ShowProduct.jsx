import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { calculate, changeNumber } from '../../formData/formData';

export default function ShowProduct() {

    const [arrProduct, setArrProduct] = useState([])
    const listChooseRecord = [
        {
            id: 1,
            value: 10,
        },
        {
            id: 2,
            value: 20,
        },
        {
            id: 3,
            value: 30,
        },
        {
            id: 4,
            value: 50,
        },
        {
            id: 5,
            value: 100,
        },
    ];

    const [arrCategory, setArrCategory] = useState([]);
    const [arrClassiFy, setArrClassiFy] = useState([]);
    const [searchName, setSearchName] = useState('');
    const [limit, setLimit] = useState(listChooseRecord[0].value);
    const [currentPage, setCurrentPage] = useState(1);
    const [isShow, setIsShow] = useState(false);
    const [totalPage, setTotalPage] = useState();
    const [totalReccord, setTotalRecord] = useState();
    const [productId, setProductId] = useState(null);
    const [productBuy, setProductBuy] = useState({});


    const handlechangePage = (page) => {
        if (page >= 1 && page <= totalPage) {
            setCurrentPage(page)
        }
    };


    const handleChangeProductId = (productId) => {
        setProductId(productId);
    };

    const loadProduct = async () => {
        axios.get(`http://localhost:8000/api/v1/products?searchName=${searchName}&LIMIT=${limit}&OFFSET=${currentPage}`)
            .then(res => {
                if (res.data.status === 200) {
                    setArrProduct(res.data.data);
                    setTotalPage(res.data.totalPage);
                    setTotalRecord(res.data.totalRecord)
                }
            })
            .catch(err => console.log(err));
    }

    const loadArrCategory = () => {
        axios.get('http://localhost:8000/api/v1/categories/category/all')
            .then(res => {
                if (res.data.status === 200) {
                    setArrCategory(res.data.data);
                }
            })
            .catch(err => console.log(err));
    }

    const loadArrClassify = () => {
        axios.get('http://localhost:8000/api/v1/classifies/classify/all')
            .then(res => {
                if (res.data.status === 200) {
                    setArrClassiFy(res.data.data);
                }
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        loadArrCategory();
        loadArrClassify();
    }, [])

    useEffect(() => {
        loadProduct();
    }, [searchName, limit, currentPage])

    return (
        <div className="grid__row app__content">
            <div className="grid__collum-2">
                <nav className="category">
                    <h3 className="category__heading">Danh mục</h3>
                    <ul className="category-list">
                        {arrCategory.map((item, index) => {
                            return <li className="category-item category-item--active" key={index}>
                                <a href="##" className="category-item__link">
                                    {item.categoryName}
                                </a>
                            </li>
                        })}
                    </ul>
                </nav>
            </div>
            <div className="grid__collum-10">
                <div className="home-filter">
                    <span className="home-filter__label">Sắp xếp theo</span>
                    <button className="btn home-filter__btn">Phổ biến</button>
                    <button className="btn btn--primary home-filter__btn">
                        Mới nhất
                    </button>
                    <button className="btn home-filter__btn">Bán chạy</button>
                    <div className="select-input">
                        <span className="select-input__label">Giá</span>
                        <i className="select-input__icon fa-solid fa-chevron-down" />
                        <ul className="select-input__list">
                            <li className="select-input__item">
                                <a href="#" className="select-input__link">
                                    Giá thấp đến cao
                                </a>
                            </li>
                            <li className="select-input__item">
                                <a href="#" className="select-input__link">
                                    {" "}
                                    Giá cao đến thấp
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="home-filter__page">
                        <span className="home-filter__page-num">
                            <span className="home-filter__page-curent">1</span>/14
                        </span>
                        <div className="home-filter__page-control">
                            <a
                                href="#"
                                className="home-filter__page--btn home-filter__page--btn-disable"
                            >
                                <i className="home-filter__page-icon fa-solid fa-chevron-left" />
                            </a>
                            <a href="#" className="home-filter__page--btn">
                                <i className="home-filter__page-icon fa-solid fa-chevron-right" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="home-product">
                    <div className="home-product-container">
                        {arrCategory.map((category) => {
                            return <div className='home-product_content'>
                                <div className='home-product_content-title'>
                                    <div className='home-product_content-title-indexing'>
                                        <i className="fas fa-angle-double-right home-product_content-title-icon"></i>
                                        <span>{category.categoryName} </span>
                                        <a href=''> <span>Xem tất cả</span> </a>
                                    </div>
                                    <div>
                                        <i className="fas fa-chevron-down home-product_content-title-show" title='Xem tất cả'></i>
                                    </div>
                                </div>
                                <div className='grid__row'>
                                    {arrProduct.map((product, index) => {
                                        if (product.categoryName === category.categoryName) {
                                            return <div className="grid__collum-2-4" key={index}>
                                                <div className="home-product-item">
                                                    <a href="##" onClick={() => handleChangeProductId(product.productId)}>
                                                        <div
                                                            className="home-product-item__img"
                                                            style={{
                                                                backgroundImage:
                                                                    `url(http://localhost:8000/api/v1/products/uploads/images/${product.image})`
                                                            }}
                                                        ></div>
                                                        <h4 className="home-product-item__name">
                                                            {product.productName} ({product._description})
                                                        </h4>
                                                        <div className="home-product-item__price">
                                                            <span className="home-product-item__price-old">
                                                                {changeNumber(product.price)}
                                                            </span>
                                                            <span className="home-product-item__price-curent">
                                                                {changeNumber(calculate(product.price, product.percent_discount))}
                                                            </span>
                                                        </div>
                                                    </a>
                                                    <div className="home-product-item__action">
                                                        <span className="home-product-item__sold">{product._status === 0 ? 'Còn hàng' : 'Hết hàng'}</span>
                                                        {/* <button className='btn-buy' onClick={() => buyProduct({ ...item, userId: userId, quantity: 1, price_percent_discount: calculate(item.price, item.percent_discount), userName: userName, createdDate: createdDate, createdBy: createdBy, modifileDate, modifileBy: modifileBy })}>Đặt hàng</button> */}
                                                    </div>
                                                    <div className="home-product-item__favourite">
                                                        <i className="fa-solid fa-check" />
                                                        <span>Yêu thích</span>
                                                    </div>
                                                </div>

                                            </div>
                                        }
                                    })}
                                </div>
                            </div>
                        })}
                    </div>
                </div>
                <ul className="pagination home-product__pagination">
                    <li className="pagination-item">
                        <a href="#" className="pagination-item__link">
                            <i className="pagination-item__icon fa-solid fa-chevron-left" />
                        </a>
                    </li>
                    <li className="pagination-item pagination-item--active">
                        <a href="#" className="pagination-item__link">
                            1
                        </a>
                    </li>
                    <li className="pagination-item">
                        <a href="#" className="pagination-item__link">
                            2
                        </a>
                    </li>
                    <li className="pagination-item">
                        <a href="#" className="pagination-item__link">
                            3
                        </a>
                    </li>
                    <li className="pagination-item">
                        <a href="#" className="pagination-item__link">
                            4
                        </a>
                    </li>
                    <li className="pagination-item">
                        <a href="#" className="pagination-item__link">
                            5
                        </a>
                    </li>
                    <li className="pagination-item">
                        <a href="#" className="pagination-item__link">
                            ...
                        </a>
                    </li>
                    <li className="pagination-item">
                        <a href="#" className="pagination-item__link">
                            14
                        </a>
                    </li>
                    <li className="pagination-item">
                        <a href="#" className="pagination-item__link">
                            <i className="pagination-item__icon fa-solid fa-chevron-right" />
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}
