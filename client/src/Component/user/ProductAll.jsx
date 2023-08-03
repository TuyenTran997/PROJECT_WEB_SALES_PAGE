import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { calculate, changeNumber } from '../../formData/formData';
import FormProductAll from './FormProductAll';
import Product from './Product';

export default function ProductAll({ buyProduct, quantity, setQuantity, loadArrCart }) {

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
                <FormProductAll arrProduct={arrProduct} handleChangeProductId={handleChangeProductId} buyProduct={buyProduct} loadArrCart={loadArrCart} />
                {productId === null ? <></> : <Product productId={productId} buyProduct={buyProduct} quantity={quantity} setQuantity={setQuantity} loadArrCart={loadArrCart} />}
            </div>
        </div>
    )
}
