// App.js
import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './Component/headerComponent/PrivateRoute';
import User from './Component/user/User';
import Admin from './Component/admin/Admin';
import Login from './Component/headerComponent/Login';
import ShowProduct from './Component/user/ShowProduct';
import Cart from './Component/user/Cart';
import UserManager from './Component/admin/UserManager';
import Product from './Component/user/Product';
import ProductManager from './Component/admin/ProductManager';
import Category from './Component/admin/Category';
import FormClassity from './Component/admin/FormClassity';
import FormProductAll from './Component/user/FormProductAll';
import axios from 'axios';

function App() {
  // const userLogin = JSON.parse(localStorage.getItem('user-login'));


  // const isAdmin = userLogin && userLogin.roleId === 0; // Kiểm tra xem người dùng có vai trò admin hay không
  // console.log(isAdmin);


  return (
    <div>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<User />} >
          <Route index exact element={<ShowProduct />} />
          <Route path='category/:categoryId' element={<FormProductAll />} />
          <Route path='product/:productId' element={<Product />} />
          <Route path='cart' element={<Cart />} />
        </Route>
        <Route path='admin' element={<Admin />}>
          <Route index element={<UserManager />} />
          <Route path='product' element={<ProductManager />} />
          <Route path='category' element={<Category />} />
          <Route path='classify' element={<FormClassity />} />
        </Route>
      </Routes>
    </div >
  );
}

export default App;
