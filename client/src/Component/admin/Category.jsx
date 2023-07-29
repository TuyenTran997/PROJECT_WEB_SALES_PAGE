import React from 'react'

export default function Category() {
    return (
        <div className="container-fluid p-0 _container">
            <div className="card">
                <div className="card-header">
                    <nav className="navbar navbar-expand-lg bg-light">
                        <div className="container-fluid">
                            <a className="navbar-brand" href="#">
                                <button
                                    type="button"
                                    className="btn btn-add"
                                    data-bs-toggle="modal"
                                    data-bs-target="#modalCreate"
                                >
                                    + Add new Category
                                </button>
                            </a>
                            <form className="d-flex" role="search">
                                <input
                                    className="form-control me-2 fst-italic search-item"
                                    type="search"
                                    placeholder="Enter category's name... "
                                    aria-label="Search"
                                />
                                <button
                                    id="submit"
                                    className="btn btn-search"
                                    type="submit"
                                >
                                    Search
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
                                <th>Category ID</th>
                                <th>Name</th>
                                <th>Descripttion</th>
                                <th>Created Date</th>
                                <th colSpan={2}>Action</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
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
