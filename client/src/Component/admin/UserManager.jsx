import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { changeDate } from '../../formData/formData'
export default function UserManager() {

    const [arrUser, setArrUser] = useState([]);

    const loadUser = () => {
        axios.get('http://localhost:8080/api/v1/users')
            .then(res => {
                if (res.data.status === 200) {
                    setArrUser(res.data.data);
                }
            })
            .catch(err => console.log(err))
    }
    console.log(arrUser);
    useEffect(() => {
        loadUser();
    }, [])
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
                            <form className="d-flex" role="search">
                                <input
                                    className="form-control me-2 fst-italic search-item"
                                    type="search"
                                    placeholder="Enter user's name... "
                                />
                                <button className="btn btn-search" type="submit">
                                    Tìm kiếm
                                </button>
                            </form>
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
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{item.userName}</td>
                                    <td>{item.email}</td>
                                    <td>
                                        <img width="40%" src="img/avatars/avatar-3.jpg" alt="avt" />
                                    </td>
                                    <td>{item.gender === 0 ? 'Nam' : 'Nữ'}</td>
                                    <td>{changeDate(item.dateOfbirth)}</td>
                                    <td>{item.phoneNumber}</td>
                                    <td>{item.address}</td>
                                    <td>{item.roleId == 0 ? 'ADMIN' : "USER"}</td>
                                    <td>
                                        <button type="button" className="btn btn-success btn-fontSize btn-width">
                                            Unlock
                                        </button>
                                        <button type="button" className="btn btn-danger btn-fontSize btn-width">
                                            Lock
                                        </button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <nav aria-label="Page navigation example ">
                    <ul className="pagination float-end mx-4 page-list">
                        <li className="page-item disabled">
                            <a className="page-link">Previous</a>
                        </li>
                        <li className="page-item active">
                            <a className="page-link" href="#">
                                1
                            </a>
                        </li>
                        <li className="page-item">
                            <a className="page-link" href="#">
                                2
                            </a>
                        </li>
                        <li className="page-item">
                            <a className="page-link" href="#">
                                3
                            </a>
                        </li>
                        <li className="page-item">
                            <a className="page-link" href="#">
                                Next
                            </a>
                        </li>
                    </ul>
                </nav>
                {/* /.card-body */}
            </div>
        </div>

    )
}
