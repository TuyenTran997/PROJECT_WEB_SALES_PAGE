import React from 'react'
import ProductAll from './ProductAll'
import Product from './Product'
import Cart from './Cart'
import { Outlet, Route, Routes } from 'react-router-dom'

export default function Main() {
    return (
        <>
            <div className="app__container">
                <div className="grid">
                    <ProductAll />
                    <Product />
                    <Cart />
                </div>
            </div>
        </>
    )
}
