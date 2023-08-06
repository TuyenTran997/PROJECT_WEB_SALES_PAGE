import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { calculate, changeNumber } from '../../formData/formData';
import FormProductAll from './FormProductAll';
import Product from './Product';
import { NavLink, useParams } from 'react-router-dom';

export default function ProductAll() {

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

    const userLogin = JSON.parse(localStorage.getItem('user-login'))

    const [arrCart, setArrCart] = useState([]);
    const [quantity, setQuantity] = useState(0);
    const buyProduct = async (productBuy) => {
        let check;
        let quantity;
        if (productBuy._status === 1) {
            alert('Sản phẩm bạn chọn đã hết hàng, bạn vui lòng xem các sản phẩm tương tự trong Shop. Xin cảm ơn!')
        } else if (productBuy._status === 0) {
            if (arrCart.length === 0) {
                confirm("Bạn có muốn thêm sản phẩm vào giỏ hàng của bạn không?")
                await axios.post('http://localhost:8000/api/v1/carts', productBuy)
                    .then(res => console.log(res))
                    .catch(err => console.error(err))
            } else
                if (arrCart.length > 0) {
                    arrCart.find((item) => {
                        if (userLogin.userId === productBuy.userId) {
                            if (item.productId === productBuy.productId) {
                                quantity = item.quantity + productBuy.quantity;
                                check = true
                            } else {
                                check = false;
                            }
                        }
                    })
                }
        }
        if (check) {
            confirm('Sản phẩm đã có trong giỏ hàng, bạn có muốn thêm vào giỏ hàng nữa không?')
            await axios.put(`http://localhost:8000/api/v1/carts?quantity=${quantity}&productId=${productBuy.productId}&userId=${userLogin.userId}`)
                .then(res => { console.log(res); })
                .catch(err => { console.log(err); });
        }
        if (check === false) {
            confirm('Bạn muốn thêm sản phẩm vào giỏ hàng?')
            await axios.post('http://localhost:8000/api/v1/carts', productBuy)
                .then(res => console.log(res))
                .catch(err => console.error(err))
        }
        loadArrCart();
    }
    const [totalRecord, setTotalRecord] = useState(0);
    const total = arrCart.map((item) => (item.price_percent_discount * item.quantity)).reduce((a, b) => a + b, 0);
    const totalProduct = arrCart.map((item) => (item.quantity)).reduce((a, b) => a + b, 0);
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

    const handleDeleteProduct = async (productId) => {
        confirm('Bạn muốn xóa sản phẩm này ra khỏi giỏ hàng không?');
        await axios.delete(`http://localhost:8000/api/v1/carts?productId=${productId}&userId=${userLogin.userId}`)
            .then(res => { console.log(res); })
            .catch(err => { console.log(err); });
        loadArrCart();
    }

    const loadListProduct = async () => {
        axios.get(`http://localhost:8000/api/v1/products/product/all`)
            .then(res => {
                if (res.data.status === 200) {
                    console.log(res.data.data);
                }
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        loadArrCart();
    }, [])

    useEffect(() => {
        loadArrCart();
    }, [])

    const categoryId = useParams().categoryId;

    return (
        <div className="grid__row app__content">
            <div className="grid__collum-2">
                <nav className="category">
                    <h3 className="category__heading">Danh mục</h3>
                    <ul className="category-list">
                        {arrCategory.map((item, index) => {
                            return <NavLink to={`${item.categoryId}`}>
                                <li className="category-item category-item--active" key={index}>
                                    <a className="category-item__link">
                                        {item.categoryName}
                                    </a>
                                </li>
                            </NavLink>
                        })}
                    </ul>
                </nav>
            </div>
            <div className="grid__collum-10">
                <FormProductAll arrProduct={arrProduct} handleChangeProductId={handleChangeProductId} buyProduct={buyProduct} loadArrCart={loadArrCart} />
                {productId === null ? <></> : <Product productId={productId} buyProduct={buyProduct} quantity={quantity} setQuantity={setQuantity} loadArrCart={loadArrCart} />}
            </div>
        </div>
    )
}
