import { useState } from 'react'
import Login from './Component/headerComponent/Login'
import Register from './Component/headerComponent/Register'
import Header from './Component/user/Header'
import Main from './Component/user/Main'
import Footer from './Component/user/Footer'
import ModalLayout from './Component/headerComponent/ModalLayout'
import Cart from './Component/user/Cart'
import Product from './Component/user/Product'
import FormAddProduct from './Component/admin/FormAddProduct'
import { Outlet, Route, Routes } from 'react-router-dom'
import User from './Component/user/User'
import Admin from './Component/admin/Admin'
import UserManager from './Component/admin/UserManager'
import Category from './Component/admin/Category'
import ProductManager from './Component/admin/ProductManager'
import ProductAll from './Component/user/ProductAll'

function App() {
  const userLogin = JSON.parse(localStorage.getItem('user-login'));

  return (
    <div>
      <Admin />
      <User />
    </div>
  )
}

export default App
