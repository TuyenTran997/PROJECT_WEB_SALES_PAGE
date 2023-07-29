import React from 'react'

export default function SearchHeader() {
    return (
        <div className="header__search">
            <div className="header__search-input-wrap">
                <input
                    type="text"
                    className="header__search-input"
                    placeholder="Nhập để tìm kiếm"
                />
                <div className="header__search-history">
                    <h3 className="header__search-history-heading">
                        Lịch sử tìm kiếm
                    </h3>
                    <ul className="header__search-history-list">
                        <li className="header__search-history-item">
                            <a href="">Kem dưỡng da</a>
                        </li>
                        <li className="header__search-history-item">
                            <a href="">Kem trị mụn</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="header__search-select">
                <span className="header__search-select-label">Trong Shop</span>
                <i className="header__search-select-icon fa-solid fa-chevron-down" />
                <ul className="header__search-option">
                    <li className="header__search-option-item header__search-option-item--active">
                        <span>Trong shop</span>
                        <i className="fa-solid fa-check" />
                    </li>
                    <li className="header__search-option-item">
                        <span>Ngoài shop</span>
                        <i className="fa-solid fa-check" />
                    </li>
                </ul>
            </div>
            <button className="header__search-btn">
                <i className="header__search-btn-icon fa-solid fa-magnifying-glass" />
            </button>
        </div>
    )
}
