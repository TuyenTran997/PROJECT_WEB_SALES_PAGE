import React from 'react'

export default function Cart() {
    return (
        <>
            <div className="grid__row app__content product-title">
                <div className="grid__collum-8">
                    Sản phẩm
                </div>
                <div className="grid__collum-1">
                    Đơn giá
                </div>
                <div className="grid__collum-1">
                    Số lượng
                </div>
                <div className="grid__collum-1">
                    Thành tiền
                </div>
                <div className="grid__collum-1">
                    Thao tác
                </div>
            </div>
            <div className="grid__row cart-product">
                <div className="grid__collum-8 product-item">
                    <img src="./public/assets/img/GS.008781_FEATURE_94404.jpg" alt="" />
                    <p>Laptop Lenovo IdeaPad</p>
                    <p>Laptop Lenovo IdeaPad 1 11IGL05 81VT006FVN (Pentium N5030/4GB RAM/256GB/11.6"HD/Win 11/Grey)</p>
                </div>
                <div className="grid__collum-1">
                    4490000
                </div>
                <div className="grid__collum-1 product-item-quatity">
                    <input type="number" min={1} defaultValue={1} />
                </div>
                <div className="grid__collum-1">
                    4490000
                </div>
                <div className="grid__collum-1">
                    Xóa
                </div>
            </div>
            <div className="grid__row cart-product">
                <div className="grid__collum-8 product-item">
                    <img src="./public/assets/img/GS.008781_FEATURE_94404.jpg" alt="" />
                    <p>Laptop Lenovo IdeaPad</p>
                    <p>Laptop Lenovo IdeaPad 1 11IGL05 81VT006FVN (Pentium N5030/4GB RAM/256GB/11.6"HD/Win 11/Grey)</p>
                </div>
                <div className="grid__collum-1">
                    4490000
                </div>
                <div className="grid__collum-1">
                    1
                </div>
                <div className="grid__collum-1">
                    4490000
                </div>
                <div className="grid__collum-1">
                    Xóa
                </div>
            </div>
            <div className="grid__row cart-product">
                <div className="grid__collum-8 product-item">
                    <img src="./public/assets/img/GS.008781_FEATURE_94404.jpg" alt="" />
                    <p>Laptop Lenovo IdeaPad</p>
                    <p>Laptop Lenovo IdeaPad 1 11IGL05 81VT006FVN (Pentium N5030/4GB RAM/256GB/11.6"HD/Win 11/Grey)</p>
                </div>
                <div className="grid__collum-1">
                    4490000
                </div>
                <div className="grid__collum-1">
                    1
                </div>
                <div className="grid__collum-1">
                    4490000
                </div>
                <div className="grid__collum-1">
                    Xóa
                </div>
            </div>
            <div className="grid__row cart-product">
                <div className="grid__collum-8 product-item">
                    <img src="./public/assets/img/GS.008781_FEATURE_94404.jpg" alt="" />
                    <p>Laptop Lenovo IdeaPad</p>
                    <p>Laptop Lenovo IdeaPad 1 11IGL05 81VT006FVN (Pentium N5030/4GB RAM/256GB/11.6"HD/Win 11/Grey)</p>
                </div>
                <div className="grid__collum-1">
                    4490000
                </div>
                <div className="grid__collum-1">
                    1
                </div>
                <div className="grid__collum-1">
                    4490000
                </div>
                <div className="grid__collum-1">
                    Xóa
                </div>
            </div>
            <div className="summary-section">
                <div className="summary-heading">Thông tin đơn hàng:</div>
                <p className="summary-label">Số sản phẩm(5 sản phẩm):</p>
                <p className="summary-value">10.000.000₫</p>
                <p className="summary-label">Phí giao hàng:</p>
                <p className="summary-value">miễn phí</p>
                <div className="ma-giam-gia rows">
                    <input type="text" name="" id="" placeholder="Nhập mã giảm giá" />
                    <button style={{ marginLeft: '10px' }}>Áp dụng</button>
                </div>
                <p className="summary-label">Tổng cộng:</p>
                <p style={{ color: "#f57224" }}>10.000.000₫</p>
                <p>Đã bao gồm phí VAT</p>
                <button>Xác nhận giỏ hàng</button>
            </div>
        </>
    )
}
