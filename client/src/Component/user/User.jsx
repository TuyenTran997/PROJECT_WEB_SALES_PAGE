import React, { useEffect, useState } from 'react'
import Header from './Header';
import Footer from './Footer';
import Cart from './Cart';
import Product from './Product';
import ProductAll from './ProductAll';
import axios from 'axios';



export default function User() {
    const userLogin = JSON.parse(localStorage.getItem('user-login'))

    const [arrCart, setArrCart] = useState([]);
    console.log(arrCart);
    const [listProduct, setListProduct] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const buyProduct = async (productBuy) => {
        let check;
        let quantity = 0;
        if (productBuy._status === 1) {
            alert('Sản phẩm bạn chọn đã hết hàng, bạn vui lòng xem các sản phẩm tương tự trong Shop. Xin cảm ơn!')
        } else if (productBuy._status === 0) {
            if (arrCart.length === 0) {
                confirm("Bạn có muốn thêm sản phẩm vào giỏ hàng của bạn không?")
                await axios.post('http://localhost:8000/api/v1/carts', productBuy)
                    .then(res => console.log(res))
                    .catch(err => console.error(err))
            } else if (arrCart.length > 0) {
                arrCart.find((item) => {
                    if (userLogin.userId === productBuy.userId) {
                        if (item.productId === productBuy.productId) {
                            quantity = parseInt(item.quantity) + parseInt(productBuy.quantity);
                            return check = true && quantity
                        } else {
                            return check = false;
                        }
                    }
                })
            }
        }
        if (check) {
            confirm('Sản phẩm đã có trong giỏ hàng, bạn có muốn thêm vào giỏ hàng nữa không?')
            await axios.put(`http://localhost:8000/api/v1/carts?quantity=${quantity}&productId=${productBuy.productId}&userId=${userLogin.userId}`)
                .then(res => { console.log(res); })
                .catch(err => { console.log(err); });
            setQuantity(1);
        }
        if (check === false) {
            confirm('Bạn muốn thêm sản phẩm vào giỏ hàng?')
            await axios.post('http://localhost:8000/api/v1/carts', productBuy)
                .then(res => console.log(res))
                .catch(err => console.error(err))
            setQuantity(1);
        }
        loadArrCart();
    }
    const [totalRecord, setTotalRecord] = useState(0);

    const total = arrCart.map((item) => (item.price_percent_discount * item.quantity)).reduce((a, b) => a + b, 0);
    const loadArrCart = () => {
        axios.get(`http://localhost:8000/api/v1/carts/${userLogin.userId}`)
            .then(res => {
                setArrCart(res.data.data)
                setTotalRecord(res.data.totalRecord)
            })
            .catch(err => {
                console.log(err);
            })
    }

    const handleDeleteProduct = async (productId) => {
        confirm('Bạn muốn xóa sản phẩm này ra khỏi giỏ hàng không?');
        await axios.delete(`http://localhost:8000/api/v1/carts?productId=${productId}&userId=${userLogin.userId}`)
            .then(res => { console.log(res); })
            .catch(err => { console.log(err); });
        loadArrCart();
    }

    const loadListProduct = async () => {
        axios.get(`http://localhost:8000/api/v1/products/product/all`)
            .then(res => {
                if (res.data.status === 200) {
                    setListProduct(res.data.data);

                }
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        loadArrCart();
        loadListProduct();
    }, [])
    return (
        <>
            <div className="app">
                <Header />
                <div className="app__container">
                    <div className="grid">
                        <ProductAll buyProduct={buyProduct} quantity={quantity} setQuantity={setQuantity} />
                        <Cart totalRecord={totalRecord} arrCart={arrCart} total={total} handleDeleteProduct={handleDeleteProduct} />
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}
