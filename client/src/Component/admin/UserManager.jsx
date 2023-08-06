import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { changeDate } from '../../formData/formData'
export default function UserManager() {
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
    const [arrUser, setArrUser] = useState([]);
    const [searchName, setSearchName] = useState('');
    const [limit, setLimit] = useState(listChooseRecord[0].value);
    const [currentPage, setCurrentPage] = useState(1);
    const [isShow, setIsShow] = useState(false);
    const [totalPage, setTotalPage] = useState();
    const [totalReccord, setTotalRecord] = useState()


    const handlechangePage = (page) => {
        if (page >= 1 && page <= totalPage) {
            setCurrentPage(page)
        }
    };
    const loadUser = () => {
        axios.get(`http://localhost:8000/api/v1/users?searchName=${searchName}&LIMIT=${limit}&OFFSET=${currentPage}`)
            .then(res => {
                if (res.data.status === 200) {
                    setArrUser(res.data.data);
                    setTotalPage(res.data.totalPage);
                    setTotalRecord(res.data.totalRecord);
                }
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        loadUser();
    }, [searchName, limit, currentPage])
    return (
        <div className="container-fluid p-0 _container">
            <div className="card">
                <div className="card-header">
                    <nav className="navbar navbar-expand-lg bg-light">
                        <div className="container-fluid">
                            <a className="navbar-brand" href="#">
                                <button type="button" className="btn btn-add">
                                    + Thêm tài khoản
                                </button>
                            </a>
                            <div className="d-flex" role="search">
                                <input
                                    className="form-control me-2 fst-italic search-item"
                                    type="search"
                                    placeholder="Enter user's name... "
                                    value={searchName}
                                    onChange={(e) => { setSearchName(e.target.value) }}
                                />
                                <button className="btn btn-search" type="submit">
                                    Tìm kiếm
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
                                <th>Tên tài khoản</th>
                                <th>Email</th>
                                <th>Ảnh dại diện</th>
                                <th>Giới tính</th>
                                <th>Ngày sinh</th>
                                <th>Số điện thoại</th>
                                <th>Địa chỉ</th>
                                <th>Phân quyền</th>
                                <th colSpan={2}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {arrUser.map((item, index) =>
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.userName}</td>
                                    <td>{item.email}</td>
                                    <td>
                                        <img width="40%" src={`http://localhost:8000/api/v1/products/uploads/images/${item.image}`} alt="avt" style={{ borderRadius: '50%', width: '30px' }} />
                                    </td>
                                    <td>{item.gender === 0 ? 'Nam' : 'Nữ'}</td>
                                    <td>{changeDate(item.dateOfbirth)}</td>
                                    <td>{item.phoneNumber}</td>
                                    <td>{item.address}</td>
                                    <td>{item.roleId == 0 ? 'ADMIN' : "USER"}</td>
                                    <td>
                                        <button type="button" className="btn-edit">
                                            Unlock
                                        </button>
                                    </td>
                                    <td>
                                        <button type="button" className="btn-delete">
                                            Lock
                                        </button>
                                    </td>
                                </tr>
                            )}
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

    )
}
