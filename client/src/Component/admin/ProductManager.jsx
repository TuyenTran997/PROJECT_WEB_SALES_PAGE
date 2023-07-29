import React from 'react'

export default function ProductManager() {
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
                                    onclick="showFormCreate()"
                                >
                                    + Add new Product
                                </button>
                            </a>
                            <form className="d-flex" role="search">
                                <input
                                    className="form-control me-2 fst-italic search-item"
                                    type="search"
                                    placeholder="Enter product's name... "
                                />
                                <button className="btn btn-add" type="submit">
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
                                <th>ID</th>
                                <th>Name</th>
                                <th>Image</th>
                                <th>Description</th>
                                <th>Created Date</th>
                                <th>Price</th>
                                <th>Status</th>
                                <th>Category</th>
                                <th colSpan={2}>Action</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
                {/* /.card-body */}
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
            </div>
        </div>

    )
}
