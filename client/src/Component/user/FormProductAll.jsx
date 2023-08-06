import React, { useEffect, useState } from 'react'
import { calculate, changeDate1, changeNumber } from '../../formData/formData'
import axios from 'axios';
import { NavLink, useParams } from 'react-router-dom';

export default function FormProductAll() {

    const categoryId = useParams().categoryId;

    const userLogin = JSON.parse(localStorage.getItem('user-login'))
    let userId = userLogin.userId;
    let userName = userLogin.userName;
    const createdDate = changeDate1(new Date());
    const createdBy = 'Trần Công Tuyến';
    const modifileDate = changeDate1(new Date());
    const modifileBy = 'Trần Công Tuyến';


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
    const [productBuy, setProductBuy] = useState({});


    const handlechangePage = (page) => {
        if (page >= 1 && page <= totalPage) {
            setCurrentPage(page)
        }
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
        <>
            <div className="home-product">
                <div className="grid__row">
                    {arrProduct.map((item, index) => {
                        if (item.categoryId === categoryId) {
                            return <>
                                <div className="grid__collum-2-4" key={index}>
                                    <div className="home-product-item">
                                        <NavLink to={"/product/" + item.productId}>
                                            <div
                                                className="home-product-item__img"
                                                style={{
                                                    backgroundImage:
                                                        `url(http://localhost:8000/api/v1/products/uploads/images/${item.image})`
                                                }}
                                            ></div>
                                            <h4 className="home-product-item__name">
                                                {item.productName} ({item._description})
                                            </h4>
                                            <div className="home-product-item__price">
                                                <span className="home-product-item__price-old">
                                                    {changeNumber(item.price)}
                                                </span>
                                                <span className="home-product-item__price-curent">
                                                    {changeNumber(calculate(item.price, item.percent_discount))}
                                                </span>
                                            </div>
                                            <div className="home-product-item__action">
                                                <span className="home-product-item__sold">{item._status === 0 ? 'Còn hàng' : 'Hết hàng'}</span>
                                                <button className='btn-buy'>Xem chi tiết</button>
                                            </div>
                                        </NavLink>
                                    </div>
                                </div>
                            </>
                        }
                    })}

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
        </>
    )
}
