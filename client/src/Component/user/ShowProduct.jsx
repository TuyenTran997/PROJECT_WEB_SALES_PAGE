import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { calculate, changeDate1, changeNumber } from '../../formData/formData';
import { NavLink } from 'react-router-dom';

export default function ShowProduct() {

    const userLogin = JSON.parse(localStorage.getItem('user-login'))

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

    const createdDate = changeDate1(new Date());
    const createdBy = userLogin.userName;
    const modifileDate = changeDate1(new Date());
    const modifileBy = userLogin.userName;


    const handlechangePage = (page) => {
        if (page >= 1 && page <= totalPage) {
            setCurrentPage(page)
        }
    };

    const [arrCart, setArrCart] = useState([]);
    const loadArrCart = () => {
        axios.get(`http://localhost:8000/api/v1/carts/${userLogin.userId}`)
            .then(res => {
                setArrCart(res.data.data)
                setTotalRecord(res.data.totalRecord)
            })
            .catch(err => {
                console.log(err);
            })
    }
    // const buyProduct = async (productBuy) => {
    //     let check;
    //     let quantity;
    //     if (productBuy._status === 1) {
    //         alert('Sản phẩm bạn chọn đã hết hàng, bạn vui lòng xem các sản phẩm tương tự trong Shop. Xin cảm ơn!')
    //     } else if (productBuy._status === 0) {
    //         if (arrCart.length === 0) {
    //             confirm("Bạn có muốn thêm sản phẩm vào giỏ hàng của bạn không?")
    //             await axios.post('http://localhost:8000/api/v1/carts', productBuy)
    //                 .then(res => console.log(res))
    //                 .catch(err => console.error(err))
    //         } else if (arrCart.length > 0) {
    //             arrCart.find((item) => {
    //                 if (userLogin.userId === productBuy.userId) {
    //                     if (item.productId === productBuy.productId) {
    //                         quantity = item.quantity + productBuy.quantity;
    //                         check = true
    //                     } else {
    //                         check = false;
    //                     }
    //                 }
    //             })
    //         }
    //     }
    //     if (check) {
    //         confirm('Sản phẩm đã có trong giỏ hàng, bạn có muốn thêm vào giỏ hàng nữa không?')
    //         await axios.put(`http://localhost:8000/api/v1/carts?quantity=${quantity}&productId=${productBuy.productId}&userId=${userLogin.userId}`)
    //             .then(res => { console.log(res); })
    //             .catch(err => { console.log(err); });
    //     }
    //     if (check === false) {
    //         confirm('Bạn muốn thêm sản phẩm vào giỏ hàng?')
    //         await axios.post('http://localhost:8000/api/v1/carts', productBuy)
    //             .then(res => console.log(res))
    //             .catch(err => console.error(err))
    //     }
    //     loadArrCart();
    // }

    const handleChangeProductId = (productId) => {
        setProductId(productId);
    };

    const loadProduct = async () => {
        axios.get(`http://localhost:8000/api/v1/products?searchName=${searchName}&LIMIT=${limit}&OFFSET=${currentPage}`)
            .then(res => {
                if (res.data.status === 200) {
                    setArrProduct(res.data.data);
                    setTotalPage(res.data.totalPage);
                    setTotalRecord(res.data.totalRecord);
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
        loadArrCart();
    }, [])

    useEffect(() => {
        loadProduct();
    }, [searchName, limit, currentPage])

    return (
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
                                            <NavLink to={`/product/${product.productId}`} onClick={() => handleChangeProductId(product.productId)}>
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
                                                <div className="home-product-item__action">
                                                    <span className="home-product-item__sold">{product._status === 0 ? 'Còn hàng' : 'Hết hàng'}</span>
                                                    <button className='btn-buy'>Xem chi tiết</button>
                                                </div>
                                            </NavLink>
                                        </div>
                                    </div>
                                }
                            })}
                        </div>
                    </div>
                })}
            </div>
        </div>

    )
}
