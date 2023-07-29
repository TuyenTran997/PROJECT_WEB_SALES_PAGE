import React from 'react'

export default function Product() {
    return (
        <div className="grid__row app__content">
            <div className="grid__collum-2">
                <nav className="category">
                    <h3 className="category__heading">Danh mục</h3>
                    <ul className="category-list">
                        <li className="category-item category-item--active">
                            <a href="##" className="category-item__link">
                                Trang điểm mặt
                            </a>
                        </li>
                        <li className="category-item">
                            <a href="##" className="category-item__link">
                                Trang điểm mắt
                            </a>
                        </li>
                        <li className="category-item">
                            <a href="##" className="category-item__link">
                                Trang điểm môi
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="grid__collum-10 ">
                <div className="home-product-item">
                    <div className="grid__row">
                        <div className="grid__collum-5">
                            <div
                                className="home-product-item__img"
                                style={{
                                    backgroundImage:
                                        "url(./public/assets/img/GS.008781_FEATURE_94404.jpg)"
                                }}
                            ></div>
                        </div>
                        <div className="grid__collum-7 product-item-info">
                            <p className='product-item-title'>Thông tin sản phẩm:</p>
                            <p>Laptop Lenovo IdeaPad 1 11IGL05 81VT006FVN (Pentium N5030/4GB RAM/256GB/11.6"HD/Win 11/Grey)</p>
                            <div className="home-product-item__price product-item-info__price">
                                <span className="home-product-item__price-old product-item-info__price-old">
                                    10,990,000đ
                                </span>
                                <span className="home-product-item__price-curent">
                                    4,490,000đ
                                </span>
                            </div>
                            <div>
                                <span className='product-checkbox'>Trạng thái: &nbsp;
                                    <input type="checkbox" checked />
                                    &nbsp; Còn hàng &nbsp;
                                    <input type="checkbox" />
                                    &nbsp;Hết hàng&nbsp;
                                </span>
                            </div>
                            <div className='product-item-info__description'>
                                <p>Thương hiệu: Lenovo</p>
                                <p>Model: LENOVO IDP1 11IGL05 81VT006FVNModel: LENOVO IDP1 11IGL05 81VT006FVN</p>
                                <p>Mã SP: GS.008781</p>
                            </div>
                            <div className='product-item__promotion'>
                                <span>KHUYẾN MẠI</span>
                                <li>Chuột quang có dây Newmen M007 trị giá 149,000đ</li>
                                <li>Giảm giá 10% chuột trị giá dưới 1 triệu, khi mua kèm với tất cả laptop (xem chi tiết)</li>
                                <li>Giảm giá 10% balo, túi khi mua kèm với tất cả Laptop (xem chi tiết)</li>
                            </div>
                            <div className='product-item__choose'>
                                <label htmlFor="">Số lượng &nbsp;</label>
                                <input type="number" min={1} defaultValue={1} />
                                <button title='Thêm vào giỏ hàng'>MUA HÀNG</button>
                                <button title='Thêm vào danh sách quan tâm'>
                                    <i className="fa-solid fa-heart" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='product-comment'>
                    <div className='product-comment-title'>
                        <p>Bình luận</p>
                    </div>
                    <div className='product-comment-write'>
                        <textarea name="" id="" cols="30" rows="10" placeholder='Nhập nội dung bình luận'></textarea>
                    </div>
                    <button>Gửi bình luận &nbsp;
                        <i class="fas fa-paper-plane"></i>
                    </button>
                </div>
                <div className='render-comment'>
                    <p>Username</p>
                    <p>Nội dung comment</p>
                    <span>Thời gian bình luận</span>
                </div>
            </div>
        </div>
    )
}
