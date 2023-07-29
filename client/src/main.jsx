import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import User from './Component/user/User.jsx'
import ProductAll from './Component/user/ProductAll.jsx'
import Cart from './Component/user/Cart.jsx'
import Product from './Component/user/Product.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
