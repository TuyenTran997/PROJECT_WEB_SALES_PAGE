import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FormCategory from './FormCategory';

export default function Category() {
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
    ]
    const [arrCategory, setArrCategory] = useState([]);
    const [searchName, setSearchName] = useState('');
    const [limit, setLimit] = useState(listChooseRecord[0].value);
    const [currentPage, setCurrentPage] = useState(1);
    const [isShow, setIsShow] = useState(false);
    const [totalPage, setTotalPage] = useState();
    const [totalReccord, setTotalRecord] = useState()
    console.log(limit);
    const handlechangePage = (page) => {
        if (page >= 1 && page <= totalPage) {
            setCurrentPage(page)
        }
    };

    const loadArrCategory = () => {
        axios.get(`http://localhost:8080/api/v1/categories?searchName=${searchName}&LIMIT=${limit}&OFFSET=${currentPage}`)
            .then(res => {
                console.log(res);
                if (res.data.status === 200) {
                    setArrCategory(res.data.data);
                    setTotalPage(res.data.totalPage);
                    setTotalRecord(res.data.totalRecord)
                }
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        loadArrCategory();
    }, [searchName, limit, currentPage])

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
                                        + Add new Category
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
                                    <th>STT</th>
                                    <th>Loại hàng</th>
                                    <th>Ngày tạo</th>
                                    {/* <th colSpan={2}>Action</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {arrCategory.map((item, index) => {
                                    return <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.categoryName}</td>
                                        <td>{item.createdDate}</td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
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
                    {/* /.card-body */}
                </div>
            </div>
            {isShow ? <FormCategory loadArrCategory={loadArrCategory} isShow={isShow} setIsShow={setIsShow} /> : <></>}
        </>
    )
}
