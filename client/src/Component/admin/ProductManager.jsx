import axios from 'axios';
import React, { useEffect, useState } from 'react'
import FormAddProduct from './FormAddProduct';
import FormUpdateProduct from './FormUpdateProduct';

export default function ProductManager() {
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
    const [searchName, setSearchName] = useState('');
    const [limit, setLimit] = useState(listChooseRecord[0].value);
    const [currentPage, setCurrentPage] = useState(1);
    const [isShow, setIsShow] = useState(false);
    const [isShowFormEdit, setIsShowFormEdit] = useState(false);
    const [totalPage, setTotalPage] = useState();
    const [totalReccord, setTotalRecord] = useState()

    const handlechangePage = (page) => {
        if (page >= 1 && page <= totalPage) {
            setCurrentPage(page)
        }
    };


    const [productEdit, setProductEdit] = useState({})

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
    useEffect(() => {
        loadProduct();
    }, [searchName, limit, currentPage])

    const handleDeleteProduct = async (productId) => {
        await axios.delete(`http://localhost:8000/api/v1/products/${productId}`)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => { console.log(err) });
        confirm('Are you sure you want to delete this product?')
        loadProduct();
    }
    return (
        <>
            <div className="container-fluid p-0 _container">
                <div className="card">
                    <div className="card-header">
                        <nav className="navbar navbar-expand-lg bg-light">
                            <div className="container-fluid">
                                <a className="navbar-brand" href="#">
                                    <button
                                        type="button"
                                        className="btn btn-add"
                                        onClick={() => setIsShow(true)}
                                    >
                                        Thêm sản phẩm
                                    </button>
                                </a>
                                <div className="d-flex" role="search">
                                    <input
                                        className="form-control me-2 fst-italic search-item"
                                        type="search"
                                        placeholder="Enter category's name... "
                                        value={searchName}
                                        onChange={(e) => { setSearchName(e.target.value) }}
                                    />
                                    <button
                                        id="submit"
                                        className="btn btn-search"
                                        type="submit"
                                    >
                                        Search
                                    </button>
                                </div>
                            </div>
                        </nav>
                    </div>
                    {/* /.card-header */}
                    <div className="card-body">
                        <table
                            id="example1"
                            className="table table-bordered table-striped text-center"
                        >
                            <thead>
                                <tr>
                                    <th>Tên sảm phẩm</th>
                                    <th>Mô tả</th>
                                    <th>Modle</th>
                                    <th>Mã sản phẩm</th>
                                    <th>Giá sản phẩm</th>
                                    <th>Tỉ lệ giảm giá</th>
                                    <th>Loại hàng</th>
                                    <th>Phân loại hãng sản xuất</th>
                                    <th>Hình ảnh hàng</th>
                                    <th>Trạng thái</th>
                                    <th colSpan={2}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {arrProduct.map((item, index) => {
                                    return <tr key={index} >
                                        <td>{item.productName}</td>
                                        <td>{item._description}</td>
                                        <td>{item.model}</td>
                                        <td>{item.product_code}</td>
                                        <td>{item.price}</td>
                                        <td>{item.percent_discount * 100}%</td>
                                        <td>{item.categoryName}</td>
                                        <td>{item.trademark}</td>
                                        <td>
                                            <img src={'http://localhost:8000/api/v1/products/uploads/images/' + item.image} alt="" style={{ width: '80px', height: '60px' }} />
                                        </td>
                                        <td>{item._status === 0 ? "Còn hàng" : "Hết hàng"}</td>
                                        <td>
                                            <button className='btn-edit' onClick={() => { setProductEdit(item), setIsShowFormEdit(true) }}>Sửa</button>
                                        </td>
                                        <td>
                                            <button className='btn-delete' onClick={() => handleDeleteProduct(item.productId)}>Xóa</button>
                                        </td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                    {/* /.card-body */}
                    <nav aria-label="Page navigation example ">
                        <div className='select'>
                            <select className='select-base' value={limit} onChange={(e) => setLimit(e.target.value)}>
                                {listChooseRecord.map((item, index) => {
                                    return <option key={index} value={item.value}>{item.value} bản ghi trên 1 trang</option>
                                })}

                            </select>
                        </div>
                        <ul className="pagination float-end mx-4 page-list">
                            <li className={`page-item ${currentPage === 1 ? 'disabled' : null}`}
                                onClick={() => handlechangePage(currentPage - 1)}>
                                <a className="page-link">Trang trước</a>
                            </li>
                            <li className="page-item">
                                <a className="page-link" href="#">
                                    {currentPage}
                                </a>
                            </li>
                            <li className={`page-item ${currentPage === totalPage ? 'disabled' : null}`}
                                onClick={() => handlechangePage(currentPage + 1)}

                            >
                                <a className="page-link" href="#">
                                    Trang sau
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            {isShowFormEdit ? <FormUpdateProduct setSearchName={setSearchName} loadProduct={loadProduct} productEdit={productEdit} setIsShowFormEdit={setIsShowFormEdit} /> : <></>}
            {isShow ? <FormAddProduct loadProduct={loadProduct} isShow={isShow} setIsShow={setIsShow} /> : null}
        </>
    )
}
